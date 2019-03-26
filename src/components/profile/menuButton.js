import React from 'react';
import { Grow, Paper, Popper, MenuItem, MenuList, ClickAwayListener, IconButton, withStyles } from '@material-ui/core'
import {Edit} from "@material-ui/icons";
import {FormattedMessage} from "react-intl";

const styles = theme => ({
  root: {
    display: 'flex',
    borderRadius: 30,
    zIndex: 1,
    position: 'fixed',
  },
  button: {
    position: 'fixed',
    right: 0,
    margin: 16,
    padding: 0,
    minWidth: 40,
    height: 40,
    backgroundColor: 'white',
    color: theme.palette.secondary.main,
    boxShadow: 'none',
    opacity: 0.7,
    '&:hover': {
      backgroundColor: 'white',
      opacity: 1,
    }
  },
  paper: {
    marginTop: 8,
    marginRight: 16,
  }
});

class MenuButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }
  
  handleToggle = () => {
    this.setState(state => ({open: !state.open}));
  };
  
  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({open: false});
  };
  
  deleteAlert = () => {
    alert("Do you really want to delete this awesome profile ?")
  };
  
  render() {
    const {classes, urlUpdateCover, urlEditIntro, urlEditAboutMe, urlDeleteProfile} = this.props;
    const {open} = this.state;
    
    return (
      <div className={classes.root}>
        <IconButton
          className={classes.button}
          buttonRef={node => {
            this.anchorEl = node;
          }}
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          <Edit fontSize="default"/>
        </IconButton>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({TransitionProps, placement}) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem button component="a" href={urlUpdateCover}>
                      <FormattedMessage id="profile.updateCover"/>
                    </MenuItem>
                    <MenuItem button component="a" href={urlEditIntro}>
                      <FormattedMessage id="profile.editIntro"/>
                    </MenuItem>
                    <MenuItem button component="a" href={urlEditAboutMe}>
                      <FormattedMessage id="profile.editAboutMe"/>
                    </MenuItem>
                    <MenuItem button component="a" onClick={this.deleteAlert} href={urlDeleteProfile}>
                      <FormattedMessage id={'delete profile'}/>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>)}
        </Popper>
      </div>
    )
  }
}

export default withStyles(styles)(MenuButton);
