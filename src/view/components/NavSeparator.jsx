import React from 'react';
import PropTypes from 'prop-types';

const NavSeparator = props=>(
    <div className="col d-flex flex-column nav-visited w-100">
        <hr className={`w-100 ${props.separatorClass}`}/>
    </div>
);

NavSeparator.propTypes ={
    separatorClass: PropTypes.string.isRequired
};

export default NavSeparator;