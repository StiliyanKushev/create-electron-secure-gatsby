import { ipcMain } from 'electron';
import WindowManager from './scripts/windowManager';
const { app } = require('electron');

function isDev() {
    return !app.isPackaged;
}

let windowManager: WindowManager = new WindowManager(isDev());

function setup(){
   // add windows here
   windowManager.add("main",800,600,'/',true);
}

ipcMain.on("openWindow", (e, to) => {
    windowManager.add(to,800,600,to,true);
})

app.on('ready', setup);
app.on('activate', function () {
    if (windowManager === null) setup()
});