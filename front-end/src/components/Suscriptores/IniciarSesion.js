import React, { Component } from 'react'
import axios from 'axios';

const login = 'http://localhost:4000/api/suscriptores/login';


class App extends Component {
    
    constructor (){
        super();
        this.state = {
           
            email: '',
            password:'',
      };
        this.iniciarSesion = this.iniciarSesion.bind(this);
        this.onInputChange = this.onInputChange.bind(this);

    }

    async iniciarSesion(event){

        console.log(this.state);
        event.preventDefault();   
        await axios.post(login,this.state)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        
    }

    
    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    

//faltan los setState, y no funca el POST
    render(){
        return (
            <div>

            <div className="col-md-6 offset-md-3 form-login">
            <div className="card card-body bg-dark  text-light " >
                <form onSubmit={this.iniciarSesion}>
                    <div className="form-group">
                       <input className="form-control" placeholder="Email" ></input>
                    </div>
                    <div className="form-group">
                        
                        <input className="form-control" placeholder="Password"></input>
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
        )
    }
}


export default App; 