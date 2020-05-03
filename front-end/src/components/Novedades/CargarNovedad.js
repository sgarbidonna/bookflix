import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default class CargarNovedad extends Component {

    state = {
        titulo: '',
        descripcion: '',
        fecha: new Date(), 
    }
    validacion =()=> { 
        if(this.state.titulo == "" || this.state.descripcion == "" || this.state.fecha == ""){
            alert("complete todos los campos por favor"); 
            return false;
        }
        return true;
    
        
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
    onChangeFecha = fecha => {
        this.setState({ fecha });
    };

    render(){
        return (
        <div className="form-novedad" >

       
        <div className="col-md-6 offset-md-3">
        <div className="card card-body text-light bg-dark">
        
        <form onSubmit={this.onSubmit} >
           

            
            <div className="form-group">
                <label className="text-light">Título
                </label>
                <input 
                    className="form-control" 
                    id="exampleFormControlInput1" 
                    name ="titulo"
                    onChange={this.onInputChange}
                    value={this.state.titulo}

                    placeholder="escriba un titulo">
                </input>
            </div>
            <div className="form-group">
                <label className="text-light">Descripción </label>
                <textarea className="form-control" 
                    id="exampleFormControlTextarea1" 
                    rows="3"
                    name ="descripcion"
                    onChange={this.onInputChange}
                    value={this.state.descripcion}

                    placeholder="escriba una descripcion"
                ></textarea> 
            </div>
            <div className="form-group">
                <DatePicker className="form-control"
                 selected={this.state.fecha}
                 onChange={this.onChangeFecha}
                />
            </div>
            <div className="form-group">
                <button type ="submit" className="btn btn-success">
                    Agregar          
                </button>
            </div>
                    
          
         </form>
         </div>
         </div>   
         </div>
        )
    }
}
