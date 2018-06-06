import { authenticate, registration, validateRegistration} from '../model/registrationEndpoint';
const httpMethods = Object.freeze({post: 'post', get:'get'});
const endpointMiddleware = Object.freeze([
    {
        path:'/user/authenticate',
        method:httpMethods.post,
        middleware: authenticate
    },
    {
        path:'/user/validate',
        method:httpMethods.post,
        middleware: validateRegistration
    },
    {
        path:'/user/register',
        method:httpMethods.post,
        middleware: registration
    }
]);
const getAllEndpointConfig = ()=> endpointMiddleware;
export default getAllEndpointConfig;