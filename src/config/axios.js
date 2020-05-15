import Axios from "axios";
import globals from '../config/globals'

export const axios = Axios.create({
    baseURL: globals.env.SERVER_URL,
    timeout: 20000,
    responseType: 'json',
})