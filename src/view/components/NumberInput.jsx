import React from 'react';
import PropTypes from 'prop-types';
import {replace} from 'lodash';
import Input from './Input';
import Tooltip from './Tooltip';
import {hasFeedback, hasFeedbackClass} from '../util/utils';

const regEx = RegExp('\\D', 'g');
const NumberInput = props=>(
    <div className={`form-group ${props.containerClass}`}>
        <label htmlFor={props.id} className="footnote w-100">
        {props.children}
        <Input   
            type="tel"
            id={props.id}
            name={props.name}
            placeholder={props.placeholder}
            className={`form-control ${hasFeedbackClass(props)}`}
            onChange={e=> props.onChange(replace(e.target.value, regEx,''))}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            autocomplete={props.autocomplete}
            setRef={props.setRef}
            value={props.value}
            maxLength={props.maxLength}
            aria-label={props.arialabel}
        />
        {props.tooltip &&
            <Tooltip
                isOpen={props.active}
                autohide={false}
                target={props.id}
            >
            {props.Tooltip}
            </Tooltip>
        }
        </label>
        <span tabIndex={0} className="sr-only">{props.error}</span>
        <div className={`footnote err-box ${hasFeedback(props)? 'invalid-feeback': ''}`}>
        {props.error}
        </div>
    </div>
);

NumberInput.defaultProps ={
    autocomplete: 'off',
    setRef: ()=>false,
    containerClass:'form-input-row',
    error:'',
    maxLength:'',
    tooltip:'',
    arialabel:''
};

NumberInput.propTypes ={
    id: PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    autocomplete: PropTypes.oneOf(['on','off']),
    value: PropTypes.string.isRequired,
    error: PropTypes.func,
    setRef: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    containerClass: PropTypes.string,
    maxLength: PropTypes.number,
    tooltip: PropTypes.string,
    active: PropTypes.bool.isRequired,
    arialabel: PropTypes.string,
};

export default NumberInput;