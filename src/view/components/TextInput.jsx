import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import {hasFeedback, hasFeedbackClass} from '../util/utils';      

const TextInput = props=>(
    <div classname={`form-group ${props.containerClass}`} ref={node=>props.setContainer(node)}>
    <label htmlFor={props.id} className="footnote w-100">
    {props.children}
    <Input
        type="text"
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        className={`form-control ${hasFeedbackClass(props)}`}
        onChange={e=> props.onChange(e.target.value)}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        autoComplete={props.autoComplete}
        setRef={props.setRef}
        value={props.value}
        maxLength={props.maxLength}
        aria-label={props.arialabel}
    />
    </label>
    <span tabIndex={0} className="sr-only">{props.error}</span>
    <div className={`footnote err-box ${hasFeedback(props) ? 'invalid-feedback':''}`}> 
    {props.error}
    </div>
    </div>
)
TextInput.defaultProps={
    autoComplete:'off',
    setRef:()=>false,
    setContainer:()=>false,
    containerClass: 'form-input-row',
    error:'',
    maxLength:100,
    arialabel:''
}

TextInput.propTypes={
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChanhe: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    autoComplete: PropTypes.oneOf(['on','off']),
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    setRef: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    containerClass: PropTypes.string,
    maxLength: PropTypes.number,
    setContainer: PropTypes.func,
    arialabel:PropTypes.string
}

export default TextInput;