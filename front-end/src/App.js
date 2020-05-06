import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import CreateNovedad from './components/Novedades/CargarNovedad';
//import EditNovedad from './components/Novedades/ModificarNovedad';
import IniciarSesion from './components/Suscriptores/IniciarSesion';
import CargarSuscriptor from './components/Suscriptores/CargarSuscriptor';
import Home from './components/Home';





function App() {
  return (
    <Router>
      <div className="body" >
        <Route path="/" exact>
          <h1>hola</h1>
        </Route>
        <Route  path="/login">   
          <IniciarSesion></IniciarSesion>
        </Route>
        <Route  path="/singup">
          <CargarSuscriptor></CargarSuscriptor>
        </Route>
        <Route  path="/home">
          <Home></Home>
        </Route>
      </div>
    </Router>
  );
}

export default App;
/*
  
    <CreateNovedad></CreateNovedad>
    <EditNovedad></EditNovedad>    
  
    */