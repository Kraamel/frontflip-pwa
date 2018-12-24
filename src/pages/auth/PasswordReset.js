import React from 'react'
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom'
import SnackbarCustom from '../../components/utils/snackbars/SnackbarCustom';
import {TextField, Button} from "@material-ui/core";

let PasswordReset = inject("authStore")(observer(class PasswordReset extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            passwordErrors: null,
            successUpdatePassword: false
        }
    }
    
    componentWillUnmount = () => {
        this.props.authStore.reset();
    };
    handlePasswordChange = (e) => {
        this.props.authStore.setPassword(e.target.value)
    };
    
    handleSubmitForm = (e) => {
        e.preventDefault();
        this.props.authStore.updatePassword(this.props.match.params.token,
            this.props.match.params.hash)
            .then(response => {
                if (!(response.body) || !(response.body.errors)) {
                    this.setState({successUpdatePassword: true});
                } else {
                    this.setState({passwordErrors: response.body.errors[0].msg});
                }
            }).catch(err => {
            console.log(err)
        });
    }
    
    render() {
        const {values} = this.props.authStore;
        let {passwordErrors, successUpdatePassword} = this.state;
        
        if (successUpdatePassword) {
            return (
                <div>
                    Your password have been updated.
                    Go to : <Link to="/">Login page</Link>
                </div>
            );
        } else {
            return (
                <div>
                    You can now choose a new password :
                    {passwordErrors && (
                        <SnackbarCustom variant="error"
                                        message={passwordErrors}/>
                    )}
                    <TextField
                        label="Password"
                        type="password"
                        margin="normal"
                        fullWidth
                        variant={"outlined"}
                        value={values.password}
                        onChange={this.handlePasswordChange}
                    />
                    <Button fullWidth={true} onClick={this.handleSubmitForm} color="primary">Change password</Button>
                </div>
            );
        }
        
        
    }
}));

export default PasswordReset;
