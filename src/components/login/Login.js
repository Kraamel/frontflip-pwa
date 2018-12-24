import React from 'react';
import {inject, observer} from 'mobx-react';
import {Button, Grid, Typography, TextField, withStyles} from '@material-ui/core';
import SnackbarCustom from '../utils/snackbars/SnackbarCustom';

import './Login.css';
import GoogleButton from "../utils/buttons/GoogleButton";

// const styles = theme => ({
//     root: {
//         "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
//             borderColor: 'darkgrey'
//         }
//     },
//     disabled: {},
//     focused: {},
//     error: {},
//     notchedOutline: {}
// });

class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            successLogin: false,
            redirectTo: '/',
            loginErrors: null
        };
    }
    
    componentWillUnmount = () => {
        this.props.authStore.reset();
    };
    
    handleEmailChange = (e) => {
        this.props.authStore.setEmail(e.target.value);
    };
    
    handlePasswordChange = (e) => {
        this.props.authStore.setPassword(e.target.value)
    };
    
    handleSubmitForm = (e) => {
        e.preventDefault();
        this.props.authStore.login()
            .then((response) => {
                if (response === 200) {
                    this.setState({successLogin: true});
                    if (process.env.NODE_ENV === 'production') {
                        window.location = 'https://' + (this.props.organisationStore.values.orgTag ? this.props.organisationStore.values.orgTag + '.' : '') + process.env.REACT_APP_HOST_BACKFLIP + '/login/callback';
                    } else {
                        window.location = 'http://' + process.env.REACT_APP_HOST_BACKFLIP + '/login/callback' + (this.props.organisationStore.values.orgTag ? '?subdomains=' + this.props.organisationStore.values.orgTag : '');
                    }
                    // if(this.props.userStore.values.currentUser.orgsAndRecords.length > 0 &&
                    //     this.props.userStore.values.currentUser.orgsAndRecords[0].record){
                    
                    //     this.setState({redirectTo: '/profile'});
                    // }else if(this.props.userStore.values.currentUser.orgsAndRecords.length > 0){
                    //     this.setState({redirectTo: '/onboard/profile'});
                    // }else{
                    //     this.setState({redirectTo: '/onboard/wingzy'});
                    // }
                } else {
                    this.setState({loginErrors: response.message});
                    
                }
            }).catch((err) => {
            this.setState({loginErrors: err.message});
        });
    };
    
    render() {
        const {values, errors, inProgress} = this.props.authStore;
        let {successLogin, loginErrors, redirectTo} = this.state;
        // if (successLogin) return <Redirect to={redirectTo}/>;
        
        return (
            <Grid className={'form'} container item direction='column' spacing={16}>
                {loginErrors && (
                    <Grid item>
                        <SnackbarCustom variant="error"
                                        message={loginErrors}/>
                    </Grid>
                )}
                <Grid item>
                    <GoogleButton fullWidth={true}/>
                </Grid>
                <Grid item>
                    <Typography className="or-seperator"> or </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        label="Email"
                        type="email"
                        autoComplete="email"
                        fullWidth
                        variant={"outlined"}
                        value={values.email}
                        onChange={this.handleEmailChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        fullWidth
                        variant={"outlined"}
                        value={values.password}
                        onChange={this.handlePasswordChange}
                    />
                </Grid>
                <Grid item>
                    <Button fullWidth={true} onClick={this.handleSubmitForm} color="primary">Sign in</Button>
                </Grid>
                <Grid item>
                    <Button variant={"text"} href="/password/forgot">
                        I don't have my password
                    </Button>
                </Grid>
            </Grid>
        )
    };
}

export default inject('authStore', 'userStore', 'organisationStore')(
    observer(
        Login
    )
);
