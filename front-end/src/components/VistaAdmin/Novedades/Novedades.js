import React, { Component } from 'react';
import NavegacionAdmin from '../NavegacionAdmin'
import CargarNovedad from './CargarNovedad'
import Carrousel from './Carrousel';
import ListarVertical from './ListarVertical';


export default class Novedades extends Component {
 

render() {
    return (
        <div>
            <NavegacionAdmin/>
            <CargarNovedad/>
            <Carrousel/>
            <ListarVertical/>
        </div>
    )}
}

