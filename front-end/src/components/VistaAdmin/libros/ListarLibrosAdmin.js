import React, { Component } from 'react';

import axios from 'axios';

import ItemListLibroAdmin from './ItemListLibroAdmin';
import { Link } from 'react-router-dom';



const libros= 'http://localhost:4000/api/libros/';
export default class ListarLibrosAdmin extends Component {
    constructor(){
        super();
        this.state={
            user: JSON.parse(sessionStorage.getItem('user')),
            token: sessionStorage.getItem('token'),
            libros:[],
          
        }

    }
    setLibros(res){
        console.log(res);
        this.setState({
            libros:res
        });
    }

    getData = async () =>{
        const {user} = this.state.user;
        
      
        await axios.get(libros,{
            user: user,
            headers:{'xaccess':this.state.token}  
        })
        .then(res =>{
            this.setLibros(res.data)
        })
        .catch();

    }
    async componentDidMount(){

        this.getData();
    }
   
  

    render() {

        
            return (
                <div>

               
                <div >
                    <Link to='/libro/nuevo' className='btn btn-success col-md-6 offset-md-3'>Cargar Metadata de un libro</Link>
                </div>

                <div>
                    {this.state.libros.map(lib => 
                        <ItemListLibroAdmin libro={lib}></ItemListLibroAdmin>)
                    }                  
                </div>
                </div>
            )
        
        
    }
}
