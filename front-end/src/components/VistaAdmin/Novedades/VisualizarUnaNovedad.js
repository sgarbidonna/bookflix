import React, { Component } from 'react';
import axios from 'axios';

const eliminar = 'http://localhost:4000/api/novedades/eliminar'
const portada = 'http://localhost:4000/uploads/';

export default class UnaNovedad extends Component {

  render(){
   
    const eliminarNovedad = async () => {
        
        await axios.post(eliminar ,
            { id: this.props.novedad._id },
            { headers: { 'xaccess': this.props.token } }

        ).then(res => {
            
            alert(JSON.stringify(res.data));
        })

        .catch(err => {
            alert(JSON.stringify(err.data))
        } );
    }
    return (
        
            <div className= "card  text-light bg-dark">
                <div className="card-body">
                
                <img alt='' width="300px" height="auto" src={portada + `${this.props.novedad.portada}`} />
                
                
                <form>
                    <button type="button" className="btn btn-success" onClick={() => {eliminarNovedad()}}> X </button>
                </form>
                <h5 class="card-title"> {this.props.novedad.titulo} </h5>
                <h6 class="card-subtitle mb-2 text-muted">{this.props.novedad.descripcion}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Publicada: {this.props.novedad.publicacion}</h6>
                
              
                </div>
            </div>

      



    )
}
}
