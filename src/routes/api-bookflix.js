const express = require('express');
const router = express.Router();
const Autor = require('../models/Autor');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const autores = await Autor.find();
    res.json(autores);
});

//muestra
router.post('/', async (req,res) => {
    const { nombre, apellido } = req.body;
    const autor =  new Autor({ nombre, apellido})
    await autor.save();
    res.json({status: 'autor guardado'});
    console.log(autor);
});

module.exports = router;