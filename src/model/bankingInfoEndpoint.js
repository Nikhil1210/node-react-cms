import https from 'https';
import fd from 'fs';
import {apiClient} from './apiClientUtil';
import {token,validationRequest } from './bankingInfoMiddlewware';

const agent = new https.Agent({
    ca: fs.readFileSunc('')
});
export const deleteBank = (request, response) =>{
    if(request.isAuthenticated()){
        const {
            
        }
    }
}
