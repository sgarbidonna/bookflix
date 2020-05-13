import React, { Component } from 'react';

import axios from 'axios';


//Constante a la cual hacemos la consulta
const generos= 'http://localhost:4000/api/generos/';

export default class ListarNovedades extends Component {
    constructor(){
        super();
        this.state={
            user: JSON.parse(sessionStorage.getItem('user')),
            token: sessionStorage.getItem('token'),
            generos:[]
        }

    }
    

    setGeneros(res){
        console.log(res);
        this.setState({
            generos:res
        });
    }

    getData = async () =>{
        const {user} = this.state.user;
        
      
        await axios.get(generos,{
            user: user,
            headers:{'xaccess':this.state.token}  
        })
        .then(res =>{
            this.setGeneros(res.data)
        })
        .catch(err =>{
            console.log('lista de generos');
            console.log(err.response)});

    }
    async componentDidMount(){

        this.getData();
    }

    render() {
        return (
            <div>

               


                {this.state.generos.map(gene => 
                     <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                     <div class="card-body">
                        <h5 class="card-title">{gene.nombre}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{gene._id}</h6>
                     </div>
                     </div>
                )}    
               
            </div>
        )
    }
}
