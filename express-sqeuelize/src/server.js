const express = require('express');
const app = express();
const PORT = 5000 || process.env.PORT
const path = require("path");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
require('dotenv').config()
require("./models/index")
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'uploads')))


const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

app.use(cors('*'));

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.use('*', (req, res) => {
    res.status(405).json({ success: false, message: 'Url not found.' });
});

// Global Error Handler Middleware (must be the last middleware)
app.use(errorHandler);

app.listen(PORT, (error) => {
    if (error) console.error(`Server is not started. ${error}`)
    else console.info(`Sever is listen on port ${PORT}`)
});