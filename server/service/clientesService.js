
const db = require('_db/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op



module.exports = {
    getAll,
    findOne,
    getById,
    createcliente,
    updateCliente,
};
/* buscar todos os clientes*/
async function getAll() {
    return db.cliente.findAll( );
}

async function findOne({nome})  {
    return db.cliente.findAll( {where :  {nome: {  [Op.substring] : `${nome}` }}} )      
} 
async function getById({id}) {
    return db.cliente.findByPk(id);
}

async function createcliente( nome, morada,) {
    return (db.cliente.create({nome: `${nome}`,morada: `${morada}`})
    )}
async function updateCliente(id, nome, morada,) {
    await db.cliente.update({nome: `${nome}`,morada: `${morada}`}, {where :  {id: { [Op.eq]: `${id}` }}});
    return db.cliente.findAll( {where :  {id: { [Op.eq]: `${id}` }}} )
    }