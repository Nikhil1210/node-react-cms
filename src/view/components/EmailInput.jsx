import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import {hasFeedback, hasFeedbackClass} from '../util/utils';      

const EmailInput= props=>(
    <div className={`form-group ${props.containerClass}`}>
        <label htmlFor={props.id} className="footnote w-100">
        {props.children}
        <Input
            type="email"
            id={props.id}
            name={props.name}
            placeholder={prps.placeholder}
            className={`form-control ${hasFeedbackClass(props)}`}
            onChange={e=>props.onChange(e.target.value)}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            autoComplete={props.autoComplete}
            setRef = {props.setRef}
            value={props.value}
            aria-label={props.arialabel}
        />
        </label>
        <span tabIndex={0} className="sr-only">{props.error}</span>
        <div className={`footnote err-box ${hasFeedback(props)? 'invalid-feedback':''}`}>
        {props.error}
        </div>
    </div>
);

EmailInput.defaultProps ={
    autoComplete:'off',
    setRef:()=> false,
    containerClass: 'form-input-row',
    error:'',
    arialabel:''
};

EmailInput.propTypes= {
    navigidateTo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    placeholder:PropTypesstrin.isRequired,
    autoComplete: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    setRef: PropTypes.func,
    children:PropTypes.oneOfType([PropTypes.String, PropTypes.element]).isRequired,
    containerClass: PropTypes.string,
    arialabel: PropTypes.string,
};

export default EmailInput;