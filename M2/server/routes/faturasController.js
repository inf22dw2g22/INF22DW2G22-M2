const router = require('express').Router();
const faturaService = require('../service/faturasService');



// routes
router.get("/", getAll);
module.exports = router; 

function getAll(req, res, next) {
  faturaService.getAll()
      .then(users => res.json(users))
      .catch(err => next(err));
}
router.get('/:id', findOne);
module.exports = router; 

function findOne (req , res, next) {
    faturaService.findOne({id :req.params.id})
        .then(users => res.json(users))
        .catch(err => next(err));}

router.post('/', createfatura);
module.exports = router;
        
/*function createfatura (req , res, next) {
    faturaService.createfatura( req.body.clienteId, req.body.descricao,req.body.products)
                    .then(users => res.json(users))
                    .catch(err => next(err));
                ;
            }*/
async function createfatura(req, res) {
    try {
        const { clienteId, descricao, produtos } = req.body;
            
        // Criar a fatura
        const fatura = await db.fatura.create({ clienteId, descricao });
            
         // Adicionar os produtos à fatura
         for (const produto of produtos) {
            const { produtoId, quantidade } = produto;
      
         
            
            // Adicionar o produto à fatura com a quantidade
          await db.detalheFatura.create({
            produtoId: produtoId,
            faturaId: fatura.id,
            quantidade: quantidade
          });
       
        };
            
            return res.status(201).json(fatura);
                } catch (error) {
                  console.error(error);
                  return res.status(500).json({ error: 'Erro ao criar a fatura.' });
                }
              }
            