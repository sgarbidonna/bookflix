import React, { Component } from 'react'
import axios from 'axios';

const generos = 'http://localhost:4000/api/generos/';
const borrar = 'http://localhost:4000/api/generos/eliminar/';

class App extends Component {
    constructor(){
        super();
        this.state = {
            user: JSON.parse(sessionStorage.getItem('user')),
            token: sessionStorage.getItem('token'),
            id: '',
    
            generos:[],
           
           
        };
            this.onInputChange = this.onInputChange.bind(this);
       
            
    }


    setGeneros(res){
        console.log(res);
        this.setState({
            generos:res
        });
    }
    
    
    //Traemos los datos y los cargamos en el array
    getData = async () => {
        const {user} = this.state.user;
        console.log(this.state.token);
        await axios.get(generos,{
            user: user,
            headers:{'xaccess':this.state.token}  
        })
        .then(res =>{
            this.setGeneros(res.data)
        })
        .catch(err =>{console.log(err.response)});
    }

    //Antes de que el componente se cargue le pasamos los datos del array
    async componentDidMount(){

        this.getData();
    }
   

    

    onInputChange = (e) => {
        console.log('input', e.target.value);

       
        this.setState({
            id:e.target.value
            
        });
        

    };


verid = async (e) => {
    e.preventDefault();
    console.log(e.target.name)

};
    eliminarGenero = async (e) =>{
        e.preventDefault();
        await axios.post(borrar + this.state.id,
            {id: this.state.id},
            {headers: {'xaccess':this.state.token}}

           
    
        ).then(res =>{ 
                console.log('se elimino el genero');
                console.log(res)})
               .catch(err =>{ 
                console.log('error en borrar genero');   
                console.log(err)}
            );
};
     
   

    render(){
        return (
        
       
        
        <div className="form-autor" >
        <div className="col-md-6 offset-md-3">
        <div className="card card-body text-light bg-dark">
        
        <form onSubmit={this.eliminarGenero}>

        
            
            <div className="form-group">
            <label for="exampleFormControlSelect1">Seleccione un genero para eliminar</label>
                <select className="form-control"  onChange={this.onInputChange}  id="exampleFormControlSelect1" name="genero">
                  
                {this.state.generos.map(ge =>
                <option key={ge.id} value={ge._id} >{ge.nombre}</option>
                )} 
              </select>
              </div>
           
        
         
            <div className="form-group">
                <button type ="submit" className="btn btn-success" >
                    Eliminar Genero
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