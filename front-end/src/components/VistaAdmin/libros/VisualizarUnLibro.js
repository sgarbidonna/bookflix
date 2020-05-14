import React, { Component } from 'react';
import axios from 'axios';

const eliminar = 'http://localhost:4000/api/libros/eliminar'
const portada = 'http://localhost:4000/uploads/';

export default class UnLibro extends Component {

  render(){
   
    const eliminarLibro = async () => {

        await axios.post(eliminar ,
            { id: this.props.libro._id },
            { headers: { 'xaccess': this.props.token } }

        ).then(res => {
            alert(res.data)
        })
            .catch(err => {
                alert(err)
        });

    }
    return (
        
            <div className="card-body">
                <h5 className="card-title"> {this.props.libro.titulo}
                    <form>
                        <button type="button" className="btn btn-success" onClick={() => {eliminarLibro()}}> X </button>
                    </form>
                </h5>
                
                <h6 className="card-subtitle mb-2 text-muted">ISBN:{this.props.libro.isbn}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Autor: {this.props.libro.autor}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Genero: {this.props.libro.genero}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Editorial: {this.props.libro.editorial}</h6>
                <img width="280px" height="auto" src={portada + `${this.props.libro.portada}`} />
                <div></div>
                <h6 className="card-subtitle mb-2 text-muted">Fecha de lanzamiento: {this.props.libro.lanzamiento}</h6>
                {this.props.libro.expiracion !== ''} ? <h6 className="card-subtitle mb-2 text-muted">Fecha de expiración: {this.props.libro.expiracion}</h6>
               
                
            </div>
                  

      



    )
}
}
