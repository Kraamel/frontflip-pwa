import React from 'react';
import {Avatar, Chip, withStyles} from '@material-ui/core';

const styles = theme => ({
    wingImg: {
        height: 48,
        width: 48,
        margin: '-5px -6px 0 -15px',
        boxShadow: 'none',
        backgroundColor: 'transparent',
        overflow: 'visible',
    },
    wingsColor: {
        ['&:hover']: {
            backgroundColor: theme.palette.secondary.dark
        },
    }
});

const Wing = ({src, label, ...props}) => {
    return (
        <Chip
            avatar={<Avatar className={props.classes.wingImg} src={src}/>}
            label={label} color={"secondary"} className={props.classes.wingsColor}>
        </Chip>
    )
};

export default withStyles(styles)(Wing)
