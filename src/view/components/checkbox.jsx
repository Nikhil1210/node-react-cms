import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

const Checkbox= props=>(
    <div className={`col-auto px-0 ${props.contianerClass}`}>
    <div className="form-check form-check-wrap pl-1">
    <label className="form-check-label footnote w-100" htmlFor={props.id}>
    <span className="input-check form-row">
        <Input   
            type="checkbox"
            id={props.id}
            name={props.name}
            className="form-check-input"
            onClick={e=> props.onChange(e.target.checked)}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            setRef={props.setRef}
            value={props.value}
            aria-label={props.arialabel}
        />
        <span className="material-icons"></span>
    </span>
    {props.children}
    </label>
    </div>
    </div>
);

Checkbox.defaultProps={
    containerClass:"form-check-row",
    setRef:()=>false
};

Checkbox.propTypes= {
    containerClass: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    onFocus: propTypes.func.isRequired,
    onBlur: propTypes.func.isRequired,
    value: propTypes.bool.isRequired,
    setRef: PropTypes.func,
    children:PropTypes.oneOfType([
        PropTypes.string, PropTypes.element
    ]).isRequired
};

export default Checkbox;