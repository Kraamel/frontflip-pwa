import React, { Component } from 'react';
import { withStyles, Fab } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import PropTypes from 'prop-types';
import { Toolbar } from '@material-ui/core';
import './header.css';
import { styles } from './Header.css.js'
import HeaderLinks from './HeaderLinks';
import Logo from '../utils/logo/Logo';

class HeaderToolBar extends Component {
  render() {
    const { classes, auth } = this.props;

    return (
      <Toolbar className={classes.toolbar}>
        <Fab variant="extended" className={classes.menuButton}
                    onClick={this.props.handleDrawerOpen} 
                    children={<Logo />} />

        {!auth && (
          <HeaderLinks auth={auth}/>
        )}
      </Toolbar>
    )
  }
}

HeaderToolBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default inject('authStore', 'organisationStore')(
  observer(
    withStyles(styles, { withTheme: true })(
      HeaderToolBar
    )
  )
);
