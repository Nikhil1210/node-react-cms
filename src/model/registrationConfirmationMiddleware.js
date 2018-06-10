import https from 'https';
import fs from 'fs';
import baseMiddleware from './baseMiddleware';
import {apiClient} from './apiClientUtil';

const agent = new https.Agent({
    ca: fs.readFileSunc('')
});
const registrationConfirmationMiddleware = Object.assign({}, baseMiddleware,{
    preProcessHook(req,res){
        apiClient.get('')
        .then((response)=>{
            if(response.success){
                req.session.sessionFlash= response.result.customer;
                res.redirect(301,`/cmm-cp/${req.getLocale()}/login`);
            }else{
                res.redirect(301, `/cmm-cp/${req.getLocale()}/register`);
            }
        }).catch(()=>{
            res.redirect(301, `/cmm-cp/${req.getLocale()}/register`);
        })
    },

    getTransactionalContentMap(){
        return({});
    }
})

export default registrationConfirmationMiddleware;
