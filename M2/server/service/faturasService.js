
const db = require('_db/db');
const Sequelize = require('sequelize');
const op = db.op;

module.exports = {
   
    getAll,
    findOne,
    createfatura
};

async function getAll() {
    return db.fatura.findAll( );
}

async function findOne({id})  {
    return db.fatura.findByPk(id,{ 
        include: [{model:db.cliente, required:false,
            attributes :[`nome`]
} ,  { 
    model: db.produto,
    attributes :[`nome`, 'preco']},
]
}   
)}
async function createfatura({ clienteId, descricao, produtos }) {
    try {
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
      }

      return res.status(201).json(fatura);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar a fatura.' });
    }
  }





