import React, { Component } from 'react';

import axios from 'axios';

//Probando git 2
//Probanco cambiosd de git
const generos = 'http://localhost:4000/api/generos/';
const cargar = 'http://localhost:4000/api/generos/cargar';
const borrar = 'http://localhost:4000/api/generos/eliminar/';
const modificar = 'http://localhost:4000/api/generos/modificar/';


class Generos extends Component {
    constructor() {
        super();
        this.state = {
            user: JSON.parse(sessionStorage.getItem('user')),
            token: sessionStorage.getItem('token'),
            generos: [],
            nombre: '',
            id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.agregarGenero = this.agregarGenero.bind(this);
        this.onInputChange = this.onInputChange.bind(this);

    }





    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        }

        );
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    agregarGenero = async (e) => {
        e.preventDefault();

        await axios.post(cargar,
            { nombre: this.state.nombre },
            { headers: { 'xaccess': this.state.token } }

        ).then(
            this.getData()

        )

            .catch(err => {
                
                alert(err)
            }
            );

    };


    setGeneros(res) {
        this.setState({
            generos: res
        });
    }

    getData = async () => {
        
        await axios.get(generos, {
            
            headers: { 'xaccess': this.state.token }
        })
            .then(res => {
                this.setGeneros(res.data)
            })
            .catch(err => {
                alert(err)
            });

    }
    async componentDidMount() {

        this.getData();
    }


    //Borrar Genero
    onInputChange2 = (e) => {


        this.setState({
            id: e.target.value

        });


    };

    eliminarGenero = async (e) => {
        e.preventDefault();
        await axios.post(borrar,
            { id: this.state.id },
            { headers: { 'xaccess': this.state.token } }
        )
            .then(res => {
                alert(res)
                this.getData();
            })
            .catch(err => {
               alert('error en borrar genero');
            });
    };


    onInputChange3 = (e) => {
        this.setState({
            id: e.target.value

        });


    };

    modificarGenero = async (e) => {
        e.preventDefault();

        await axios.post(modificar ,
            { nombre: this.state.nombre, 
                id: this.state.id },
            { headers: { 'xaccess': this.state.token } }

        ).then(res => {
            alert(res);
            this.getData();
        }
        )

            .catch(err => {
                alert(err)
            }
            );

    };


    render() {
        return (

            <div className="row">

                <div className="col-md-4">
                    <form onSubmit={this.agregarGenero} >

                        <div className="col s5">
                            <div className="form-input-field col s5 bg-dark">
                                <label className="text-light">Ingrese el género</label>
                                <input
                                    className="form-control col s12"
                                    id="nombre"
                                    name="nombre"
                                    value={this.state.nombre}
                                    onChange={this.handleChange}

                                    placeholder="Ingrese nombre de genero">
                                </input>
                                <button type="submit" className="btn btn-success " >
                                    Agregar Genero
                                </button>
                            </div>

                        </div>


                    </form>


                    <div className="form-autor" >
                        <div className="form-input-field col s5 bg-dark">
                            <div className="card card-body text-light bg-dark">

                                <form onSubmit={this.eliminarGenero}>



                                    <div className="form-group">
                                       
                                        <select className="form-control" onChange={this.onInputChange2} id="exampleFormControlSelect1" name="genero">
                                            <option selected>Seleccione un género para eliminar</option>
                                            {this.state.generos.map(ge =>
                                                <option key={ge.id} value={ge._id} >{ge.nombre}</option>
                                            )}
                                        </select>
                                    </div>



                                    <div className="form-group">
                                        <button type="submit" className="btn btn-success" >
                                            Eliminar Genero
                                        </button>
                                    </div>


                                </form>
                            </div>
                        </div>
                    </div>


                    <div className="form-autor" >
                        <div className="form-input-field col s5 bg-dark">
                            <div className="card card-body text-light bg-dark">

                                <form onSubmit={this.modificarGenero}>



                                    <div className="form-group">
                                        
                                        <select className="form-control" onChange={this.onInputChange3} id="exampleFormControlSelect1" name="genero">
                                        <option selected>Seleccione un género para editar</option>
                                            {this.state.generos.map(ge =>
                                                <option key={ge.id} value={ge._id} >{ge.nombre}</option>
                                            )}
                                        </select>
                                        <label className="text-light">Ingrese el nuevo genero</label>
                                        <input
                                            className="form-control col s12"
                                            id="nombre"
                                            name="nombre"
                                            value={this.state.nombre}
                                            onChange={this.handleChange}

                                            placeholder="Ingrese nombre de genero">
                                        </input>
                                    </div>



                                    <div className="form-group">
                                        <button type="submit" className="btn btn-success" >
                                            Actualizar Genero
                                        </button>
                                    </div>


                                </form>
                            </div>
                        </div>
                    </div>


                </div>


                <div className="col-md-8">
                    {this.state.generos.map(gene =>
                        <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                            <div class="card-body">
                                <h5 class="card-title">{gene.nombre}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">{gene._id}</h6>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
export default Generos;