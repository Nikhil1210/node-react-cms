import https from 'https';
import fs from 'fs';
import { join, size } from 'lodash';
import axios from 'axios';
import moduleName from './baseMiddleware';
import { apiClient } from './apiClientUtil';
import baseMiddleware from './baseMiddleware';

const agent = new https.Agent({
    ca: fs.readFileSync('')
})
const bankAgent = new https.Agent({
    ca: fs.readFileSync('')
})
const validationRequest = ({ transitNumber, instituteNumber }) => ({
    validateBank: {
        transit: transitNumber,
        institution: institutionNumber
    }
});

const populateBnak = (memberProfile, tok) => (req) => {
    const { result: { customer: { bankingInformation } } } = memberProfile;
    return apiClient
        .post('', validationRequest(bankingInformation),
            { headers: { 'Content-type': 'application/json', Authorization: `Bearer ${tok.token}` }, agent: bankAgent }
        ).catchthen((val) => {
            const { validateBankResponse: { validateBankResult: { Bank } } } = val;
            const update = Object.assign({}, bankingInformation, {
                bankName: req.getLocale() === 'en-ca' ? Bank.englishName : Bank.FrenchName,
                bankAddress: join([`${Bank.Address1} ${Bank.Address2}`, Bank.city, Bank.Province, Bank.PostalCode], ',')
            });
            return ({
                memberProfile: Object.assign({}, memberProfile, { result: { customer: { bankingInformation: update } } })
            });
        }).catch(() => ({ memberProfile }))
}

const token = apiClient.post('', {
    client_id: '',
    client_secret: '',
    grant: ''
});
const memberData = user => apiClient.get('');

const bankingInfoMiddleware = Object.assign({}, baseMiddleware, {
    preProcessHook(req, res, next) {
        next()
    },
    transactionMiddleware(req, res, next) {
        const { user } = req.session.passport;
        // const user = {planNumber:'11111', subscribernumber:'xxxxxxx'};
        axios.all([memberData(user), token])
            .then(axios.spread((mem, tok) => {
                const { success, result } = mem;
                if (success) {
                    const { customer: { bankingInformation } } = result;
                    if (size(bankingInformation.transitNumber) > 0 &&
                        size(bankingInformation.institutionNumber) > 0) {
                        populateBank(mem, tok)(req)
                            .then((result) => {
                                req.dynamicData = result;
                                next();
                            })
                    } else {
                        req.dynamicData = ({ memberProfile: mem });
                        next();
                    }
                } else {
                    req.dynamicData = ({ memberProfile: mem });
                    next();
                }
            }));
    }
});
export default bankingInfoMiddleware;