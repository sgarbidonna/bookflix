import React, { Component } from '../../../../node_modules/react'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DatePicker from '../../../../node_modules/react-datepicker';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import axios from '../../../../node_modules/axios';

const cargar = 'http://localhost:4000/api/novedades/cargar';

export default class CargarNovedad extends Component {

    constructor(){
        super();
            this.state = {
                user: JSON.parse(sessionStorage.getItem('user')),
                token: sessionStorage.getItem('token'),
                
                titulo: '',
                descripcion: '',
                publicacion: new Date(), 
                portadaImg: null,
    };
        this.getPortada=this.getPortada.bind(this);
    }
    
    

    onSubmit = async (e) => {
        e.preventDefault();
 
        const formData = new FormData();
        formData.append('titulo', this.state.titulo);
        formData.append('descripcion', this.state.descripcion);
        formData.append('portadaImg', this.state.portadaImg);
        formData.append('publicacion',this.state.publicacion)
    
        axios.post(cargar,formData,{
                headers: { 'xaccess':this.state.token }
            })
            .then(res =>{
                alert('Novedad cargada con exito')
                console.log(res)})
            .catch(err => {
                alert(err);
                console.log(err);
            }
        );
    };

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    onChangeFecha = publicacion => {
        this.setState({ publicacion });
    };

    getPortada(e){
        
        this.setState({
            portadaImg: e.target.files[0]
        })

    }

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
                    placeholder="Escriba un titulo"
                    required>
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
                    placeholder="Escriba una descripcion"
                    required >
                </textarea> 
            </div>

            <div className="form-group">
                <DatePicker className="form-control"
                        selected={this.state.publicacion}
                        name='publicacion'
                        onChange={this.onChangeFecha}
                        required />
            </div>

            <label className="text-light">Portada</label>
            <div className="form-group">

               <input type='file' encType="multipart/form-data" name='portadaImg' onChange={this.getPortada}>
               </input>
                
            </div >

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
