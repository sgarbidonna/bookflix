import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


import axios from 'axios';

const autores = 'http://localhost:4000/api/autores/';
const generos = 'http://localhost:4000/api/generos/';
const editoriales = 'http://localhost:4000/api/editoriales/';

const libros='http://localhost:4000/api/libros/cargar';



export default class CargarMetadata extends Component {
    constructor(){
        super();
        this.state = {
            user: JSON.parse(sessionStorage.getItem('user')),
            token: sessionStorage.getItem('token'),

            titulo: '',
            ISBN:'',
            portadaImg: null,
            autor:'',
            editorial:'',
            genero:'',
            fechaDeExpiracion: new Date(), 
            fechaDePublicacion: new Date(), 

    
            generos:[],
            autores:[],
            editoriales:[]
            
        };
      
        this.getPortada=this.getPortada.bind(this);
        this.onChangeFechaDePublicacion=this.onChangeFechaDePublicacion.bind(this);
        this.onChangeFechaDeExpiracion=this.onChangeFechaDeExpiracion.bind(this);
        this.onInputChange=this.onInputChange.bind(this);
        this.setAutores=this.setAutores.bind(this);
        
    }

    setAutores(res){

        console.log(res);
        this.setState({
            autores:res
        });
    }
    setGeneros(res){
        console.log(res);
        this.setState({
            generos:res
        });
    }
    
    setEditoriales(res){   
        console.log(res);
        this.setState({
            editoriales:res
        });
       
    }
    
    getData = async () => {
        const {user} = this.state.user;
        console.log('token librosa');
        console.log(this.state.token);
        await axios.get(autores,{
            user: user,
            headers:{'xaccess':this.state.token}  
        })
        .then(res =>{
            this.setAutores(res.data)
        })
        .catch(err =>{console.log(err.response)});

        await axios.get(generos,{
            user: user,
            headers:{'xaccess':this.state.token}  
        })
        .then(res =>{
            this.setGeneros(res.data)
        })
        .catch(err =>{console.log(err.response)});

        await axios.get(editoriales,{
            user: user,
            headers:{'xaccess': this.state.token}  
        })
        .then(res =>{
            this.setEditoriales(res.data)
        })
        .catch(err =>{console.log(err.response)});




      
    }

    async componentDidMount(){

        this.getData();
    }
   
    validacion =()=> { 
              
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.validacion();
        console.log('hola');
    //falta activar la ruta para los libros
    //const {user} = this.state.user;

    
    // prueba mia
        const formData = new FormData();
        formData.append('titulo', this.state.titulo);
        formData.append('isbn',this.state.ISBN);
        formData.append('autor', this.state.autor);
        formData.append('editorial', this.state.editorial);
        formData.append('genero', this.state.genero);
        formData.append('lanzamiento', this.state.fechaDePublicacion);
        formData.append('portadaImg', this.state.portadaImg);
        formData.append('expiracion',this.state.fechaDeExpiracion)
    
        axios.post(libros,formData,{
                headers: { 'xaccess':this.state.token }
            })
            .then(res =>{
                alert('Libro cargado con exito')
                console.log(res)})
            .catch(err => {
                alert('error en cargar libro');
                console.log(err);
            }
        );
    };

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onChangeFechaDePublicacion = fechaDePublicacion => {
        this.setState({ fechaDePublicacion });
    };

    onChangeFechaDeExpiracion = fechaDeExpiracion => {
        this.setState({ fechaDeExpiracion });
    };

    getPortada(e){
        
        console.log(e.target.files[0])
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
                    placeholder="escriba un titulo">
                </input>
            </div>
            <div className="form-group">
                <label className="text-light">ISBN </label>
                <input 
                    className="form-control" 
                    id="exampleFormControlInput1" 
                    name ="ISBN"
                    onChange={this.onInputChange}
                    value={this.state.ISBN}
                    placeholder="escriba la ISBN">
                </input>
            </div>

            <div className="form-group">
            <label className="text-light"> Autor/a </label>
                <select className="form-control"   
                    onChange={this.onInputChange} 
                    id="exampleFormControlSelect1" 
                    name="autor"
                >    {this.state.autores.map(autor =>
                        <option key={autor._id} value={autor._id} >{autor.nombre}</option>
                        )}
                </select>
            </div>

            <div className="form-group">
                <label for="exampleFormControlSelect1"> Género</label>
                    <select className="form-control"  onChange={this.onInputChange}  id="exampleFormControlSelect1" name="genero">
                        {this.state.generos.map(ge =>
                        <option key={ge._id} value={ge._id} >{ge.nombre}</option>
                        )}
                    </select>
            </div>

            <div className="form-group">
                <label for="exampleFormControlSelect1"> Editorial </label>
                    <select className="form-control"  onChange={this.onInputChange} id="exampleFormControlSelect1" name="editorial">
                    {this.state.editoriales.map(ed =>
                    <option key={ed.id} value={ed._id} >{ed.nombre}</option>
                    )}
                    </select>
            </div>
            
            <label className="text-light">Fecha De Publicacion</label>
            <div className="form-group">
               
                <DatePicker className="form-control"
                 selected={this.state.fechaDePublicacion}
                 name='fechaDePublicacion'
                 onChange={this.onChangeFechaDePublicacion}
                />
            </div>
            <label className="text-light"> Fecha De Expiración</label>
            <div className="form-group">
               
                <DatePicker className="form-control"
                 selected={this.state.fechaDeExpiracion}
                 name='fechaDeExpiracion'
                 onChange={this.onChangeFechaDeExpiracion}
                />
            </div>

            <label className="text-light">Portada</label>
            <div className="form-group">

               <input type='file' enctype="multipart/form-data" name='portadaImg' onChange={this.getPortada}>
               </input>
                
            </div >
    
            
            <div className="form-group">
                <button type ="submit" className="btn btn-success"> Agregar </button>
            </div>
         </form>
         </div>
         </div>   
        
         </div> 

           
        )
    }
}
