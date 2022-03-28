import React from 'react';
import { ReactComponent as LogoIcon } from "../../images/logo.svg";
import Login from "../../components/Login/Login";

import "./LoginPage.css";

const LoginPage = () => {
    return (
        <div className="login">
            <LogoIcon />
            <Login />
            <a href="https://github.com/Minival1" className="login__link">
                https://github.com/Minival1
            </a>
        </div>
    );
};

export default LoginPage;
