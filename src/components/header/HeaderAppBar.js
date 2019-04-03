import React, { Component } from 'react';
import { withStyles } from "@material-ui/core";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AppBar } from '@material-ui/core';
import './header.css';
import { styles } from './Header.css.js'
import HeaderToolBar from './HeaderToolBar';

class HeaderAppBar extends Component {
  render() {
    const { classes, open, auth} = this.props;

    return (
      <AppBar
        position="fixed"
        color="default"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <HeaderToolBar handleDrawerOpen={this.props.handleDrawerOpen}
          open={open} auth={auth}
        />
      </AppBar>
    )
  }
}

HeaderAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default
  withStyles(styles, { withTheme: true })(
    HeaderAppBar
  );
