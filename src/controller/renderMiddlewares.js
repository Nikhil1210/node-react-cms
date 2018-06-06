import react from 'react';
import {omit} from 'lodash';
import {renderToStaticMarkup} from 'react-dom/server';
import {getConfig} from '../controller/routeMiddlewares';
import Router from '../controller/Router';
import {remoteHbs} from '../configuration/handlebarsConfigurer';

const renderReact = (url, props)=>renderToStaticMarkup(<Router location={url} context={props}/>);
const json = context =>JSON.stringify(context);

export const reactRenderer =(req, res, next) =>{
    const {dynamicData, url} = req;
    req.reactContent = renderReact(url, { ...dynamicData, flash:res.locals.sessionFlash});
    next();
};
export const handlebarsRenderer = (req,res) =>{
    const { routeConfig, reactContent, dynamicData ={}, pageLayout, method} = req;
    if(method !=='POST'){
        const layoutRequest = {url: pageLayout, headers:{Authorization: `Basic ${Buffer.from('user:password').toString('base64')}`}};
        remoteHbs.getLayout(layoutRequest, {cache:false}, (err, layout)=>{
            res.render(routeConfig.view, {
                reactContent,
                context:dynamicData,
                layout,
                helpers: {json}
            });
        });
    }
};
export const renderConfigMiddleware = (req,res,next) =>{
    req.routeConfig = omit(getConfig(req.url, req.method), 'dataMiddleware');
    next();
};