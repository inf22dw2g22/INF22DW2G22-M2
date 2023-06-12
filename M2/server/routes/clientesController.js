const router = require('express').Router();
const clienteService = require('../service/clientesService');
const authorize = require('_middleware/authorize')


// routes
router.get("/", authorize(),getAll);
router.get('/:nome', authorize(),findOne);
router.get('/id/:id', authorize(),getById);
router.post('/', authorize(),createcliente);
router.put('/:id', authorize(),updateCliente);
module.exports = router; 

function getAll(req, res, next) {
    clienteService.getAll()
        .then(clientes => res.json(clientes))
        .catch(err => next(err));
}

function findOne (req , res, next) {
    clienteService.findOne({nome :req.params.nome})
        .then(clientes => res.json(clientes))
        .catch(err => next(err));
}

function getById (req , res, next) {
    clienteService.getById({id :req.params.id})
        .then(clientes => res.json(clientes))
        .catch(err => next(err));}

function createcliente (req , res, next) {
    clienteService.createcliente( req.body.nome, req.body.morada )
        .then(clientes => res.json(clientes))
        .catch(err => next(err));
}

function updateCliente (req , res, next) {
    clienteService.updateCliente( req.body.id,req.body.nome, req.body.morada )
        .then(clientes => res.json(clientes))
        .catch(err => next(err));
}