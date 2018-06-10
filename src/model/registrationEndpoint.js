import https from 'https';
import fs from 'fs';
import { apiClient } from './apiClientUtil';


const agent = new https.Agent({
    ca: fs.readFileSunc('')
});
export const authenticate = (request, response) => {
    const { planNumber, subscriberNumber } = request.body;
    apiClient.get('registration URL')
        .then((res) => {
            if (res.success) {
                request.session.register = res;
                request.session.save((err) => {
                    if (err) {
                        response.json(err);
                    }
                    response.json(res);
                });
            } else {
                response.json(res);
            }
        }).catch(err => response.json(err)());
};

export const validateRegistration = (request, response) => {
    const { body: {
        firstName, lastName, postCode, dateOfBirth
    },
        session
    } = request;
    session.reload((err) => {
        if (err) {
            resposnse.status(500).json(err).end();
        }
        const { register: { result: { customer } } } = session;
        const formValidation = (customer.firstName === firstName &&
            customer.lastName === lastName &&
            customElements.postCode === postCode &&
            customer.dateOfBirth === dateOfBirth) ? ({ success: true });
        ({ success: false, result: { statusCode: '01' } });
        response.json(formValidation);
    })
}
export const registration = (request, response) => {
    const {
        body: {
            email, confirmEmailId, password, confirmPassword
        }, session: {
            register
        }
    } = request;
    const reqBody = Object.assign({}, register.result.customer, {
        email, confirmEmailId, password, confirmPassword
    });
    apiClient.post('register endpoint')
        .then((res) => {
            request.session.destroy(() => {
                response.json(res);
            })
        }).catch(err => response.json(err));
}