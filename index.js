const {app, BrowserWindow, Menu, Tray, MenuItem} = require('electron');
const url = require('url');
const path = require('path');
let iconpath = path.join(__dirname, 'ikona.png')
let win 

function createWindow() {
    win = new BrowserWindow({width: 800, height: 500, frame: false, resizable: false, title: 'Ustawiacz RPC', icon: iconpath})
    win.loadURL(url.format ({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))
    var appIcon = new Tray(iconpath);

    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Ustawiacz działa w tle!'
        },
        {
            label: 'Pokaż', click: function() {
                win.show();
            }
        },
        {
            label: 'Zamknij', click: function() {
                app.isQuiting = true;
                app.quit();
            }
        }
    ])
    appIcon.setContextMenu(contextMenu)
    appIcon.on('click', function() {
        win.show();
    })
    win.on('close', function (event) {
        win = null
    })

    win.on('show', function () {
        appIcon.setHighlightMode('always')
    })

}
app.on('ready', createWindow)