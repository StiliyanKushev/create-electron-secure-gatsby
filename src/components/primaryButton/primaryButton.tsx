import React from 'react';
import styles from './primaryButton.module.css';

interface IState {

}

interface IParentProps {
    text:string,
}

type IProps = IParentProps;

class PrimaryButton extends React.PureComponent<IProps, IState>{
    handleClick(e:React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
    }

    render(){
        return (
            <button onClick={this.handleClick} className={styles.btn} type="submit">{this.props.text}</button>
        );
    }
}

export default PrimaryButton;