const express = require('express');
const router = express.Router();
const Autor = require('../models/Autor');

router.get('/', async (req, res) => {
    const autores = await Autor.find();
    res.json(autores);
});

router.post('/cargar', async (req,res) => {
    const autor = Autor.findOne({nombre:req.body.nombre, apellido:req.body.apellido});
    
    if(autor){
        res.json('El autor ya fue cargado')
    }
    await Autor({
        nombre: req.body.nombre,
        apellido:req.body.apellido
    }).save()
        .then(res.status(400).send('Autor cargado'))
        .catch(err);

});

router.delete('/eliminar/:id', async (req,res) => {
    
    await Autor.findByIdAndDelete(req.params.id)
    .then(res.status(400).send('Autor eliminado'));
    
});

router.put('/modificar/:id', async (req,res) => {
    
    await Autor.findByIdAndUpdate(req.params.id)
    .then(res.status(400).send('Autor modificado'));
    
});


module.exports = router;