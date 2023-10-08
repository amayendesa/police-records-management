import http from "../helpers/http-common";

/**
 * @description Retrieves the OAuth2 token from the server
 */
export const getOAuth2Token = () => {
  // Request required configs
  var config = {
    headers: { Authorization: "Basic bW9iaWxlOnBpbg==" },
  };
  //
  return http.post(
    `/gateway/auth/api/oauth/token?grant_type=client_credentials`,
    {},
    config
  );
};
