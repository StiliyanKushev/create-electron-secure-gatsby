import React from 'react';
import styles from './primaryInput.module.css';

import avatarInput from '../../external/input_avatar.png';
import keyInput from '../../external/key_input.png';

interface IState {
    //TODO
}

interface IParentProps {
    type:string,
    placeholder:string,
}

type IProps = IParentProps;

class PrimaryInput extends React.PureComponent<IProps, IState>{
    imgSrc:any;

    constructor(props:IProps){
        super(props);

        if(this.props.type == "password"){
            this.imgSrc = keyInput;
        }
        else{
            this.imgSrc = avatarInput;
        }
    }

    render(){
        return (
            <>
                <img className={styles.img} src={this.imgSrc} />
                <input 
                    className={styles.input}
                    type={this.props.type}
                    placeholder={this.props.placeholder}>
                </input>
            </>
        );
    }
}

export default PrimaryInput;