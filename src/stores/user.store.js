import { observable, action, decorate } from 'mobx';
import agent from '../agent';

class UserStore {

    currentUser;
    loadingUser;
    updatingUser;
    updatingUserErrors;

    pullUser() {
        this.loadingUser = true;
        return agent.Auth.current()
        .then(action(({ user }) => { this.currentUser = user; }))
        .finally(action(() => { this.loadingUser = false; }))
    }

    updateUser(newUser) {
        this.updatingUser = true;
        return agent.Auth.save(newUser)
        .then(action(({ user }) => { this.currentUser = user; }))
        .finally(action(() => { this.updatingUser = false; }))
    }

    forgetUser() {
        this.currentUser = undefined;
    }

}
decorate(UserStore, {
    currentUser: observable,
    loadingUser: observable,
    updatingUser: observable,
    updatingUserErrors: observable,
    pullUser: action,
    updateUser: action,
    forgetUser: action
});

export default new UserStore();