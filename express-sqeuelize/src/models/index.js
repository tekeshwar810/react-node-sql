const dbConfig = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        idle: dbConfig.pool.idle
    },
    logging:false
 });

sequelize.authenticate()
    .then(() => console.info('Database Connected...'))
    .catch((error) => console.error('Database Not Connected...', error))


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users")(sequelize, DataTypes);
db.tokens = require('./token')(sequelize, DataTypes);
db.products = require('./product')(sequelize, DataTypes);
db.productImages = require('./product.image')(sequelize, DataTypes);

/* Relationships */
db.products.hasMany(db.productImages,{
    foreignKey: 'product'
    
})

db.sequelize.sync().then(()=> 'Database is sync.');
module.exports = db;
