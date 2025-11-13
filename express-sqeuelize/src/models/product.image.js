module.exports = (sequelize, DataTypes) => {
    const productImages = sequelize.define("productimages", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
            get() {
                const rawValue = this.getDataValue('image');
                if (!rawValue) return null;
                // Assuming `localhost:5000` is your image server URL
                return `http://${process.env.HOST}:${process.env.PORT}/${rawValue}`;
            }
        },
    });
    return productImages;
};