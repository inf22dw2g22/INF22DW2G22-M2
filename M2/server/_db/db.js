const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { host :'mysql',dialect: 'mysql' });
   
    // init models and add them to the exported db object
    db.User = require('models/user.model')(sequelize);
    db.fatura = require('models/faturasModel')(sequelize);
    db.cliente = require('models/clientesModel')(sequelize);
    db.produto = require('models/produtos.model')(sequelize);
    db.detalheFatura = require('models/detalheFaturasModel')(sequelize);

    db.cliente.hasMany(db.fatura, {
        foreignKey:{
            name: 'clienteId',
            allowNull: false, 
        },}
    )
    db.fatura.belongsTo(db.cliente,{
    foreignKey:{
        name: 'clienteId',
        allowNull: false
        }}
    );


    db.fatura.belongsToMany(db.produto,  {through: {model : db.detalheFatura}, foreignKey: 'faturaId'});
    db.produto.belongsToMany(db.fatura,  {through: {model : db.detalheFatura}, foreignKey: 'produtoId'});

    // sync all models with database
    await sequelize.sync({force:true})
    .then(() =>  { 
      db.User.create({
        firstName: 'User',
        lastName: 'one',
        username :'user1',
        hash: '$2a$10$z9R84uvSKhX3s8ilhZsTCueJif8eZJjeMI90pyN1gVdElYruZHMoK'
      });
    })
    .then(() =>  { 
      db.cliente.create({
        nome: 'Manuel',
        morada: 'porto'
      });
      db.produto.create({
        nome: 'macas',
        preco: 15,
      });
      db.produto.create({
        nome: 'peras',
        preco: 15,
      });
    })
    .then(() =>{
      db.fatura.create({
        descricao: 'porto',
        clienteId : 1,
      })
      .then(() =>{
        db.detalheFatura.create({
        quantidade : 5,
        faturaId : 1,
        produtoId: 1}) 
        });
    })
}