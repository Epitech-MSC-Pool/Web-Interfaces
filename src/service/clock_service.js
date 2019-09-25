import {HTTP} from '../http-common';

export default class ClockService{

    static getClock(userid) {
        return HTTP.get('/clocks/'+ userid + '', {headers: {
                auth: localStorage.token //the token is a variable which holds the token
            }})
    }

    static postClock(userid) {
        return HTTP.post('/clocks/'+ userid + '', {headers: {
                auth: localStorage.token //the token is a variable which holds the token
            }})
    }
}

