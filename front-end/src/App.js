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


function App() {
  return (
   
    <Router>
      <div className="body" >

        <Route  path="/home" exact><Home/> </Route>
        <Route  path="/login"> <IniciarSesion/> </Route>
        <Route  path="/singup"><RegistrarSuscriptor/> </Route>
        
        <Route  path='/libros'> <Libros/> </Route> 
        <Route  path='/novedades'> <Novedades/> </Route>
        <Route  path='/autores'> <Autores/> </Route>
        <Route  path='/editoriales'> <Editoriales/> </Route>
        <Route  path='/generos'> <Generos/> </Route>
      
      </div>
    </Router>
  );
}

export default App;
