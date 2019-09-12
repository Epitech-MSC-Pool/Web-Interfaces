import {HTTP} from '../http-common';

export default class AuthService{
    static getUserToken(email, password) {
        return HTTP.post('/auth/login', {email: email, password: password})
    }
    static registerUser(email, password,username) {
        return HTTP.post('/users', {email: email, password: password,role:"USER",username:username})
    }
}

