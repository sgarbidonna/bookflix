import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import 'react-confirm-alert/src/react-confirm-alert.css'; 



class ItemNovedad extends Component {
    constructor (props){
        super(props)


    }

    
    render() {

        return (
            <div>
                <div class="card-body" >
                </div>
                <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                     <div class="card-body">
                    
                        
                            <h5 className="card-title ">{this.props.libro.titulo} </h5>
                       
                        

                            <div  className="btn btn-secondary " > 
                                Ver Detalle 
                            
                                </div>
                        
                     </div>
                </div>
            </div>
            
        )
    }
}

export default  ItemNovedad;
