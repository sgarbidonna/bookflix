import React, { Component } from 'react';


const apiRes = 'http://localhost:4000/api/suscriptores/';
const cargar = 'http://localhost:4000/api/suscriptores/registrar';

class App extends Component {
    
    constructor (){
        super();
        this.state = {
            nombre: '', 
            email: '',
            password:'',
            password2:'',
            numT:'',
            codT:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.Tomardatos = this.Tomardatos.bind(this);
        this.cargarSuscriptor = this.cargarSuscriptor.bind(this);
        this.onInputChange = this.onInputChange.bind(this);

    }

    async componentDidMount() {
        const suscriptores = await fetch(apiRes)
            .then(res => res.json());

        console.log(suscriptores);

    }

    //Capturamos el evento del botón.
    Tomardatos(event) {
        console.log(this.state);
        event.preventDefault();
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
    
    
    async cargarSuscriptor(event){
        console.log(this.state);
        event.preventDefault();    
        await fetch(cargar,{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type' : '/application/json'
            },
            body:JSON.stringify(this.state)
            
        })
            .then(res=> console.log(res))
            .catch(err => console.log(err));
        
     
    }

    render(){
        return (

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

                    placeholder="Ingrese su nombre">
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

                    placeholder="Ingrese un email">
                </input>    
            </div>
            <div className="form-group">
                <label className="text-light">Contreseña</label>
                <input className="form-control" 
                    id="password" 
                    name ="password"
                    onChange={this.onInputChange}
                    value={this.state.password}
                    placeholder="Ingrese una contraseña"
                ></input> 
            </div>

            <div className="form-group">
                <label className="text-light">Confirmación de contraseña</label>
                <input className="form-control" 
                    id="password2" 
                    name ="password2"
                    onChange={this.onInputChange}
                    value={this.state.password2}

                    placeholder="Vuelva a ingresar su contraseña"
                ></input> 
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
        )
    }
}

export default App;                 /*
        return (
            <div>
                <nav className="red darken-4">
                        <div className="container">
                             <a className="brand-logo" hfed="/">Logo bookflix</a>   
                        </div>
                    </nav>
                <div className="container">
                        <div className="row">
                            <div className="col s10">
                                <div className="card">
                                    <div className="card-content">
                                        <form onSubmit={this.Tomardatos}>
                                            <div className="row">
                                                <div className="input-field">
                                                   <textarea name="nombre" onChange={this.handleChange} placeholder="Ingrese un nombre" className="materialize-textarea"></textarea>                             
                                                   <textarea name="apellido" onChange={this.handleChange} placeholder="Apellido" className="materialize-textarea"></textarea>
                                                   <textarea name="tel" onChange={this.handleChange} placeholder="Telefono" className="materialize-textarea"></textarea>
                                                   <textarea name="numT" onChange={this.handleChange} placeholder="Numero de tarjeta de credito" className="materialize-textarea"></textarea>
                                                   <textarea name="codT" onChange={this.handleChange} placeholder="Codigo de seguridad" className="materialize-textarea"></textarea>
                                                </div>
                                            </div>
                                            <button className="btn btn-dark darken-4">Acetar</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

*/