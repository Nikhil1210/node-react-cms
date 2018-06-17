import React from 'react';
import PropTypes from 'prop-types';

const Tile=props=>(
    <div className={props.className} onClick={props.onClick}>
    {props.children}
    <div className="tile-text">
    {props.head &&
        <p className="section-title">{props.head}</p>
    }
    {props.subhead &&
    <p className="footnote"> {props.subhead}</p> 
    }
    </div>
    </div>
);
Tile.defaultProps={
    onClick:()=>false
}

Tile.propTypes={
    className: PropTypes.string,
    head: PropTypes.string,
    subhead:PropTypes.string,
    onClick: PropTypes.func,
    tileText: PropTypes.string,
    tileTextClass: PropTypes.string
}

export default Tile;