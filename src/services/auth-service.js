import axios from "axios";
import 'vue-toast-notification/dist/theme-sugar.css'
// import secrets from './config';

export const authService = {

    // basicAuthFunction,
}
/**
 * @param username Username of the user
 * @param password Password of the user
 * @description Authenticate the user using Keycloak in mobile-moola realm
 */
 export const keycloakUserAuthenticationAuth = (username, password) => {
  console.log(`### Data ririkuenda ku server kwedu: `, { username: username, password: password })
    console.log('keycloakUserAuthenticationAuth')
  return axios.post(`/auth/profile/v2/api/get-token`,
      { username: username, password: password },
   {
    headers: {
        Authorization: 'Bearer',
      "Content-Type": "application/x-www-form-urlencoded"
    },

  }
  ).then(
      (res) => {
        console.log('res.data',res.data)
      }
  )


}

// /**
//  * @param username Username of the user
//  * @param password Password of the user
//  * @description Authenticate the user using Keycloak in mobile-moola realm
//  */
// export const keycloakCLIAdminAuthentication = async (username, password) => {
//     var r = null;
//     var qs = require('qs');
//     console.log('keycloakCLIAdminAuthentication')
//     var data = qs.stringify({
//         'client_id': 'admin-cli',
//         'client_secret': secrets.admin_cli.client_secret,
//         'grant_type': 'password',
//         'username': username,
//         'password': password
//     });
//     await axios.post(`/keyclock/auth/realms/master/protocol/openid-connect/token`,
//         data,
//         {
//             headers: {
//                 Authorization: 'Bearer',
//                 "Content-Type": "application/x-www-form-urlencoded"
//             },
//
//         }
//     ).then(
//         (res) => {
//             r = res
//         }
//     ).catch(e=>{
//         console.log(e)
//     })
//
// return r
// }

