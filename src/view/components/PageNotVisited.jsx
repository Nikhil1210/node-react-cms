import React from 'react';
import PropTypes from 'prop-types';

const PageNotVisited = props => (
   <div className={`col d-flex align-items-center flex-column nav-notvisited ${props.containerClass}`}>
    <span className="circle-notvisited text-center">{props.containerValue}</span>
    <div className="w-100">
        <p className="footnote-2 text-center mb-0 mx-auto mt-2">{props.containerText}</p>
    </div>
   </div>
);

PageNotVisited.defaultProps={
    containerClass:''
};

PageNotVisited.propTypes = {
    containerClass: PropTypes.string,
    containerValue: PropTypes.number.isRequired,
    containerText: PropTypes.string.isRequired,
};

export default PageNotVisited;