import { AllElectron } from "electron";
import React, { Component } from "react";

interface IProps {
    to:string,
    children:any
}
 
class Link extends Component {
    props:IProps;

    // window dependant code
    windowAvailable:boolean = typeof window !== 'undefined';
    electron: null | AllElectron;

    constructor(props:IProps){
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount(){
        if(this.windowAvailable){
            this.electron = window.require('electron');
        }
    }

    onClick(e:any){ // TODO
        e.preventDefault();
        if(this.windowAvailable){
            this.electron.ipcRenderer.send("openWindow", this.props.to);
        }
    }

    render(){
        return (
            <a onClick={this.onClick} href="#">
                {this.props.children}
            </a>
        );
    }
}

export default Link;