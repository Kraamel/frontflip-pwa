import { observable, action, decorate } from "mobx";
import agent from '../agent';
import commonStore from "./common.store";

class OrganisationStore {
    inProgress = false;
    errors = null;
    values = {
        orgTag: '',
        orgId: '',
        organisation: {},
    };

    setOrgTag(orgTag) {
        this.values.orgTag = orgTag;
    }
    
    setOrgId(orgId) {
        this.values.orgId = orgId;
    }

    setOrganisation(organisation) {
        this.values.organisation = organisation;
    }
    

    reset() {
        this.values.organisation = {};
        this.values.orgTag = '';
    }

    getAlgoliaKey() {
        this.inProgress = true;
        this.errors = null;

        if(this.isKeyStillValid()) return Promise.resolve(commonStore.algoliaKey);

        return agent.Organisation.getAlgoliaKey(this.values.organisation.tag, this.values.organisation.public)
            .then(data => { 
                if(data){
                    commonStore.setAlgoliaKey(data.public_key);
                    return data.public_key.value;
                }
                return null;
            })
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(()=> { this.inProgress = false; }));
    }

    getOrganisationForPublic() {
        this.inProgress = true;
        this.errors = null;

        return agent.Organisation.getForPublic(this.values.orgTag)
            .then(data => { 
                if(data) this.setOrganisation(data.organisation);
                return this.values.organisation;
            })
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(()=> { this.inProgress = false; }));
    }

    isKeyStillValid() {
        if(commonStore.algoliaKey && commonStore.algoliaKeyValidity) {
            let valid_until_date = new Date(parseInt(commonStore.algoliaKeyValidity));
            return ( ((new Date()).getTime()+3600000) < valid_until_date.getTime());
        }
        return false;
    }

}

decorate(OrganisationStore, {
    inProgress: observable,
    errors: observable,
    values: observable,
    reset: action,
    setOrganisation: action,
    setOrgTag: action,
    setOrgId: action,
    getAlgoliaKey: action,
    getOrganisationForPublic: action
});

export default new OrganisationStore();