import react from 'react';
import PropTypes from 'prop-types';
import {omit} from 'lodash';

const Anchor= props=>(
    <a 
    {...omit(props, ['setRef', 'navigateTo'])}
    href={props.navigateTo}
    onClick={e=> props.onClick(e,props.navigateTo)}
    ref={node=> props.setRef(node)}
    >
    {props.children}
    </a>
);

Anchor.defaultProps ={
    onClick:()=>false,
    setRef:()=> false
};

Anchor.propTypes= {
    navigateTo: PropTypes.string.isRequired,
    onlick:PropTypes.func,
    setRef: PropTypes.func,
    children:PropTypes.oneOfType([PropTypes.String, PropTypes.element]).isRequired
};

export default Anchor;