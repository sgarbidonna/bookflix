const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cors = require('cors');
const { listar, visualizar, cargar, modificar, eliminar} = require('../controllers/generos-controllers');

router.get('/', auth,cors(), listar);

router.get('/:id',auth,cors(), visualizar);

router.post('/cargar', auth,cors(), cargar);

router.post('/modificar/:id', auth, modificar);

router.post('/eliminar/:id', auth,cors(), eliminar);

module.exports = router;