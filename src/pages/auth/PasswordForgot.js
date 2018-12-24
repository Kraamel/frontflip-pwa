import React from 'react';
import {inject, observer} from 'mobx-react';
import SnackbarCustom from '../../components/utils/snackbars/SnackbarCustom';
import {Button, TextField, Grid} from "@material-ui/core";

import './Auth.css';
import mdpImg from '../../images/mdp.png';

class PasswordForgot extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            successPasswordReset: false
        }
    }
    
    componentWillUnmount = () => {
        this.props.authStore.reset();
    };
    
    handleEmailChange = (e) => {
        this.props.authStore.setEmail(e.target.value);
    };
    
    handleSubmitForm = (e) => {
        e.preventDefault();
        this.props.authStore.passwordForgot()
            .then(response => {
                if (response) {
                    this.setState({successPasswordReset: true});
                }
            }).catch(err => {
            // nothing
        });
    };
    
    render() {
        const {values} = this.props.authStore;
        let {successPasswordReset} = this.state;
        
        if (successPasswordReset) {
            return <SnackbarCustom variant="info"
                                   message="If you have an account on Wingzy, we have send you an email to reset your password."/>;
        } else {
            return (
                <Grid container direction={"column"} justify={"center"} alignItems={"center"} className={"margin-form"} spacing={16}>
                    <Grid item container justify={"center"} alignItems={"center"} xs={12} sm={4}>
                        <img src={mdpImg} alt="mdp" style={{width: '12rem', padding: '1rem'}}/>
                    </Grid>
                    <Grid item container justify={"center"} alignItems={"center"} xs={12} sm={4}>
                        <p> You forgot your password ? Don't worry ! You can ask for a reset</p>
                    </Grid>
                    <Grid item container justify={"center"} alignItems={"center"} xs={12} sm={4}>
                        <TextField label="Email"
                                   type="email"
                                   autoComplete="email"
                                   margin="normal"
                                   variant={"outlined"}
                                   fullWidth={true}
                                   value={values.email}
                                   onChange={this.handleEmailChange}
                        />
                    </Grid>
                    <Grid item container justify={"center"} alignItems={"center"} xs={12} sm={4}>
                        <Button fullWidth={true} onClick={this.handleSubmitForm} color="primary">Reset your password</Button>
                    </Grid>
                </Grid>
            );
        }
    }
}

export default inject('authStore')(
    observer(PasswordForgot)
);
