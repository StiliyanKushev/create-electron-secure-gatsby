import React from 'react';
import styles from "./headerButtons.module.css";
import { AllElectron } from 'electron';

interface IState {
    // TODO
}

interface IParentProps {
    // TODO
}

type IProps = IParentProps;

class HeaderButtons extends React.PureComponent<IProps, IState>{
    constructor(props:IProps){
        super(props);

        this.minimize = this.minimize.bind(this);
        this.close = this.close.bind(this);
    }

    minimize(e:React.MouseEvent<HTMLLIElement>){
        e.preventDefault();
        if(typeof window != "undefined"){
            let remote = window.require("electron").remote;
            remote.BrowserWindow.getFocusedWindow().minimize();
        }
    }

    close(e:React.MouseEvent<HTMLLIElement>){
        e.preventDefault();
        if(typeof window != "undefined"){
            let remote = window.require("electron").remote;
            remote.BrowserWindow.getFocusedWindow().close();
        }
    }

    render(){
        return (
            <>
                <ul className={styles.container}>
                    <li onClick={this.minimize} className={styles.minimize}>
                        <div></div>
                    </li>
                    <li onClick={this.close} className={styles.close}>
                        <div></div>
                    </li>
                </ul>
            </>
        );
    }
}


export default HeaderButtons;