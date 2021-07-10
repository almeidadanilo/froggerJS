const { app, BrowserWindow } = require("electron");

// main screen
let mainWindow = null;

async function createWindow(){
    mainWindow = new BrowserWindow ({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
          },       
    });

    await mainWindow.loadFile("src/index.html");

}


// when ready
app.whenReady().then(createWindow);
