import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton= props=>(
    <div className={`col-auto px-0 ${props.containerClass}`}>
    <button
    type="submit"
    className={`btn w-100 ${props.className}`}
    onClick={e=>props.onClick(e)}
    aria-label={props.arialabel}
    >
    {props.children}
    </button>
    </div>
);

SubmitButton.defaultProps= {
   containerClass: 'form-submit-btn',
   className:'',
   arialabel:''
};

SubmitButton.PropTypes= {
   containerClass: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired,
    className: PropTypes.string,
    arialabel: PropTypes.string
};

export default SubmitButton;