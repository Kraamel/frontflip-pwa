import React from 'react';
import Grid from '@material-ui/core/Grid';

import Logo from '../../components/utils/logos/Logo';
import Form from '../../components/login/Form';

import './Auth.css'


const Auth = () => {
    
    return (
        <Grid container justify={"center"} className="root">
            <Grid item container justify={"center"} alignItems={'stretch'} xs={12} style={{height:'45vh'}}>
                <div className="banner"/>
                <Logo src="https://pbs.twimg.com/profile_images/981455890342694912/fXaclV2Y_400x400.jpg" alt="org-logo" id="logo"/>
            </Grid>
            <Grid item xs={12} sm={4} id="auth-form">
                <Form />
            </Grid>
        </Grid>
    )
};

export default Auth;
