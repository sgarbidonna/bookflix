import React, { Component } from 'react';
import { Link ,Redirect} from 'react-router-dom';


class NavegacionSuscriptor extends Component {
  constructor(){
    super();
    this.state={
        user:'',
        token: sessionStorage.getItem('token'),
    };
    
   };

   cerrarSesion=()=>{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

   }


    render (){
        return (
          
          this.state.token == '' ?

          <Redirect to='/login'/>

          : <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
               <img width="185px" height="50px" src={'http://localhost:4000/uploads/bookflix.png'}/>
              
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto" >
                  
                <li className="nav-item ">
                  <Link className="nav-link" to="/home">Home</Link>
                  </li>

                  <li className="nav-item ">
                  <Link className="nav-link" to="/suscriptor/libros">Libros</Link>
                  </li>

                  <li className="nav-item">
                  <Link className="nav-link" to="/suscriptor/novedades">Novedades </Link>
                  </li>
                
                  <li>
                      <Link  className="nav-link" to='/login'  type= 'submit' onClick= {this.cerrarSesion}> Cerrar Sesión </Link>
                  </li>
                  
                    
                </ul>
              </div>
          
      
          </nav>
        );
    }
}

export default NavegacionSuscriptor; 

