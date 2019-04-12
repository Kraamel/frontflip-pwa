import React from 'react'
import {Button, withStyles} from "@material-ui/core";
import classNames from 'classnames';
import {ArrowLeft, ArrowRight} from '@material-ui/icons';

const styles = {
  scrollLeft: {
    left: -64,
  },
  scrollRight: {
    right: -64,
  },
  scrollButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    border: 'none',
    color: 'rgba(0, 0, 0, 0.26)',
    fontSize: 45,
    padding: 0,
    overflow: 'hidden',
    minWidth: 0,
    width: 56,
  }
};


const CarouselArrows = ({scrollPosition, ...props}) => {
  return (
    <Button className={classNames(props.classes[scrollPosition], props.classes.scrollButton)} variant="outlined" {...props}>
      {scrollPosition === 'scrollRight' ? <ArrowRight fontSize="inherit"/> : <ArrowLeft fontSize="inherit"/>}
    </Button>
  )
}

export default withStyles(styles, {withTheme: true})(CarouselArrows)
