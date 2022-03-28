import React from 'react';
import "components/Input/Input.css";

const Input = (props) => {
    return (
        <input type="text" className="input" {...props} />
    );
};

export default Input;
