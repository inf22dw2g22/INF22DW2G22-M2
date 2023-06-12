const router = require('express').Router();
const detalheFaturasService = require('../service/detalheFaturasService');






router.post('/', createdetalhefatura);
module.exports = router;


function createdetalhefatura (req , res, next) {
    const lista = req.body
    detalheFaturasService.createdetalhefatura( lista)
        .then(users => res.json(users))
        .catch(err => next(err));          
        }









/*function createdetalhefatura (req , res, next) {
    req.body.products.forEach((item) => {
        const po = {
            faturaId: item.faturaId,
            produtoId: item.produtoId,
            quantidade: item.quantidade
    }
    console.log(po)
    detalheFaturasService.createdetalhefatura(faturaId = item.faturaId,produtoId = item.produtoId, quantidade = item.quantidade )
        .then(users => res.json(users))
        .catch(err => next(err)); 
})
    /*detalheFaturasService.createdetalhefatura( req.body.faturaId, req.body.produtoId, req.body.quantidade)
        .then(users => res.json(users))
        .catch(err => next(err));
                
            }*/
