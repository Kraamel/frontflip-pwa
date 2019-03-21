import React from 'react';
import {inject, observer} from 'mobx-react';
import {FormattedMessage} from 'react-intl';
import {Grid, Grow, Paper, Popper, ClickAwayListener, Button, IconButton, withStyles, Tooltip} from '@material-ui/core'
import {Add} from "@material-ui/icons";

const styles = theme => ({
  root: {
    display: 'flex',
    zIndex: 1,
    "& div[role=\"tooltip\"]": {
      zIndex: 9999,
      alignItems: 'center',
      width: '100%',
      textAlign: '-webkit-center',
    },
  },
  button: {
    color: 'white',
    backgroundColor: theme.palette.secondary.main
  },
  paper: {
    borderRadius: 30,
    width: 'calc(100% - 16px)',
    boxSizing: 'border-box',
    marginLeft: 13,
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
      <Grid container item className={classes.root} direction={'column'}>
        <Button
          className={classes.button}
          fullWidth
          buttonRef={node => {
            this.anchorEl = node;
          }}
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          <Add fontSize="default"/>
          <FormattedMessage id={'onboard.addMoreContact'}/>
        </Button>
        
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({TransitionProps, placement}) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{position:'abdsolute',left:0,right:0,margin:'auto'}}
            >
              <Grid item container xs={12} sm={8} md={6} lg={4} direction="column">
                <Paper className={classes.paper}>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <Grid container justify={'center'} alignItems={'center'} spacing={8}>
                      {linkName.map((name, i) => {
                        return (
                          <Grid item key={i}>
                            <Tooltip title={this.props.capitalize(name)}>
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
