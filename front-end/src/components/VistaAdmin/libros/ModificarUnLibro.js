import React, { Component } from 'react'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';





const Modificar = ({libroDeEntrada}) => {
        
        const modificarTitulo = async (event) => {
            
            alert(this.props.libro.titulo);
            
        }

        const modificarLibro = async () => {
            alert(this.props.libro.titulo);
        }

        return (
            <div className="form-novedad" >
            
            <div className="col-md-6 offset-md-3">
            <div className="card card-body text-light bg-dark">
        
            <form onSubmit={() => {modificarLibro()}} >
                
                <div className="form-group">
                
                    <input 
                        className="form-control" 
                        id="exampleFormControlInput1" 
                        name ="titulo"
                        onChange={() => {modificarTitulo()}}
                        value={this.props.libro.titulo}
                        placeholder="Título"
                        required>
                    </input>
                </div>
                
                            <button type="submit" className="btn btn-success" > Modificar </button>
                        
                </form>
            </div> 
        
            </div> 
            </div> 
        
        )
    

    }
    export default Modificar