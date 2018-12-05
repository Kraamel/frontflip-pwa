import React from 'react';
import {inject, observer} from 'mobx-react';
import {Redirect} from "react-router-dom";
import {Grid, Typography} from '@material-ui/core';
import Input from '../utils/inputs/InputWithRadius'
import './LoginSignup.css';
import ButtonRadius from '../utils/buttons/ButtonRadius';

let Login = inject("authStore")(observer(class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            successLogin: false,
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
                if(response == 200) this.setState({successLogin: true});
            });
    };
    
    render() {
        const {values, errors, inProgress} = this.props.authStore;
        let {successLogin} = this.state;
        if (successLogin) return <Redirect to='/profile'/>;

        return (
            <Grid className={'form'} container item direction='column' alignItems={'stretch'} justify='space-around'>
                <Grid item >
                    <ButtonRadius style={{backgroundColor:'white', position:'relative'}}>
                        <img src="https://developers.google.com/identity/images/g-logo.png" style={{width:'25px', height: '25px', position:'absolute', left: '7px'}} alt="google"/>
                        <Typography> connect with google</Typography>
                    </ButtonRadius>
                </Grid>
                <Typography style={{fontSize:'1rem', fontWeight: '500'}}> or </Typography>
                <Grid item >
                    <Input
                        label="Email"
                        type="email"
                        autoComplete="email"
                        margin="normal"
                        fullWidth
                        value={values.email}
                        onChange={this.handleEmailChange}
                    />
                </Grid>
                <Grid item >
                    <Input
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        fullWidth
                        value={values.password}
                        onChange={this.handlePasswordChange}
                    />
                </Grid>
                <Grid item >
                    <ButtonRadius onClick={this.handleSubmitForm} color="primary">Log In</ButtonRadius>
                </Grid>
            </Grid>
        )
    };
}));

export default Login;
