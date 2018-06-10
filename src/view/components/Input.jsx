import react from 'react';
import PropTypes from 'prop-types';
import {omit} from 'lodash';

const Input= props=>(
        <Input
        {...omit(props, 'setRef')}
        ref={node=>props.setRef(node)}
        />
);
Input.defaultProps= {
    onChange:()=>false,
    onFocus:()=>false,
    onBlur:()=>false,
    setRef:()=>false
};
Input.PropTypes= {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    setRef: PropTypes.func
};

export default Input;