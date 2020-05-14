import React, { Component } from 'react';

import NavegacionAdmin from '../NavegacionAdmin'
import CargarMetadata from './CargarMetadataLibro'
import ListarVertical from './ListarVertical'
import Carrousel from './Carrousel'


export default class Libros extends Component {


render() {
    return (
        <div>
            <NavegacionAdmin/>
            <CargarMetadata/>
            <Carrousel/>
            <ListarVertical/>

        </div>
    )
}
}

