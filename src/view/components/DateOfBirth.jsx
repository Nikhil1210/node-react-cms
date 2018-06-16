import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import moment from 'moment';
import {replace} from 'lodash';
import Select from './Select';


const hasFeedback= (props)=>{
    if(props.disableSubmit && !props.day.valid && !props.month.valid && !props.month.year){
        return false;
    }
    return (props.day.touched && !props.day.active &&
    props.month.touched && !props.month.active &&
    props.year.touched && !props.year.active) ? 
    props.day.valid && props.month.valid && props.year.valid: true;
};
const hasFeedbackClass = (props)=>{
    if(!props.touched && props.active){
        return '';
    }
    return hasFeedback(props)? 'no-error': 'has-error';
}
const generateMonths=(lang)=>{
    moment.locale(lang);
    return moment.monthsShort().map((val,idx)=>({value:idx, text:val}));
};
const regEx = RegExp('\\D', 'g');
const DateOfBirth = props=>(
    <div className={`form-group pt-3 pb-0 ${props.contianerClass}`}>
    <div className="row col-12 w-100" id="dob">
        {props.children}
    </div>
    <div className="row col-12 dateofBirth">
    <span className="sr-only" id="day">day</span>
    <Input
        type="tel"
        maxLength={2}
        className={`col-2 form-control mr-3 ${hasFeedbackClass(props)}`}
        aria-labelledby="dob day"
        id={props.day.id}
        name={props.day.name}
        onChange={e=>props.day.onChange(replace(e.target.value,regEx, ''))}
        onBlur={props.day.onBlur}
        onFocus={props.day.onFocus}
        value={props.day.value}
        autoComplete="off"
    />
    <span className="sr-only" id="month">month</span>
    <Select
        className={`col-4 form-control mr-3 ${hasFeedbackClass(props)}`}
        aria-lebelledby="month"
        options={generateMonths(props.month.lang)}
        id={props.month.id}
        name={props.month.name}
        onChange={e=>props.months.onChange(e.target.value)}
        onBlur={props.month.onBlur}
        onFocus={props.month.onFocus}
        value={props.month.value}
    />
    <span className="sr-only" id="year">year</span>
    <Input
        type="tel"
        maxLength={4}
        className={`col-4 form-control mr-3 ${hasFeedbackClass(props)}`}
        aria-labelledby="year"
        id={props.year.id}
        name={props.year.name}
        onChange={e=>props.year.onChange(replace(e.target.value,regEx, ''))}
        onBlur={props.year.onBlur}
        onFocus={props.year.onFocus}
        value={props.year.value}
        autoComplete="off"
    />
    </div>
    <div className={`footnote err-box ${hasFeedback(props)? 'invalid-feedback': ''}`}>
        {props.error}
    </div>
    </div>
);

DateOfBirth.defaultProps={
    containerClass:"form-input-row",
    error:''
};

DateOfBirth.propTypes= {
    year:PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.funcs.isRequired,
        onFocus: PropTypes.func.isRequired,
        onBlur: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        autoComplete: PropTypes.oneOf(['on', 'off']),
        value: PropTypes.string.isRequired,
        error: PropTypes.string,
        setRef: PropTypes.func
    }).isRequired,
    day: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.funcs.isRequired,
        onFocus: PropTypes.func.isRequired,
        onBlur: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        autoComplete: PropTypes.oneOf(['on', 'off']),
        value: PropTypes.string.isRequired,
        error: PropTypes.string,
        setRef: PropTypes.func
    }).isRequired,
    month: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.funcs.isRequired,
        onFocus: PropTypes.func.isRequired,
        onBlur: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        autoComplete: PropTypes.oneOf(['on', 'off']),
        value: PropTypes.string.isRequired,
        error: PropTypes.string,
        setRef: PropTypes.func,
        lang: PropTypes.string.isRequired
    }).isRequired,
    children: PropTypes.oneOfType([Proptypes.string, Proptypes.element]).isRequired,
    contianerClass: Proptypes.string,
    error: PropTypes.string
};

export default DateOfBirth;