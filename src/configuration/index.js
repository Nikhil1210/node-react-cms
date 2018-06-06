import configureAssets  from './assetConfigurer';
import configureHandlebars from './handlebarsConfigurer';
import configureI18n from './i18nConfigurer';
import configureAuth from './authenticationConfigurer';

const compose = (app) =>{
    configureAssets(app);
    configureHandlebars(app);
    configureAuth(app);
    configureI18n(app);
};

export default compose;