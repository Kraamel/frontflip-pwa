import React from 'react';
import {inject, observer} from 'mobx-react';
import {Grid, Grow, Paper, Popper, ClickAwayListener, Button, IconButton, withStyles} from '@material-ui/core'
import {Add} from "@material-ui/icons";

const styles = {
  root: {
    display: 'flex',
    zIndex: 1,
  },
  paper: {
    marginTop: 8,
    marginRight: 16,
  }
};

class AddContactField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }
  
  addLink= (typeOfField) => {
    this.props.recordStore.values.record.links.push({"type":typeOfField,"value":""})
    this.props.parent.forceUpdate();
    this.forceUpdate();
    // console.log(JSON.stringify(this.props.recordStore.values.record.links))
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
  
  render() {
    const {classes} = this.props;
    const {open} = this.state;
    let linkName = ['email','phone','linkedin','twitter','facebook','github','link']
    
    return (
      <div className={classes.root}>
        <Button
          fullWidth
          buttonRef={node => {
            this.anchorEl = node;
          }}
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          <Add fontSize="default"/>
          ADD MORE
        </Button>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({TransitionProps, placement}) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <Grid container style={{color: 'red'}} justify={'space-between'}>
                    {linkName.map((name, i) => {
                      return(
                        <Grid item key={i}>
                          <IconButton onClick={() => this.addLink(name)}>
                            <i className={`fa fa-${name}`}/>
                          </IconButton>
                        </Grid>
                      )
                    })}
                  </Grid>
                </ClickAwayListener>
              </Paper>
            </Grow>)}
        </Popper>
      </div>
    )
  }
}

export default inject('commonStore', 'recordStore')(
  observer(
    withStyles(styles)(AddContactField)
  )
);
