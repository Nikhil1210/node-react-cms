import React from 'react';
import PropTypes from 'prop-types';

const PageActive = props => (
   <div className={`col d-flex align-items-center flex-column nav-active ${props.containerClass}`}>
    <span className="circle-active text-center">{props.containerValue}</span>
    <div className="w-100">
        <p className="footnote-2 text-center mb-0 mx-auto mt-2">{props.containerText}</p>
    </div>
   </div>
);

PageActive.defaultProps={
    containerClass:''
};

PageActive.propTypes = {
    containerClass: PropTypes.string,
    containerValue: PropTypes.number.isRequired,
    containerText: PropTypes.string.isRequired,
};

export default PageActive;