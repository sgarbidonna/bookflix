import React, { Component } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios';
import VisualizarUnaNovedad from './VisualizarUnaNovedad';

const novedades= 'http://localhost:4000/api/novedades/';

export default class Carrusel extends Component {
    constructor(){
        super();
        this.state={
            user: JSON.parse(sessionStorage.getItem('user')),
            token: sessionStorage.getItem('token'),

            novedades:[],
            novedadess:[]
        }

    }
    

    setNovedades(res){
       
        var num =4;
        var aux=[]; 
        var aux2=[];
        res.map( no=> {
            if(aux.length < num){
                aux.push(no);
            }else{
                aux.push(no);
                aux2.unshift(aux);
                aux=[] 
            };
        });
        if(aux!==[] ){
            aux2.unshift(aux);
        }


        this.setState({
            novedades:res,
            novedadess:aux2
        });
    }

    getData = async () =>{
        await axios.get(novedades,{
            
            headers:{'xaccess':this.state.token}  
        })
        .then(res =>{
            this.setNovedades(res.data)
        })
        .catch(err =>{console.log(err.response)});
        

    }
    async componentDidMount(){

        this.getData();
    }





    render() {
        const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          className: 'slides',
          
        };
        return (
          <div className="carrusel">
           
            <Slider {...settings}>
            {this.state.novedadess.map(nove => 
                <div key={nove.id}>  { nove.map( no=>
                    <div class="card-body">
                        <VisualizarUnaNovedad key={no._id} novedad={no} token={this.state.token}/>
                    </div>
                     )}
                </div>
            )}              
            </Slider>
          </div>
        );
      }
}
