import React from 'react'
import {Grid, Button, CircularProgress, Typography, withStyles} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';
import AlgoliaService from '../../services/algolia.service';
import { inject, observer } from 'mobx-react';
import { observe } from 'mobx';

import chat from '../../resources/images/chat.png';

const styles = theme => ({
  image: {
    width: '47rem',
    height: 'auto',
    [theme.breakpoints.down('xs')]: {
      width: '24rem',
      height: 'auto',
    },
  },
  text: {
    textAlign: 'center',
    margin: 16,
    color: theme.palette.primary.dark,
    fontWeight: '600'
  }
});

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      page: 0,
      loadInProgress: true,
      hideShowMore: false,
      hitsAlreadyDisplayed: 0,
      observer: () => {}
    };
  }
  
  componentDidMount() {
    AlgoliaService.setAlgoliaKey(this.props.commonStore.algoliaKey);
    this.fetchHits(this.props.filters, this.props.query, null, null);
    
    this.setState({observer : observe(this.props.commonStore, 'algoliaKey', (change) => {
        AlgoliaService.setAlgoliaKey(this.props.commonStore.algoliaKey);
        this.fetchHits(this.props.filters, this.props.query, null, null);
    })});
  }
  
  componentWillUnmount() {
    this.state.observer();
  }
  
  fetchHits = (filters, query, facetFilters, page) => {
    AlgoliaService.fetchHits(filters, query, facetFilters, page)
      .then((content) => {
        
      if(!content) return;
        this.setState({hitsAlreadyDisplayed: Math.min((content.hitsPerPage * (content.page)), content.nbHits)});
      if(content.page === (content.nbPages-1)) this.setState({hideShowMore: true});
      if(page) this.setState({hits: this.state.hits.concat(content.hits)}, this.endTask());
        else this.setState({hits: content.hits}, this.endTask());
        
    }).catch((e) => {this.setState({hits: []})});
  }
  
  endTask = () => {
    this.setState({loadInProgress: false});
  }
  
  handleShowMore = (e) => {
    this.setState({page: this.state.page+1, loadInProgress: true}, () => {
      this.fetchHits(this.props.filter, this.props.query, null, this.state.page);
    });
  }
  
  
  render() {
    const {hits, loadInProgress, hideShowMore, hitsAlreadyDisplayed} = this.state;
    const {addToFilters, handleDisplayProfile, classes, HitComponent} = this.props;
    return (
      <div className={classes.hitList}>
        {hits.length === 0  && (
          <Grid container item justify={"center"} alignItems={'center'} direction={'column'}>
            <Grid item>
            <Typography variant="h4" className={classes.text} >
              <FormattedMessage id={"nobody.searchList"}/>
            </Typography>
            </Grid>
            <Grid item>
              <img src={chat}  alt={'chat'} className={classes.image}/>
            </Grid>
          </Grid>
        )}
        <ul>
          {hits.map((hit, i) => {
          return(
            <li key={i} style={{WebkitAnimationDelay: (0.2*(i-hitsAlreadyDisplayed))+'s', animationDelay: (0.2*(i-hitsAlreadyDisplayed))+'s'}}>
              <Grid item xs={12} sm={8} md={6} lg={4} className={classes.cardMobileView} >
                <HitComponent hit={hit} addToFilters={addToFilters} handleDisplayProfile={handleDisplayProfile} />
                </Grid>
              </li>
            );
          })}
          {!hideShowMore && (
            <li>
              <Grid item xs={12} sm={8} md={6} lg={4} className={classes.cardMobileView} container justify={"center"} alignContent={"center"}>
                {loadInProgress && (
                <CircularProgress color="secondary" />
                )}
                {!loadInProgress && (
                <Button onClick={(e) => this.handleShowMore(e)}><FormattedMessage id="search.showMore" /></Button>
                )}
              </Grid>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default inject('commonStore')(
  observer(
    withStyles(styles)(SearchResults)
  )
);
