import { BrowserWindow, Menu } from "electron";
import path from "path";
import serve from 'electron-serve';
serve({ directory: "public"});

class PanelWindow {
    browserWindow:BrowserWindow;
    route:string;
    showMenu:boolean;
    isDev:boolean;

    constructor(route:string,showMenu:boolean,isDev:boolean,width:number,height:number,show:boolean){
        this.route = route;
        this.showMenu = showMenu;
        this.isDev = isDev;
        this.browserWindow = new BrowserWindow({
            width: width,
            height: height,
            webPreferences: {
                nodeIntegration: true,
                devTools: this.isDev ? true:false,
            },
            icon: this.isDev ? path.join(process.cwd(), 'src/images/icon.png') : path.join(__dirname, '../public/icons/icon-512x512.png'),
            show: false,
            frame: this.showMenu,
            resizable:false,
        });

        this.browserWindow.setResizable(false);
        this.browserWindow.setMenuBarVisibility(this.showMenu);

        if(!this.showMenu){
            this.browserWindow.setMenu(null);
            Menu.setApplicationMenu(null);
        }

        if(!this.isDev)
        this.browserWindow.webContents.on("devtools-opened", () => { this.browserWindow.webContents.closeDevTools(); });

        if(show){
            if (this.isDev) {
                this.browserWindow.loadURL('http://localhost:8000' + this.route);
            } else {
                if(this.route == "/"){
                    this.browserWindow.loadURL(`app://public/index.html`);
                }
                else{
                    this.browserWindow.loadURL(`app://public${this.route}/index.html`);
                }
            }
        }
        else{
            this.browserWindow.hide();
        }
        
        //@ts-ignore
        process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
        this.browserWindow.once('ready-to-show', () => {
            this.browserWindow.show()
        });
    }

    show(){
        this.browserWindow.show();
    }

    minimize(){
        this.browserWindow.minimize();
    }

    close(){
        this.browserWindow.close();
    }
}

export default PanelWindow;