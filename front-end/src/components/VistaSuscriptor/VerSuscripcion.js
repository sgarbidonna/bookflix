import React, { Component } from 'react';

import axios from 'axios';


//Constante a la cual hacemos la consulta
const suscriptores= 'http://localhost:4000/api/suscriptores/me';

export default class MiSuscripcion extends Component {
    constructor(){
        super();
        this.state={
            token: sessionStorage.getItem('token'),
            miSuscripcion:[]
            
        }

    }
    

    setSusripcion(res){
        console.log(res);
        this.setState({
            miSuscripcion:res
        });
    }

    getData = async () =>{
        await axios.get(suscriptores,{
            headers:{'xaccess':this.state.token}  
        })
        .then(res =>{
            this.setSusripcion(res.data)
        })
        .catch(err =>{
            alert(err.response)});

    }
    async componentDidMount(){

        this.getData();
    }

    render() {
        return (
            <div>
            <div class="card col-md-7 offset-md-3 text-light bg-dark" >
                <h5 class="card-title">Mi Suscripción: </h5>
                    <div class="card-body">
                        <h5 class="card-title">Nombre: {this.state.miSuscripcion.nombre}</h5>
                        <h6 class="card-subtitle mb-2 ">Email: {this.state.miSuscripcion.email}</h6>
                        <h6 class="card-subtitle mb-2 ">Contraseña: {this.state.miSuscripcion.password}</h6>
                        <h6 class="card-subtitle mb-2 ">Tipo de suscripción: {this.state.miSuscripcion.suscripcion}</h6>
                    </div>
            </div>


        </div>
        )
    }
}
