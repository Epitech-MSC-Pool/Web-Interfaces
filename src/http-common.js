import axios from 'axios';

export const HTTP = axios.create({
    baseURL: `http://154.49.211.66:4000/api`,
})