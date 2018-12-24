import agent from '../agent';

class EmailService {
    inProgress = false;
    errors = null;

    confirmLoginEmail(orgTag) {
        this.inProgress = true;
        this.errors = null;
        console.log('eh');

        return agent.Email.confirmLoginEmail(orgTag)
            .then((response) => {   
                console.log(JSON.stringify(response));
                return true;
            })
            .catch((err) => {
                console.log(err);
                console.log(err.status);
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            })
            .finally(()=> { this.inProgress = false; });
    }
}



export default new EmailService();