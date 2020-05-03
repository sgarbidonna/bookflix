const express = require('express');
const router = express.Router();
const Editorial = require('../models/Editorial');


router.get('/', async (req, res) => {
    const editoriales = await Editorial.find();
    res.json(editoriales);
});


router.post('/cargar', async (req,res) => {
    const editorial = Editorial.findOne({nombre:req.body.nombre});
    
    if(editorial){
        res.json('La editorial ya fue cargada')
    }
    editorial = new Editorial({
        nombre: req.body.nombre,
       });
    await editorial.save()
        .then(res.status(400).send('Editorial cargada'))
        .catch(err);

    console.log(autor);

});

router.delete('/eliminar/:id', async (req,res) => {
    
    await Editorial.findByIdAndDelete(req.params.id)
    .then(res.status(400).send('Editorial eliminada'));
    
});

router.put('/modificar/:id',async (req,res) => {
    
    await Editorial.findByIdAndUpdate(req.params.id)
    .then(res.status(400).send('Editorial modificada'));
    
});


module.exports = router;