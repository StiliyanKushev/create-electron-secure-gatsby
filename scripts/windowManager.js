"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path_1 = __importDefault(require("path"));
var electron_serve_1 = __importDefault(require("electron-serve"));
electron_serve_1.default({ directory: "public" });
var PanelWindow = /** @class */ (function () {
    function PanelWindow(route, showMenu, isDev, width, height, show) {
        var _this = this;
        this.route = route;
        this.showMenu = showMenu;
        this.isDev = isDev;
        this.browserWindow = new electron_1.BrowserWindow({
            width: width,
            height: height,
            webPreferences: {
                nodeIntegration: true,
                devTools: this.isDev ? true : false,
            },
            icon: this.isDev ? path_1.default.join(process.cwd(), 'src/images/icon.png') : path_1.default.join(__dirname, '../public/icons/icon-512x512.png'),
            show: false,
            frame: this.showMenu,
            resizable: false,
        });
        this.browserWindow.setResizable(false);
        this.browserWindow.setMenuBarVisibility(this.showMenu);
        if (!this.showMenu) {
            this.browserWindow.setMenu(null);
            electron_1.Menu.setApplicationMenu(null);
        }
        if (!this.isDev)
            this.browserWindow.webContents.on("devtools-opened", function () { _this.browserWindow.webContents.closeDevTools(); });
        if (show) {
            if (this.isDev) {
                this.browserWindow.loadURL('http://localhost:8000' + this.route);
            }
            else {
                if (this.route == "/") {
                    this.browserWindow.loadURL("app://public/index.html");
                }
                else {
                    this.browserWindow.loadURL("app://public" + this.route + "/index.html");
                }
            }
        }
        else {
            this.browserWindow.hide();
        }
        //@ts-ignore
        process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
        this.browserWindow.once('ready-to-show', function () {
            _this.browserWindow.show();
        });
    }
    PanelWindow.prototype.show = function () {
        this.browserWindow.show();
    };
    PanelWindow.prototype.minimize = function () {
        this.browserWindow.minimize();
    };
    PanelWindow.prototype.close = function () {
        this.browserWindow.close();
    };
    return PanelWindow;
}());
exports.default = PanelWindow;
