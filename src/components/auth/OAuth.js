import React, { Component } from 'react'
import io from 'socket.io-client'
import {injectIntl} from 'react-intl';
import {inject, observer} from 'mobx-react';
import {withTheme, withStyles} from '@material-ui/core/styles';

import GoogleButton from '../utils/buttons/GoogleButton';
import SlackService from '../../services/slack.service';
import { CircularProgress } from '@material-ui/core';

const socket = io(
  (process.env.NODE_ENV === 'production' ? 'https://' : 'http://') +
  process.env.REACT_APP_API_ROOT_AUTH);

class OAuth extends Component {
  
  state = {
    disabled: '',
  }  

  componentDidMount() {
    const { provider } = this.props

    socket.once(provider, user => {
      SlackService.notifyError('Socket response fetch with socket id: '+socket.id + ' ||| ' + JSON.stringify(user), 49, 'quentin', 'oauth.js');
      if(this.popup) this.popup.close()
      this.props.manageGoogleCb(user.temporaryToken, JSON.parse(user.state));
    })
  }

  checkPopup() {
    const check = setInterval(() => {
      SlackService.notifyError('Check popup with socket id: '+socket.id, 49, 'quentin', 'oauth.js');

      const { popup } = this
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check)
        this.setState({ disabled: ''})
      }
    }, 1000)
  }

  makeState = () => {
    let state = {};
    if (this.props.organisationStore.values.orgTag) state.orgTag = this.props.organisationStore.values.orgTag
    if (this.props.organisationStore.values.organisation.tag) state.orgTag = this.props.organisationStore.values.organisation.tag;
    if (this.props.authStore.values.invitationCode) state.invitationCode = this.props.authStore.values.invitationCode;
    return state;
  }

  openPopup() {
    SlackService.notifyError('Open popup with socket id: '+socket.id, 49, 'quentin', 'oauth.js');
    const { provider} = this.props
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = (process.env.NODE_ENV === 'production' ? 'https://' : 'http://') +
    `${process.env.REACT_APP_API_ROOT_AUTH}/${provider}?socketId=${socket.id}&state=${JSON.stringify(this.makeState())}`

    return window.open(url, '',       
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }

  startAuth = () => {
    if (!this.state.disabled) {
      this.popup = this.openPopup()  
      this.checkPopup()
      this.setState({disabled: 'disabled'})
    }
  }

  closeCard = () => {
  }

  render() {    
    const {disabled} = this.state;
    return (
      <div style={{textAlign: 'center'}}>
      {!disabled && (
        <GoogleButton fullWidth={true} onClick={this.startAuth} />
      )}
      {disabled && (
        <CircularProgress />
      )}
      </div>
    )
  }
}

export default inject('authStore', 'organisationStore', 'commonStore', 'userStore', 'recordStore')(
  withTheme()(
    withStyles(null, {withTheme: true})(
      injectIntl(observer((OAuth)))
    )
  )
);