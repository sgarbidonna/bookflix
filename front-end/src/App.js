import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import IniciarSesion from './components/IniciarSesion';
import RegistrarSuscriptor from './components/RegistrarSuscriptor';
import Home from './components/Home';
import Navegacion from './components/Navegacion';


function App() {
  return (
   
    <Router>
      <div className="body" >
       
        <Route  path="/" exact> <Navegacion></Navegacion> <h1>aca iria iniciar sesion</h1>  </Route>
        <Route  path="/login">   <Navegacion></Navegacion> <IniciarSesion></IniciarSesion>  </Route>
        <Route  path="/singup"> <Navegacion></Navegacion> <RegistrarSuscriptor></RegistrarSuscriptor> </Route>
        <Route  path="/home"> <Home></Home>  </Route>
      
      </div>
    </Router>
  );
}

export default App;
