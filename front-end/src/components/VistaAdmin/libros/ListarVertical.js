import React, { Component } from 'react';
import axios from 'axios';
import VisualizarUnLibro from './VisualizarUnLibro';


const libros = 'http://localhost:4000/api/libros';


export default class ListarVertical extends Component {

    constructor() {
        super();
        this.state = {
            token: sessionStorage.getItem('token'),
            libros: [],
            libro: '',
        }
       

    }


async componentDidMount(){
    await axios.get(libros, {
        headers: { 'xaccess': this.state.token }
    })
        .then(res => {
            this.setState({
                libros: res.data
            });
        })
        .catch(err => {
            console.log(err)
        });
}


render() {
    return (
        <div>
            <div className="card col-md-6 offset-md-3 text-light bg-dark" >
                <h5 className="card-title">Libros: </h5>
                    {this.state.libros.map(libro => 

                        <VisualizarUnLibro key={libro._id} libro={libro} token={this.state.token}/> )}
            </div>
        </div>
    )
}
}