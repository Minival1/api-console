import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import {ReactComponent as DotsIcon} from "../../../images/dots.svg";
import Dropdown from "../../Dropdown/Dropdown";
import {deleteRequest, executeRequest} from "../../../slices/historySlice";
import {useDispatch} from "react-redux";

const RequestItem = ({req, itemId}) => {
    const [activeDropdown, setActiveDropdown] = useState(false)
    const [coords, setCoords] = useState({x: null, y: null})

    const dispatch = useDispatch()

    const closeDropdown = () => {
        setActiveDropdown(false)
    }

    const copyRequest = () => {
        const str = JSON.parse(req.request)
        window.navigator.clipboard.writeText(str)
    }

    const deleteHandler = () => {
        dispatch(deleteRequest({id: itemId}))
    }

    const sendRequest = () => {
        dispatch(executeRequest(req.request))
    }

    useEffect(() => {
        document.addEventListener("mouseup", closeDropdown)
        return () => {
            document.removeEventListener("mouseup", closeDropdown)
        }
    }, [activeDropdown])

    const openDropdown = (e) => {
        e.stopPropagation();
        if (!activeDropdown) {
            const elem = e.currentTarget.getBoundingClientRect()
            setCoords({
                x: elem.left,
                y: elem.top + elem.height
            })
            setActiveDropdown(true)
        }
    }

    const dropdownStyles = {
        display: "block",
        position: "absolute",
        top: coords.y + "px",
        left: coords.x + "px"
    }

    return (
        <div className="history-requests__item" onClick={openDropdown}>
                <span className={classNames({
                    "history-requests__item-success": req.status === "success",
                    "history-requests__item-failed": req.status === "failed",
                })} />
            <span className="history-requests__item-name">{req.actionName}</span>
            <DotsIcon/>
            <Dropdown
                sendRequest={sendRequest}
                deleteRequest={deleteHandler}
                copyRequest={copyRequest}
                closeDropdown={closeDropdown}
                itemId={itemId}
                style={activeDropdown ? dropdownStyles : null}
            />
        </div>
    )
};

export default RequestItem;
