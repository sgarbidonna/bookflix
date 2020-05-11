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
        ingredients: {
            type: Schema.Types.ObjectId,
            ref: 'Autor'
        },
        required:true,
    },
    isbn:{
        type: Number,
        required:true,
    },
    editorial:{
        ingredients: {
            type: Schema.Types.ObjectId,
            ref: 'Editorial'
        },
        required:true,
    },
    genero:{
        ingredients: {
            type: Schema.Types.ObjectId,
            ref: 'Genero'
        },
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