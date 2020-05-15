import React, { Component } from 'react';
import NavegacionAdmin from '../NavegacionAdmin'
import CargarNovedad from './CargarNovedad'
import Carrousel from './Carrousel';
import ListarVertical from './ListarVertical';
import ListarNovedades from '../../VistaSuscriptor/Novedades/ListarNovedades';
import ListarNovedadesAdmin from './ListarNovedadesAdmin';


export default class Novedades extends Component {
 

render() {
    return (
        <div>
            <NavegacionAdmin/>
            <CargarNovedad/>

            <ListarNovedadesAdmin></ListarNovedadesAdmin>
            <Carrousel/>
            <ListarVertical/>
        </div>
    )}
}

