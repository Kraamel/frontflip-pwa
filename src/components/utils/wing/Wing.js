import React from 'react';
import { Avatar, Chip, withStyles } from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
  wingImg: {
    height: 48,
    width: 48,
    margin: '-5px -6px 0 -15px',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
  highlighted: {
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark  + ' !important',
      color: 'white'  + ' !important'
    }
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark + ' !important'
    }
  },
  suggestionWing: {
    backgroundColor: 'white',
    color: theme.palette.primary.dark,
    transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,.08)',
      color: theme.palette.primary.dark,
    }
  },
  removable: {
    paddingRight: 0,
    '&:hover': {
      backgroundColor: theme.palette.primary.main + ' !important',
    }
  },
  animated: {
    background: theme.palette.secondary.main,
    color: 'white',
    transform: 'scale(0)',
    animation: '450ms ease-in wingEaseIn',
    animationFillMode: 'forwards',
  },
  bigWing: {
    transform: 'scale(1.3)',
    marginTop: 32,
    marginLeft: 32,
    marginRight: 32
  },
  '@keyframes wingEaseIn': {
    from: {
      background: theme.palette.secondary.main,
      color: 'white',
      transform: 'scale(0)',
    },
    '75%': {
      background: theme.palette.secondary.main,
    },
    to: {
      background: theme.palette.primary.main,
      color: theme.palette.primary.dark,
      transform: 'scale(1)',
    }
  }
});

const Wing = ({ src, label, ...props }) => {
  if (src) {
    return (
      <Chip
        avatar={<Avatar className={props.classes.wingImg} src={src} alt="wings-img"/>}
        label={label}
        color={"primary"}
        className={classNames(props.classes[props.className], (props.onDelete ? props.classes.removable : null) )}
        onClick={props.onClick}
        onDelete={props.onDelete}
        onMouseDown={props.onMouseDown}
        onMouseUp={props.onMouseUp}
        onBlur={props.onBlur}
        >
      </Chip>
    )
  } else {
    return (
      <Chip
        label={label}
        color={"primary"}
        className={classNames(props.classes[props.className], (props.onDelete ? props.classes.removable : null))}
        onClick={props.onClick}
        onDelete={props.onDelete}
        onMouseDown={props.onMouseDown}
        onMouseUp={props.onMouseUp}
        onBlur={props.onBlur}>
      </Chip>
    )
  }

};

export default withStyles(styles)(Wing)
