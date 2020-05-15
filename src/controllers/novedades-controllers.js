const novedadesCtrl = {};
const Novedad = require('../models/Novedad');


novedadesCtrl.listar = async (req, res) => {
    const novedades = await Novedad.find();
    res.json(novedades);
};

novedadesCtrl.visualizar = async (req, res) => {
    
    await Novedad.findById(req.body.id)
        .then(nov=>{ res.status(200).json(nov)})
};

novedadesCtrl.cargar =  async (req,res) => {
    
    const novedad = await Novedad.findOne({titulo : req.body.titulo });
   
    if(novedad){
        res.status(401).json('La Novedad ya fue cargada anteriormente')
    }

    await new Novedad({
        titulo:req.body.titulo, 
        descripcion: req.body.descripcion,
        publicacion: req.body.publicacion,
        portada: req.file.filename,
       })
        .save()
        .then( novedad => {
            res.status(200).json({
                message: 'Novedad cargada con éxito',
                novedad
            })
        })
        .catch(err=> res.status(401).send(err));
};

novedadesCtrl.modificar = async (req,res) => {
    const novedadNueva = await Novedad.findOne({ titulo: req.body.titulo });
    
    if(novedadNueva._id != req.body.id){
            return res.status(401).send('El titulo ya se encuentra en uso por otra novedad')
    } else{
        const novedadVieja =  await Novedad.findById(req.body.id);
        
        if(req.file){
            await novedadVieja.updateOne({portada: req.file.filename})
        }
        
        await novedadVieja.updateOne(req.body.id, 
            {
            titulo:req.body.titulo, 
            descripcion: req.body.descripcion,
            publicacion: req.body.publicacion,
            
        })
            .then( novedad => {
                res.status(200).send('Novedad modificada con éxito'),
                res.json(novedad)
            })
        }
};

novedadesCtrl.eliminar = async (req,res) => {
    console.log(req.body.id);
    await Novedad.findByIdAndRemove(req.body.id)
        .then(res.status(200).send('Novedad eliminada'));
    
};

module.exports = novedadesCtrl;