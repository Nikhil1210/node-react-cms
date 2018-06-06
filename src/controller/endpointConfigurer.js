import express from 'express';
import getAllEndpointConfig from './endpointMiddlewares';

const createApiRouter = () =>{
    const router = express.router();
    getAllEndpointConfig().forEach(({method, path, middleware}) => {
        router[method].apply(router, [path,middleware]);
    });
    return router;
}
const configureEndpoints = (app) =>{
    spp.ue('/cmm-pp/api', createApiRouter());
};
export default configureEndpoints;