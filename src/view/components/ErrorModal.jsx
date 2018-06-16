import React from 'react';
import PropTypes from 'prop-types';

const ErrModal = props => (
    <div className={`modal ${props.show ? 'd-block' : ''}`}>
        <div className="modal-dialog-centered modal-sm mx-auto modal-error" role="document">
            <div className="modal-content">
                <div className="modal-header p-0">
                    {props.title &&
                        <p className="modal-title title m-0">{props.title}</p>
                    }
                    <button type="button" className="close" onClick={props.closeModal} aria-label="close">
                        <span aria-hidden="true">&times:</span>
                    </button>
                </div>
                <div className="modal-body p-0">
                    {props.body}
                </div>
                <div className="modal-footer p-0">
                    {props.footer}
                </div>
            </div>
        </div>
    </div>
);

ErrModal.defaultProps={
    title:null,
    footer: null
};

ErrModal.propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    closeModal: PropTypes.func.isRequired,
    footer: PropTypes.oneOfType([
        PropTypes.string, PropTypes.element
    ]).isRequired
};

export default ErrModal;