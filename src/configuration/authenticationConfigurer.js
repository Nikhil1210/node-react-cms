import passport from 'passport';
import fs from 'fs';
import {apiClient} from '../model/apiClientUtil';

const config = {
    passReqToCallback: true,
    usernameField: 'username',
    passwordField: 'password'
};
const LocalStrategy = require(passport-local).Strategy;
passport.use(new LocalStrategy(config, (req,usr,pas, done) => {
    apiClient.post('authtntication URL', req.body).then(
        (res) => {
            if(res.success){
                done(null, res.result);
            }else{
                done(null, res.success, res.result)
            }
        }
    ).catch(({response: {data}}) => done(null, data.success, data.errorDetails));
}));

passport.serializeUser(({customer}, done) =>{
    done(null, id);
})

passport.deserializeUser((id, done) =>{
    done(null, id);
});

const configurePath = (app) =>{
    app.use(passport.initialize());
    app.use(passport.session());
}