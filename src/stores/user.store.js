import { observable, action, decorate } from 'mobx';
import agent from '../agent';

class UserStore {

    inProgress = false;
    errors = null;
    values = {
        currentUser: {}
    };

    getCurrentUser() {
        this.inProgress = true;
        this.errors = null;

        return agent.User.getCurrent()
            .then(data => { this.values.currentUser = (data? data.user : {});})
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(()=> { this.inProgress = false; }));
    }

    forgetUser() {
        this.currentUser = undefined;
    }

}
decorate(UserStore, {
    inProgress: observable,
    errors: observable,
    values: observable,
    getCurrentUser: action,
    updateUser: action,
    forgetUser: action
});

export default new UserStore();