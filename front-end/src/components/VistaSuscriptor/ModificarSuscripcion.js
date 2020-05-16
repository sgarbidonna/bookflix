import React, { Component } from 'react';

import axios from 'axios';


//Constante a la cual hacemos la consulta
const suscriptores= 'http://localhost:4000/api/suscriptores/me';
const modificar='http://localhost:4000/api/suscriptores/modificar/';


export default class MiSuscripcion extends Component {
    constructor(){
        super();
        this.state = {
            token: sessionStorage.getItem('token'),

            id: '',
            nombre: '',
            email: '',
            password: '',
            suscripcion:'',    
            dni:'',
            rta:'',
            añoE:'',
            mesE:'',


            valorInicial:'',     
        };
       

        this.modificarSuscriptor = this.modificarSuscriptor.bind(this);
        this.onInputChange = this.onInputChange.bind(this);

        
    }
    
    

    setSusripcion(res){
        this.setState({
            id: res._id,
            nombre: res.nombre,
            email: res.email,
            dni: res.dni, 
            suscripcion: res.suscripcion,
            valorInicial: res.suscripcion,
            numT: '',
            codT:'',
            
        });
    }

    

    getData = async () =>{
        await axios.get(suscriptores,{
            headers:{'xaccess':this.state.token}  
        })
        .then(res =>{
            this.setSusripcion(res.data);
        })
        .catch(err =>{console.log(err)})
            
    }

    async componentDidMount(){
        
        this.getData();
        
    }

    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

   
    async modificarSuscriptor(event){
        
        event.preventDefault();  
        
        if(this.state.valorInicial !== this.state.suscripcion){
           
            if(this.state.numT==='' || this.state.codT==='' || this.state.añoE ==='' || this.state.mesE=== ''){
                return (alert('Ingrese los datos de la tarjeta'));
            }

            if (this.state.numT.length != 16){
                return alert('Pruebe con una tarjeta que contenga 16 dígitos')
            }
            else if (this.state.codT.length != 3){
                return alert('Ingrese un código de seguridad de 3 dígitos')
            }
    
            if ( this.state.añoE == '' || this.state.mesE == ''){
                return alert('Ingrese MES y AÑO de expiración de su tarjeta')
            }
            else{
                if(this.state.añoE.length == 2 ){
                    var aux = parseInt(this.state.añoE);
                    
                    if(aux == 20 ){
                        var aux2 = parseInt(this.state.mesE);
                        if(aux2 < 5){
                            return alert('Ingrese una tarjeta que no esté vencida')
                        }
                    }else if (aux < 20){
                        return alert('Ingrese una tarjeta que no esté vencida')
                    }
               
                }else if(this.state.añoE.length == 4 ){
                    var aux = parseInt(this.state.añoE);
                    if(aux == 2020){
                        var aux2 = parseInt(this.state.mesE);
                        if(aux2 < 5){
                            return alert('Ingrese una tarjeta que no esté vencida')
                        }
                    } else if (aux < 2020){
                        return alert('Ingrese una tarjeta que no esté vencida')
                    }
                }
            } 

        }
             
        
        await axios.post(modificar, {
                    id: this.state.id,
                    email: this.state.email,
                    nombre: this.state.nombre,
                    suscripcion: this.state.suscripcion,
                    dni: this.state.dni,
                    password:this.state.password,
                }
                , { headers: { 'xaccess': this.state.token } })
                .then(res => {
                    alert(JSON.stringify(res.data))
                })
                .catch(err => {
                    alert(JSON.stringify(err.data))
                });

    }
   

    render() {
        return (
            <div>
            <div className="form-novedad" >
            <div className="col-md-6 offset-md-3">
             <div className="card card-body text-light bg-dark">

             <form onSubmit={this.modificarSuscriptor} >

                <h5 class="card-title">Mi Suscripción: </h5>
                <div className="form-group">
                <label className="text-light">Nombre
                </label>
                <input 
                    className="form-control" 
                    id="nombre" 
                    name ="nombre"
                    onChange={this.onInputChange}
                    Value={this.state.nombre}
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
                    Value={this.state.email}
                    placeholder="Ingrese su Email"
                    required
                    >
                </input>    
                </div>
               
                
                <div className="form-group">
                <label className="text-light">DNI </label>
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
                <label className="text-light"> Su tipo de suscripción actual es {this.state.valorInicial}.</label>
            
                </div>
           
                        <div>
                        
                        <label className="text-light">Si desea modificarla, ingrese la selección y los campos de la tarjeta nuevamente </label>
                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                        
                        <label> <button type="button" class="btn btn-outline-danger" onClick={this.onInputChange} name="suscripcion" value="REGULAR" data-toggle="button"> REGULAR</button> </label>
                        <label> <button type="button" class="btn btn-outline-danger" onClick={this.onInputChange} name="suscripcion" value="PREMIUM" data-toggle="button"> PREMIUM</button></label>
                        
                        </div>

                        <div className="form-group">
                            <label className="text-light">Número de tarjeta  </label>
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
                    </div>
                   
                  
                    
                
                <div className="form-group">
                <label className="text-light">Fecha de expiracion
                </label>
                <input 
                    type="number"
                    className="form-control" 
                    id="mesE" 
                    name ="mesE"
                    onChange={this.onInputChange}
                    value={this.state.mesE}
                    placeholder="MES">
                </input>    
                </div>
                <input 
                    type="number"
                    className="form-control" 
                    id="añoE" 
                    name ="añoE"
                    onChange={this.onInputChange}
                    value={this.state.añoE}
                    placeholder="AÑO">
                </input>    
            

            <div className="form-group">
                <label className="text-light">Contraseña
                </label>
                <input 
                    className="form-control" 
                    type="password"
                    id="password" 
                    name ="password"
                    onChange={this.onInputChange}
                    Value=""
                    required
                    placeholder=""
                    >
                </input>    
                
            </div>
         
            
            <div className="form-group">
                <button  type="submit" className="btn btn-danger btn-lg btn-block"
                        >
                    Modificar 
                </button>
            </div>

            </form>
            </div>
            </div>
            </div>
           

        </div>
        )
    }
}
