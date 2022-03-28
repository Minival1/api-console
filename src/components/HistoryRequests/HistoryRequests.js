import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ReactComponent as ClearIcon} from "../../images/close.svg";

import "./HistoryRequests.css";
import {clearHistory} from "../../slices/historySlice";
import RequestItem from "./RequestItem/RequestItem";

const HistoryRequests = () => {
    const requests = useSelector(state => state.history.requests)

    const dispatch = useDispatch()

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
