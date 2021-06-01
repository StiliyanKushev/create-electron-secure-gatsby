import { BrowserWindow } from "electron";
import path from "path";
const serve = require('electron-serve');
const loadURL = serve({ directory: 'public' });

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
            show: false
        });

        if(!this.windowManager.isDev)
        this.browserWindow.webContents.on("devtools-opened", () => { this.browserWindow.webContents.closeDevTools(); });

        if(show){
            if (this.windowManager.isDev) {
                this.browserWindow.loadURL('http://localhost:8000' + this.route);
            } else {
                loadURL(this.browserWindow);
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

    constructor(isDev:boolean){
        this.isDev = isDev;
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