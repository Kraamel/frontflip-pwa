import React from 'react';
import {inject, observer} from 'mobx-react';
import SnackbarCustom from '../utils/snackbars/SnackbarCustom';
import {Typography, TextField, Grid, Button} from "@material-ui/core";

import '../login/Login.css';
import GoogleButton from "../utils/buttons/GoogleButton";

class Register extends React.Component {
    
    constructor() {
        super();
        this.state = {
            value: 0,
            registerErrors: null
        };
    }
    
    componentWillMount = () => {
        this.props.authStore.reset();
    };
    
    handleEmailChange = (e) => {
        console.log('signup func');
        this.props.authStore.setEmail(e.target.value);
    };
    
    handlePasswordChange = (e) => {
        console.log('signup func');
        this.props.authStore.setPassword(e.target.value)
    };
    
    handleSubmitForm = (e) => {
        this.props.authStore.register()
            .then(() => {
                // send email of confirmation
                // display success screen
            }).catch((err) => {
            this.setState({registerErrors: err.message})
        })
        // if we want to access an org, we have to create a cookie with the id of the org
    };
    
    render() {
        const {values, errors, inProgress} = this.props.authStore;
        let {registerErrors} = this.state;
        
        return (
            <Grid className={'form'} container item direction='column' spacing={16}>
                {registerErrors && (
                    <Grid item>
                        <SnackbarCustom variant="error"
                                        message={registerErrors}/>
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
                        variant={"outlined"}
                        fullWidth
                        value={values.email}
                        onChange={this.handleEmailChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant={"outlined"}
                        fullWidth
                        value={values.password}
                        onChange={this.handlePasswordChange}
                    />
                </Grid>
                <Grid item>
                    <Button fullWidth={true} onClick={this.handleSubmitForm} color="primary">Sign Up</Button>
                </Grid>
            </Grid>
        )
    };
}

export default inject('authStore', 'userStore', 'organisationStore')(
    observer(
        Register
    )
);
