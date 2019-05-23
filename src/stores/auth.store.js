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
    invitationCode: '',
    temporaryToken: null,
  };

  setEmail(email) {
    this.values.email = email;
  }

  setTemporaryToken(tToken) {
    this.values.temporaryToken = tToken;
  }

  setPassword(password) {
    this.values.password = password;
  }

  setOrgTag(orgTag) {
    this.values.orgTag = orgTag;
  }

  setInvitationCode(invitationCode) {
    this.values.invitationCode = invitationCode;
  }

  reset() {
    this.values.email = '';
    this.values.password = '';
    this.values.orgTag = '';
    this.values.invitationCode = '';
    this.values.temporaryToken = null;
  }

  isAuth() {
    if (commonStore.getAccessToken() || commonStore.getRefreshToken()) {
      return true;
    } else {  
      return false;
    }
  }


  /**
   * @description Call authentification service to fetch tokens
   */
  login() {
    this.inProgress = true;
    this.errors = null;

    return agent.Auth.login(this.values.email, this.values.password, this.values.temporaryToken)
      .then((response) => {
        if (response && response.access_token) {
          commonStore.setAuthTokens(response);
          if(response.integrationState && (response.integrationState.linkedin === 'true')) emailService.sendConfirmIntegrationEmail('LinkedIn').catch(e => console.error(e));
          return userStore.getCurrentUser()
            .then(() => { return 200; })
            .catch((err) => { console.log(err);})
        }
        else{
          return 403;
        }
      })
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  googleCallbackLogin() {
    if(!this.values.temporaryToken) return Promise.reject();

    this.inProgress = true;
    this.errors = null;

    return agent.Auth.googleCallbackLogin(this.values.temporaryToken)
      .then((response) => {
        if (response && response.access_token) {
          commonStore.setAuthTokens(response);
          return userStore.getCurrentUser()
            .then(() => { return 200; });
        }
        else return 403;
      })
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
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
            return emailService.confirmLoginEmail(null)
              .then((respEmail) => {
                return true;
              });
          });
      })
      .catch((err) => {
        // any other response status than 20X is an error
        if(this.values.invitationCode) {
          // try to login user
          return this.login(this.values.email, this.values.password)
          .then(respLogin => {
            return true;
          }).catch((e) => {
            // Send register error, not login error.
            this.errors = err.response && err.response.body && err.response.body.errors;
            throw err;
          })
        } else {
          this.errors = err.response && err.response.body && err.response.body.errors;
          throw err;
        }
      })
      .finally(action(() => { this.inProgress = false; }));
  }

  /**
   * @description Call authentification service to register an User to an Organisation
   * @param {access_token} needed.
   */
  registerToOrg() {
    if(!organisationStore.values.organisation._id) return;
    this.inProgress = true;
    this.errors = null;

    return agent.Auth.registerToOrg(organisationStore.values.organisation._id, this.values.invitationCode)
      .then((data) => {
        return userStore.getCurrentUser()
        .then(() => { return data; });      
      })
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  passwordForgot() {
    this.inProgress = true;
    this.errors = null;

    return agent.Email.passwordForgot(this.values.email)
      .then((data) => {
        return data;
      })
      .catch(action((err) => {
        this.errors = err;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }
  
  confirmationInvitation() {
    this.inProgress = true;
    this.errors = null;
  
    return agent.Email.confirmationInvitation(this.values.email, this.values.orgTag)
      .then((data) => {
        return data
      })
      .catch(action((err) => {
        this.errors = err;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  updatePassword(token, hash) {
    this.inProgress = true;
    this.errors = null;

    return agent.Email.updatePassword(token, hash, this.values.password)
      .then((data) => {
        this.setEmail(data.email);
        return this.login();
      })
      .catch((err) => {
        this.errors = err;
        throw err;
      })
      .finally(action(() => { this.inProgress = false; }));
  }

  getInvitationCode(orgId) {
    this.inProgress = true;
    this.errors = null;

    return agent.Invitation.getCode(orgId)
      .then((data) => {
        return data.invitationCode;
      })
      .catch((err) => {
        this.errors = err;
        throw err;
      })
      .finally(action(() => { this.inProgress = false; }));
  }

  logout() {
    commonStore.removeAuthTokens();
    commonStore.removeCookie('algoliaKey');
    commonStore.removeCookie('algoliaKeyOrganisation');
    userStore.forgetUser();
    return Promise.resolve();
  }

  /**
   * @description test call
   */
  getUser() {
    return agent.Test.getUser()
      .then((user) => {
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
  setInvitationCode: action,
  reset: action,
  login: action,
  logout: action,
  register: action,
  registerToOrg: action,
  getInvitationCode: action
});

export default new AuthStore();
