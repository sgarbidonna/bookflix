import React, { Component } from 'react';

import axios from 'axios';

const autores = 'http://localhost:4000/api/autores/';
const cargar = 'http://localhost:4000/api/autores/cargar';
const borrar = 'http://localhost:4000/api/autores/eliminar/';
const modificar = 'http://localhost:4000/api/autores/modificar/';


class Autor extends Component {
    constructor() {
        super();
        this.state = {
            user: JSON.parse(sessionStorage.getItem('user')),
            token: sessionStorage.getItem('token'),
            
            autores: [],
            nombre: '',
            apellido:'',
            id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.agregarAutor = this.agregarAutor.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        
    }

    handleChange= (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    agregarAutor = async (e) => {
        e.preventDefault();

        await axios.post(cargar,
            { nombre: this.state.nombre,
            apellido: this.state.apellido },
            { headers: { 'xaccess': this.state.token } }

        ).then(res => {
            alert('Se cargó un autor');
            this.getData()
        })

        .catch(err => {
            alert(err)
        } );

    };

    async getData() {
        await axios.get(autores, 
            { headers: { 'xaccess': this.state.token }
        })
            .then(res => {
                this.setState({
                    autores: res.data
                });
            })
            .catch(err => {
                alert(err)
            });

    }
    async componentDidMount() {
        await this.getData();
    };

    onInputChange2 = (e) => {
       this.setState({
            id: e.target.value
        });
    };

    eliminarAutor = async (e) => {
        e.preventDefault();

        await axios.post(borrar ,
            { id: this.state.id },
            { headers: { 'xaccess': this.state.token } }

        ).then(res => {
            alert('Autor eliminado');
            this.getData();
        })
            .catch(err => {
                alert(err)
        });
    };

    onInputChange3 = (e) => {
        this.setState({
            id: e.target.value
        });
    };

    modificarAutor = async (e) => {
        e.preventDefault();

        await axios.post(modificar,
            { id: this.state.id,
            nombre: this.state.nombre,
            apellido: this.state.apellido},
            { headers: { 'xaccess': this.state.token } }

        ).then(res => {
            this.getData()
        })
        .catch(err => {
            alert(err)
        });

    };


    render() {
        return (

            <div className="row">

                <div className="form-autor" >
                <div className="form-input-field col s5 bg-dark">
                <div className="card card-body text-light bg-dark">
                    <form onSubmit={this.agregarAutor} >

                        <div className="col s5">
                            <div className="form-input-field col s5 bg-dark">
                                <label className="text-light">Ingrese Nombre y Apellido</label>
                                <input className="form-control col s12"
                                    id="nombre"
                                    name="nombre"
                                    value={this.state.nombre}
                                    onChange={this.handleChange}
                                    placeholder="Nombre"
                                    required>
                                </input>
                                <input className="form-control col s12"
                                    id="apellido"
                                    name="apellido"
                                    value={this.state.apellido}
                                    onChange={this.handleChange}
                                    placeholder="Apellido"
                                    required>
                                </input>

                                <button type="submit" className="btn btn-success " > Agregar Autor/a </button>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
               

                
                <div className="form-input-field col s5 bg-dark">
                <div className="card card-body text-light bg-dark">

                    <form onSubmit={this.eliminarAutor}>
                        <div className="form-group">
                            
                            <select className="form-control" onChange={this.onInputChange2} id="exampleFormControlSelect1" name="editorial">
                            <option selected>Seleccione un autor/a para eliminar</option>
                                {this.state.autores.map(a =>
                                    <option key={a.id} value={a._id} >{a.nombre} {a.apellido}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success" > Eliminar Autor/a </button>
                        </div>
                    </form>
                </div>
                </div>
                


                
                <div className="form-input-field col s5 bg-dark">
                <div className="card card-body text-light bg-dark">

                    <form onSubmit={this.modificarAutor}>

                        <div className="form-group">
                           
                            <select required className="form-control" onChange={this.onInputChange3} id="exampleFormControlSelect1" name="editorial">
                            <option selected>Seleccione un/a Autor/a para editar</option>
                                {this.state.autores.map(a =>
                                    <option key={a.id} value={a._id} >{a.nombre} {a.apellido}</option>
                                )}
                            </select>
                            <label className="text-light">Ingrese los nuevos datos</label>
                            <input className="form-control col s12"
                                    id="nombre"
                                    name="nombre"
                                    value={this.state.nombre}
                                    onChange={this.handleChange}
                                    placeholder="Nombre"
                                    required>
                                </input>
                                <input className="form-control col s12"
                                    id="apellido"
                                    name="apellido"
                                    value={this.state.apellido}
                                    onChange={this.handleChange}
                                    placeholder="Apellido"
                                    required>
                                </input>
                        </div>



                        <div className="form-group">
                            <button type="submit" className="btn btn-success" >
                                Actualizar Autor/a
                            </button>
                        </div>


                    </form>
                </div>
                
                </div>


                </div>


                <div className="col-md-8">
                    {this.state.autores.map(a =>
                        <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                            <div class="card-body">
                    
                                <h5 class="card-title" onChange={this.onInputChange2} >{a.nombre} {a.apellido}</h5>
                    
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
export default Autor;