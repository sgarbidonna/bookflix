import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import IniciarSesion from './components/IniciarSesion';
import RegistrarSuscriptor from './components/RegistrarSuscriptor';

import Libros from './components/VistaAdmin/Libros/Libros';
import Novedades from './components/VistaAdmin/Novedades/Novedades';
import Autores from './components/VistaAdmin/Autores/AutoresCRUD';
import Editoriales from './components/VistaAdmin/Editoriales/EditorialCRUD';
import Generos from './components/VistaAdmin/Generos/GeneroCRUD';
import Suscriptores from './components/VistaAdmin/Suscriptores/Suscriptores';
import ModificarUnLibro from './components/VistaAdmin/Libros/ModificarUnLibro';
import NavegacionAdmin from './components/VistaAdmin/NavegacionAdmin';
import NavegacionSuscriptor  from './components/VistaSuscriptor/NavegacionSuscriptor';
import MiSuscripcion from './components/VistaSuscriptor/VerSuscripcion';

import VerificarSesion from './components/VerificarSesion';
import ListarNovedades from './components/VistaSuscriptor/Novedades/ListarNovedades';
import ModificarSuscripcion from './components/VistaSuscriptor/ModificarSuscripcion';
import ItemNovedad from './components/VistaSuscriptor/Novedades/ItemNovedad';
import ModificarNovedad from './components/VistaAdmin/Novedades/ModificarNovedad';




function App() {
  
  return (
   
    <Router>
      <div className="body" >
       
        <Route  exact path="/"> <IniciarSesion/> </Route>
        
        <Route  exact path="/login"> <IniciarSesion/> </Route>
        <Route  exact path="/singup"><RegistrarSuscriptor/> </Route>
        <VerificarSesion/>

        <Route  exact path="/home" ><VerificarSesion/><Home/> </Route>
        <Route  exact path='/libros'><VerificarSesion/> <Libros/>  </Route> 
        <Route  exact path="/libros/modificar/:id" render={({match  }) => (
            <div>
                <VerificarSesion/> 
                <NavegacionAdmin/> 
                <ModificarUnLibro  match={match} />
            </div>
          )} >
        </Route>
        <Route  exact path='/novedades'> <Novedades/> </Route>
        <Route  exact path="/novedades/modificar/:id" render={({match  }) => (
          <div>
            <VerificarSesion/>  
            <NavegacionAdmin/> 
            
            <ModificarNovedad  match={match} />

          </div>
        
        
        
        )} ></Route>
        <Route  exact path='/autores'> <VerificarSesion/> <Autores/> </Route>
        <Route  exact path='/editoriales'> <VerificarSesion/> <Editoriales/> </Route>
        <Route  exact path='/generos'><VerificarSesion/>   <Generos/> </Route>
        <Route  exact path='/suscriptores'> <VerificarSesion/> <Suscriptores/> </Route>
        
        <Route  exact path='/suscriptor/novedades'> 
            <VerificarSesion/>   
            <NavegacionSuscriptor/> 
            <ListarNovedades/>
        </Route>

        <Route  exact path='/suscriptor/novedad/:id' render ={({match  }) => (
          <div>
              <VerificarSesion/>   
              <NavegacionSuscriptor/> 
              <ItemNovedad match={match}/>
           </div>
        )}> 
            
        </Route>  

        <Route  exact path='/suscriptor/libros'> <VerificarSesion/> <NavegacionSuscriptor/> </Route>
        
        <Route  exact path='/suscriptor/suscripcion'render={({match  }) => (
          <div>
            <VerificarSesion/>  
            <NavegacionSuscriptor/> 
            <MiSuscripcion></MiSuscripcion>
          </div>
          )}> 
        </Route>

        <Route  exact path='/suscriptor/suscripcion/modificar'render={({match  }) => (
          <div>
            <VerificarSesion/>  
            <NavegacionSuscriptor/> 
            <ModificarSuscripcion></ModificarSuscripcion>
          </div>
          )}> 
        </Route>
      
      </div>
    </Router>
  );
}

export default App;
