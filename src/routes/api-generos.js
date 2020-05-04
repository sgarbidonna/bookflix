const express = require('express');
const router = express.Router();
const Genero = require('../models/Genero');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const generos = await Genero.find();

    res.json(generos);
});

router.get('/:id', async (req, res) => {
    const genero = await Genero.findById(req.params.id);
    res.json(genero);
});


router.post('/cargar', async (req,res) => {
    
    const genero = await Genero.findOne({ nombre:req.body.nombre });
    
    if(genero){
       return res.json('El género ya fue cargado')
    }
await new Genero({
        nombre: req.body.nombre,
       }).save()
        .then(res.status(400).send('Género cargado'));


});

router.delete('/eliminar/:id', async (req,res) => {
    console.log(req.params.id);
    await Genero.findByIdAndDelete(req.params.id)
    .then(res.status(400).send('Genero eliminado'));
    
});

module.exports = router;