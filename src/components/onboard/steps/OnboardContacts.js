import React from 'react'
import {inject, observer} from "mobx-react";
import {withStyles, Grid, TextField, InputAdornment, IconButton, Typography} from '@material-ui/core';
import {Clear} from '@material-ui/icons';
import AddContactField from '../../utils/fields/AddContactField';
import ProfileService from "../../../services/profile.service";
import {FormattedMessage} from "react-intl";

const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

const styles = theme => ({
  link: {
    animation: 'linkPop ease 1s',
    animationFillMode: 'forwards',
  },
  '@keyframes linkPop': {
    from: { width: 0},
    to: { width: '100%' }
  },
  defaultLink: {
    width: '100%',
  }
});


class OnboardContacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: this.props.recordStore.values.record.links || [],
      newLinkIndex: null,
    }
  }
  
  componentDidMount() {
    this.setDefaultLinks();
  }
  
  handleLinksChange = (e, link, index) => {
    link.value = e.target.value;
    
    let links = this.state.links;
    links[index].value = e.target.value;
    this.props.recordStore.values.record.links = links;
    this.setState({links});
  }
  
  deleteLink = (infoToBeDeleted) => {
    this.props.recordStore.values.record.links = this.props.recordStore.values.record.links.filter(item => {
      return item._id !== infoToBeDeleted
    })
    
    this.setState({links: this.props.recordStore.values.record.links});
    this.props.handleSave(['links']);
  }
  
  addLink = (link) => {
    this.props.recordStore.values.record.links.push(link);
    this.setState({links: this.props.recordStore.values.record.links, newLinkIndex: this.props.recordStore.values.record.links.length-1});
  }
  
  getLinkByType = (typeWanted) => {
    return (this.props.recordStore.values.record.links.find(link => link.type === typeWanted));
  }
  
  setTypeInput = (type) => {
    switch (type) {
      case 'email':
        return type = 'email';
      case 'phone':
        return type = 'tel';
      default:
        return type = 'text';
    }
  }
  
  setTypePattern = (pattern) => {
    switch (pattern) {
      case 'email':
        return pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
      case 'phone':
        return pattern = '/^(\\([0-9]{10}\\)/';
      default:
        return pattern = 'text';
    }
  }
  
  capitalize = (string) =>
  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  setDefaultLinks = () => {
    let types = ['email', 'phone', 'linkedin'];
    let links = this.state.links;
    for (let type of types) {
      if (!this.getLinkByType(type)) {
        links.push({"type": type, "value": ""});
      }
    }
    this.setState({links});
  };
  
  render() {
    const {links, newLinkIndex} = this.state;
    const {classes} = this.props;
    ProfileService.transformLinks(this.props.recordStore.values.record);
    return (
      <Grid container style={{minHeight: 'calc(100vh - 73px)', background: this.props.theme.palette.primary.main}} direction="column" alignItems="center">
        <Grid item xs={12} sm={8} md={6} lg={4} style={{width: '100%'}}>
          <Grid item style={{padding: 8}}>
            <Typography variant="h4" style={{textAlign: 'center', padding: 8, color:this.props.theme.palette.primary.dark}}>
              <FormattedMessage id={'onboard.yourContact'}/>
            </Typography>
          </Grid>
            {links && links.map((link, i) => {
              link.value = entities.decode(link.value);
              return (
                <Grid item key={i} style={{padding: 8}}>
                  <TextField
                    className={( (newLinkIndex && i === newLinkIndex) ?  classes.link : classes.defaultLink)}
                    label={this.capitalize(link.type)}
                    type={this.setTypeInput(link.type)}
                    pattern={this.setTypePattern(link.type)}
                    variant={"outlined"}
                    value={link.value}
                    onChange={(e) => this.handleLinksChange(e, link, i)}
                    onBlur={() => this.props.handleSave(['links'])}
                    placeholder={this.capitalize(link.type)}
                    InputProps={{
                      pattern:this.setTypePattern(link.type),
                      startAdornment: (
                        <InputAdornment position="start" style={{fontSize: 24}}>
                          <i className={"fa fa-" + link.icon}/>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <IconButton position="end" onClick={() => {
                          this.deleteLink(link._id)
                        }}>
                          <Clear fontSize="default"/>
                        </IconButton>
                      )
                    }}
                  />
                </Grid>
              )
            })}
            <Grid item style={{width: '100%', padding: 8}}>
              <AddContactField parent={this} handleSave={this.props.handleSave} addLink={this.addLink} capitalize={this.capitalize}/>
            </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default inject('commonStore', 'recordStore')(
  observer(
    withStyles(styles, {withTheme: true})(OnboardContacts)
  )
);
