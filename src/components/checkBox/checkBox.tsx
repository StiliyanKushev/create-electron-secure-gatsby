import React from 'react';
import styles from './checkBox.module.css';

import CheckedImg from '../../external/checked.png';
import UncheckedImg from '../../external/unchecked.png';

interface IState {
    isChecked:boolean,
}

interface IParentProps {
    text: string,
}

type IProps = IParentProps;

class CheckBox extends React.PureComponent<IProps, IState>{
    state:IState = {isChecked: false}

    constructor(props:IProps){
        super(props);
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck(){
        this.setState({isChecked: !this.state.isChecked})
    }

    render(){
        return (
            <>
                <div className={styles.container}>
                    <input type="checkbox" name={this.props.text}></input>
                    {this.state.isChecked ? 
                    <img onClick={this.handleCheck} className={styles.img} src={CheckedImg}></img>:
                    <img onClick={this.handleCheck} className={styles.img} src={UncheckedImg}></img>}
                    <label htmlFor={this.props.text}>{this.props.text}</label>
                </div>
            </>
        );
    }
}

export default CheckBox;