import { withStyles, Button} from "@material-ui/core";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { styles } from './Header.css.js';
import './header.css';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from "mobx-react";
import { Link } from 'react-router-dom';

class HeaderLinks extends Component {
  render() {
    const { auth, classes} = this.props;
    const { locale } = this.props.commonStore;
    const orgTag = this.props.organisationStore.values.orgTag || this.props.organisationStore.values.organisation.tag;
    
    return (
      <div className={classes.fixToRight}>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          {!auth && (
            <Button variant="text" to={"/" + locale + (orgTag ? '/' + orgTag : '') + '/signin'} component={Link} className={classes.menuLink}><FormattedMessage id="Sign In" /></Button>
          )}
        </div>
      </div>

    )
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default inject('commonStore', 'organisationStore')(
  observer(
    withStyles(styles, { withTheme: true })(
      HeaderLinks
    )
  )
);
