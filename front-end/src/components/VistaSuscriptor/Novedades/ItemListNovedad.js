import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../../node_modules/axios';
const portada = 'http://localhost:4000/uploads/';


class ItemNovedad extends Component {
    constructor (props){
        super(props)


    }

    
    render() {

        return (
            <div>
                <div class="card-body" >
                </div>
                <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                     <div class="card-body">
                    
                        <Link to={'/suscriptor/novedad/'+this.props.novedad._id} className="card-title " > 
                            <h5 className="card-title ">Titulo: {this.props.novedad.titulo} </h5>
                        </Link>
                        <h6 className="card-subtitle mb-2 text-muted">Fecha de publicacion: {this.props.novedad.publicacion}</h6>
                     </div>
                </div>
            </div>
        )
    }
}

export default  ItemNovedad ;
