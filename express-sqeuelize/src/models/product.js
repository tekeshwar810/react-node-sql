module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("products", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.INTEGER
        },
        category: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        },
        user: {
            type: DataTypes.INTEGER
        }
    },{
        paranoid: true
    });
    return Products;
};