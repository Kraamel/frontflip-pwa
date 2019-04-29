import React from 'react';
import { withStyles} from '@material-ui/core';


const styles = theme => ({
  dispo: {
    width: 26,
    height: 26,
    borderRadius: 30,
    backgroundColor: '#C2CACF',
    zIndex: 9000,
    [theme.breakpoints.down('xs')]: {
      width: 20,
      height: 20,
    }
  }
});

class Availability extends React.Component {
  render() {
    const {classes} = this.props;
  
    return( <div className={`${classes.dispo} ${this.props.available}`}/> )
  }
}

export default withStyles(styles)(Availability);


