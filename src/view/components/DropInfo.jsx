import React from 'react';
import PropTypes from 'prop-types';

const DropInfo = props => (
    <div className="d-flex flex-column drop-info col-md-10 col-12 px-0">
        <div className="arrow mx-auto">
            <div className="drop-content bg-white">
                <button type="button" className="ml-auto close" onClick={props.closeDrop} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                {props.title &&
                    <p className="mb-0 mt-3 drop-title">{props.title}</p>
                }
                <div className="drop-body p-0">
                    {props.children}
                </div>
            </div>
        </div>
    </div>
);

DropInfo.defaultProps={
    title:null,
    className: ''
};

DropInfo.PropTypes = {
    title: PropTypes.string,
    children:PropTypes.oneOfType([
        PropTypes.arrayOf([PropTypes.element]), PropTypes.element
    ]).isRequired,
    className: PropTypes.string
};

export default DropInfo;