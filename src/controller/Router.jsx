import react from 'react';
import { Switch, StaticRouter} from 'react-router';
import PropTypes from 'prop-types';
import { getRoutes} from './routes';

const Router = props =>(
    <StaticRouter location={props.location} context={props.context} basename="cmm-cpp">
    <Switch>
        {getRoutes()}
        </Switch>
        </StaticRouter>
);

Router.PropTypes = {
    loaction: PropTypes.string,
    context: PropTypes.object
};
export default Router;