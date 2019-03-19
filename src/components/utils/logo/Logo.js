import React from 'react';
import {Avatar} from '@material-ui/core';
import {observe} from 'mobx';
import {inject, observer} from "mobx-react";

import  premiumLogo from '../../../resources/images/goldenWingzy.png'
const defaultLogo = 'https://pbs.twimg.com/profile_images/981455890342694912/fXaclV2Y_400x400.jpg';


class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type || 'organisation',
      source: null,
      observer: () => {
      },
    }
  }
  
  componentDidMount() {
    if (this.state.type === 'organisation') {
      this.setState({
        source:
          ((this.props.organisationStore.values.organisation.logo && this.props.organisationStore.values.organisation.logo.url) ?
            this.props.organisationStore.values.organisation.logo.url : defaultLogo)
      });
      
      this.setState({
        observer: observe(this.props.organisationStore.values, 'organisation', (change) => {
          let org = this.props.organisationStore.values.organisation;
          this.setState({source: (org.logo && org.logo.url ? org.logo.url : defaultLogo)});
        })
      });
    }
    if (this.state.type === 'wingzy') {
      this.setState({
        source: defaultLogo
      });
    }
    if (this.state.type === 'premium') {
      this.setState({
        source: premiumLogo
      });
    }
  }
  
  
  componentWillUnmount() {
    this.state.observer();
  }
  
  render() {
    const {source} = this.state;
    
    return (
      <Avatar src={source || this.props.src} alt="org-logo" className={this.props.className} style={{backgroundColor: 'white', ...this.props.style}}/>
    )
  }
}

export default inject('organisationStore')(
  observer(
    Logo
  )
);
