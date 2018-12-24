import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        bottom: 0,
        left: 0,
        padding: 10,
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#98C4CA',
        color: 'white',
    },
    image: {
        width: 20,
        height: 20,
    },
    item: {
        padding: 5,
    },
});

function FooterTestWeb(props) {
    const {classes} = props;
    
    return (
        <div className={classes.root}>
            <Grid container direction='row'>
                <Grid item xs={3}>
                    <img className={classes.image} src='https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/1259px-Twitter_Bird.svg.png' alt="wingzy_white"/>
                </Grid>
                <Grid item xs>
                    <p className={classes.item}>Wingzy is an intuitive app to find the coworkers you need according to what they love and know</p>
                </Grid>
                <Grid item xs={3}>
                    <img className={classes.image} src='https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/1259px-Twitter_Bird.svg.png' alt="wingzy_white"/>
                </Grid>
            </Grid>
            <Grid container xs>
                <Grid container xs={12} sm={6} direction='column'>
                    <a title="Learn more" className={classes.item}>Learn more</a>
                    <a title="Terms of Service" className={classes.item}>Terms of Service</a>
                </Grid>
                <Grid container xs={12} sm={6} direction='column'>
                    <a title="Protecting your data" className={classes.item}>Protecting your data</a>
                    <a title="Contact us" className={classes.item}>Contact us</a>
                </Grid>
            </Grid>
        </div>
    );
}

FooterTestWeb.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FooterTestWeb);


