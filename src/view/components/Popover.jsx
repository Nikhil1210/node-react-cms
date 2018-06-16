import React from 'react';
import PropTypes from 'prop-types';
import { TAB_KEY_PRESSS_CHAR_CODE } from '../util/utils';
import {Popover as BootstrapPopover, PopoverBody, PopoverHeader} from 'reactstrap';

const DESKTOP_BREAKPOINT = 1023;

export default class Popover extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.updateDimensions = this.updateDimensions.bind(this);
        this.handleDesktop = this.handleDesktop.bind(this);
        this.handleDesktopClose= this.handleDesktopClose.bind(this);
        this.handleMobile= this.handleMobile.bind(this);
        this.handleKeyPress= this.handleKeyPress.bind(this);
    }
    
    componentWillMount() {
        this.updateDimensions();
        this.children = React.children.map(this.props.children, child => React.cloneElement(child, {
            onClick: this.handleMobile,
            onMouseEnter: this.handleDesktop,
            onMouseLeave: this.handleDesktopClose,
            onFocus: this.handleDesktop,
            onBlur: this.handleDesktopClose
        }));
    }
    componentDidMount() {
        if(typeof window !==  'undefined')
            window.addEventListener('resize', this.updateDimensions);
    }
    componentWillUnmount() {
        if(typeof window !==  'undefined')
            window.removeEventListener('resize', this.updateDimensions);
    }
    updateDimensions(){
        this.setState({width: typeof window !=='undefined' ? window.innerWidth || document.innerWidth: 1024});
    }
    handleDesktop(e){
        e.preventDefault();
        if(this.state.width> DESKTOP_BREAKPOINT){
            this.setState({isOpen: true, target: e.target});
        }
    }
    handleDesktopClose(e){
        e.preventDefault();
        if(this.state.width> DESKTOP_BREAKPOINT){
            this.setState({isOpen: false, target: e.target});            
        }
    }
    handleKeyPress(e){
        e.preventDefault();
        if(e.charCode === TAB_KEY_PRESSS_CHAR_CODE){
            this.setState({isOpen: !this.state.isOpen, target: e.target});            
        }
    }
    handleMobile(e){
        e.preventDefault();
        if(this.state.width <= DESKTOP_BREAKPOINT){
            this.setState({isOpen: !this.state.isOpen, target: e.target});            
        }
    }
    render() {
       const popPlacement = this.state.width> DESKTOP_BREAKPOINT ? 'right': 'top';
       const target = this.props.target && this.state.width > DESKTOP_BREAKPOINT ? 
        this.props.target : this.state.target;
        const {offset} = this.state.width> DESKTOP_BREAKPOINT ?  this.props:{};
        return (
            <React.Fragment>
                {this.children}
                {typeof window !== 'undefined' && this.state.target &&
            <BootstrapPopover
                placement={popPlacement}
                isOpen={this.state.isOpen}
                target={target}
                className={this.props.classsName}
                modifiers={{flip: {enabled: false}, offset}}
            >
            {
                this.props.popoverTitle &&
                <PopoverHeader> {this.props.popoverTitle}</PopoverHeader>
            }
            <PopoverBody>{this.props.popoverContent}</PopoverBody>
            </BootstrapPopover>
            }
            </React.Fragment>
        );
    }
}
Popover.defaultProps={
    popoverTitle:null,
    target:null,
    classname: ''
};

Popover.PropTypes = {
    popoverTitle: PropTypes.string,
    popoverContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    children: PropTypes.oneOfType([PropTypes.arrayOf([PropTypes.element]), PropTypes.element]).isRequired,
    target:PropTypes.oneOfType([PropTypes.any]),
    className:PropTypes.string
}