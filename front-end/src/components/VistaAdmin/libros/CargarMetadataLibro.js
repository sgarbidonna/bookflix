import React, { Component } from '../../../../node_modules/react'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DatePicker from '../../../../node_modules/react-datepicker';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import axios from '../../../../node_modules/axios';

const autores = 'http://localhost:4000/api/autores/';
const generos = 'http://localhost:4000/api/generos/';
const editoriales = 'http://localhost:4000/api/editoriales/';
const libros='http://localhost:4000/api/libros/cargar';



export default class CargarMetadata extends Component {
    constructor(){
        super();
        this.state = {
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
        this.setState({
            autores:res
        });
    }
    setGeneros(res){
        this.setState({
            generos:res
        });
    }
    
    setEditoriales(res){   
        this.setState({
            editoriales:res
        });
       
    }
    
    getData = async () => {
        
       
        await axios.get(autores,{
            
            headers:{'xaccess':this.state.token}  
        })
        .then(res =>{
            this.setAutores(res.data)
        })
        .catch(err =>{console.log(err)});

        await axios.get(generos,{
            
            headers:{'xaccess':this.state.token}  
        })
        .then(res =>{
            this.setGeneros(res.data)
        })
        .catch(err =>{console.log(err)});

        await axios.get(editoriales,{
            
            headers:{'xaccess': this.state.token}  
        })
        .then(res =>{
            this.setEditoriales(res.data)
        })
        .catch(err =>{console.log(err)});




      
    }

    async componentDidMount(){
        this.getData();
    }
   
    

    onSubmit = async (e) => {
        e.preventDefault();

        if((this.state.ISBN.length < 13) || (this.state.ISBN.length > 16)){
            return alert('Número de ISBN incorrecto, debe contener entre 13 y 16 digitos')
        }
        
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
            .then(res => {
                
                alert(JSON.stringify(res.data));
            })
    
            .catch(err => {
                alert(JSON.stringify(err.data))
            } );
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
               
                <input 
                    className="form-control" 
                    id="exampleFormControlInput1" 
                    name ="titulo"
                    onChange={this.onInputChange}
                    value={this.state.titulo}
                    placeholder="Título"
                    required>
                </input>
            </div>
            <div className="form-group">
            
                <input 
                    className="form-control" 
                    id="exampleFormControlInput1" 
                    name ="ISBN"
                    onChange={this.onInputChange}
                    value={this.state.ISBN}
                    placeholder="ISBN"
                    required>
                </input>
            </div>

            <div className="form-group">
            
                <select className="form-control"   
                    onChange={this.onInputChange} 
                    id="exampleFormControlSelect1" 
                    name="autor"
                    required>    
                <option selected>Autor/a</option>
                {this.state.autores.map(autor =>
                <option key={autor._id} value={autor._id} >{autor.nombre} {autor.apellido}</option>
                        )}
                </select>
            </div>

            <div className="form-group">
            
                    <select className="form-control"  onChange={this.onInputChange}  id="exampleFormControlSelect1" name="genero" required>
                    <option selected>Género</option>
                        {this.state.generos.map(ge =>
                        <option key={ge._id} value={ge._id} >{ge.nombre}</option>
                        )}
                    </select>
            </div>

            <div className="form-group">
                
                    <select className="form-control"  onChange={this.onInputChange} id="exampleFormControlSelect1" name="editorial" required>
                    <option selected>Editorial</option>
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
                 required/>
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

               <input type='file' encType="multipart/form-data" name='portadaImg' onChange={this.getPortada}>
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
