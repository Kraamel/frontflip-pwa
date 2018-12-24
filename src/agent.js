import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import authStore from './stores/auth.store';
import commonStore from './stores/common.store';

const superagent = superagentPromise(_superagent, global.Promise);
//const API_ROOT_AUTH = 'https://auth-wingzy-staging.herokuapp.com';
const API_ROOT_AUTH = process.env.REACT_APP_API_ROOT_AUTH;
const API_ROOT = process.env.REACT_APP_API_ROOT;

const handleErrors = err => {
    if (err && err.response && err.response.status === 401) {
        authStore.logout();
    }
    return err;
};

const responseBody = res => res.body;

/**
 * @description Set token to header
 */
const tokenPlugin = req => {
    if(commonStore.getAccessToken() ||commonStore.accessToken) {
        req.set('Authorization', `Bearer `+ (commonStore.getAccessToken() ||commonStore.accessToken));
    }
};

/**
 * @description Create requests, will be used by all other actions in this file
 */
const requests = {
    del: (url) => {
        return validateToken()
        .then(()=>
            superagent
            .del((process.env.NODE_ENV == 'development' ? 'http://' : 'https://') + `${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody)
        );
    },
        
    get: (url) => {
        return validateToken()
        .then(()=>
            superagent
            .get((process.env.NODE_ENV == 'development' ? 'http://' : 'https://') + `${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody)
        );
    },
        
    put: (url, body) => {
        return validateToken()
        .then( () => 
            superagent
            .put((process.env.NODE_ENV == 'development' ? 'http://' : 'https://') + `${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody)
        );
    },

    post: (url, body) => {
        return validateToken()
        .then( () => 
            superagent
            .post((process.env.NODE_ENV == 'development' ? 'http://' : 'https://') + `${url}`, body)
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
        return new Promise( (resolve, reject) => {
            superagent.post(
                `${API_ROOT_AUTH}/locale`,
                {
                    client_id: 'frontflip',
                    client_secret: 'abcd1234',
                    grant_type: 'refresh_token',
                    refresh_token: commonStore.getRefreshToken()
                }
            )
            .end(handleErrors)
            .then((response)=>{
                commonStore.setAuthTokens(JSON.parse(response.text));
                resolve(); 
            }) 
        });
    }else{
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
    login: (email, password) => 
        requests.post(
            `${API_ROOT_AUTH}/locale`,
            {
                username: email,
                password: password,
                client_id: 'frontflip',
                client_secret: 'abcd1234',
                grant_type: 'password'
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
            `${API_ROOT_AUTH}/register/organisation/`+orgId+`/`+(invitationCode ? invitationCode : '')
        )
};

const User = {
    getCurrent: () =>
        requests.get(
            API_ROOT+'/api/users/current'
        ),
    updateCurrent: (user) => 
        requests.put(
            API_ROOT+'/api/users/',
            {
                user: user
            }
        ),
    update: (userId, user) =>
        requests.put(
            API_ROOT+'/api/users/'+userId,
            {
                user: user
            }
        )
}

const Record = {
    get: (recordId) => 
        requests.get(
            API_ROOT+'/api/profiles/'+recordId
        ),
    post: (orgId, record) => 
        requests.post(
            API_ROOT+'/api/profiles/',
            {
                orgId: orgId,
                record: record
            }
        ),
    put: (orgId, recordId, record) => 
        requests.put(
            API_ROOT+'/api/profiles/'+recordId,
            {
                orgId: orgId,
                record: record
            }
        ),
    delete: (recordId) => 
        requests.del(
            API_ROOT+'/api/profiles/'+recordId
        )

};

const Organisation = {
    getForPublic: (orgTag) =>
        requests.get(
            API_ROOT+'/api/organisations/'+orgTag+'/forpublic'
        ),
    getAlgoliaKey: (orgId, isPublic) =>
        requests.get(
            API_ROOT+'/api/organisations/algolia/'+(isPublic?'public':'private')+'/',
            {
                orgId: orgId
            }
        )
}

/**
 * @description Email API
 */
const Email = {
    confirmLoginEmail: (orgTag) => 
        requests.post(
            API_ROOT+'/api/emails/confirmation/' + (orgTag ? orgTag : '')
        ),
    passwordForgot: (userEmail) => 
        requests.post(
            API_ROOT+'/api/emails/password',
            {
                userEmail: userEmail
            }
        ),
    updatePassword: (token, hash, password) =>
        requests.post(
            API_ROOT_AUTH+'/password/reset/'+token+'/'+hash,
            {
                password: password
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
    Email
}