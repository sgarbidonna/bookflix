const express = require('express');
const router = express.Router();
const Libro = require('../models/Libro');
const auth = require('../middleware/auth');

router.get('/',(req,res)=>{
    const libros = await Libro.find();
    res.json(libros);
});

router.post('/cargar',(req,res)=>{
    res.json('cargar metadata de libro');
});

router.put('/modificar/:id',(req,res)=>{
    Libro.findByIdAndUpdate({_id:req.params.id},
        {

        });
    res.json('modificar metadata de libro');
    
});

router.delete('/eliminar/:id',(req,res)=>{
   
    await Libro.findByIdAndDelete(req.params.id)
    .then(res.status(400).send('Libro eliminado'));
    
});

module.exports = router;