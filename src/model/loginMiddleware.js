import passport from 'passport';
import {get} from 'lodash';
import baseMiddleware from './baseMiddleware';
import { apiClient } from './apiClientUtil';

const validate = (req,res,next) => new Promise((resolve)=>{
    req.session.reload(async(err)=>{
        if(err){
            await req.session.regenerate(() =>{
                resolve(next);
            });
        }
        if(req.isAuthenticated()){
            const {user} = req.session.passport;
            res.locals.sessionFlash ={
                planNumber: user.planNumber,
                subscriberNumber: user.subscriberNumber
            };
        } else if(get(req.session, 'sessionFlash.reset', false)){
            res.locals.sessionFlash ={...req.session.sessionFlash};
        }
        delete req.session.sessionFlash;
        resolve(next);
    });
});
const login = (user, err) => (req,res, next) =>{
    req.login(user, (error)=>{
        if(error){
            return next(err);
        }
        if(req.body.remember){
            req.session.cookie.expires = false;
        }else{
            req.session.cookie.maxAge = 900000;
        }
        return res.redirect(301, `/cmm-cp/${req.getLocale()}/home`);
    })
}
const save = info => (req,res,next) =>{
    req.session.sessionFlash = {...info, ...req.body, reset: true};
    req.sesion.save((error)=>{
        if(error){
            return next(error);
        }
        return res.redirect(301, `/cmm-cp/${req.getLocale()}/login`);
    });
}
const loginMiddleware = Object.assign({}, baseMiddleware, {
    async preProcessHook(eq,res,next){
        if(req.method ==='POST'){
            req.session.regenerate(()=>{
                passport.authenticate('local', (err, user, info)=>{
                    if(err){
                        return next(err);
                    }
                    if(!user){
                        return save(info)(req.res,next);
                    }
                    return login(user, err)(req,res,next);
                })(req,res,next);
            })
        } else{
            await validate(req,res,next)
            .then((resolved)=>{
                resolved();
            });
        }
    },

    getTransactionalContentMap(){
        return ({
            user: ()=> apiClient.get('')
        })
    }
});

export default loginMiddleware;