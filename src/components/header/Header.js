import React, { Component } from 'react';
import { withStyles } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import PropTypes from 'prop-types';
import { CssBaseline} from '@material-ui/core';
import { Redirect } from "react-router-dom";
import './header.css';
import { styles } from './Header.css.js'
import HeaderAppBar from './HeaderAppBar';
import HeaderDrawer from './HeaderDrawer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successLogout: false,
      open: false,
      auth: this.props.authStore.isAuth()
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  
  handleLogout = () => {
    this.props.authStore.logout()
      .then(this.setState({ successLogout: true }));
  };

  handleDisplayProfile = (e, record) => {
    this.handleDrawerClose();
    this.props.handleDisplayProfile(e, record);
  }

  render() {
    const {open, successLogout, auth } = this.state;
    const { classes } = this.props;

    if (successLogout) return <Redirect to='/' />;
    
    return (
      <div className={classes.root}>
        <CssBaseline />
        <HeaderAppBar handleDrawerOpen={this.handleDrawerOpen}
          open={open} auth={auth}
        />
        <HeaderDrawer handleDrawerOpen={this.handleDrawerOpen}
          handleDrawerClose={this.handleDrawerClose}
          open={open} auth={auth}
          handleDisplayProfile={this.handleDisplayProfile}
        />
        <div className={classes.drawerHeader}/>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default inject('commonStore', 'userStore', 'authStore', 'organisationStore')(
  observer(
    withStyles(styles, { withTheme: true })(
      App
    )
  )
);
