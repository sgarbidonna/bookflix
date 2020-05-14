import React, { Component } from 'react';
import axios from 'axios';
import NavegacionAdmin from '../NavegacionAdmin'

const getGeneros = 'http://localhost:4000/api/generos/';
const cargar = 'http://localhost:4000/api/generos/cargar';
const borrar = 'http://localhost:4000/api/generos/eliminar/';
const modificar = 'http://localhost:4000/api/generos/modificar/';


class Generos extends Component {
    constructor() {
        super();
        this.state = {
            user: JSON.parse(sessionStorage.getItem('user')),
            token: sessionStorage.getItem('token'),
            
            generos:[],
            nombre: '',
            id: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.agregarGenero = this.agregarGenero.bind(this);
        this.eliminarGenero = this.eliminarGenero.bind(this);
        this.modificarGenero = this.modificarGenero.bind(this);
        this.getData = this.getData.bind(this);
        this.onInputChange2 = this.onInputChange2.bind(this);
        this.onInputChange3 = this.onInputChange3.bind(this);
    }


    async getData(){
        
        await axios.get(getGeneros, {
            
            headers: { 'xaccess': this.state.token }
        })
            .then(res => {
                this.setState({
                    generos: res.data
                });
            })
            .catch(err => {
                alert(err)
            });

    }
    async componentDidMount() {

        this.getData();
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        }

        );
    }

    async agregarGenero(e){
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


   



    //Borrar Genero
    onInputChange2(e) {
        this.setState({
            id: e.target.value
        });

    };
    onInputChange3(e){
        this.setState({
            id: e.target.value
        });
    };
    async eliminarGenero(e){
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


    

    async modificarGenero(e){
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
            <div><NavegacionAdmin/>
            <div className="row">
                
                <div className="form-autor" >
                <div className="form-input-field col s5 bg-dark">
                <div className="card card-body text-light bg-dark">
                    <form onSubmit={this.agregarEditorial} >

                        <div className="col s5">
                            <div className="form-input-field col s5 bg-dark">
                                
                                <input className="form-control col s12"
                                    id="nombre"
                                    name="nombre"
                                    value={this.state.nombre}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el nombre del género"
                                    required>
                                </input>

                                <button type="submit" className="btn btn-success " > Agregar Género </button>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
               

                
                <div className="form-input-field col s5 bg-dark">
                <div className="card card-body text-light bg-dark">

                    <form onSubmit={this.eliminarEditorial}>
                        <div className="form-group">
                            
                            <select className="form-control" onChange={this.onInputChange2} id="exampleFormControlSelect1" name="editorial">
                            <option selected>Seleccione un género para eliminar</option>
                                {this.state.generos.map(genero =>
                                    <option key={genero.id} value={genero._id} >{genero.nombre}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success" > Eliminar Género </button>
                        </div>
                    </form>
                </div>
                </div>
                


                
                <div className="form-input-field col s5 bg-dark">
                <div className="card card-body text-light bg-dark">

                    <form onSubmit={this.modificarEditorial}>

                        <div className="form-group">
                           
                            <select required className="form-control" onChange={this.onInputChange3} id="exampleFormControlSelect1" name="editorial">
                            <option selected>Seleccione un género para modificar</option>
                                {this.state.generos.map(genero =>
                                    <option key={genero.id} value={genero._id} >{genero.nombre}</option>
                                )}
                            </select>
                            <label className="text-light">Ingrese el nuevo género</label>
                            <input
                                className="form-control col s12"
                                id="nombre"
                                name="nombre"
                                value={this.state.nombre}
                                onChange={this.handleChange}
                                required
                                placeholder="Ingrese el nuevo género">
                            </input>
                        </div>



                        <div className="form-group">
                            <button type="submit" className="btn btn-success" >
                                Actualizar Género
                            </button>
                        </div>


                    </form>
                </div>
                
                </div>


                </div>


                <div className="col-md-8">
                    {this.state.generos.map(genero =>
                        <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                            <div class="card-body">
                    
                                <h5 class="card-title" onChange={this.onInputChange2} >{genero.nombre}</h5>
                    
                            </div>
                        </div>
                    )}
                </div>
            </div>
            </div>
        )
    }
}
export default Generos;