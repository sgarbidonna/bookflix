const librosCtrl = {};
const Libro = require('../models/Libro');


librosCtrl.listar = async (req,res)=>{
    const libros = await Libro.find();
    res.json(libros);
};

librosCtrl.visualizar = async (req,res)=>{
    
    await Libro.findById(req.body.id)
        .then(lib=>{ res.status(200).json(lib)})
    
};

librosCtrl.cargar = async (req,res)=>{
    const libro = await Libro.findOne({isbn: req.body.isbn});
   
    if (libro){
        res.status(401).json('El numero de isbn ya se encuentra en uso')
    }
    

    const libroNuevo = await new Libro({
        titulo: req.body.titulo,
        portada: req.file.filename,
        isbn: req.body.isbn,
        autor:req.body.autor,
        editorial:req.body.editorial,
        genero:req.body.genero,
        lanzamiento: req.body.lanzamiento
    });
    
    if(req.body.expiracion != null){
        await libroNuevo.update({expiracion: req.body.expiracion})
    }
    libroNuevo.save()
            .then(lib => {
                res.status(200).send('Libro cargado con éxito'),
                res.json(lib)
            })
            .catch(err =>{
                res.status(401).json(err)
            })

};

librosCtrl.modificar = async (req,res)=>{
    
    
    const libroNuevo = await Libro.findOne({ isbn: req.body.isbn });
    
    if(libroNuevo._id != req.body.id){
            return res.status(401).send('El número de isbn ya se encuentra en uso por otro libro')
        }
       

    else{
        const libroViejo=await Libro.findById(req.body.id);

        if(req.file){
            await libroViejo.updateOne({portada: req.file.filename})
        }
        await libroViejo.updateOne({
            titulo: req.body.titulo,
            
            isbn: req.body.isbn,
            autor:req.body.autor,
            editorial:req.body.editorial,
            genero:req.body.genero,
            lanzamiento: req.body.lanzamiento,
            expiracion: req.body.expiracion
            })
            .then(lib => {
                    res.status(200).send('Libro modificado con éxito'),
                    res.json(lib)
                })
    }
    
    

};

librosCtrl.eliminar = async (req,res)=>{
    
    await Libro.findByIdAndRemove(req.body.id)
        .then(res.status(200).send('Libro eliminado'));
    
};


module.exports = librosCtrl;