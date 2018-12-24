import React from 'react';
import {Button, Typography, withStyles} from '@material-ui/core';

const styles = {
    root: {
        ['&:not(:hover)']: {
            backgroundColor: "white"
        },
    }
};

const GoogleButton = ({...props}) =>
    <Button {...props} className={styles.root}>
        <img src="https://developers.google.com/identity/images/g-logo.png" style={{width: '25px', height: '25px', position: 'absolute', left: '10px'}} alt="google"/>
        <Typography> connect with google</Typography>
    </Button>;
    
export default withStyles(styles)(GoogleButton);
