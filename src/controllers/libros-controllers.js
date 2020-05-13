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
    
    const autor = await Autor.findById({__id: req.body.autor});
    const editorial = await Editorial.findById({__id: req.body.editorial});
    const genero = await Genero.findById({__id: req.body.genero});


    const libroNuevo = await new Libro({
        titulo: req.body.titulo,
        portada: req.file.filename,
        isbn: req.body.isbn,
        autor,
        editorial,
        genero,
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
                res.json(err)
            })

};

librosCtrl.modificar = async (req,res)=>{
    const libroViejo = await Libro.findById({__id: req.params.id})
    const libroNuevo = await Libro.findOne({ titulo: req.body.titulo, isbn: req.body.isbn});
    
    if (libroNuevo && libroNuevo!= libroViejo){
        res.json('El número de isbn o el título ya se encuentran en uso por otro libro')
    }
    
    const autor = await Autor.findById({__id: req.body.autor});
    const editorial = await Editorial.findById({__id: req.body.editorial});
    const genero = await Genero.findById({__id: req.body.genero});

    const libroNuevo = await new Libro({
        titulo: req.body.titulo,
        portada: req.file.filename,
        isbn: req.body.isbn,
        autor,
        editorial,
        genero,
        lanzamiento: req.body.lanzamiento
    });
    if(req.body.expiracion != null){
        libroNuevo.update({expiracion: req.body.expiracion})
    }
        libroNuevo.save()
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
        .delete()
        .then(res.status(200).send('Libro eliminado'));
    
};


module.exports = librosCtrl;