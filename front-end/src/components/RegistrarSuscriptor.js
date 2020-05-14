import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const cargar = 'http://localhost:4000/api/suscriptores/registrar';

class App extends Component {
    
    constructor (){
        super();
        this.state = {
            nombre: '', 
            email: '',
            password:'',
            password2:'',
            dni:'',
            suscripcion:'',
            numT:'',
            codT:'',
            token:'',
            user: null,
            errors:[],
           
        };
        this.handleChange = this.handleChange.bind(this);
        this.cargarSuscriptor = this.cargarSuscriptor.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.getToken = this.getToken.bind(this);
        this.getErrors = this.getErrors.bind(this);
        this.setRegular= this.setRegular.bind(this);
        this.setPremium= this.setPremium.bind(this);
      
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }    

    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    setRegular(){
        
        this.setState({
           suscripcion: 'regular'
        });
        console.log(this.state.suscripcion);
    };

    setPremium(){
     
        this.setState({
            suscripcion: 'premium'
         });
         console.log(this.state.suscripcion);

    };
    
    getToken=(res)=>{
            const {data} = res;
            const {token , user} = data; 

           
            sessionStorage.setItem('token', token );
         
            sessionStorage.setItem('user', JSON.stringify( {user} ) );

            this.setState(
                {
                token: token,
                user: user,
                }
            );
    };
    getErrors=(err)=>{
        //traigo la data de los errores
        const {data} = err;
        //traigo los mensajes de errores por su nombre
        const {nombre , email, password , password2}=data; 
        //pongo los mensajes en un arreglo
        const error = [nombre , email, password , password2]; 

        //mapeo el arreglo
        this.setState(
            {errors:error}
        )
        error.map(err=>{
            if(! err === '') 
                alert(err);
        } ).then();
        
        
    }
    
    async cargarSuscriptor(event){

        event.preventDefault();  
        await axios.post(cargar,{
            nombre:this.state.nombre ,
            email: this.state.email,
            password:this.state.password,
            password2:this.state.password2,
            suscripcion:this.state.suscripcion,
            dni:this.state.dni,
            numT:this.state.numT,
            codT:this.state.codT,
        })
                .then(res => this.getToken(res))
                .catch(res => {
                  this.getErrors(res.response)
                });

    }

    render(){
        return (
   
        !this.state.token && !this.state.user?

        <div>  
           
        <div className="form-novedad" >
        <div className="col-md-6 offset-md-3">
        <div className="card card-body text-light bg-dark">
        
        <form onSubmit={this.cargarSuscriptor} >
           

            
            <div className="form-group">
                <label className="text-light">Nombre
                </label>
                <input 
                    className="form-control" 
                    id="nombre" 
                    name ="nombre"
                    onChange={this.onInputChange}
                    value={this.state.nombre}
                    placeholder="Ingrese su nombre"
                    required>
                </input>    
            </div>
            
            <div className="form-group">
                <label className="text-light">Email
                </label>
                <input 
                    className="form-control" 
                    id="email" 
                    name ="email"
                    onChange={this.onInputChange}
                    value={this.state.email}
                    required
                    placeholder="Ingrese un email">
                </input>    
            </div>

            <div className="form-group">
                <label className="text-light">Contreseña</label>
                <input type='password' className="form-control" 
                    id="password" 
                    name ="password"
                    onChange={this.onInputChange}
                    value={this.state.password}
                    placeholder="Ingrese una contraseña"
                    required
                ></input> 
            </div>

            <div className="form-group">
                <label className="text-light">Confirmación de contraseña</label>
                <input type='password' className="form-control" 
                    id="password2" 
                    name ="password2"
                    onChange={this.onInputChange}
                    value={this.state.password2}
                    required
                    placeholder="Vuelva a ingresar su contraseña"
                ></input> 
            </div>

            <div className="form-group">
                <label className="text-light">DNI
                </label>
                <input 
                    className="form-control" 
                    id="dni" 
                    name ="dni"
                    onChange={this.onInputChange}
                    value={this.state.dni}
                    placeholder="Ingrese su DNI"
                    required>
                </input>    
            </div>
            
 

            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label className="text-light">Tipo de Suscripción </label>
                <label> <button type="button" class="btn btn-outline-danger" onClick={this.setRegular} data-toggle="button"  > REGULAR</button> </label>
               
               <label> <button type="button" class="btn btn-outline-danger"  onClick={this.setPremium} data-toggle="button" > PREMIUM</button></label>
                
            </div>

            <div className="form-group">
                <label className="text-light">Número de tarjeta
                </label>
                <input 
                    className="form-control" 
                    id="numT" 
                    name ="numT"
                    onChange={this.onInputChange}
                    value={this.state.numT}
                    required
                    placeholder="Ingrese número de tarjeta, deberá contener 16 digitos">
                </input>    
            </div>

            <div className="form-group">
                <label className="text-light">Codigo De Tarjeta
                </label>
                <input 
                    className="form-control" 
                    id="codT" 
                    name ="codT"
                    onChange={this.onInputChange}
                    value={this.state.codT}
                    required
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
         </div> 
         :
         <Redirect
         from="/singup"
         to="/home" />
        )
    }
}

export default App;      