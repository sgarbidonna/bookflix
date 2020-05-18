import React, { Component } from 'react';

import axios from 'axios';
import ItemNovedadAdmin from './ItemListNovedadAdmin';
import { Link } from 'react-router-dom';



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
            console.log(err.response)});

    }
    async componentDidMount(){

        this.getData();
    }
   
  

    render() {

        
            return (
                <div>


                    <div>
                        <Link to ='/novedad/nueva' className='btn btn-success col-md-6 offset-md-3' > Cargar una novedad</Link>

                    </div>
                    {this.state.novedades.map(nove => 
                        <ItemNovedadAdmin novedad={nove}></ItemNovedadAdmin>)
                    }                  
                </div>
            )
        
        
    }
}
