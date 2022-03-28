import React, {useState} from 'react';
import Input from "../Input/Input";
import Button from "../Button/Button";
import { ReactComponent as ErrorIcon } from "../../images/meh.svg";
import { ReactComponent as LoaderIcon } from "../../images/loader.svg";
import { useFormik } from 'formik';
import { loginReducer } from "../../slices/authSlice";
import Sendsay from "sendsay-api";
import * as Yup from 'yup';
import classNames from "classnames";

import "./Login.css";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [loginError, setLoginError] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            login: "",
            sublogin: "",
            password: ""
        },
        validationSchema: Yup.object({
            login: Yup.string().test(
                "login",
                "error",
                (value) => new RegExp(/^([(a-zA-Z0-9)_@.]+)$/).test(value)
            ).required(),
            password: Yup.string().test(
                "password",
                "error",
                (value) => new RegExp(/^([^(а-яА-Я)]+)$/).test(value)
            ).required()
        }),
        onSubmit: (userData) => {
            const sendsay = new Sendsay()
            setLoginError(false)
            setLoading(true)

            sendsay.login(userData)
            .then(() => {
                dispatch(loginReducer({
                    login: userData.login,
                    session: sendsay.session
                }))
                navigate("/main")
            }).catch(err => {
                setLoginError(err)
            }).finally(() => {
                setLoading(false)
            })
        }
    })

    return (
        <form className="login-form" onSubmit={formik.handleSubmit}>
            <h1 className="login-form__title">API-консолька</h1>
            {loginError && (
                <div className="login-form__error">
                    <div className="login-form__error-icon">
                        <ErrorIcon />
                    </div>
                    <div className="login-form__error-descr">
                        <span>Вход не вышел</span>
                        <span>{`{id: "${loginError.id}", explain: "${loginError.explain}"}`}</span>
                    </div>
                </div>
            )}
            <label className={classNames("login-form__label", {
                'login-form__label_error': formik.touched.login && formik.errors.login
            })}>
                <div className="login-form__descr">
                    <span>Логин</span>
                </div>
                <Input
                    name="login"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.login}
                />
            </label>
            <label className="login-form__label">
                <div className="login-form__descr">
                    <span>Сублогин</span>
                    <span>Опционально</span>
                </div>
                <Input
                    name="sublogin"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.sublogin}
                />
            </label>
            <label className={classNames("login-form__label", {
                'login-form__label_error': formik.touched.password && formik.errors.password
            })}>
                <div className="login-form__descr">
                    <span>Пароль</span>
                </div>
                <Input
                    name="password"
                    type="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
            </label>
            <Button
                className={classNames({
                    "disabled": (formik.values.login.length === 0 || formik.errors.login) ||
                                (formik.values.password.length === 0 || formik.errors.password)
                })}
                disabled={loading}
                type="submit">
                {loading ?
                    <LoaderIcon className="login-form__loader"/> :
                    "Войти"}
            </Button>
        </form>
    );
};

export default Login;
