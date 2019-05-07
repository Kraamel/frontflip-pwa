import React from 'react';
import { inject, observer } from "mobx-react";
import { withStyles } from '@material-ui/core';
import { observe } from 'mobx';
import {Person} from '@material-ui/icons';

const styles = theme => ({
  searchBox: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    left:0,
    right:0,
    margin: 'auto',
    backgroundColor: 'white',
    borderRadius: 4,
    width: 100,
    padding: 16,
    textAlign: 'center',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    cursor: 'pointer',
    fontWeight: '600'
  },
  bottomShape: {
    position: 'absolute',
    bottom: -10,
    transform: 'rotate(45deg)',
    width: 20,
    height: 20,
    backgroundColor: 'white',
    left:0,
    right:0,
    margin:'auto',
    boxShadow: '0px 3px 6px rgba(0,0,0,0.16), 0px 3px 6px rgba(0,0,0,0.23)',
  },
  bottomShapeCover: {
    position: 'absolute',
    bottom:0,
    height: 15,
    width: 35,
    backgroundColor: 'white',
    left:0,
    right:0,
    margin:'auto',
  },
  searchCounter: {
    textAlign:'center',
    fontWeight: 'bold',
    fontSize: '1.2em',
    '& svg': {
      marginBottom: -10,
      marginRight: -5
    }
  }
});

class SearchButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      observer: () => {},
    }
  }

  componentDidMount() {
    this.setState({observer: observe(this.props.commonStore, 'searchResultsCount', (change) => {
      this.forceUpdate();
    })});
  }


  render() {
    const {classes} = this.props;
    const {searchResultsCount} = this.props.commonStore;

    return(
      <>
        <div className={classes.searchBox} onClick={this.props.onClick} >
          <div className={classes.searchCounter}>{searchResultsCount} <Person fontSize="large"/></div>
          <div className={classes.bottomShape} />
          <div className={classes.bottomShapeCover} />
        </div>
      </>
    );
  }
}

export default inject('commonStore')(
  observer(
    withStyles(styles)(SearchButton)
  )
);
