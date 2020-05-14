import React, {  Component } from 'react';
import { Redirect , Link } from 'react-router-dom';



export default class NavegacionAdmin extends Component {
    constructor(){
      super();
      this.state={
          user:'',
          token: sessionStorage.getItem('token'),
      };
      this.cerrarSesion= this.cerrarSesion.bind(this);

  };


  cerrarSesion = () => {
    sessionStorage.removeItem('token');
    
   
}
    render (){
        return (
         this.state.token !== '' ?
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
              <a className="navbar-brand" href=" "> BOOKFLIX </a>
              
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto" >
                  
                <li className="nav-item ">
                  <Link className="nav-link" to="/home">Home</Link>
                  </li>

                  <li className="nav-item ">
                  <Link className="nav-link" to="/libros">Libros</Link>
                  </li>

                  <li className="nav-item">
                  <Link className="nav-link" to="/novedades">Novedades </Link>
                  </li>
                  
                  <li className="nav-item">
                  <Link className="nav-link" to="/autores">Autores </Link>
                  </li>
                  
                  <li className="nav-item">
                  <Link className="nav-link" to="/editoriales">Editoriales </Link>
                  </li>

                  <li className="nav-item">
                  <Link className="nav-link" to="/generos">Generos </Link>
                  </li>
                  
                  <form onSubmit= {this.cerrarSesion}>
                    <button type= 'submit'> Cerrar Sesión </button>
                  </form>
                </ul>
              </div>
          
      
          </nav>

        : <Redirect to='/home'/>

            
        );
    }
}


