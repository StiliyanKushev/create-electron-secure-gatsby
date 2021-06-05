import React from "react"
import { PureComponent } from "react";

import Layout from "../components/layout"

class IndexPage extends PureComponent {
    componentDidMount(){
        // setTimeout(() => {
        //     // don't run in browser          
        //     if(typeof window != "undefined"){
        //         const electron = window.require("electron");
        //         electron.ipcRenderer.send("openWindow", "/other");
        //     }
        // }, 3000)
    }

    render(){
        return (
            <Layout>
                <p>Lorem Ipsum</p>
            </Layout>
        )
    }
}

export default IndexPage
