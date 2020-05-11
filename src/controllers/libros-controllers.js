const librosCtrl = {};
const Libro = require('../models/Libro');

librosCtrl.listar = async (req,res)=>{
    const libros = await Libro.find();
    res.json(libros);
};

librosCtrl.visualizar = async (req,res)=>{
    const libro = await Libro.findById({_id:req.params.id});
    res.json(libro);
};

librosCtrl.cargar = async (req,res)=>{
    const libro = await Libro.findOne({titulo: req.body.titulo, isbn: req.body.isbn});
    if (libro){
        res.json('El nombre del libro o el numero de isbn ya se encuentra en uso')
    }

    libro = await new Libro({
        titulo: req.body.titulo,
        portada: req.file.filename,
        isbn: req.body.isbn,
        autor: req.body.autor,
        editorial: req.body.editorial,
        genero: req.body.genero,
        lanzamiento: req.body.lanzamiento
    });
    if(req.body.expiracion != null){
        libro.update({expiracion: req.body.expiracion})
    }
        libro.save()
            .then(lib => {
                res.status(400).send('Libro cargado con éxito'),
                res.json(lib)
            })
            .catch(err =>{
                res.json(err)
            })

};

librosCtrl.modificar = async (req,res)=>{
    const libroViejo = await Libro.findById({__id: req.params.id})
    const libroNuevo = await Libro.findOne({titulo: req.body.titulo, isbn: req.body.isbn});
    
    if (libroNuevo && libroNuevo!= libroViejo){
        res.json('El nombre del libro o el numero de isbn ya se encuentra en uso por otro libro')
    }
    
    libroNuevo = await new Libro({
        titulo: req.body.titulo,
        portada: req.file.filename,
        isbn: req.body.isbn,
        autor: req.body.autor,
        editorial: req.body.editorial,
        genero: req.body.genero,
        lanzamiento: req.body.lanzamiento
    });
    if(req.body.expiracion != null){
        libroNuevo.update({expiracion: req.body.expiracion})
    }
        libroNuevo.save()
            .then(lib => {
                libroViejo.delete(),
                res.status(400).send('Libro modificado con éxito'),
                res.json(lib)
            })
            .catch(err =>{
                res.json(err)
            })

};

librosCtrl.eliminar = async (req,res)=>{
   
    await Libro.findById(req.params.id)
        .delete()
        .then(res.status(400).send('Libro eliminado'));
    
};


module.exports = librosCtrl;