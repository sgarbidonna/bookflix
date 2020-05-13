const mongoose = require('mongoose');
const { Schema } = mongoose;


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
        type: String,
        required:true,
    },
    isbn:{
        type: String,
        required:true,
    },
    editorial:{
        type: String,
        required:true,
    },
    genero:{
        type: String,
        required:true,
    },
    lanzamiento:{
        type: Date,
        //required:true,
    },
    expiracion:{
        type: Date
    }
});

module.exports = mongoose.model('Libro', LibroSchema);