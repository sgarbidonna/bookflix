import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';

const apiRes = 'http://localhost:4000/api/suscriptores/';
const cargar = 'registrar';


export default class CargarSuscriptor extends Component {
    
        state = {
            nombre: '',
            apellido: '',
            contraseña:'',
            contraseña1: '',
            numT: '',
            codT:''
        }
    
    validacion =()=>{
        if(this.state.nombre === "" || this.state.apellido === "" || this.state.contraseña === "" || 
        this.state.contraseña1 === ""|| this.state.numT === "" || this.state.codT === "" ){
        alert("Complete todos los campos"); 
        return false;
        }
        return true;
    }

    async componentDidMount() {
        const suscriptores = await fetch(apiRes)
            .then(res => res.json());

        console.log(suscriptores);

    }
    onSubmit = async (e) => {
        e.preventDefault();
        this.validacion();

        
    };

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    
    render(){
        return (

        <div className="form-novedad" >
        <div className="col-md-6 offset-md-3">
        <div className="card card-body text-light bg-dark">
        
        <form onSubmit={this.onSubmit} >
           

            
            <div className="form-group">
                <label className="text-light">Nombre
                </label>
                <input 
                    className="form-control" 
                    id="input1" 
                    name ="nombre"
                    onChange={this.onInputChange}
                    value={this.state.nombre}

                    placeholder="Ingrese su numbre">
                </input>    
            </div>
            <div className="form-group">
                <label className="text-light">Apellido
                </label>
                <input 
                    className="form-control" 
                    id="exampleFormControlInput1" 
                    name ="apellido"
                    onChange={this.onInputChange}
                    value={this.state.apellido}

                    placeholder="Ingrese su apellido">
                </input>    
            </div>
            <div className="form-group">
                <label className="text-light">Contreseña</label>
                <input className="form-control" 
                    id="exampleFormControlTextarea1" 
                    name ="contraseña"
                    onChange={this.onInputChange}
                    value={this.state.contraseña}
                    placeholder="Ingrese una contraseña"
                ></input> 
            </div>

            <div className="form-group">
                <label className="text-light">Confirmación de contraseña</label>
                <input className="form-control" 
                    id="exampleFormControlTextarea1" 
                    name ="contraseña1"
                    onChange={this.onInputChange}
                    value={this.state.contraseña1}

                    placeholder="Vuelva a ingresar su contraseña"
                ></input> 
            </div>

            <div className="form-group">
                <label className="text-light">Número de tarjeta
                </label>
                <input 
                    className="form-control" 
                    id="exampleFormControlInput1" 
                    name ="numT"
                    onChange={this.onInputChange}
                    value={this.state.numT}

                    placeholder="Ingrese número de tarjeta, deberá contener 16 digitos">
                </input>    
            </div>

            <div className="form-group">
                <label className="text-light">Codigo De Tarjeta
                </label>
                <input 
                    className="form-control" 
                    id="exampleFormControlInput1" 
                    name ="codT"
                    onChange={this.onInputChange}
                    value={this.state.codT}

                    placeholder="Ingrese el codigo de su tajeta">
                </input>    
            </div>
            <div className="form-group">
                <button  type="submit" className="btn btn-danger btn-lg btn-block"
                        >
                    Suscribirse
                </button>
            </div>
                    
    

         </form>
         </div>
         </div>   
         </div>
        )
    }
}                 