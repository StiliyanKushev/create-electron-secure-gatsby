import React from 'react';
import styles from './header.module.css';

import HeaderButtons from '../headerButtons/headerButtons';

interface IProps {
    title:string,
    hasLogo?:boolean,
    hasLogout?:boolean,
}

interface IState {
    // todo
}

class Header extends React.PureComponent<IProps, IState> {
    state:IState = {}; // todo

    constructor(props:IProps){
        super(props);
    }

    render(){
        return (
            <div className={styles.container}>
                <ul>
                    { this.props.hasLogo && <li className={styles.logo}><p>K6V</p></li> }
                    <li className={styles.title}>{this.props.title}</li>
                    <li className={styles.buttons}>
                        <HeaderButtons />
                    </li>
                </ul>
            </div>
        );
    }
}

export default Header;