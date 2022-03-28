import React, {useEffect} from 'react';
import {Routes, Route, useNavigate} from "react-router-dom";
import LoginPage from "pages/LoginPage/LoginPage";
import MainPage from "pages/MainPage/MainPage";
import {useDispatch} from "react-redux";
import Sendsay from "sendsay-api";
import {loginReducer, logoutReducer} from "slices/authSlice";
import 'App.css';

function App() {
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
        }).then(() => {
            dispatch(loginReducer({session}))
            navigate("/main")
        }).catch(() => {
            dispatch(logoutReducer())
            navigate("/")
        })
    }, [])

  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
  );
}

export default App;
