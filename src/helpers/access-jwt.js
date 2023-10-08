
import jwt_decode from "jwt-decode";
import VueCookies from 'vue-cookies'
import Vue from 'vue'

/**
 * @param token Value of the jwt token to be decoded
*/
export const extractInfo = (token) => {
    const decodedToken = jwt_decode(token)
    return decodedToken;
}

/**
 * @param token Value of the jwt token to be decoded
*/
export const retrieveAccessRoles = () => {
    // const acessToken = localStorage.getItem(`keycloak_access_token`);
    // console.log("panapa")
    const acessToken = Vue.$cookies.get("_token")
    // console.log("panapa", acessToken)
    // console.log('### Token from local storage before being decoded: ', decodedToken)
    const decodedToken = extractInfo(acessToken);

    // console.log('### Decoded token from local storage: ', decodedToken)
    var roles = []
    var roles1 = []
    var roles2 = []
    try {
        roles1 = decodedToken.resource_access['realm-management'].roles ;
    }catch (e) {
        console.log(e)
    }
    try {
        roles2 = decodedToken.resource_access['web-portal'].roles ;
    }catch (e) {
        console.log(e)
    }

    return roles.concat(roles1).concat(roles2);
}

/**
 * @param token Value of the jwt token to be decoded
*/
export const cleanUpLocalStorage = () => {
    // clear local storage
    localStorage.removeItem(`user`);
    localStorage.removeItem(`access`);
    localStorage.removeItem(`refresh`);
    localStorage.removeItem(`keycloak_access_token`)
    // clear cookies
    VueCookies.remove(`_token`)  // return false or true
}