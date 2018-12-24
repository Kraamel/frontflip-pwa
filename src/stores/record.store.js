import { observable, computed, action, decorate } from "mobx";
import agent from '../agent';
import commonStore from "./common.store";

class RecordStore {
    inProgress = false;
    errors = null;
    values = {
        orgId: '',
        recordId: '',
        record: {}
    };

    setOrgId(orgId) {
        this.values.orgId = orgId;
    }
    setRecordId(recordId) {
        this.values.recordId = recordId;
    }
    setRecord(record) {
        this.values.record = record;
    }

    reset() {
        this.values.orgId = '';
        this.values.recordId = '';
        this.values.record = {};
    }

    getRecord() {
        this.inProgress = true;
        this.errors = null;

        return agent.Record.get(this.values.recordId)
            .then(data => { console.log('data recieve : ' + data); this.values.record = (data? data.record : {});})
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(()=> { this.inProgress = false; }));
    }
    
    /**
     * @description Post new record
     */
    postRecord() {
        this.inProgress = true;
        this.errors = null;

        return agent.Record.post(this.values.orgId, this.values.record)
            .then(data => { this.values.record = (data? data.record : {});})
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(()=> { this.inProgress = false; }));
    }

    /**
     * @description Update record
     */
    updateRecord() {
        this.inProgress = true;
        this.errors = null;

        return agent.Record.put(this.values.orgId, this.values.recordId, this.values.record)
            .then(data => { this.values.record = (data? data.record : {});})
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(()=> { this.inProgress = false; }));
    }

    /**
     * @description Delete my record
     */
    deleteRecord() {
        this.inProgress = true;
        this.errors = null;

        return agent.Record.delete(this.values.recordId)
            .then(data => { 
                this.values.record = {}; 
                this.values.recordId = '';
            })
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(()=> { this.inProgress = false; }));
    }

}

decorate(RecordStore, {
    inProgress: observable,
    errors: observable,
    values: observable,
    setOrgId: action,
    reset: action,
    setRecordId: action,
    setRecord: action,
    getRecord: action,
    postRecord: action,
    updateRecord: action,
    deleteRecord: action
});

export default new RecordStore();