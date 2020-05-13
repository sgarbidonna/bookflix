const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cors = require('cors');
const path = require('path');
//aca me traigo el modulo entero, se puede hacer de ambas formas
const novedadesCtrl = require('../controllers/novedades-controllers');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req,file,cb){
      cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename : function (req, file, cb){
      cb(null,  file.originalname)
  }
});
/*
const imageFilter = function(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4)$/i)) {
      return cb(new Error('Solo se permiten formatos de imagen o de video!, no se guardó el archivo'), false);
  }
  cb(null, true);
};
*/

const upload = multer({ 
  storage: storage ,
  limits: { fileSize: 1024 * 1024 * 5  },
 // fileFilter: imageFilter ,
}).single('portada');

router.get('/', auth,cors(),novedadesCtrl.listar);

router.get('/:id', auth, cors(), novedadesCtrl.visualizar);

router.post('/cargar', auth, cors(), upload, novedadesCtrl.cargar);

router.post('/modificar/:id', auth, cors(), upload, novedadesCtrl.modificar);

router.post('eliminar/:id', auth, cors(), novedadesCtrl.eliminar);

module.exports = router;

/*


var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({ storage : storage });
There are two options available, destination and filename. 
They are both functions that determine where the file should be stored.


app.post('/rest/upload',
         upload.fields([{
           name: 'video', maxCount: 1
         }, {
           name: 'subtitles', maxCount: 1
         }]), function(req, res, next){
  // ...
}

-------------------- otra solucion --------------
https://github.com/expressjs/multer#any

-------------------- otra solucion --------------
///// IMPORT DEPENDENCIES
const path = require('path'); // for getting file extension
const multer = require('multer'); // for uploading files
const uuidv4 = require('uuidv4'); // for naming files with random characters

///// DEFINE FILESTORAGE AND FILEFILTER
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => { // setting destination of uploading files        
    if (file.fieldname === "resume") { // if uploading resume
      cb(null, 'resumes');
    } else { // else uploading image
      cb(null, 'images');
    }
  },
  filename: (req, file, cb) => { // naming file
    cb(null, file.fieldname+"-"+uuidv4()+path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "resume") { // if uploading resume
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) { // check file type to be pdf, doc, or docx
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  } else { // else uploading image
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) { // check file type to be png, jpeg, or jpg
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  }
};



///// MIDDLEWARE FOR MULTER
app.use(
  multer(
    { 
      storage: fileStorage, 
      limits:
        { 
          fileSize:'2mb' 
        }, 
      fileFilter: fileFilter 
    }
  ).fields(
    [
      { 
        name: 'resume', 
        maxCount: 1 
      }, 
      { 
        name: 'image', 
        maxCount: 1 
      }
    ]
  )
);

*/