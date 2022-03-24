import React, {useEffect, useState} from 'react';
import {ReactComponent as LogoIcon} from "../../images/logo.svg";
import {ReactComponent as LogoutIcon} from "../../images/logout.svg";
import {ReactComponent as EnableFullscreenIcon} from "../../images/fullscreen-on.svg";
import {ReactComponent as DisableFullscreenIcon} from "../../images/fullscreen-off.svg";
import {logoutReducer} from "../../slices/authSlice";
import Sendsay from "sendsay-api";

import "./Header.css";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const [fullscreenState, setFullscreenState] = useState(false)
    const [accountInfo, setAccountInfo] = useState({ login: null, sublogin: null })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const session = sessionStorage.getItem("sendsay")

        const sendsay = new Sendsay()
        if (session) {
            sendsay.setSession(session)
        }
        sendsay.request({
            action: "pong"
        }).then((res) => {
            if (res.account === res.sublogin) {
                setAccountInfo({
                    login: res.account
                })
            } else {
                setAccountInfo({
                    login: res.account,
                    sublogin: res.sublogin
                })
            }
        })
    }, [])

    const fullscreenHandler = () => {
        if (fullscreenState) {
            document.exitFullscreen()
        } else {
            document.documentElement.requestFullscreen()
        }
        setFullscreenState(!fullscreenState)
    }

    const logoutHandler = () => {
        dispatch(logoutReducer())
        navigate("/")
    }

    return (
        <div className="header">
            <LogoIcon className="header__icon"/>
            <div className="header__title">Api-консолька</div>
            <div className="header__account">
                <div className="header__login">
                    {accountInfo.login ? accountInfo.login : null}
                </div>
                <div className="header__sublogin">
                    {accountInfo.sublogin ? accountInfo.sublogin : "sublogin"}
                </div>
            </div>
            <div className="header__logout" onClick={logoutHandler}>
                Выйти
                <LogoutIcon/>
            </div>
            <button className="header__fullscreen" onClick={fullscreenHandler}>
                {fullscreenState ? <DisableFullscreenIcon /> : <EnableFullscreenIcon />}
            </button>
        </div>
    );
};

export default Header;
