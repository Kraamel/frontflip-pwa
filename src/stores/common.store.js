import { observable, action, reaction, decorate } from 'mobx';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class CommonStore {

    appName = 'Frontflip';
    accessToken;
    refreshToken;
    algoliaKey;
    algoliaKeyValidity;
    appLoaded = false;


    constructor() {
        this.accessToken = this.getCookie('accessToken');
        this.refreshToken = this.getCookie('refreshToken');
        this.algoliaKey = this.getStorage('algoliaKey');
        this.algoliaKeyValidity = this.getStorage('algoliaKeyValidity');
    }

    getAccessToken() {
        return this.getCookie('accessToken');
    }
    getRefreshToken() {
        return this.getCookie('refreshToken');
    }
    
    setCookie(name, value, expires) {
        if(process.env.NODE_ENV === 'production'){
            cookies.set(name, value, (expires ? {expires: expires, path: '/', domain: 'wingzy.com'} : {path: '/', domain: 'wingzy.com'}));
        }else{
            cookies.set(name, value, (expires ? {expires: expires, path: '/'} : {path: '/'}));
        }
    }

    getCookie(name) {
        return cookies.get(name);
    }

    removeAuthTokens() {
        cookies.remove('accessToken');
        cookies.remove('refreshToken');
    }

    setStorage(token, name) {
        window.localStorage.setItem(name, token);
    }

    getStorage(name) {
        return window.localStorage.getItem(name);
    }

    removeStorage(name) {
        window.localStorage.removeItem(name);
    }

    setAuthTokens(tokens) {
        if(tokens) {
            let expDate = new Date();
            expDate.setMinutes(expDate.getMinutes()+55);
    
            this.accessToken = tokens.access_token;
            this.setCookie('accessToken',this.accessToken, expDate);
    
            this.refreshToken = tokens.refresh_token;
            this.setCookie('refreshToken',this.refreshToken, null);
        }
    }

    setAlgoliaKey(algoliaKey) {
        this.algoliaKey = algoliaKey.value;
        this.algoliaKeyValidity = algoliaKey.valid_until;
        if (algoliaKey) {
            this.setStorage(this.algoliaKey, 'algoliaKey');
            this.setStorage(this.algoliaKeyValidity, 'algoliaKeyValidity');
        } else {
            this.removeStorage('algoliaKey');
            this.removeStorage('algoliaKeyValidity');
        }
    }

    setAppLoaded() {
        this.appLoaded = true;
    }

}

decorate(CommonStore, {
    appName: observable,
    accessToken: observable,
    refreshToken: observable,
    algoliaKey: observable,
    algoliaKeyValidity: observable,
    appLoaded: observable,
    setToken: action,
    setAlgoliaKey: action,
    setAppLoaded: action,
    getCookie: action,
    setCookie: action
});

export default new CommonStore();