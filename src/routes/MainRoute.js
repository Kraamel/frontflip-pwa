import React from "react";
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import MainRouteOrganisation from './MainRouteOrganisation';
import {inject, observer} from 'mobx-react';

class MainRoute extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            locale: this.props.commonStore.getCookie('locale') || this.props.commonStore.locale,
            renderComponent: !this.props.authStore.isAuth()
        }
    }

    componentDidMount() {
        this.getUser();
    }

    async getUser() {
        if(this.props.authStore.isAuth()) {
            await this.props.userStore.getCurrentUser();
            if(!this.state.renderComponent) this.setState({renderComponent: true});
        }
    }
    
    render() {
        const {renderComponent, locale} = this.state;
        const endUrl = window.location.pathname + window.location.search;
        const {currentUser} = this.props.userStore.values;

        if(!currentUser) this.getUser();
        
        if(renderComponent) {
            return (
                <div>
                    <Switch>
                        <Route path="/:locale(en|fr|en-UK)" component={MainRouteOrganisation} />
                        <Redirect from="*" to={"/" + (locale ? locale : '') + endUrl}/>
                    </Switch>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }
}

export default inject('authStore', 'userStore', 'commonStore')(
    withRouter(observer(
        MainRoute
    ))
);
