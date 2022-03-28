import React from 'react';
import "components/Button/Button.css"
import classNames from "classnames";

const Button = ({children, className, ...props}) => {
    return (
        <button className={classNames("btn", className)} {...props}>
            {children}
        </button>
    );
};

export default Button;
