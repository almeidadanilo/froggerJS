const { ipcRenderer } = window.require('electron');


ipcRenderer.on('new-game', (event, data) => {
    console.log('New Game Requested');
    console.log(event);
    console.log(data);
})
