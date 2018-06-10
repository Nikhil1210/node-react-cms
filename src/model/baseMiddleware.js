import axios from 'axios';
import url from 'url';
import {reduce, assign} from 'lodash';
import pathToRegexp from 'path-to-regexp';

const flatArray = (keys, args)=> reduce(keys.map((key,idx)=>({[key]:args[idx]})), (old, current)=>assign(old, current), {});
const baseMiddleware = {
    preProcessHook(req,res,next) {
        next();
    },
    preRenderMiddleware(req,res,next){
        next();
    },
    transactionMiddleware(req,res,next){
        const keys = Object.keys(this.getTransactionContentMap(req));
        const clients = Object.values(this.getTransactionContentMap(req));
        axios.all(clients.map(client =>client()))
        .then((args)=>{
            req.dynamicData = flatArray(keys,args);
            next();
        })
        .catch(err=> next(err));
    },
    prepareLayout(req,res,next){
        const oldurl = new URL(req,routeConfig.layout);
        req.pageLayout = new URL(pathToRegexp.compile(oldurl.pathname)({lang: req.getLocale()}), oldurl.origin).toString();
        next();
    },
    getTransactionContentMap(req){}
};
export default baseMiddleware;
