import React, { Component } from 'react';

import axios from 'axios';
import DetalleLibro from './DetalleLibro';
import ItemListLibro from './ItemListLibro';



const libros= 'http://localhost:4000/api/libros/';
export default class ListarLibros extends Component {
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
        .catch(err =>{
            console.log('lista  de libros');
            console.log(err.response)});

    }
    async componentDidMount(){

        this.getData();
    }
   
  

    render() {

        
            return (
                <div>
                    {this.state.libros.map(lib => 
                        <ItemListLibro libro={lib}></ItemListLibro>)
                    }                  
                </div>
            )
        
        
    }
}
