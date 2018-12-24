import { observable, action, decorate } from "mobx";
import agent from '../agent';
import commonStore from "./common.store";
import userStore from "./user.store";
import organisationStore from "./organisation.store";
import emailService from "../services/email.service";

class AuthStore {
    inProgress = false;
    errors = null;
    values = {
        email: '',
        password: '',
        orgTag: '',
        invitationCode: ''
    };

    setEmail(email) {
        this.values.email = email;
    }

    setPassword(password) {
        this.values.password = password;
    }

    setOrgTag(orgTag) {
        this.values.orgTag = orgTag;
    }

    reset() {
        this.values.email = '';
        this.values.password = '';
        this.values.orgTag = '';
        this.values.invitationCode = '';
    }

    isAuth() {
        if(commonStore.getAccessToken() || commonStore.getRefreshToken()){
            return userStore.getCurrentUser()
            .then(() => {
                return true;
            }).catch(() => {
                return false;
            })
        }else{
            return Promise.resolve(false);
        }
    }

    
    /**
     * @description Call authentification service to fetch tokens
     */
    login() {
        this.inProgress = true;
        this.errors = null;

        return agent.Auth.login(this.values.email, this.values.password)
            .then((response) => {   
                if(response && response.access_token){
                    commonStore.setAuthTokens(response);
                    return userStore.getCurrentUser()
                    .then(()=> {return 200;});
                } 
                else return 403;
            })
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(()=> { this.inProgress = false; }));
    }

    /**
     * @description Call authentification service to register a new User
     */
    register() {
        this.inProgress = true;
        this.errors = null;

        return agent.Auth.register(this.values.email, this.values.password)
            .then((data) => {
                return this.login(this.values.email, this.values.password)
                .then((respLogin) => {
                    console.log('org tag : ' + organisationStore.values.orgTag);
                    return emailService.confirmLoginEmail(organisationStore.values.orgTag)
                    .then((respEmail) => {
                        console.log('email sended');
                        return true;
                    });
                });
            })
            .catch(action((err) => {
                // any other response status than 20X is an error
                console.log(err);
                this.errors = err;
                throw err;
            }))
            .finally(action(() => {this.inProgress = false; }));
    }

    /**
     * @description Call authentification service to register an User to an Organisation
     * @param {access_token} needed.
     */
    registerToOrg() {
        this.inProgress = true;
        this.errors = null;

        return agent.Auth.registerToOrg(organisationStore.values.organisation._id, this.values.invitationCode || null)
            .then((data) => {
                return true;
            })
            .catch(action((err) => {
                console.log(err.response.body);
                console.log(err.status);
                this.errors = err;
                throw err;
            }))
            .finally(action(() => {this.inProgress = false; }));
    }

    passwordForgot() {
        this.inProgress = true;
        this.errors = null;

        return agent.Email.passwordForgot(this.values.email)
            .then((data) => {
                return data;
            })
            .catch(action((err) => {
                console.log(err);
                this.errors = err;
            }))
            .finally(action(() => {this.inProgress = false; }));   
    }
    updatePassword(token, hash) {
        this.inProgress = true;
        this.errors = null;

        return agent.Email.updatePassword(token, hash, this.values.password)
            .then((data) => {
                return data;
            })
            .catch((err) => {
                this.errors = err;
                return err.response;
            })
            .finally(action(() => {this.inProgress = false; }));      
    }

    logout() {
        commonStore.removeAuthTokens();
        userStore.forgetUser();
        return Promise.resolve();
    }

    /**
     * @description test call
     */
    getUser() {
        return agent.Test.getUser()
        .then((user)=> {
            return user;
        });
    }
}

decorate(AuthStore, {
    inProgress: observable,
    errors: observable,
    values: observable,
    setEmail: action,
    setPassword: action,
    setOrgTag: action,
    reset: action,
    login: action,
    logout: action,
    register: action,
    registerToOrg: action
});

export default new AuthStore();