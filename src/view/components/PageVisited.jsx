import React from 'react';
import PropTypes from 'prop-types';

const PageVisited = props => (
   <div className={`col d-flex flex-column nav-visited ${props.containerClass}`}>
    <span className="material-icons text-center">check_circle</span>
    <div className="w-100">
        <p className="footnote-2 text-center mb-0 mx-auto mt-2">{props.containerText}</p>
    </div>
   </div>
);

PageVisited.defaultProps={
    containerClass:''
};

PageVisited.propTypes = {
    containerClass: PropTypes.string,
    containerText: PropTypes.string.isRequired,
};

export default PageVisited;