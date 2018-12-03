import React from 'react'
import Button from '@material-ui/core/Button';
import InputWithRadius from '../components/utils/inputs/InputWithRadius';
import { Link } from "react-router-dom";
import Auth from './Auth';

export class Home extends React.Component {

    render(){
        return(
            <div>
                <InputWithRadius label='Your password'/>
                <Link to="/search">Go to search page</Link>
                <Auth/>
            </div>
        );
    }
}
