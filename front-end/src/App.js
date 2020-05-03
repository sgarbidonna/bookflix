import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
//import CreateNovedad from './components/Novedades/CargarNovedad';
//import EditNovedad from './components/Novedades/ModificarNovedad';
import IniciarSesion from './components/Suscriptores/IniciarSesion';
import CargarSuscriptor from './components/Suscriptores/CargarSuscriptor';


function App() {
  return (
    <div className="body" >

    <IniciarSesion></IniciarSesion>
    <CargarSuscriptor></CargarSuscriptor>
    
    </div>
  );
}

export default App;
/*
  
    <CreateNovedad></CreateNovedad>
    <EditNovedad></EditNovedad>    
  
    */