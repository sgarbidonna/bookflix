import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import ListarNovedades from './Novedades/ListarNovedades';
import Carrusel from './Carrusel';



export default class Home extends Component {

    constructor(){
        super();
        this.state={
            user: JSON.parse(sessionStorage.getItem('user')),
            token: sessionStorage.getItem('token'),
            libros: null
        };
        this.cerrarSesion= this.cerrarSesion.bind(this);

    }

 
    cerrarSesion = () =>{
        sessionStorage.removeItem('token');
       
       
    };
    async componentDidMount() {
        this.getData();
    }

    getData = async () => {
        //const {user} = this.state.user;
        //const token = this.state.token;

    }
   
    
    render() {
        return (
            !this.state.token === ''? 

                <div>
                     <h1>home suscriptor</h1>
                    <form onSubmit= {this.cerrarSesion}>
                        <button type= 'submit'> cerrar sesion </button>
                    </form>
                    
                    <Carrusel> </Carrusel>
                    <ListarNovedades> </ListarNovedades>
                   

                    
                </div>
            :
            <Redirect to="/login"/>
        )
    }
}
