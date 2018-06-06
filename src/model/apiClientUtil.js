import axios from 'axios';
import {setupCache} from 'axios-cache-adapter';
import crypto from 'crypto';
const MAX_LIMIT= 15;
const MAX_AGE = 60*60*1000;
const DEFAULT_SECRET = 'mySecret';

const cache = setupCache({
    maxAge: MAX_AGE,
    limit: MAX_LIMIT,
    debug:true,
    key: req => crypto.createHmac('sha256', DEFAULT_SECRET).update(req.url).digest('hex'),
    exclude: {
        query: false
    }
});

const cacheableClient = axios.create({
    adapter: cache.adapter,
    headers: {'Cache-Control': 'no-cache'}
});
cacheableClient.interceptors.response.use(
    ({data={}}) => data,
    error => Promise.reject(error)
);

const apiClient = axios.create({
    timeout: 100000000,
    headers: {'Cache-Control': 'no-cache'}
});
apiClient.interceptors.response.use(
    ({data={}}) => data,
    error => Promise.reject(error)
);

export {cacheableClient, apiClient};