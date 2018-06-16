import React from 'react';
import PropTypes from 'prop-types';
import {omit} from 'lodash';

const Select= props=>(
        <Select
        {...omit(props, ['options','setRef'])}
        ref={node=>props.setRef(node)}
        >
        {
            props.options.map(op=>(<option value={op.value} key={op.value}>{op.text}</option>))
        }
        </Select>
);

Select.defaultProps= {
    onChange:()=>false,
    onFocus:()=>false,
    onBlur:()=>false,
    setRef:()=>false
};
Select.PropTypes= {
    opions: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.any,
        text: PropTypes.any
    })).isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    setRef: PropTypes.func
};

export default Select;