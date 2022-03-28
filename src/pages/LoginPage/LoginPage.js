import React from 'react';
import { ReactComponent as LogoIcon } from "images/logo.svg";
import Login from "components/Login/Login";

import "pages/LoginPage/LoginPage.css";

const LoginPage = () => {
    return (
        <div className="login">
            <LogoIcon />
            <Login />
            <a href="#" className="login__link">
                @link-to-your-github
            </a>
        </div>
    );
};

export default LoginPage;
