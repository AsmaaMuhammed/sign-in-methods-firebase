/**
 * This script allows the stepping through of the Authorization Code Grant in
 * order to obtain a refresh token.
 *
 * This script uses the out-of-band redirect URI, which is not part of the
 * OAuth2 standard, to allow not redirecting the user. If this does not work
 * with your API, try instead the OAuth playground:
 * https://developers.google.com/oauthplayground/
 *
 * Execute script twice:
 * Execution 1: will result in a URL, which when placed in the browser will
 * issue a code.
 * Execution 2: place the code in "CODE" below and execute. If successful a
 * refresh token will be printed to the console.
 */
var CLIENT_ID = '6554177065-ibnesujovtu0tu774t0n1bth58qr5ag1.apps.googleusercontent.com';
var CLIENT_SECRET = 'eCFW2k0tNFIpaV4PoMCIEovs';
var REDIRECT_URI = 'http://localhost:5000/redirect.html';
// Enter required scopes, e.g. ['https://www.googleapis.com/auth/drive']
var SCOPES = ['email profile https://www.googleapis.com/auth/calendar openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'];

// Auth URL, e.g. https://accounts.google.com/o/oauth2/auth
var AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
// Token URL, e.g. https://accounts.google.com/o/oauth2/token
var TOKEN_URL = 'https://oauth2.googleapis.com/token';

// After execution 1, enter the OAuth code inside the quotes below:
var CODE = '4/xwGXtD15TC-uS7zZ0wWXr3r-uk-HPhg2Iau51ww413EV6Wbh7q3cKfpdBKffWBZQKV7WdkfgV8HoLFxh0TPPS-s';

function main() {
  if (CODE) {
    generateRefreshToken();
  } else {
    generateAuthUrl();
  }
}

/**
 * Creates the URL for pasting in the browser, which will generate the code
 * to be placed in the CODE variable.
 */
function generateAuthUrl() {
  var payload = {
    scope: SCOPES.join(' '),
    // Specify that no redirection should take place
    // This is Google-specific and not part of the OAuth2 specification.
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    access_type: 'offline',
    client_id: CLIENT_ID
  };
  var options = {payload: payload};
  var request = UrlFetchApp.getRequest(AUTH_URL, options);
  console.log(
      'Browse to the following URL: ' + AUTH_URL + '?' + request.payload);
}

/**
 * Generates a refresh token given the authorization code.
 */
function generateRefreshToken() {
  var payload = {
    code: CODE,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    // Specify that no redirection should take place
    // This is Google-specific and not part of the OAuth2 specification.
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code'
  };
  var options = {method: 'POST', payload: payload};
  var response = UrlFetchApp.fetch(TOKEN_URL, options);
  var data = JSON.parse(response.getContentText());
  if (data.refresh_token) {
    var msg = 'Success! Refresh token: ' + data.refresh_token +
      '\n\nThe following may also be a useful format for pasting into your ' +
      'script:\n\n' +
      'var CLIENT_ID = \'' + CLIENT_ID + '\';\n' +
      'var CLIENT_SECRET = \'' + CLIENT_SECRET + '\';\n' +
      'var REFRESH_TOKEN = \'' + data.refresh_token + '\';';
    console.log(msg);
  } else {
    console.log(
        'Error, failed to generate Refresh token: ' +
        response.getContentText());
  }
}
