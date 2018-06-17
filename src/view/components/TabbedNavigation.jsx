import React from 'react';
import PropTypes from 'prop-types';
import {endsWith} from 'lodash';
import TabNav from './TabNav';

const TabbedNavigation= props=>(
    <div className="tab-nav col-12" role="navigation">
    <div className="tab-head d-flex align-items-center" tabIndex={0} aria-label={props.heading}>
        <h1 className="title-headline my-0" aria-hidden="true" id="tab-nav-head">{props.heading}</h1>
    </div>
    <div className="tab-navigation d-flex">
    <nav className="offset-lg-2 offset-md-1 d-inline-flex col-lg-8 col-md-10">
    {
        props.navs.map(({pathname,text}, idx)=>(<TabNav
        key={`${idx+1}`}
        className={`${endsWith(pathname, props.pathname)? 'active-tab': 'normal-tab'}`}
        navigateTo={pathname}
        text={text}
        />))
    }
    </nav>
    </div>
    </div>
);

TabbedNavigation.PropTypes= {
   heading: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    navs: PropTypes.arrayOf(PropTypes.shape({
        pathname: PropTypes.string,
        text: PropTypes.string
    })).isRequired
};

export default TabbedNavigation;