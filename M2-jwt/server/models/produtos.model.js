const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        nome: { type: DataTypes.STRING(255),allowNull: false},
        preco: { type: DataTypes.DECIMAL(),allowNull: false}
        };
    return sequelize.define('produtos', attributes);
}