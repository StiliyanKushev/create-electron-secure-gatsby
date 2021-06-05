import { BrowserWindow, Menu } from "electron";
import path from "path";
import serve from 'electron-serve';
serve({ directory: "public"});
class PanelWindow {
    windowManager:WindowManager;
    browserWindow:BrowserWindow;
    name:string;
    width:number;
    height:number;
    route:string;

    constructor(wm:WindowManager,name:string,width:number,height:number,route:string, show:boolean){
        this.windowManager = wm;
        this.name = name;
        this.route = route;
        this.browserWindow = new BrowserWindow({
            width: width,
            height: height,
            webPreferences: {
                nodeIntegration: true,
                devTools: this.windowManager.isDev ? true:false,
            },
            icon: this.windowManager.isDev ? path.join(process.cwd(), 'src/images/icon.png') : path.join(__dirname, '../public/icons/icon-512x512.png'),
            show: false,
            frame: wm.showMenu,
        });

        if(!wm.showMenu){
            this.browserWindow.setMenu(null);
            Menu.setApplicationMenu(null);
        }
        this.browserWindow.setMenuBarVisibility(wm.showMenu);

        if(!this.windowManager.isDev)
        this.browserWindow.webContents.on("devtools-opened", () => { this.browserWindow.webContents.closeDevTools(); });

        if(show){
            if (this.windowManager.isDev) {
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
    
        this.browserWindow.on('closed', () => {
            this.close();
        });
    
        this.browserWindow.once('ready-to-show', () => {
            this.browserWindow.show()
        });
    }

    show(){
        // TODO maybe load route here?
        this.browserWindow.show();
    }

    hide(){
        this.browserWindow.minimize();
    }

    close(){
        this.browserWindow = null;
        this.windowManager.remove(this.name);
    }
}

class WindowManager {
    windows:Array<PanelWindow> = [];
    isDev:boolean;
    showMenu:boolean;

    constructor(isDev:boolean,showMenu:boolean){
        this.isDev = isDev;
        this.showMenu = showMenu;
    }

    add(name:string,width:number,height:number,route:string,show:boolean){
        this.windows.push(new PanelWindow(this,name,width,height,route,show));
    }

    remove(name:string){
        let i = 0;
        for(let w of this.windows){
            if(w.name == name){
                this.windows.splice(i,1);
                break;
            }
            i++;
        }
    }
}

export default WindowManager;