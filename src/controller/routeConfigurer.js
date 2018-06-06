import express from 'express';
import {getAllRouteConfig} from './routeConfigurer';
import {reactRenderer, handlebarsRenderer, renderConfigMiddleware} from './renderMiddlewares';

const createPageRouter = ()=>{
    const router = express.Router();
    getAllRouteConfig().forEach(({method,path,dataMiddleware}) => {
        router[method]
        .apply(router, [
            path,
            [
                dataMiddleware.preProcessHook.bind(dataMiddleware),
                renderConfigMiddleware,
                dataMiddleware.transactionMiddleware.bind(dataMiddleware),
                dataMiddleware.preRendererMiddleware.bind(dataMiddleware),
                reactRenderer,
                dataMiddleware.prepareLayout.bind(dataMiddleware),
                handlebarsRenderer
            ]
        ]);
    });
    return router;
};
const configureRoutes = (app) =>{
    app.use('cmm-cpp', createPageRouter());
};
export default configureRoutes;