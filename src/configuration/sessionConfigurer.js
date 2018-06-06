import session from 'express-session';
import uuid from 'uuid';
const secret = 'test-cert';
const FileStore = require('session-file-store')(session);

export const SESSION_STORE = new FileStore();
export const configureSession = (app) =>{
    app.use(session({
        genid: ()=>uuid(),
        store:SESSION_STORE,
        secret,
        resave:true,
        rolling: true,
        saveUninitialized: true,
        name: 'MYSESSIONID',
        httpOnly: true,
        secure: false
    }));
    app.use((req,res,next) =>{
        res.locals.sessionFlash= req.session.sessionFlash;
        delete req.session.sessionFlash;
        next();
    });
};