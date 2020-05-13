const mongoose = require('mongoose');
const { Schema } = mongoose;
const Autor = require('./Autor');
const Editorial = require ('./Editorial');
const Genero = require('./Genero');

const LibroSchema = new Schema({
    titulo:{
        type:String,
        required:true,
    },
    portada:{ 
        type:String, 
        required:true 
    },
    autor:{
        type: Autor,
        required:true,
    },
    isbn:{
        type: String,
        required:true,
    },
    editorial:{
        type:Editorial, 
        required:true,
    },
    genero:{
        type:Genero,
        required:true,
    },
    lanzamiento:{
        type: Date,
        required:true,
    },
    expiracion:{
        type: Date
    }
});

module.exports = mongoose.model('Libro', LibroSchema);