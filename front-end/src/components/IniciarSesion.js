import React, { Component } from 'react'
import axios from 'axios';
import {  Redirect } from 'react-router-dom';

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
        
        const {data} = err;
        alert(data);    
    }

 
    getToken = async(res) => {
        const { user, token } = res.data;        
        sessionStorage.setItem('token', token );
        sessionStorage.setItem('user', JSON.stringify( {user} ) );

        this.setState( { token,  user } );

        /// esto es lo q deberiamos guardar en el atributo soyAdmin de Home
        console.log(user.email === 'admin@admin.com')
    };
    

    async iniciarSesion(event){

        event.preventDefault();   

        await axios.post(login,{
            email: this.state.email,
            password: this.state.password,
        })
                .then(res => {
                    console.log(res);
                    this.getToken(res)})
                .catch(err => {
                    console.log(err.response);
                  
                });
        
    }

    
    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    

    render(){
        return (
    
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
                        type='password'
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