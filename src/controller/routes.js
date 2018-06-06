import react from 'react';
import {Route} from 'react-router';
import pathToRegexp from 'path-to-regexp';
import {find} from 'lodash';
import Login from '../view/containers/Login';
import Home from '../view/containers/Home';
import Registration from '../view/containers/Registration';

const _routes = Object.freeze([
    {
        coantiner: Login,
        path: '/:lang/login',
        exact: true
    }, {
        coantiner: Home,
        path: '/:lang/home',
        exact: true
    }, {
        coantiner: Registration,
        path: '/:lang/register',
        exact: true
    }
]);
export const getRoutes =() => _routes.map((route,idx) =>(
    <Route
    key={idx}
    exact={route.exact}
    path={route.path}
    component={route.component}
    />
));
