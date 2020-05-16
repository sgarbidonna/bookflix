const librosCtrl = {};
const Libro = require('../models/Libro');


librosCtrl.listar = async (req,res)=>{
    const libros = await Libro.find();
    res.json(libros);
};

librosCtrl.visualizar = async (req,res)=>{
    
    await Libro.findById(req.body.id)
        .then(lib=>{ res.json(lib)})
    
};

librosCtrl.cargar = async (req,res)=>{
    const libroI = await Libro.findOne({ isbn: req.body.isbn});
   
    if (libroI){

        return res.send('El número de ISBN ya se encuentra en uso')
    } else{
        const libroT = await Libro.findOne( {nombre: req.body.nombre });
        if(libroT){
            return res.send('El título ya se encuentra en uso por otro libro.')
        }
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
                res.send('Libro cargado con éxito')            
            })
            .catch(err =>{
                res.json(err)
            })

};

librosCtrl.modificar = async (req,res)=>{
    
    
    const libroNuevo = await Libro.findOne({ isbn: req.body.isbn });
    
    if(libroNuevo._id != req.body.id){
            return res.send('El número de isbn ya se encuentra en uso por otro libro')
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
                    res.send('Libro modificado con éxito'),
                    res.json(lib)
                })
    }
    
    

};

librosCtrl.eliminar = async (req,res)=>{
    
    await Libro.findByIdAndRemove(req.body.id)
        .then(res.send('Libro eliminado'));
    
};


module.exports = librosCtrl;