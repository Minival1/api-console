import React, {useEffect, useRef, useState} from 'react';
import classNames from "classnames";
import {ReactComponent as DotsIcon} from "images/dots.svg";
import Dropdown from "components/Dropdown/Dropdown";
import {deleteRequest, executeRequest} from "slices/historySlice";
import {useDispatch} from "react-redux";

const RequestItem = ({req, itemId}) => {
    const [activeDropdown, setActiveDropdown] = useState(false)
    const [coords, setCoords] = useState({x: null, y: null})
    const copyRef = useRef(null)

    const dispatch = useDispatch()

    const closeDropdown = () => {
        setActiveDropdown(false)
    }

    const copyRequest = () => {
        window.navigator.clipboard.writeText(req.request)
        copyRef.current.classList.add("history-requests__copy-anim")
    }

    const deleteHandler = () => {
        dispatch(deleteRequest({id: itemId}))
    }

    const sendRequest = () => {
        dispatch(executeRequest(req.request))
    }

    useEffect(() => {
        copyRef.current.addEventListener("animationend", () => {
            copyRef.current.classList.remove("history-requests__copy-anim")
        })
    }, [])

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
            <span ref={copyRef} className="history-requests__copy">Скопировано</span>
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
