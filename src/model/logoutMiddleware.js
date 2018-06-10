import baseMiddleware from './baseMiddleware';

const logoutMiddleware = Object.assign({}, baseMiddleware, {
    preProcessHook(req,res){
        req.session.destry(()=>{
            res.redirect(301, `/cmm-cp/${req.getLocale()}/login`)
        });
    },

    getTransactionalContentMap(){
        return ({

        })
    }
});

export default logoutMiddleware;