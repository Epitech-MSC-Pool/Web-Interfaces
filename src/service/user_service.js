import {HTTP} from '../http-common';

export default class UserService{

    static getUser(email,username) {
        return HTTP.get('/users/'+username+'&'+email+'', {headers: {
                auth: localStorage.token //the token is a variable which holds the token
            }})
    }
}

