const DataTypes = require("sequelize");


module.exports = function(sequelize) {
    const faturas = sequelize.define(
        "faturas",
        {
            descricao: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            /*clienteId: {
                type: DataTypes.INTEGER,  
                allowNull: false , 
            }*/

            
        },
        {
            tableName: "faturas"
        }
    );
    return faturas;
}