import compression  from 'compression';
import bodyParser  from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';

const configureMiddleware = (app) => {
    app.use(compression({threshold: 512}));
    app.use((req, res, next) =>{
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    });
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true, type: 'application/x-www-form-urlencoded'}));
    app.use(helmet());
    app.use(morgan('dev'));
}
export default configureMiddleware;