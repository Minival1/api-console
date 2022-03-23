import React from 'react';

import "./Dropdown.css";

const Dropdown = ({itemId, copyRequest, deleteRequest, sendRequest, closeDropdown, ...props}) => {

    const closeHandler = (e) => {
        e.stopPropagation()
        closeDropdown()
    }

    return (
        <div className="dropdown" onClick={closeHandler} {...props}>
            <div onClick={sendRequest} className="dropdown__item">Выполнить</div>
            <div onClick={copyRequest}
                className="dropdown__item">
                Скопировать
            </div>
            <div onClick={deleteRequest}
                 className="dropdown__item dropdown__item_delete">
                Удалить
            </div>
        </div>
    );
};

export default Dropdown;
