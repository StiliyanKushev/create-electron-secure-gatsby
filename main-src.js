"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var windowManager_1 = __importDefault(require("./scripts/windowManager"));
function isDev() {
    return !electron_1.app.isPackaged;
}
var mainWindow = null;
if (isDev()) {
    // apply electron reload to the whole app
    require('electron-reload')(__dirname);
}
function setup() {
    //mainWindow = new PanelWindow("/login",false,isDev(),360, 490,true);
    mainWindow = new windowManager_1.default("/login", false, isDev(), 360, 490, true);
}
electron_1.ipcMain.on("APP_OPEN_WINDOW", function (e, route) {
    e.preventDefault();
    new windowManager_1.default(route, false, isDev(), 800, 600, true);
});
electron_1.app.on('ready', setup);
electron_1.app.on("window-all-closed", electron_1.app.quit);
electron_1.app.on('activate', function () {
    if (mainWindow == null)
        setup();
});
