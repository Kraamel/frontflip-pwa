import React from "react";
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import { Search } from './pages/Search';
import Profile from './components/profile/ProfileBox';
import OnboardWingzy from './pages/OnboardWingzy';
import OnboardProfile from './pages/OnboardProfile';
import RedirectUser from "./pages/RedirectUser";
import PasswordForgot from "./pages/auth/PasswordForgot";
import PasswordReset from "./pages/auth/PasswordReset";

export default class Routes extends React.Component {
    
    render() {
        return (
                
                <div>
                    <Switch>
                        {/* HOME PART */}
                        <Route exact path="/:organisationTag" component={Home} />
                        <Route exact path="/password/forgot" component={PasswordForgot}/>
                        <Route exact path="/password/reset/:token/:hash" component={PasswordReset}/> 

                        <Route path="/redirect" component={RedirectUser} />

                        <Route path="/pricing" component={null} />
                        <Route path="/terms" component={null} />
                        <Route path="/protectingYourData" component={null} />

                        {/* Login */}
                        <Route path="/login/:action" component={null} />

                        {/* Onboard : new wingzy*/}
                        <Route path="/onboard/wingzy" component={OnboardWingzy} />

                        {/* Onboard : new profile */}
                        <Route path="/onboard/profile" component={OnboardProfile} />

                        {/* Invitation */}
                        <Route path="/invite" component={null} />

                        {/* Profile */}
                        <Route path="/profile" component={Profile} />
                        <Route path="/profile/edit" component={null} />

                        {/* Search */}
                        <Route path="/search" component={Search} />

                        {/* Wingzy admin */}
                        <Route path="/admin/organisation" component={null} />
                        <Route path="/admin/user/list" component={null} />
                        {/* 404 Handle */}
                        <Route path="*" status={404} component={Home}/>
                    </Switch>
                </div>

        );
    }
}
