import React from 'react';
import {inject, observer} from 'mobx-react';
import {Grid, Grow, Paper, Popper, ClickAwayListener, Fab, IconButton, withStyles, Tooltip} from '@material-ui/core'
import {Add} from "@material-ui/icons";

const styles = theme =>  ({
  addButton: {
    color: 'red',
    fontWeight: 30,
    backgroundColor: 'white',
    opacity: 0.7 + '!important',
    transition: 'all 250ms',
    '&:hover': {
      backgroundColor: 'white!important',
      opacity: 1 + '!important',
      filter: 'brightness(100%)!important'
    }
  },
  tip: {
    fontSize: 15,
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
  },
  paper: {
    borderRadius: 30,
    boxSizing: 'border-box',
    boxShadow: '0 0 0 2038px rgba(0,0,0,.5)',
  },
  contactButton: {
    fontSize: 24,
    width: 30,
    height: 30,
    '&::before': {
      position:'absolute',
      left:0,
      right:0,
      margin:'auto',
    }
  },
  btnPopup: {
    '&:first-child()': {
      position: 'absolute',
      left:0,
      right:0,
      margin: 'auto',
    }
  }
});

class AddContactField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }
  
  addLink = (typeOfField) => {
    this.props.addLink({type: typeOfField, value: ''});
    this.setState({open: false});
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
  
  getIcon = name => {
    switch (name) {
      case 'email':
        return name = 'envelope-o';
      case 'workplace':
        return name = 'user';
      case 'workchat':
        return name = 'comment';
      default:
        return name
    }
  }
  
  
  render() {
    const {classes} = this.props;
    const {open} = this.state;
    let linkName = ['email', 'phone', 'linkedin', 'twitter', 'facebook', 'github', 'link', 'workplace', 'workchat']
    
    return (
      <Grid container item  direction={'column'} alignItems={'center'}>
        <Fab
          className={classes.addButton}
          buttonRef={node => {
            this.anchorEl = node;
          }}
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          <Add fontSize="large"/>
        </Fab>
        
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({TransitionProps}) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{position:'abdsolute',left:0,right:0,margin:'auto'}}
            >
              <Grid item container direction="column">
                <Paper className={classes.paper}>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <Grid container justify={'center'} alignItems={'center'} spacing={8}>
                      {linkName.map((name, index) => {
                        return (
                          <Grid item key={index}>
                            <Tooltip title={this.props.capitalize(name)} classes={{ tooltip: classes.tip}}>
                              <IconButton onClick={() => this.addLink(name)} label={name}>
                                <i className={classes.contactButton + " fa fa-" + this.getIcon(name)}/>
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        )
                      })}
                    </Grid>
                  </ClickAwayListener>
                </Paper>
              </Grid>
            </Grow>)}
        </Popper>
      </Grid>
    )
  }
}

export default inject('commonStore', 'recordStore')(
  observer(
    withStyles(styles)(AddContactField)
  )
);
