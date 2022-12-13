class Member {
    constructor(name, artist) {
        this.name = name;
        this.artist = artist;
    }
}

class Play {
    constructor(id,name) {
        this.id = id;
        this.name = name;
        this.songs = [];  
    }
    addSong(song) {            
        this.songs.push(song)
    }

    deleteSong(song){
        let index = this.songs.indexOf(song);
        this.songs.splice(index, 1);
    }
}

let playLists = [];
let playListId = 0;

onClick('new-playList', () => {
    playLists.push(new Play(playListId++, getValue('new-playList-name')));
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id){
    return document.getElementById(id).value;
}

function drawDOM() {
    let playListDiv = document.getElementById('playLists');
    clearElement(playListDiv);
    for (playList of playLists) {
        let table = createPlaylistTable(playList);
        let title = document.createElement('h2');
        title.innerHTML = playList.name;
        title.appendChild(createDeletePlaylistButton(playList));
        playListDiv.appendChild(title);
        playListDiv.appendChild(table);
        for (song of playList.songs) {
            createSongRow( playList, table , song);
        }
    }
}

function createSongRow(playList, table, song) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = song.name;
    row.insertCell(1).innerHTML = song.artist;
    let actions = row.insertCell(2);
    actions.appendChild(createDeletePlaylistRowButton(playList, song));
}

function createDeletePlaylistRowButton(playList, song){
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger';
    btn.innerHTML = 'Delete Song';
    btn.onclick = () => {
        let index = playList.songs.indexOf(song);
        playList.songs.splice(index, 1);
        drawDOM();
    }
    return btn;
}

function createDeletePlaylistButton(playList) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger';
    btn.innerHTML = 'Delete Playlist';
    btn.onclick = () => {
        let index = playLists.indexOf(playList);
        playLists.splice(index,1);
        drawDOM();
    };
    return btn;
}

function createNewPlaylistButton(playList) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-success';
    btn.innerHTML = 'Add Song';
    btn.onclick = () => {
        playList.songs. push(new Member(getValue(`name-input-${playList.id}`), getValue(`artist-input-${playList.id}`)));
        drawDOM();
    };
    return btn;
}

function createPlaylistTable(playList) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let artistColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name'
    artistColumn.innerHTML = 'Artist';
    row.appendChild(nameColumn);
    row.appendChild(artistColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let artistTh = document.createElement('th');
    let createTh = document.createElement('th')
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${playList.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let artistInput = document.createElement('input');
    artistInput.setAttribute('id', `artist-input-${playList.id}`);
    artistInput.setAttribute('type', 'text');
    artistInput.setAttribute('class', 'form-control');
    let newPlaylistButton = createNewPlaylistButton(playList);
    nameTh.appendChild(nameInput);
    artistTh.appendChild(artistInput);
    createTh.appendChild(newPlaylistButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(artistTh);
    formRow.appendChild(createTh);
    return table; 
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}



