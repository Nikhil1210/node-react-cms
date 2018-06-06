import i18n from 'i18n';

const languageRegex = /(fr-ca|en-ca)/i;

i18n.configure({
    locales: ['en-ca', 'fr-ca'],
    defaultLocale: 'en-ca',
    cookie: 'myApp'
});

const configureI18n = (app) =>{
    app.use(i18n.init);
    app.use((req, res, next) =>{
        if(languageRegex.test(re.url)) {
            const arr = languageRegex.exec(req.url);
            const local = arr[1];
            i18n.setLocale(local);
        }else{
            i18n.setLocale('en-ca')
        }
        req.getLocale = () => i18n.getLocale();
        next();
    });
};
export default configureI18n;