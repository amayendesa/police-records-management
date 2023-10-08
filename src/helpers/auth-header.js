import { getOAuth2Token } from "../services/oauth2-service";
import { keycloakUserAuthenticationAuth } from "../services/auth-service"//, keycloakCLIAdminAuthentication
import VueCookies from 'vue-cookies'

export async function httpRequestConfig() {

  const { data } = await getOAuth2Token();

  const isToken = VueCookies.isKey('_token')

  // console.log(data.access_token);

  if (isToken) {
    //const token = VueCookies.get('_token') 
    return { Authorization: `Bearer ${data.access_token}`, 'Access-Control-Allow-Origin': '*' };
  } else {
    return {};
  }
}

export async function httpRequestConfigWithKeycloakToken() {

  const { data } = await keycloakUserAuthenticationAuth(`zss`, `zss`);

  // console.log(`@@@ Keycloak token request: `, data.access_token);

  if (data.access_token) {
    return { Authorization: `Bearer ${data.access_token}`, 'Access-Control-Allow-Origin': '*' };
  } else {
    return { message: `No token received!` };
  }
}

// export async function httpRequestConfigWithKeycloakCLIAdminToken() {
//
//   const { data } = await keycloakCLIAdminAuthentication(`admin`, `admin`);
//
//   console.log(`@@@ Keycloak token request: `, data);
//
//   if (data.access_token) {
//     console.log('Bearer ',data.access_token)
//     return { Authorization: `Bearer ${data.access_token}`, 'Access-Control-Allow-Origin': '*' };
//   } else {
//     return { message: `No token received!` };
//   }
// }