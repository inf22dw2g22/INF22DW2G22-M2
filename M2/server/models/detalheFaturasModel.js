const DataTypes = require("sequelize");


module.exports = function(sequelize) {
    const detalheFaturas = sequelize.define(
        "detalheFaturas",
        {
            quantidade: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                timestamps: false
            },
        },
        {
            timestamps: false,
            tableName: "detalheFaturas"
        }
    );
    return detalheFaturas;
}