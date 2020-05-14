import React, { Component } from 'react';

import axios from 'axios';


//Constante a la cual hacemos la consulta
const libros = 'http://localhost:4000/api/libros';
const portada = 'http://localhost:4000/uploads/';
export default class ListarLibros extends Component {
    constructor() {
        super();
        this.state = {
            token: sessionStorage.getItem('token'),
            libros: []
        }

    }


    setLibros(res) {
        console.log(res);
        this.setState({
            libros: res
        });
    }

    getData = async () => {
        await axios.get(libros, {
            headers: { 'xaccess': this.state.token }
        })
            .then(res => {
                this.setLibros(res.data)
            })
            .catch(err => {
                console.log('lista de Libros');
                console.log(err.response)
            });

    }

    

async componentDidMount(){

    this.getData();
    
}

render() {
    return (
        <div>
            <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                <h5 class="card-title">Libros: </h5>
                {this.state.libros.map(libros =>

                    <div class="card-body">
                        <h5 class="card-title">Titulo: {libros.titulo}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">ISBN: {libros.isbn}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Autor: {libros.autor}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Genero: {libros.genero}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Editorial: {libros.editorial}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Fecha de lanzamiento: {libros.lanzamiento}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Fecha de expiración: {libros.expiracion}</h6>
                        <img src={portada + `${libros.portada}`}></img>






                    </div>
                )}
            </div>


        </div>
    )
}
}

