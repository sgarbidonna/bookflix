import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect,  } from 'react-router-dom';
import Genero from '../VistaAdmin/Generos/GeneroCRUD';
import Editorial from '../VistaAdmin/Editoriales/EditorialCRUD';
import CargarMetadataLibro from '../VistaAdmin/Libros/CargarMetadataLibro';
import CargarNovedad from '../VistaAdmin/Novedades/CargarNovedad';

export default class Home extends Component {

    constructor(){
        super();
        this.state={
            user:'',
            token: sessionStorage.getItem('token'),
        };
        this.cerrarSesion= this.cerrarSesion.bind(this);

    };

 
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
                    <Editorial> </Editorial>
                    <CargarNovedad> </CargarNovedad>
                    <Genero> </Genero>
                    <CargarMetadataLibro> </CargarMetadataLibro>
                    
                </div>
            :
            <Redirect to="/login"/>
        )
    }
}
