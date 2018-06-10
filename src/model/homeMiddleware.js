import https from 'https';
import fs from 'fs';
import {URL} from 'url';
import baseMiddleware from './baseMiddleware';
import {apiClient} from './apiClientUtil';
import pathToRegexp from 'path-to-regexp';

const agent = new https.Agent({
    ca: fs.readFileSunc('')
});
const homeMiddleware = Object.assign({}, baseMiddleware, {
    preProcessHook(req,res, next){
        if(req.isAuthenticated()){
            next();
        }else{
            res.redirect(`/cmm-cp/${req.getLocale()}/login`);
        }
    },
    getTransactionalContentMap(req){
        const lang= req.getLocale() === 'en-ca'? 'E':'F';
        const {user} = req.session.passport;
        return ({
            claimsData: ()=> apiClient.get(''),
            serverDate: ()=>Promise.resolve(new Date().getTime()),
            customer: ()=>Promise.resolve({name: `${user.firstname} ${user.lastName}`})
        })
    },
    prepareLayout(req,res,next){
        const oldurl = new URL(req.routeConfig.layout);
        const {user} =  req.session.passport;
        req.pageLayout = new URL(
            `${pathToRegexp.compile(oldurl.pathname)({lang: req.getLocale()})}${user.ddINdicator ==='Y'? '?homedd':''}`,
            oldurl.origin
        ).toString();
        next();
    }
});
export default homeMiddleware;