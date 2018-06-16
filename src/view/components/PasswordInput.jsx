import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import { hasFeedback, hasFeedbackClass, TAB_KEY_PRESSS_CHAR_CODE } from '../util/utils';

class PasswordInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { visibility: false };
        this.changeVisibility = this.changeVisibility.bind(this);
        this.changeKeypress = this.changeKeypress.bind(this);
    }
    changeVisibility(e) {
        e.preventDefault();
        this.setState({ visibility: !this.state.visibility });
    }

    changeKeypress(e) {
        e.preventDefault();
        if (e.charCode === TAB_KEY_PRESSS_CHAR_CODE) {
            this.setState({ visibility: !this.state.visibility });
        }
    }

    render() {
        return (
            <div className={`col-auto px-0 ${this.props.containerClass}`} ref={node => this.props.setContainer(node)}>
                <label htmlFor={this.props.id} className="footnote w-100">
                    {this.props.children}
                    <span className="form-row position-relative w-100 p1-1">
                        <Input
                            type={this.state.visibility ? 'text' : 'password'}
                            id={this.props.id}
                            name={this.props.name}
                            placeholder={this.props.placeholder}
                            className={`form-control ${hasFeedbackClass(this.props)}`}
                            onChange={e => this.props.onChange(e.target.value)}
                            onBlur={this.props.onBlur}
                            onFocus={this.props.onFocus}
                            autocomplete={this.props.autocomplete}
                            setRef={this.props.setRef}
                            value={this.props.value}
                            aria-label={this.props.arialabel}
                        />
                        <span
                            className={`material-icons ${this.state.visibility ? 'visibility_off' : 'visibility'}`}
                            tabIndex={0}
                            role="button"
                            aria-describedby="show-password"
                            onClick={this.changeVisibility}
                            onKeyPress={this.changeKeypress}
                        />
                        <div className="sr-only" id="show-password">
                            {this.props.showPassText}
                        </div>
                    </span>
                </label>
                <span className="sr-only" tabIndex={0}>{this.props.error}</span>
                <div className={`footnote err-box ${hasFeedback(this.props) ? 'invalid-feedback' : ''}`}>
                    {this.props.error}
                </div>
            </div>
        );
    }
}
PasswordInput.defaultProps={
    autocomplete: 'off',
    sontainerClass:'form-password-row',
    setRef: ()=> false,
    arialabel:'',
    error: '',
    setContainer: ()=>false
};

PasswordInput.PropTypes = {
    containerClass: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    autocomplete: PropTypes.oneOf(['on', 'off']),
    value: PropTypes.string.isRequired,
    showPassText: PropTypes.string.isRequired,
    error: PropTypes.string,
    setRef:PropTypes.func,
    arialabel:PropTypes.string,
    setContainer:PropTypes.func
}

export default PasswordInput;