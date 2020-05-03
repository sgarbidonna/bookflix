import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default class ModificarNovedad extends Component {

    state = {
        titulo: 'un titulo',
        descripcion: 'una des',
        fecha: new Date(), 
    }
    

    onSubmit = async (e) => {
        e.preventDefault();
        
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
                <label>Título
                </label>
                <input 
                    className="form-control" 
                    id="exampleFormControlInput1" 
                    name ="titulo"
                    onChange={this.onInputChange}
                    value={this.state.titulo}

                   ></input>
            </div>
            <div className="form-group">
                <label>Descripción </label>
                <textarea className="form-control" 
                    id="exampleFormControlTextarea1" 
                    rows="3"
                    name ="descripcion"
                    onChange={this.onInputChange}
                    value={this.state.descripcion}

                   
                >       </textarea> 
            </div>
            <div className="form-group">
                <DatePicker className="form-control"
                 selected={this.state.fecha}
                 onChange={this.onChangeFecha}
                />
            </div>
            <div className="form-group">
                <button type ="submit" className="btn btn-success">
                    Modificar          
                </button>
            </div>
                    
          
         </form>
         </div>
         </div>   
         </div>
        )
    }
}
