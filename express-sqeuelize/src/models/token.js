module.exports = (sequelize, DataTypes) => {
    const Tokens = sequelize.define("tokens", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user: {
            type: DataTypes.INTEGER,
        },
        token: {
            type: DataTypes.STRING
        },
    });
    return Tokens;
};