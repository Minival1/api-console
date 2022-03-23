import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    session: null,
    isAuth: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginReducer: (state, {payload}) => {
            state.isAuth = true
            state.session = payload.session
            sessionStorage.setItem("sendsay", payload.session)
        },
        logoutReducer: (state) => {
            state.isAuth = false
            sessionStorage.removeItem("sendsay")
        }
    }
})

export const {loginReducer, logoutReducer} = authSlice.actions

export default authSlice.reducer
