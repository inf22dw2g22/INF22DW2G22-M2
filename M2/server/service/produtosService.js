const db = require('_db/db');
const Sequelize = require('sequelize');
const op = Sequelize.Op



module.exports = {
    getAll,
    findOne,
    getById,
    createproduto,
    changeproduto,
};
/* buscar todos os clientes*/
async function getAll() {
    return await db.produto.findAll();
}

async function findOne({nome})  {
    return db.produto.findAll( {where :  {nome: { [op.substring]: `${nome}` }}} )    
} 

async function getById({id}) {
    return db.produto.findByPk(id);
}

async function createproduto( nome, preco,) {
    return (db.produto.create({nome: `${nome}`,preco: `${preco}`})
)}

async function changeproduto(id, nome, preco,) {
    await db.produto.update({nome: `${nome}`,preco: `${preco}`}, {where :  {id: { [op.eq]: `${id}` }}});
    return db.produto.findAll( {where :  {id: { [op.eq]: `${id}` }}} )
}