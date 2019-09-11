import {HTTP} from '../http-common';

export default class AuthService{
    static getUserToken(email, password) {
        return HTTP.post('/auth/login', {username: email, password: password})
    };
};

