import React, { Component } from 'react';

import NavegacionAdmin from '../NavegacionAdmin';
import CargarMetadata from './CargarMetadataLibro';
import ListarVertical from './ListarVertical';
import Carrousel from './Carrousel';
import ListarLibrosAdmin from './ListarLibrosAdmin'


export default class Libros extends Component {


render() {
    return (
        <div>

            <NavegacionAdmin/>
           
            <ListarLibrosAdmin></ListarLibrosAdmin>
           
            
            

        </div>
    )
}
}

