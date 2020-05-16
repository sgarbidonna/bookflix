import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../../node_modules/axios';

const eliminar = 'http://localhost:4000/api/novedades/eliminar'

class ItemNovedadAdmin extends Component {
    constructor (props){
        super(props)


    }
    eliminarNovedad = async () => {
        console.log(this.props.novedad._id );
        await axios.post(eliminar ,
            { id: this.props.novedad._id },
            { headers: { 'xaccess':sessionStorage.getItem('token') } }

        ).then(res => {
            alert(res.data)
        })
            .catch(err => {
                alert(err)
        });
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
                        <div>
                            <button className='btn btn-danger' onClick={this.eliminarNovedad} >Eliminar</button> {''}

                            <Link to={'/novedades/modificar/'+this.props.novedad._id } className='btn btn-success'> Modificar</Link>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}

export default  ItemNovedadAdmin;
