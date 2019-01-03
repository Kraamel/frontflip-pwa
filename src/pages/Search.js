import React from 'react'
import {Grid} from '@material-ui/core';
import Banner from '../components/utils/banner/Banner'
import SearchField from '../components/utils/searchField/SearchField';
import Card from '../components/card/CardProfile';

import bannerImg from '../resources/images/fly_away.jpg'

class Search extends React.Component {
    render() {
        return (
            <div>
                <Grid style={{position: 'relative'}} container direction={'column'} alignItems={'center'}>
                    <Grid style={{position: 'fixed', zIndex: 1000}} container item alignItems={"stretch"}>
                        <Banner src={bannerImg} />
                    </Grid>
                    <Grid style={{position: 'fixed', zIndex: 1001, width: '100%'}} xs={6} contaAuth updateiner item justify={"center"} alignItems={'center'}>
                        <SearchField/>
                    </Grid>
                    <Grid style={{height: '30vmax'}}>
                    </Grid>
                    <Grid container item direction={'column'} alignItems={'center'}>
                        <Grid item xs={10} sm={6}>
                            <Card/>
                        </Grid>
                        <Grid item xs={10} sm={6}>
                            <Card/>
                        </Grid>
                        <Grid item xs={10} sm={6}>
                            <Card/>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Search;
