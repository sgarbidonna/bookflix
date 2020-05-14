import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect,  } from 'react-router-dom';
import CargarGenero from '../VistaAdmin/Generos/CargarGenero';
import CargarMetadataLibro from '../VistaAdmin/Libros/CargarMetadataLibro';

export default class Home extends Component {

    constructor(){
        super();
        this.state={
            user:'',
            token: sessionStorage.getItem('token'),
        };
        this.cerrarSesion= this.cerrarSesions.bind(this);

    }

 
    cerrarSesion=()=>{
        sessionStorage.removeItem('token');
       
       
    }
    
    render() {
        return (
            !this.state.token == ''? 
                <div>
                     <h1>home Admin</h1>
                    <form onSubmit= {this.cerrarSesion}>
                        <button type= 'submit'> cerrar sesion </button>
                    </form>
                    
                    <CargarGenero> </CargarGenero>
                    <CargarMetadataLibro> </CargarMetadataLibro>
                    
                </div>
            :
            <Redirect to="/login"/>
        )
    }
}
