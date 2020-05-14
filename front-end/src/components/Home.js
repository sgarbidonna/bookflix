
import React, { Component } from 'react'
import { Redirect} from 'react-router-dom';

import HomeAdmin from './VistaAdmin/HomeAdmin';
import HomeSuscriptor from './VistaSuscriptor/HomeSuscriptor';
import axios from 'axios';
//import Navegacion from './Navegacion';
import VisualizacionInicial from './VisualizacionInicial';

const soyAdminApi = 'http://localhost:4000/api/suscriptores/soyAdmin'

export default class Home extends Component {

    constructor(){
        super();
        this.state={
            user: '',
            token: sessionStorage.getItem('token'),
            soyAdmin: true
        };
        this.setSoyAdmin = this.setSoyAdmin.bind(this)
       
    }  
    componentDidMount(){
        this.setSoyAdmin();
    }
    async setSoyAdmin() {
        await axios.get( soyAdminApi ,{
            headers:{'xaccess':this.state.token}  
        }).then(res =>{
            this.setState({
                soyAdmin : res.data
            });
        })
    };

    render() {
        return (
            (this.state.token == '' || null) ?  
                <VisualizacionInicial/>

            :    this.state.soyAdmin 
                    ? <HomeAdmin></HomeAdmin> 
                    : <HomeSuscriptor></HomeSuscriptor>
                    
             
                
        )
    }
}
//<Navegacion/>