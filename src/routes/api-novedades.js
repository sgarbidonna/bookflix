const express = require('express');
const router = express.Router();
const Novedad = require('../models/Novedad');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const novedades = await Novedad.find();
    res.json(novedades);
});

router.get('/', auth, async (req, res) => {
    const novedad = await Novedad.findById(req.user.id);
    res.send(novedad);
});

router.post('/cargar', auth, async (req,res) => {

    const novedad = Novedad.findOne({ titulo:req.body.titulo, descripcion: req.body.descripcion });
    
    if(novedad){
        res.json('La Novedad ya fue cargada')
    }

    const novedadNueva = new Novedad({
        titulo:req.body.titulo, 
        descripcion: req.body.descripcion,
        publicacion: req.body.publicacion
       });

    await novedadNueva.save()
        .then(res.status(400).send( 'Novedad cargada'))
        .catch(err);

    console.log(novedadNueva);

});

router.delete('/eliminar', auth, async (req,res) => {
    
    await Novedad.findByIdAndDelete(req.user.id)
    .then(res.status(400).send('Novedad eliminada'));
    
}); 
/*
router.put('/modificar/:id',async (req,res) => {
    const novedad = Novedad.findById(req.params.id);
    const { titulo, descripcion, publicacion } = req.body;
    const novedadNueva = new Novedad({ titulo, descripcion, publicacion })
    
    await novedad.delete();
    await novedad
        .save();
    await novedadNueva
        .save()
        .then(res.status(400).send('Novedad modificada'))

});

*/
router.put('/modificar/:id',async (req,res) => {

    await Novedad.findOneAndUpdate({ _id: req.params.id } //este es el, 
        
        ,{ titulo: req.body.titulo, // este es el update
        descripcion:req.body.descripcion , 
        publicacion: req.body.publicacion }, 

        function( err, result ) { // este es el callback
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
});

module.exports = router;