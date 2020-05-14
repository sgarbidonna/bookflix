
import React, { Component , useEffect} from 'react'
import { BrowserRouter as Router, link, Redirect, Link } from 'react-router-dom';

import HomeAdmin from './VistaAdmin/HomeAdmin';
import HomeSuscriptor from './VistaSuscriptor/HomeSuscriptor';
import axios from 'axios';
const soyAdminApi = 'http://localhost:4000/api/suscriptores/soyAdmin'

export default class Home extends Component {

    constructor(){
        super();
        this.state={
            user: '',
            token: sessionStorage.getItem('token'),
            soyAdmin:true
        };
        this.setSoyAdmin = this.setSoyAdmin.bind(this)
       
    }  
    async setSoyAdmin() {

        
        await axios.get(soyAdminApi,{
            
            headers:{'xaccess':this.state.token}  
        }).then(res =>{
            this.setState({
                soyAdmin : res.data
            });
            
        })
        .catch(err =>{console.log(err.response)});
    };

    render() {
        
        this.setSoyAdmin()
        return (
            this.state.token !== null ?  // si token es distinto de vacio pregunto por el admin
                this.state.soyAdmin 
                    ? <HomeAdmin></HomeAdmin> 
                    : <HomeSuscriptor></HomeSuscriptor>
                : <Redirect to="/login"/>
        )
    }
}
