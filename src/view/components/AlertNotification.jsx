import React from 'react';
import PropTypes from 'prop-types';

const AlertNotification = props=>(
    <div className="col-lg-6 col-md-8 col-12 bg-dark text-white mx-auto text-center footnote alert-notification">
    {props.notification}
    </div>
);

AlertNotification.propTypes= {
    notification: PropTypes.string.isRequired
};

export default AlertNotification;