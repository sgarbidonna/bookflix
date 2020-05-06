
import React, { Component , useEffect} from 'react'
import { BrowserRouter as Router, link, Redirect, Link } from 'react-router-dom';

import HomeAdmin from './VistaAdmin/HomeAdmin';
import HomeSuscriptor from './VistaSuscriptor/HomeSuscriptor';


export default class Home extends Component {

    constructor(){
        super();
        this.state={
            user:'',
            token: sessionStorage.getItem('token'),
            soyAdmin: false,
            // se debe setear el tipo de usuario
        };
        
       
    }  
   
    

    render() {
        return (
            !this.state.token == ''? 
                this.state.soyAdmin?

                <HomeAdmin></HomeAdmin>
                :
                
                <HomeSuscriptor></HomeSuscriptor>
            :<Redirect to="/login"/>
        )
    }
}
