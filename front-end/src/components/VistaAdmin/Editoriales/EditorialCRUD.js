import React, { Component } from 'react';

import axios from 'axios';

const editoriales = 'http://localhost:4000/api/editoriales/';
const cargar = 'http://localhost:4000/api/editoriales/cargar';
const borrar = 'http://localhost:4000/api/editoriales/eliminar/';
const modificar = 'http://localhost:4000/api/editoriales/modificar/';


class Edtorial extends Component {
    constructor() {
        super();
        this.state = {
            user: JSON.parse(sessionStorage.getItem('user')),
            token: sessionStorage.getItem('token'),
            
            editoriales: [],
            nombre: '',
            id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.agregarEditorial = this.agregarEditorial.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.setEditoriales = this.setEditoriales.bind(this);
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

    agregarEditorial = async (e) => {
        e.preventDefault();
       

        await axios.post(cargar,
            { nombre: this.state.nombre },
            { headers: { 'xaccess': this.state.token } }

        ).then(res => {
            console.log('se cargo una editorial');
            console.log(res)
            this.getData();
        }
        )

            .catch(err => {
                console.log(err)
            }
            );

    };


    setEditoriales(res) {

        this.setState({
            editoriales: res
        });
    }

    getData = async () => {

        await axios.get(editoriales, {
            headers: { 'xaccess': this.state.token }
        })
            .then(res => {
                this.setEditoriales(res.data)
            })
            .catch(err => {
                alert(err.response)
            });

    }
    async componentDidMount() {
        this.getData();
    }

    onInputChange2 = (e) => {
       this.setState({
            id: e.target.value

        });


    };

    eliminarEditorial = async (e) => {
        e.preventDefault();
        await axios.post(borrar + this.state.id,
            { id: this.state.id },
            { headers: { 'xaccess': this.state.token } }



        ).then(res => {
            console.log('se elimino el genero');
            console.log(res)
            this.getData();
        })
            .catch(err => {
                console.log('error en borrar genero');
                console.log(err)
            }
            );
    };


    //Actualizar Genero
    onInputChange3 = (e) => {
        console.log('input', e.target.value);


        this.setState({
            id: e.target.value


        });


    };

    modificarEditorial = async (e) => {
        e.preventDefault();

        await axios.post(modificar + this.state.id,
            { nombre: this.state.nombre },
            { headers: { 'xaccess': this.state.token } }

        ).then(res => {
            
            this.getData();
        }
        )

            .catch(err => {
                console.log(err)
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
                                <label className="text-light">Ingrese la editorial</label>
                                <input
                                    className="form-control col s12"
                                    id="nombre"
                                    name="nombre"
                                    value={this.state.nombre}
                                    onChange={this.handleChange}

                                    placeholder="Ingrese nombre de genero">
                                </input>
                                <button type="submit" className="btn btn-success " >
                                    Agregar Edtorial
                                </button>
                            </div>

                        </div>


                    </form>


                    <div className="form-autor" >
                        <div className="form-input-field col s5 bg-dark">
                            <div className="card card-body text-light bg-dark">

                                <form onSubmit={this.eliminarEditorial}>



                                    <div className="form-group">
                                        <label for="exampleFormControlSelect1">Seleccione una editorial para eliminar</label>
                                        <select className="form-control" onChange={this.onInputChange2} id="exampleFormControlSelect1" name="genero">

                                            {this.state.editoriales.map(ed =>
                                                <option key={ed.id} value={ed._id} >{ed.nombre}</option>
                                            )}
                                        </select>
                                    </div>



                                    <div className="form-group">
                                        <button type="submit" className="btn btn-success" >
                                            Eliminar Edtorial
                                        </button>
                                    </div>


                                </form>
                            </div>
                        </div>
                    </div>


                    <div className="form-autor" >
                        <div className="form-input-field col s5 bg-dark">
                            <div className="card card-body text-light bg-dark">

                                <form onSubmit={this.modificarEditorial}>



                                    <div className="form-group">
                                        <label for="exampleFormControlSelect1">Seleccione una editorial para editar</label>
                                        <select className="form-control" onChange={this.onInputChange3} id="exampleFormControlSelect1" name="genero">

                                            {this.state.editoriales.map(ed =>
                                                <option key={ed.id} value={ed._id} >{ed.nombre}</option>
                                            )}
                                        </select>
                                        <label className="text-light">Ingrese la nueva editorial</label>
                                        <input
                                            className="form-control col s12"
                                            id="nombre"
                                            name="nombre"
                                            value={this.state.nombre}
                                            onChange={this.handleChange}

                                            placeholder="Ingrese nombre de la editorial">
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