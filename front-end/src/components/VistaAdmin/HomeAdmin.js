import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect,  } from 'react-router-dom';
export default class Home extends Component {

    constructor(){
        super();
        this.state={
            user:'',
            token: sessionStorage.getItem('token'),
        };
        this.cerrarSesion= this.cerrarSesion.bind(this);

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
                    
                </div>
            :
            <Redirect to="/login"/>
        )
    }
}
