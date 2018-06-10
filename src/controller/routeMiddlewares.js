import pathToRegexp from 'path-to-regexp';
import { find, upperCase} from 'lodash';
import loginMiddleware from '../model/loginMiddleware';
import homeMiddlware from '../model/homeMiddleware';
import registrationMiddleware from '../model/registrationMiddleware';

const httpMethods = Object.freeze({post: 'post', get: 'get'});
const _routeMiddlewares = Object.freeze([
    {
        path: '/:lang(en|fr)-ca/login',
        mehotd: httpMethods.get,
        dataMiddleware: loginMiddleware,
        layout: 'CMS Login URL',
        view: 'index'
    },{
        path: '/:lang(en|fr)-ca/login',
        mehotd: httpMethods.post,
        dataMiddleware: loginMiddleware,
        layout: 'CMS Login URL',
        view: 'index'
    },{
        path: '/:lang(en|fr)-ca/logout',
        mehotd: httpMethods.get,
        dataMiddleware: logoutMiddleware,
        layout: 'CMS Login URL',
        view: 'index'
    },
    {
        path: '/:lang(en|fr)-ca/home',
        mehotd: httpMethods.get,
        dataMiddleware: homeMiddlware,
        layout: 'CMS home URL',
        view: 'index'
    },{
        path: '/:lang(en|fr)-ca/register/:hash',
        mehotd: httpMethods.get,
        dataMiddleware: registrationConfirmationMiddleware,
        layout: 'CMS login URL',
        view: 'index'
    },{
        path: '/:lang(en|fr)-ca/register',
        mehotd: httpMethods.get,
        dataMiddleware: registrationMiddleware,
        layout: 'CMS login URL',
        view: 'index'
    }
]);
export const getAllRouteConfig = ()=> _routeMiddlewares;
export const getConfig = (url, method)v=> find(_routeMiddlewares, ele => pathToRegexp(ele.path).exec(url) && upperCase(ele.method) === upperCase(method));