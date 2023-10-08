import {keyCloakToken} from './auth-token'
import VueCookies from 'vue-cookies'
import secrets from './config';

import {
    // retrieveAccessRoles,
    // cleanUpLocalStorage,
} from "../helpers/access-jwt";
import axios from "axios";

export const userService = {
    login,
    logout,
}

export async function login(username, password) {

    const user = await keyCloakToken(username, password)
    let user2 = null

    try {
        if (user.data !== []) {
            const decodedData = user.data[0];
            user2 = decodedData
            localStorage.setItem('user', JSON.stringify(decodedData))
        }
    } catch (e) {
        return e
    }

    return user2
}

export async function refreshTokenM() {
    const qs = require('qs');
    var data = qs.stringify({
        'client_id': 'agency-banking',
        'maxBodyLength': Infinity,
        'client_secret': secrets.agency_banking.client_secret,
        'grant_type': 'refresh_token',
        'refresh_token': VueCookies.get('refresh_token')
    })

    var config = {
        method: 'post',
        url: '/keyclock/auth/realms/digital-onboarding/protocol/openid-connect/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data,
    }

    axios(config)
        .then(function (response) {
            VueCookies.set('token', response.data.access_token)
            VueCookies.set('refresh_token', response.data.refresh_token)
        })
        .catch(function (error) {
            console.log(error)
        })
}

export function logout() {
    try {
        localStorage.removeItem('user')
        VueCookies.remove('token')
        VueCookies.remove('refresh_token')
        localStorage.removeItem('agent')
        localStorage.removeItem('token_data')
    } catch (e) {
        console.log(e)
    }
}

// async function handleResponse (response) {
//   return response.text().then(text => {
//     const data = text && JSON.parse(text)
//     if (!response.ok) {
//       if (response.status === 401) {
//         // auto logout if 401 response returned from api
//         logout()
//         location.reload(true)
//       }
//
//       const error = (data && data.message) || response.statusText
//       return Promise.reject(error)
//     }
//
//     return data
//   })
// }
