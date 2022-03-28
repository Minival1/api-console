import React from 'react';
import "./Button.css"
import classNames from "classnames";

const Button = ({children, className, ...props}) => {
    return (
        <button className={classNames("btn", className)} {...props}>
            {children}
        </button>
    );
};

export default Button;
