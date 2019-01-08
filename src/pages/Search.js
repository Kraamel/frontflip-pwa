import React from 'react'
import {Grid, withStyles} from '@material-ui/core';
import Banner from '../components/utils/banner/Banner'
import SearchField from '../components/utils/searchField/SearchField';

import bannerImg from '../resources/images/fly_away.jpg'

const styles = {
    stickyComponent: {
        position: "sticky",
        top: 3,
        zIndex: 9999,
    },
    searchBanner: {
        position: 'relative',
        transition: 'opacity 0.8s'
    }
};

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerOpacity: 1,
        };
    }
    
    componentDidMount = () => {
        window.addEventListener('scroll', this.onScroll, false);
    };
    
    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.onScroll, false);
    };
    
    onScroll = () => {
        if (window.scrollY > 65) {
            this.setState({
                bannerOpacity: 0
            });
        } else {
            this.setState({
                bannerOpacity: 1
            });
        }
    };
    
    render() {
        
        return (
            <Grid container direction={'column'} alignItems={'center'}>
                <Grid container item alignItems={"stretch"} className={this.props.classes.searchBanner} style={{opacity: this.state.bannerOpacity}}>
                    <Banner src={bannerImg}/>
                </Grid>
                <Grid container item className={this.props.classes.stickyComponent} xs={6} sm={6} alignItems={'center'}>
                    <SearchField/>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Search)
