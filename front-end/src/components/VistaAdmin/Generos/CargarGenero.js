import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { BrowserRouter as Router, Route , Redirect } from 'react-router-dom';

const apiRes = 'http://localhost:4000/api/generos';
const cargar = 'http://localhost:4000/api/generos/cargar';



class App extends Component {

 //Para capturar los datos de los formularios creamos un constructor con el metodo super.   
    constructor() {
        super();
        this.state = { 
            nombre: '',
            token: sessionStorage.getItem('token')
        };

        this.handleChange =  this.handleChange.bind(this);
        this.agregarGenero =  this.agregarGenero.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        //this.getErrors = this.getErrors.bind(this);
        
        
    }

    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        }
 
        );
     }
 
    onInputChange = (e) => {
        this.setState ({
            [e.target.name]: e.target.value
        })
    };


    async componentDidMount(){
        console.log(sessionStorage.getItem('token'));
    };


/*
    
getErrors=(err)=>{
    //traigo la data de los errores
    const {data} = err;
    //traigo los mensajes de errores por su nombre
    const {nombre}=data; 
    //pongo los mensajes en un arreglo
    const error = [nombre]; 

    //mapeo el arreglo
    this.setState(
        {errors:error}
    )
    error.map(err=>{
        if(! err == '') 
            alert(err);
    } );
    
    
    }
*/
    agregarGenero = async(e) =>{
        e.preventDefault();  
        console.log(this.state.nombre);
        console.log(this.state.token);

        await axios.post(cargar,
        {nombre: this.state.nombre},                      
        {headers: {'xaccess':this.state.token}}

    ).then(res =>{ 
            console.log('se cargo un genero');
            console.log(res)})
           .catch(err =>{ 
            console.log('error en cargar genero');   
            console.log(err)}
        );

    };

   
    

    render(){
        return (
        
       
        
        <div className="form-autor" >
        <div className="col-md-6 offset-md-3">
        <div className="card card-body text-light bg-dark">
        
        <form onSubmit={this.agregarGenero} >

           <div className="col s5"> 
            <div className="form-input-field col s5 bg-dark">
                <label className="text-light">Ingrese el género
                </label>
                <input 
                    className="form-control col s12" 
                    id="nombre" 
                    name="nombre"
                    value={this.state.nombre}
                    onChange={this.handleChange}
                    
                   placeholder="Ingrese nombre de genero">
                </input>
            </div>
            
                </div>
         
            <div className="form-group">
                <button type ="submit" className="btn btn-success" >
                    Agregar Genero
                </button>
            </div>
                    
          
         </form>
         </div>
         </div>   
         </div>
       
        )
    }
}
export default App;  