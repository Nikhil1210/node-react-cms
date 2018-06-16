import react from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Prompt = props=>(
    <div className={`modal ${props.show? 'd-block': ''}`}>
        <div className="modal-dialog-centered mx-auto prompt" role="document">
            <div className="modal-content">
                <div className="modal-header p-0">
                {props.title && 
                    <p className="modal-title title m-0">{props.title}</p>
                }
                <button type="button" className="close" onClick={props.closeModal} aria-label="close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body p-0">
                {props.body}
                </div>
                <div className="modal-footer mx-auto d-flex">
                    <Button  
                        onClick={props.closeModal}
                        className={props.cancel.className}
                    >
                    {props.cancel.text}
                    </Button>
                    <Button  
                        onClick={props.accept.onClick}
                        className={props.accept.className}
                    >
                    {props.accept.text}
                    </Button>
                </div>         
            </div>
        </div>
    </div>
);

Prompt.defaultProps= {
    title: null
};

Prompt.propTypes={
    title: PropTypes.string,
    show: PropTypes.bool.isRequired,
    body: PropTypes.oneOfType([PropTypes.string,PropTypes.element]).isRequired,
    closeModal: PropTypes.func.isRequired,
    cancel: PropTypes.objectOf(PropTypes.any).isRequired,
    accept: PropTypes.objectOf(PropTypes.any).isRequired
}

export default Prompt;