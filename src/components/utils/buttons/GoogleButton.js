import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import googleLogo from '../../../resources/images/g.svg';
import { FormattedMessage } from 'react-intl';

const styles = theme => ({
  root: {
    '&:not(:hover)': {
      backgroundColor: "white"
    },
    '&:hover': {
      backgroundColor: '#d5d5d5',
      color: 'black',
    }
  }
});

const GoogleButton = ({ id, ...props }) =>
  <Button {...props} className={props.classes.root}>
    <img src={googleLogo} style={{ width: '25px', height: '25px', position: 'absolute', left: '13px' }} alt="google" />
    <FormattedMessage id={id} />
  </Button>;

export default withStyles(styles)(GoogleButton);
