import React, { Component } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Route , Redirect } from 'react-router-dom';

const login = 'http://localhost:4000/api/suscriptores/login';



   

class App extends Component {
    
    constructor (){
        super();
        this.state = {
            email: '',
            password:'',
            token:'',
            user:null,
      };
        this.iniciarSesion = this.iniciarSesion.bind(this);
        this.onInputChange = this.onInputChange.bind(this);

    }
    getErrors=(err)=>{
        //traigo la data de los errores
        const {data} = err;
        alert(data);
        
       
        
    }

    getToken=(res)=>{
        //pido la data de la respuesta  
        const { data } = res;
        const { user, token}= data;        
        //guardo el token en session storage
        //paso el Json a string y lo guardo en sesion storage
        sessionStorage.setItem('token', JSON.stringify( {token} ) );
        sessionStorage.setItem('user', JSON.stringify( {user} ) );
        // token tiene un objeto que contiene el token
        // para acceder al token:
        // const { token } = this.state.token || 
        // para tarer en token de sesion storage: const { token } = JSON.parse(sessionStorage.getItem("token")
        // lo mismo para user
        this.setState(
            {
                token: JSON.parse(sessionStorage.getItem("token")),
                user: JSON.parse(sessionStorage.getItem("user")),
            }
        );
        console.log("user:");    
        console.log(JSON.parse(sessionStorage.getItem("user")));   
        console.log("token:");    
        console.log(JSON.parse(sessionStorage.getItem('token')));
            
    }

    async iniciarSesion(event){

        console.log(this.state);
        event.preventDefault();   
        await axios.post(login,{
            email: this.state.email,
            password: this.state.password,
        })
                .then(res =>this.getToken(res))
                .catch(err => this.getErrors(err.response));
        
    }

    
    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    

//faltan los setState, y no funca el POST
    render(){
        return (
        //verifico si existe el token
        !this.state.token && !this.state.user?
        <div>

        <div className="col-md-6 offset-md-3 form-login">
            <div className="card card-body bg-dark  text-light " >

                <form onSubmit={this.iniciarSesion}>
                    <div className="form-group">
                    <label className="text-light">Email
                    </label>
                    <input 
                        className="form-control" 
                        id="email" 
                        name ="email"
                        onChange={this.onInputChange}
                        value={this.state.email}

                        placeholder="Ingrese un email">
                    </input>    
                    </div>

                    <div className="form-group">
                    <label className="text-light">Contraseña
                    </label>
                    <input 
                        className="form-control" 
                        id="password" 
                        name ="password"
                        onChange={this.onInputChange}
                        value={this.state.password}
                        placeholder="Ingrese la contraseña">
                    </input>    
                    </div>
                    <div className="form-group">
                        <button  type="submit" className="btn btn-danger btn-lg btn-block">
                            LOGIN
                        </button>
                    </div>
                </form>
            </div>   
            
        </div>
        </div>
          
        :
        <Redirect
        from="/login"
        to="/home" />
        )
    }
}


export default App; 