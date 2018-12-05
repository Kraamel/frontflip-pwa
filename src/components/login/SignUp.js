import React from 'react';
import {inject, observer} from 'mobx-react';
import Grid from '@material-ui/core/Grid';

import Input from '../utils/inputs/InputWithRadius'
import ButtonRadius from '../utils/buttons/ButtonRadius';


import './LoginSignup.css';
import {Typography} from "@material-ui/core";

let SignUp = inject("authStore")(observer(class SignUp extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
        // Because we can't access to this in the class
        window.self = this;
    }

    render() {
        const {values, errors, inProgress} = window.self.props.authStore;
        return (
            <Grid className={'form'} container item direction='column' justify='space-around' alignItems="stretch">
                <ButtonRadius style={{backgroundColor:'white', position:'relative'}}>
                    <img src="https://developers.google.com/identity/images/g-logo.png" style={{width:'25px', height: '25px', position:'absolute', left: '7px'}} alt="google"/>
                    <Typography> connect with google</Typography>
                </ButtonRadius>
                <Typography style={{fontSize:'1rem', fontWeight: '500'}}> or </Typography>
                <Grid item>
                    <Input
                        label="Email"
                        type="email"
                        autoComplete="email"
                        margin="normal"
                        fullWidth
                        value={values.email}
                                            />
                </Grid>
                <Grid item>
                    <Input
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        fullWidth
                        value={values.password}
                                           />
                </Grid>
                <Grid item>
                    <ButtonRadius color="primary"> Sign Up </ButtonRadius>
                </Grid>
            </Grid>
        
        )
    };
}));

export default SignUp
