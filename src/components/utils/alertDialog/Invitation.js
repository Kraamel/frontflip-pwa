import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {IconButton, Typography, withStyles, Grid} from "@material-ui/core";
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import classNames from 'classnames';
import Icon from "@material-ui/core/Icon";
import {FormattedMessage} from "react-intl";
import {Clear, InfoRounded, FileCopy} from "@material-ui/icons";
import {inject, observer} from "mobx-react";
import {injectIntl} from 'react-intl';

const styles = theme => ({
  invitationBtn: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 4,
    textAlign: 'center',
    width: '100%',
    height: 36,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    }
  },
  invitationIcon: {
    color: 'white',
    marginBottom: 2,
    width: '2em',
    fontSize: 20
  },
  invitationTitle: {
    padding: 0,
      textTransform: 'uppercase',
      fontSize:'larger',
      marginBottom: 16,
      color: 'black',
      fontWeight: '700',
  },
  invitationContent: {
    padding: '0!important',
  },
  invitationInput: {
    padding: 4,
      borderStyle: 'groove',
      fontSize: 'inherit',
      width: '100%',
      borderRadius: 4,
      height: 41,
      fontWeight: '400',
      [theme.breakpoints.down('xs')]: {
      width: '99%'
    },
    [theme.breakpoints.down(350)]: {
      width: '96%'
    }
  },
  invitationCopyBtn: {
    minWidth: 0,
      height: 40,
      backgroundColor: theme.palette.secondary.main,
      borderRadius: 4,
      textAlign: 'center',
      width: '99%',
      fontWeight: 'bold',
      color: 'white',
      textTransform: 'uppercase',
      '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
    [theme.breakpoints.down(400)]: {
      width: 10,
        marginLeft: -1,
    },
    [theme.breakpoints.down(350)]: {
      marginLeft: -8,
    }
  },
  invitationPaper: {
    margin: 8,
      padding: 32
  }
})

function Transition(props) {
  return <Slide direction="right" {...props} />;
}

class Invitation extends React.Component {
  state = {
    open: false,
    invitationCode: null,
    errorMessage: null
  };

  formatInvitationLink = (code) => {
    var locale = this.props.commonStore.locale;
    var orgTag = this.props.organisationStore.values.organisation.tag;
    if (process.env.NODE_ENV === 'development') {
      return 'http://' + process.env.REACT_APP_HOST + '/' + locale + '/' + orgTag + '/signup/' + code;
    }
    return 'https://' + orgTag + '.wingzy/' + locale + '/code/' + code
  }

  copyUrl = () => {
    let copyText = document.getElementById("urlInvitation");
    copyText.select();
    document.execCommand("copy");
  }
  
  handleClickOpen = () => {
    this.requestInvitationCode()
      .then(() => this.props.authStore.confirmationInvitation(this.formatInvitationLink(this.state.invitationCode)))
    this.setState({open: true});
  };

  requestInvitationCode = () => {
    return new Promise((resolve, reject) => {
    var orgId = this.props.organisationStore.values.organisation._id;
    if(orgId)
      this.props.authStore.getInvitationCode(orgId)
      .then(invitationCode => {
           return this.setState({invitationCode: invitationCode.code}, () => resolve());
      }).catch(e => {
        console.error(e);
        this.setState({errorMessage: this.props.intl.formatMessage({ id: 'invitation.get.error' })})
          reject(e);
      });
    else
      resolve();
    })
  }
  
  handleClose = () => {
    this.setState({open: false});
  };
  
  render() {
    const {classes} = this.props;
    const {invitationCode, errorMessage} = this.state;

    const invitationCodeLink = this.formatInvitationLink(invitationCode);

    return (
      <React.Fragment>
        <Button className={classes.invitationBtn} onClick={this.handleClickOpen}>
          <Icon
            className={classNames(classes.invitationIcon, 'fa fa-user-plus')}
            fontSize="inherit"
          />
          <FormattedMessage id={'menu.drawer.invitation'}/>
        </Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          classes={{paper: classes.invitationPaper}}
        >
          <Grid container direction={'row'} justify={'space-between'}>
            <Grid item>
              <Typography variant="h4" className={classes.invitationTitle}>
                <FormattedMessage id={'menu.drawer.invitation'}/>
              </Typography>
            </Grid>
            <Grid item>
              <IconButton aria-label="Close" onClick={this.handleClose} style={{position:'fixed', marginLeft: -4, marginTop: -32}}>
                <Clear fontSize="small"/>
              </IconButton>
            </Grid>
          </Grid>
          <DialogContent classes={{root: classes.invitationContent}}>
            <Typography variant="body1" style={{color: 'black'}}>
              <FormattedMessage id={'menu.drawer.invitation.description'}/>
            </Typography>
            <Grid container direction={'row'} justify={'space-between'} style={{marginTop: 8}}>
              <Grid item xs={10}>
                <input type="text" value={errorMessage || invitationCodeLink} className={classes.invitationInput} id={'urlInvitation'} readOnly={true} />
              </Grid>
              <Grid item xs={2}>
                <Button className={classes.invitationCopyBtn} aria-label='copy' onClick={this.copyUrl}>
                  <Typography style={{color: 'white'}}>
                    <FileCopy fontSize={'small'} fontWeight={'700'}/>
                  </Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid container style={{marginTop: 16}}>
              <InfoRounded style={{fontSize: '1.5rem', position: 'fixed', color: '#3276D2'}}/>
              <Typography variant="body1" style={{marginLeft: 25, fontWeight: '400', color: 'black'}}>
                <FormattedMessage id={'menu.drawer.invitation.infoUrl'}/>
              </Typography>
            </Grid>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default inject('organisationStore', 'authStore', 'commonStore')(
  injectIntl(observer(
    withStyles(styles, { withTheme: true })(Invitation)
  ))
);
