const librosCtrl = {};
const Libro = require('../models/Libro');
const Editorial = require('../models/Editorial');
const Autor = require('../models/Autor');
const Genero = require('../models/Genero');

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
        libroNuevo.update({expiracion: req.body.expiracion})
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
    const libroViejo = await Libro.findById({__id: req.params.id})
    const libroNuevo = await Libro.findOne({ titulo: req.body.titulo, isbn: req.body.isbn});
    
    if (libroNuevo && libroNuevo!= libroViejo){
        res.status(401).json('El número de isbn o el título ya se encuentran en uso por otro libro')
    }
    
   
    const libroModificado = await new Libro({
        titulo: req.body.titulo,
        portada: req.file.filename,
        isbn: req.body.isbn,
        autor:req.body.autor,
        editorial:req.body.editorial,
        genero:req.body.genero,
        lanzamiento: req.body.lanzamiento
    });
    if(req.body.expiracion != null){
        libroModificado.update({expiracion: req.body.expiracion})
    }
    libroModificado.save()
            .then(lib => {
                libroViejo.delete(),
                res.status(200).send('Libro modificado con éxito'),
                res.json(lib)
            })
            .catch(err =>{
                res.json(err)
            })

};

librosCtrl.eliminar = async (req,res)=>{
   
    await Libro.findById(req.params.id)
        .remove()
        .then(res.status(200).send('Libro eliminado'));
    
};


module.exports = librosCtrl;