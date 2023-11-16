import React from 'react';
import "./style.scss"

const Button = ({
    children,
    mode = "blue-button"
}) => {
    return (
        <button className={mode}>
            {children}
        </button>
    );
};

export default Button;