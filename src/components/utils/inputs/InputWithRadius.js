import React from 'react';
import './InputWithRadius.css';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

/**
 * @param label : String
 * @param value : variable
 * @param onChange : function
 */

const styles = theme => ({
    textField: {
        width: '100%',
        minHeight: '50px',
    },
});


class InputWithRadius extends React.Component {
    
    render() {
        const {classes} = this.props;
        
        return (
            <TextField
                label={this.props.label}
                className={`inputWithRadius ${classes.textField}`}
                value={this.props.value}
                onChange={this.props.onChange}
                margin="normal"
                variant="outlined"
            />
        );
    }
}

export default withStyles(styles, {withTheme: true})(InputWithRadius);
