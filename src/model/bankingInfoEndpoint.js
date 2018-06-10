import https from 'https';
import fd from 'fs';
import { apiClient } from './apiClientUtil';
import { token, validationRequest } from './bankingInfoMiddlewware';

const agent = new https.Agent({
    ca: fs.readFileSunc('')
});
export const deleteBank = (request, response) => {
    if (request.isAuthenticated()) {
        const {
            transitNumber, institutionNumber, accountNumber, confirmAccountNumber
        } = request.body;
        const { user: { planNumber, subscriberNumber } } = request.session.passport;
        const body = {
            planNumber, subscriberNumber,
            bankingInformation: {
                transitNumber,
                accountNumber,
                institutionNumber,
                confirmAccountNumber
            }
        };
        apiClient.post('')
            .then((res) => {
                response.json(res)
            })
            .catch((err) => {
                response.json(err);
            });
    } else {
        response.status(401).end();
    }
};
export const patchBank = (request, response) => {
    if (request.isAuthenticated()) {
        const {
            transitNumber, institutionNumber, accountNumber, confirmAccountNumber
        } = request.body;
        const { user: { planNumber, subscriberNumber } } = request.session.passport;
        const body = {
            planNumber, subscriberNumber,
            bankingInformation: {
                transitNumber,
                accountNumber,
                institutionNumber,
                confirmAccountNumber
            }
        };
        apiClient.post('')
            .then((res) => {
                response.json(res)
            })
            .catch((err) => {
                response.json(err);
            });
    } else {
        response.status(401).end();
    }
};

export const validateBank = (request, response) => {
    if (request.isAuthenticated()) {
        token()
            .then((res) => {
                apiClient.post('',
                    validationRequest(request.body),
                    { headers: { 'Content-type': 'application/json', Authorization: `Bearer: ${res.token}` } },
                ).then((valRes) => {
                    response.json(valRes);
                }).catch((err) => {
                    response.json(err);
                })
            })
    } else {
        resposne.status(401).end();
    }
}
