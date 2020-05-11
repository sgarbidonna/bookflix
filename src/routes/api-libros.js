const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cors = require('cors');
const path = require('path');
const {listar, visualizar, cargar, modificar, eliminar} = require('../controllers/libros-controllers');


const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname, '../../uploads/'));
    },
    filename : function (req, file, cb){
        cb(null,  file.originalname)
    }
});
const imageFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4)$/i)) {
        return cb(new Error('Solo se permiten formatos de imagen o de video!, no se guardó el archivo'), false);
    }
    cb(null, true);
};
const upload = multer({ 
    storage: storage ,
    limits: {
        fileSize: 1024 * 1024 * 5 
    },
    fileFilter: imageFilter ,
});
const mediaUpload = upload.single('multimedia');

router.get('/',auth,cors(),listar);

router.get('/:id',auth, cors(),visualizar);

router.post('/cargar',auth,cors(), mediaUpload, cargar);

router.post('/modificar/:id',auth,cors(), mediaUpload, modificar);

router.post('/eliminar/:id',auth,cors(),eliminar);

module.exports = router;