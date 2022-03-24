import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    requests: [],
    executingRequest: null
}

export const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        addToHistory: (state, {payload}) => {
            if (state.requests.length === 15) {
                state.requests.pop()
            }
            // если передается массив, сохранённый в localstorage
            if (Array.isArray(payload)) {
                state.requests = [...payload, ...state.requests]
            }
            // если передается объект request
            if (typeof payload === "object" && !Array.isArray(payload)) {
                const uniqueRequestIndex = state.requests.findIndex((item) => {
                    return item.actionName === payload.actionName && item.status === payload.status
                })

                if (uniqueRequestIndex !== -1) {
                    state.requests.unshift(...state.requests.splice(uniqueRequestIndex, 1))
                } else {
                    state.requests.unshift(payload)
                }
            }
        },
        clearHistory: (state) => {
            state.requests = []
            localStorage.removeItem("requests")
        },
        deleteRequest: (state, {payload}) => {
            state.requests = state.requests.filter((el, i) => i !== payload.id)
        },
        executeRequest: (state, {payload}) => {
            state.executingRequest = payload
        },
        clearExecuteRequest: (state) => {
            state.executingRequest = null
        }
    }
})

export const {addToHistory, clearHistory, deleteRequest, executeRequest, clearExecuteRequest} = historySlice.actions

export default historySlice.reducer
