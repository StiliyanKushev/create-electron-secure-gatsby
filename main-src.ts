import {app, ipcMain } from 'electron';
import WindowManager from './scripts/windowManager';

function isDev() {
    return !app.isPackaged;
}

if(isDev()){
    // apply electron reload to the whole app
    require('electron-reload')(__dirname);
}

let windowManager: WindowManager = new WindowManager(isDev(),isDev());

function setup(){
   // add windows here
   windowManager.add("main",800,600,'/',true);
}

ipcMain.on("openWindow", (e, to) => {
    console.log("open a window to " + to)
    windowManager.add(to,800,600,to,true);
})

app.on('ready', setup);
app.on('activate', function () {
    if (windowManager === null) setup()
});