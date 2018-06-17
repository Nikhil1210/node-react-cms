import React from 'react';
import {Tooltip as BootstrapTooltip} from 'reactstrap';
import PropTypes from 'prop-types';

const DESKTOP_BREAKPOINT=1023;
export default class Tooltip extends React.PureComponent{
    constructor(props){
        super(props);
        this.updateDimensions= this.updateDimensions.bind(this);
    }
    componentWillMount() {
      this.updateDimensions();
    }
    componentDidMount() {
        if(typeof window !== 'undefined'){
            window.addEventListener('resize', this.updateDimensions);
        }
    }
    componentWillUnmount() {
        if(typeof window !== 'undefined'){
            window.removeEventListener('resize', this.updateDimensions);
        }
    }
    updateDimensions(){
        this.setState({width:typeof window !=='undefined'? window.innerWidth || document.innerWidth: 1024});
    }

    render(){
        const tipPlacement=this.state.width> DESKTOP_BREAKPOINT? 'right': 'top';
        return (
            <BootstrapTooltip
            placement={tipPlacement}
            isOpen={this.props.isOpen}
            autohide={this.props.autohide}
            target={this.props.target}
            classname={`tooltip-custom ${this.props.className}`}
            >
            {this.props.children}
            </BootstrapTooltip>
        );
    }
}

Tooltip.defaultProps={
    autohide:false,
    classname: ''
}

Tooltip.PropTypes={
    autohide: PropTypes.bool,
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([propTypes.any]).isRequired,
    target: PropTypes.oneOfYype([propTypes.any]).isRequired,
    classname: PropTypes.string
}