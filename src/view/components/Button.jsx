import React from 'react';
import PropTypes from 'prop-types';

const Button= props=>(
        <button
        className={`btn ${props.className}`}
        onClick={props.onClick}
        >
        {props.children}
        </button>
);

Button.propTypes= {
    className: PropTypes.string.isRequired,
    onlick:PropTypes.func.isRequired,
    children:PropTypes.oneOfType([
        PropTypes.string, PropTypes.element
    ]).isRequired
};

export default Button;