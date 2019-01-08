import React from 'react'
import {inject, observer} from 'mobx-react';
import {TextField, withStyles} from '@material-ui/core';

const styles = {
    searchField: {
        marginTop: 10,
    }
};

class SearchField extends React.Component {
    
    constructor(props) {
        super(props);
        // Because we can't access to this in the class
        window.self = this;
    }
    
    componentDidMount() {
        window.self.props.organisationStore.setOrgTag('wingzy');
        window.self.props.organisationStore.getOrganisationForPublic()
            .then(() => {
                window.self.props.organisationStore.getAlgoliaKey();
            });
    };
    
    // handleSearchChange = (e) => {
    //     this.props.authStore.setSearch(e.target.value);
    // };
    
    // render(){
    //     const { values } = window.self.props.organisationStore;
    //     const { algoliaKey }  = window.self.props.commonStore;
    //     return(
    //         <div>
    //             This is the algolia key of {values.organisation.tag}
    //             <div>
    //                 {algoliaKey}
    //             </div>
    //         </div>
    //     );
    // }
    render() {
        return (
            <TextField className={this.props.classes.searchField}
                       error
                       label="Search"
                       type="search"
                       fullWidth
                       variant={"outlined"}
            />
        )
    }
}

export default inject("organisationStore", "commonStore")(
    observer(
        withStyles(styles)(
            SearchField
        )
    )
);
