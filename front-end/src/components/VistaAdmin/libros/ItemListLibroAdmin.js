import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../../node_modules/axios';
const portada = 'http://localhost:4000/uploads/';

const eliminar = 'http://localhost:4000/api/libros/eliminar';
class ItemListLibro extends Component {
    constructor (props){
        super(props)


    }
    
  
    eliminarLibro = async () => {

        await axios.post(eliminar ,
            { id: this.props.libro._id },
            { headers: { 'xaccess': sessionStorage.getItem('token') } }

        ).then(res => {
            alert(res.data)
        })
            .catch(err => {
                alert(err.data)
        });

    }

    
    render() {

       
        return (
            <div>
                <div class="card-body" >
                </div>
                <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                     <div class="card-body">
                    
                     
                            <h5 className="card-title ">Titulo: {this.props.libro.titulo} </h5>
                            <Link className='btn btn-danger' to={'/libro/detalle/'+this.props.libro._id}  > 
                             Ver detalle 
                             </Link>
                             {' '}
                             <button className='btn btn-danger' onClick={this.eliminarLibro} >Eliminar</button> {''}
                            <Link to={'/libros/modificar/'+this.props.libro._id } className='btn btn-danger'> Modificar</Link>
                       
                        
                     </div>
                </div>
            </div>
        )
    }
}

export default  ItemListLibro ;