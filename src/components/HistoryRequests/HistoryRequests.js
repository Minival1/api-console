import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ReactComponent as ClearIcon} from "images/close.svg";

import "components/HistoryRequests/HistoryRequests.css";
import {addToHistory, clearHistory} from "slices/historySlice";
import RequestItem from "components/HistoryRequests/RequestItem/RequestItem";

const HistoryRequests = () => {
    const requests = useSelector(state => state.history.requests)

    const dispatch = useDispatch()

    useEffect(() => {
        if (requests.length !== 0) {
            localStorage.setItem("requests", JSON.stringify(requests))
        }
    }, [requests])

    useEffect(() => {
        const savedRequests = JSON.parse(localStorage.getItem("requests")) || []
        if (savedRequests.length !== 0) {
            dispatch(addToHistory(savedRequests))
        }
    }, [])

    const clearHandler = () => {
        dispatch(clearHistory())
    }

    const wheelHandler = (e) => {
        e.currentTarget.scrollLeft += e.deltaY
    }

    const requestsList = requests.map((req, i) => {
        return (
            <RequestItem itemId={i} key={i} req={req}/>
        )
    })
    return (
        <div className="history-requests">
            <div className="history-requests__list" onWheel={wheelHandler}>
                {requestsList}
            </div>
            <div className="history-request__clear" onClick={clearHandler}>
                <ClearIcon/>
            </div>
        </div>
    );
};

export default HistoryRequests;
