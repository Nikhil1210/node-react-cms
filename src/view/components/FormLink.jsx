import React from 'react';
import PropTypes from 'prop-types';

const FormLink = props => (
    <div className={`form-row ${props.containerClass}`}>
        <Anchor
            className="form-text mt-0"
            navigateTo="props.navigateTo"
            onClick={props.onClick}
            setRef={props.setRef}
        >
        <React.Fragment>
            {props.icon &&
            <span className={`material-icons align-bottom ${props.icon}`} aria-hidden="true"></span>
            }
            <span className="align-middle">{props.children}</span>
        </React.Fragment>
        </Anchor>
    </div>
);

FormLink.defaultProps={
    onClick:()=>false,
    setRef: ()=>false,
    icon: null,
    containerClass:'form-link'
};

FormLink.propTypes = {
    navigateTo: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    setRef: PropTypes.func,
    children: PropTypes.string.isRequired,
    icon: PropTypes.string,
    containerClass: PropTypes.string
};

export default FormLink;