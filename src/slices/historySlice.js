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
            state.requests.unshift(payload)
        },
        clearHistory: (state) => {
            state.requests = []
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
