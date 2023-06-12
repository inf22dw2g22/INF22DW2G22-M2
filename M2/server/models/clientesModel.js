const DataTypes = require("sequelize");


module.exports = function(sequelize) {
    const clientes = sequelize.define(
        "clientes",
        {
            nome: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            morada: {
                type: DataTypes.STRING(255),
                allowNull: false
            }
        },
        {
            tableName: "clientes"
        }
    );
    return clientes;
}