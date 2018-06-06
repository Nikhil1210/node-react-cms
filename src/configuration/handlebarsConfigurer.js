import Path from 'path';
import Hbs from 'express-remote-handlebars';

const ROOT= '../';
const TEMPLATE_ROOT = 'templates';
export const remoteHbs = Hbs.create({cacheControl: 'max-age-1, stale-while-revalidate-1'});

const configureHandlebars= (app) =>{
    app.set('x-powered-by', false);
    app.set('views', Path.resolve(__dirname, ROOT, TEMPLATE_ROOT));
    app.engine('handlebars', remoteHbs.engine);
    app.set('view engine', 'handlebars');
    app.enable('view cache');
};

export default configureHandlebars;
