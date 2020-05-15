import React, { Component } from 'react';

import axios from 'axios';
import ItemNovedad from './ItemNovedad';
import ItemNovedadAdmin from './ItemListNovedadAdmin';



const novedades= 'http://localhost:4000/api/novedades/';
export default class ListarNovedades extends Component {
    constructor(){
        super();
        this.state={
            user: JSON.parse(sessionStorage.getItem('user')),
            token: sessionStorage.getItem('token'),
            novedades:[],
          
        }

    }
    setNovedades(res){
        console.log(res);
        this.setState({
            novedades:res
        });
    }

    getData = async () =>{
        const {user} = this.state.user;
        
      
        await axios.get(novedades,{
            user: user,
            headers:{'xaccess':this.state.token}  
        })
        .then(res =>{
            this.setNovedades(res.data)
        })
        .catch(err =>{
            console.log('lista de novedades');
            console.log(err.response)});

    }
    async componentDidMount(){

        this.getData();
    }
   
  

    render() {

        
            return (
                <div>
                    {this.state.novedades.map(nove => 
                        <ItemNovedadAdmin novedad={nove}></ItemNovedadAdmin>)
                    }                  
                </div>
            )
        
        
    }
}
