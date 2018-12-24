import React from 'react'
import {Redirect} from "react-router-dom";
import { inject, observer } from 'mobx-react';

// Callback : email confirmation
// No orgToRegister saved, no orgsAndRecords => onboard/wingzy
// No orgToRegister saved, orgsAndRecords & no record => onboard/profile in this org
// No orgToRegister saved, orgsAndRecords & record => search
// orgToRegister saved, orgsAndRecords not important => onboard/profile

let RedirectUser = inject("authStore", "commonStore", "userStore", "organisationStore") (observer(class RedirectUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.authStore.isAuth()
        .then((isAuth) => {
            console.log('isauth : ' + isAuth);
            if(!isAuth) this.setState({redirectTo: '/'});
            else{
                console.log('is auth should be true');
                if(this.props.commonStore.getCookie('orgToRegister')){
                    //set orgId to auth
                    this.props.authStore.registerToOrg()
                    .then(() => {
                        // suppose ok 
                        this.setState({redirectTo: '/onboard/profile'});
                    }).catch(() => {
                        this.redirectWithOrgsAndRecords();
                    });
                }else{
                    console.log('should be here');
                    this.redirectWithOrgsAndRecords();
                }
            }
        }).catch(()=> { this.setState({redirectTo: '/'})});
    }

    redirectWithOrgsAndRecords(){
        let orgsAndRecords = this.props.userStore.values.currentUser.orgsAndRecords;
        if(!orgsAndRecords) this.setState({redirectTo: '/onboard/wingzy'});
        else{
            console.log('should be here with orgsAndRecords  : ' + JSON.stringify(orgsAndRecords));
            let orgsAndRecordsFiltered = orgsAndRecords.filter(orgAndRecord => orgAndRecord.record);
            console.log('should be here with orgsAndRecords filtered : ' + JSON.stringify(orgsAndRecords));

            if(orgsAndRecordsFiltered.length > 0 ) {
                this.props.organisationStore.values.orgId = orgsAndRecordsFiltered[0].organisation;
                this.setState({redirectTo: '/search'});
            }else{
                this.props.organisationStore.values.orgId = orgsAndRecords[0].organisation;
                console.log('will set redirectto to onboard profile');
                console.log('current redirecttot ; ' + this.state.redirectTo);
                this.setState({redirectTo: '/onboard/profile'});
                console.log('current redirecttot ; ' + this.state.redirectTo);
            }
        }
    }

    render(){
        let {redirectTo} = this.state;

        if(redirectTo) return <Redirect to={redirectTo}/>;

        return(
            <div>
                This is a logic page
            </div>
        );
    }
}));

export default (RedirectUser);
