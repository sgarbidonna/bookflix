import React, { Component } from 'react';
import axios from 'axios';
import ModificarUnLibro from './ModificarUnLibro';
import { Link } from 'react-router-dom';

const eliminar = 'http://localhost:4000/api/libros/eliminar';
const portada = 'http://localhost:4000/uploads/';
const me = 'http://localhost:4000/api/libros/me';

export default class DetalleLibrosAdmin extends Component {

    constructor(props){
        super(props);
        this.state={
            id: this.props.match.params.id,
            token: sessionStorage.getItem('token'),
            libro:'',
        }

    }
    getDatos=async()=>{
        await axios.post(me,
            { id: this.state.id },
            { headers:{'xaccess': this.state.token}}
        ).then(res =>{
            console.log(res.data);
            this.setState({
                libro:res.data
            })
        })
        .catch(err =>{console.log(err)});
    }
    
    async componentDidMount(){
     this.getDatos()
    }

    


  render(){
   
    


  
    
    return (
        <div class="card col-md-6 offset-md-3 text-light bg-dark" >
            <div className="card-body">
                <h4 className="card-title card-group"> {this.state.libro.titulo}</h4>
                <img width="280px" height="auto" src={portada + `${this.state.libro.portada}`} />
                <div></div>
                <h6 className="card-subtitle mb-2 text-muted">ISBN:{this.state.libro.isbn}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Autor: {this.state.libro.autor}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Genero: {this.state.libro.genero}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Editorial: {this.state.libro.editorial}</h6>
               
                <h6 className="card-subtitle mb-2 text-muted">Fecha de lanzamiento: {this.state.libro.lanzamiento}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Fecha de expiración: {this.state.libro.expiracion}</h6>
               
            </div>
                  
            </div>
      



    )
}
}
