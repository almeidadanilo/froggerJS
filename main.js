const { app, BrowserWindow, Menu } = require("electron");
const DEFINE_DEV = 1;

// Application Menu
const templateMenu = [
        {
            label: app.name,
            submenu: [
                { label: 'Novo Jogo', click: () => { mainWindow.webContents.send('new-game','abc') } },
                { type:  'separator' },
                { label: 'Sair', role: 'quit' }
            ]
        },
        {
            label: 'Janela',
            submenu: [
                { label: 'Minimizar', role: 'minimize' },
                { label: 'Sair', role: 'close' },
                { label: 'Sobre ...', role: 'about' }
            ]
        },
        ...(DEFINE_DEV ? [ 
                {
                    label: 'Ferramentas',
                    submenu: [
                        { role: 'reload' },
                        { role: 'forceReload' },
                        { role: 'toggleDevTools' },
                        { type: 'separator' },
                        { role: 'resetZoom' },
                        { role: 'togglefullscreen' }
                    ]
                }] 
            : []
        )      
]


// main screen
let mainWindow = null;

async function createWindow(){
    mainWindow = new BrowserWindow ({
        width: 800,
        height: 600,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
          },       
    });

    if (DEFINE_DEV) mainWindow.webContents.openDevTools({mode: "detach"});

    await mainWindow.loadFile("src/index.html");

}


// when ready
app.whenReady().then(createWindow);

// Builds the menu
const menu = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(menu);

