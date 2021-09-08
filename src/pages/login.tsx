import React from 'react';
import styles from './login.module.css';
import avatarImg from '../external/avatar.svg';

import Header from '../components/header/header';
import PrimaryInput from '../components/primaryInput/primaryInput';
import CheckBox from '../components/checkBox/checkBox';
import PrimaryButton from '../components/primaryButton/primaryButton';

class Login extends React.PureComponent {
    render(){
        return (
            <>
                <Header 
                    title={"Login"}
                    hasLogo={true}
                    >
                </Header>
                <section className={styles.container}>
                    <form className={styles.form}>
                        <img src={avatarImg}></img>
                        <PrimaryInput type="text" placeholder="Username"/>
                        <PrimaryInput type="password" placeholder="Password"/>
                        <CheckBox text="Remember me"/>
                        <PrimaryButton text="Login"/>
                    </form>
                </section>
            </>
        );
    }
}

export default Login;