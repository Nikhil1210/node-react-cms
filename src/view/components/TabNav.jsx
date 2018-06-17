import React from 'react';
import PropTypes from 'prop-types';
import Anchor from './Anchor';

const TabNav = props => (
    <div className={`${props.className} col d-flex align-items-center justify-content-center`}>
        <Anchor
            navigateTo={props.navigateTo}
            className="emphasis-2"
        > {props.text}
        </Anchor>
    </div>
);

TabNav.PropTypes = {
    navigateTo: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

export default TabNav;