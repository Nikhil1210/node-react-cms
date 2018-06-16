import React from 'react';
import PropTypes from 'prop-types';

const AnchorLink= props=>(
    <div className={`col-auto px-0 ${props.containerClass}`}>
        <a
        href={props.to}
        className={`btn w-100 ${props.className}`}
        role="button"
        onClick={e=> props.onClick(e,props.to)}
        >
        {props.children}
        </a>
    </div>
);

AnchorLink.defaultProps ={
    containerClass:'form-submit-btn',
    className:''
};

AnchorLink.propTypes= {
    containerClass: PropTypes.string,
    onlick:PropTypes.func.isRequired,
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    children:PropTypes.string.isRequired
};

export default AnchorLink;