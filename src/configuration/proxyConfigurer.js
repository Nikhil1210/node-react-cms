import httpProxy from 'http-proxy';

const apiProxy = httpProxy.createProxyServer();
const cms_proxy = {
    paths:['/etc*', '/libs*', '/content/dam/*'],
    proxyconf: {
        target:'cms URL',
        auth: 'user:pass',
        secure: false,
        changeOrigin:true
    }
};
const PROXY_LIST = [cms_proxy];
const configureProxy = app=> PROXY_LIST.forEach(({paths, proxyconf}) => app.all(paths, (req,res) =>
apiProxy.web(req,res,proxyconf)));
export default configureProxy;