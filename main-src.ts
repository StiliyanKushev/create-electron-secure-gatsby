import { app, ipcMain } from 'electron';
import PanelWindow from './scripts/windowManager';

function isDev() {
    return !app.isPackaged;
}

let mainWindow:any = null;

if(isDev()){
    // apply electron reload to the whole app
    require('electron-reload')(__dirname);
}

function setup(){
    //mainWindow = new PanelWindow("/login",false,isDev(),360, 490,true);
    mainWindow = new PanelWindow("/login",false,isDev(),360, 490,true);
}

ipcMain.on("APP_OPEN_WINDOW", (e, route) => {
    e.preventDefault();
    new PanelWindow(route,false,isDev(),800, 600,true)
})

app.on('ready', setup);
app.on("window-all-closed", app.quit)
app.on('activate', function () {
    if(mainWindow == null) setup()
});