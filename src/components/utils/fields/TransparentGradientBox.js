import React from 'react'
import {withStyles} from "@material-ui/core";

const styles = theme => ({
  right: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 24,
    height: '100%',
    // eslint-disable-next-line
    backgroundImage: '-moz-linear-gradient(to right, rgba(205, 207, 229, 0), ' + theme.palette.primary.main + ')',
    // eslint-disable-next-line
    backgroundImage: '-webkit-gradient(to right, rgba(205, 207, 229, 0), ' + theme.palette.primary.main + ')',
    // eslint-disable-next-line
    backgroundImage: '-webkit-linear-gradient(to right, rgba(205, 207, 229, 0), ' + theme.palette.primary.main + ')',
    // eslint-disable-next-line
    backgroundImage: '-o-linear-gradient(to right, rgba(205, 207, 229, 0), ' + theme.palette.primary.main + ')',
    // eslint-disable-next-line
    backgroundImage: '-ms-linear-gradient(to right, rgba(205, 207, 229, 0), ' + theme.palette.primary.main + ')',
    // eslint-disable-next-line
    backgroundImage: 'linear-gradient(to right, rgba(205, 207, 229, 0), ' + theme.palette.primary.main + ')',
    zIndex: 2,
  },
  left: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 24,
    height: '100%',
    // eslint-disable-next-line
    backgroundImage: '-moz-linear-gradient(to right, ' + theme.palette.primary.main + ', rgba(205, 207, 229, 0))',
    // eslint-disable-next-line
    backgroundImage: '-webkit-gradient(to right, ' + theme.palette.primary.main + ', rgba(205, 207, 229, 0))',
    // eslint-disable-next-line
    backgroundImage: '-webkit-linear-gradient(to right, ' + theme.palette.primary.main + ', rgba(205, 207, 229, 0))',
    // eslint-disable-next-line
    backgroundImage: '-o-linear-gradient(to right, ' + theme.palette.primary.main + ', rgba(205, 207, 229, 0))',
    // eslint-disable-next-line
    backgroundImage: '-ms-linear-gradient(to right, ' + theme.palette.primary.main + ', rgba(205, 207, 229, 0))',
    // eslint-disable-next-line
    backgroundImage: 'linear-gradient(to right, ' + theme.palette.primary.main + ', rgba(205, 207, 229, 0))',
    zIndex: 2,
  }
})

class TransparentGradientBox extends React.Component {
  render() {
    const {classes, position} = this.props;
    
    return(
      <div className={classes[position]}/>
    )
  }
}

export default withStyles(styles, {withTheme: true})(TransparentGradientBox)
