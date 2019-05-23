import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import authStore from './stores/auth.store';
import commonStore from './stores/common.store';
import UrlService from './services/url.service';

const superagent = superagentPromise(_superagent, global.Promise);
const locale = ((process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') ? (commonStore.getCookie('locale') || commonStore.locale) : 'en-UK');
const API_ROOT_AUTH = process.env.REACT_APP_API_ROOT_AUTH;
const API_ROOT = process.env.REACT_APP_API_ROOT + '/' + locale;

const handleErrors = err => {
  if (err && err.response && err.response.status === 401) {
    authStore.logout();
    window.location.href = UrlService.createUrl(window.location.host, '/signin', null);
  }
  return err;
};

const responseBody = res => res.body;

/**
 * @description Set token to header
 */
const tokenPlugin = req => {
  if (commonStore.getAccessToken() || commonStore.accessToken) {
    req.set('Authorization', `Bearer ` + (commonStore.getAccessToken() || commonStore.accessToken));
  }
};

/**
 * @description Create requests, will be used by all other actions in this file
 */
const requests = {
  del: (url) => {
    return validateToken()
      .then(() =>
        superagent
          .del((process.env.NODE_ENV === 'development' ? 'http://' : 'https://') + `${url}`)
          .timeout({
            response: 30000,
          })
          .use(tokenPlugin)
          .end(handleErrors)
          .then(responseBody)
      );
  },

  get: (url) => {
    return validateToken()
      .then(() =>
        superagent
          .get((process.env.NODE_ENV === 'development' ? 'http://' : 'https://') + `${url}`)
          .timeout({
            response: 30000,
          })
          .use(tokenPlugin)
          .end(handleErrors)
          .then(responseBody)
      );
  },

  put: (url, body) => {
    return validateToken()
      .then(() =>
        superagent
          .put((process.env.NODE_ENV === 'development' ? 'http://' : 'https://') + `${url}`, body)
          .timeout({
            response: 30000,
          })
          .use(tokenPlugin)
          .end(handleErrors)
          .then(responseBody)
      );
  },

  post: (url, body) => {
    return validateToken()
      .then(() =>
        superagent
          .post((process.env.NODE_ENV === 'development' ? 'http://' : 'https://') + `${url}`, body)
          .timeout({
            response: 30000,
          })
          .use(tokenPlugin)
          .end(handleErrors)
          .then(responseBody)
      );
  },
};

/**
 * @description Get new access token if the older one is expired
 */
let validateToken = () => {
  if (commonStore.getRefreshToken() && !commonStore.getAccessToken()) {
    return new Promise((resolve, reject) => {
      superagent.post(
        (process.env.NODE_ENV === 'development' ? 'http://' : 'https://') + `${API_ROOT_AUTH}/locale`,
        {
          client_id: 'frontflip',
          client_secret: 'abcd1234',
          grant_type: 'refresh_token',
          refresh_token: commonStore.getRefreshToken()
        }
      )
        .timeout({
          response: 30000,
        })
        .end(handleErrors)
        .then((response) => {
          commonStore.setAuthTokens(JSON.parse(response.text));
          resolve();
        }).catch((err) => {
          authStore.logout();
          window.location.href = UrlService.createUrl(window.location.host, '/signin', null);
        });
    });
  } else {
    return Promise.resolve();
  }
};

/**
 * @description Authentification actions
 *              We have 2 levels of register / login :
 *              - register to Wingzy (classic)
 *              - register to an Organisation of Wingzy
 *              1 User can have many Organisation
 */
const Auth = {
  login: (email, password, integrationToken) =>
    requests.post(
      `${API_ROOT_AUTH}/locale`,
      {
        username: email,
        password: password,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        grant_type: 'password',
        integration_token: integrationToken
      }
    ),
  googleCallbackLogin: (token) =>
    requests.post(
      API_ROOT_AUTH + '/locale/exchange',
      {
        token: token,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET
      }
    ),
  register: (email, password) =>
    requests.post(
      `${API_ROOT_AUTH}/register`,
      {
        email: email,
        password: password
      }
    ),
  registerToOrg: (orgId, invitationCode) =>
    requests.post(
      `${API_ROOT_AUTH}/register/organisation/` + orgId + `/` + (invitationCode ? invitationCode : '')
    )
};

const User = {
  getCurrent: () =>
    requests.get(
      API_ROOT + '/api/users/current'
    ),
  welcomeUser: (userId, organisationId) =>
    requests.put(
      API_ROOT + '/api/users/welcome/'+ userId +'/organisation/' + organisationId
    ),
  update: (userId, user) =>
    requests.put(
      API_ROOT + '/api/users/' + userId,
      {
        user: user
      }
    )
}

const Record = {
  get: (recordId) =>
    requests.get(
      API_ROOT + '/api/profiles/' + recordId
    ),
  getByTag: (recordTag, orgId) =>
    requests.get(
      API_ROOT + '/api/profiles/tag/' + recordTag + '/organisation/' + orgId
    ),
  getByUser: (userId, orgId) =>
    requests.get(
      API_ROOT + '/api/profiles/user/' + userId + '/organisation/' + orgId
    ),
  post: (orgId, record) =>
    requests.post(
      API_ROOT + '/api/profiles/',
      {
        orgId: orgId,
        record: record
      }
    ),
  put: (orgId, recordId, record) =>
    requests.put(
      API_ROOT + '/api/profiles/' + recordId,
      {
        orgId: orgId,
        record: record
      }
    ),
  delete: (recordId) =>
    requests.del(
      API_ROOT + '/api/profiles/' + recordId
    )

};

const Organisation = {
  getForPublic: (orgTag) =>
    requests.get(
      API_ROOT + '/api/organisations/' + orgTag + '/forpublic'
    ),
  getAlgoliaKey: (orgId, isPublic) =>
    requests.get(
      API_ROOT + '/api/organisations/' + orgId + '/algolia/' + (isPublic ? 'public' : 'private')
    ),
  get: (orgId) =>
    requests.get(
      API_ROOT + '/api/organisations/' + orgId
    )
}

/**
 * @description Email API
 */
const Email = {
  confirmLoginEmail: (orgTag) =>
    requests.post(
      API_ROOT + '/api/emails/confirmation/' + (orgTag ? orgTag : '')
    ),
  passwordForgot: (userEmail) =>
    requests.post(
      API_ROOT + '/api/emails/password',
      {
        userEmail: userEmail
      }
    ),
  updatePassword: (token, hash, password) =>
    requests.post(
      API_ROOT_AUTH + '/password/reset/' + token + '/' + hash,
      {
        password: password
      }
    ),
  confirmIntegrationEmail: (integrationName) =>
    requests.post(
      API_ROOT + '/api/emails/security/integration/' + integrationName
    ),
  confirmationInvitation: (userEmail) =>
    requests.post(
      API_ROOT + '/api/emails/invitation/code/confirmation',
      {
        userEmail: userEmail,
      }
    ),
}

const Invitation = {
  getCode: (orgId) =>
    requests.post(
      API_ROOT_AUTH + '/api/invitation/code',
      {
        orgId: orgId
      }
    )
}

/**
 * @description Test get user with secure call to API
 */
const Test = {
  getUser: () =>
    requests.get('/test/secure')
};

export default {
  Auth,
  Test,
  Record,
  Organisation,
  User,
  Email,
  Invitation
}
