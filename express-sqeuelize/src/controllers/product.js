const Product = require("../models").products;
const productImages = require("../models").productImages;
const { Op } = require('sequelize')
const { pagination } = require("../utils/pagination");

const addProduct = async (req, res) => {
    try {
        const files = req.files;
        if (files.length) {
            const product = await Product.create({
                ...req.body,
                user: req.user.id,
            });
            const images = files.map((file) => {
                return {
                    image: file.filename,
                    product: product.dataValues.id
                };
            });
            const productImg = await productImages.bulkCreate(images);
            return res
                .status(201)
                .send({ success: true, message: "Product added successfully.", data: { product, productImg } });
        } else {
            return res.status(400).send({ success: false, message: "Product image is required." });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error." })
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: productImages,
                    attributes: ['id', 'image'], // Specify the attributes you want to include
                }
            ],
        });
        return res
            .status(200)
            .send({ success: true, message: "Product retrieved successfully.", data: product });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error." })
    }
}   

const getAllProduct = async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        const filter = {
            user: {
                [Op.eq]: req.user.id
            },
        }
        const condition = { ...filter }

        if (search) {
            condition.name = { [Op.like]: `%${search.trim()}%` }
        }

        const paginate = pagination(page, limit)
        const productCount = await Product.count({ where: filter })
        const products = await Product.findAll({
            where: condition,
            include: [
                {
                    model: productImages,
                    attributes: ['id', 'image'], 

                }
            ],
            order: [
                ['id', 'DESC'],
            ],
            offset: paginate.offset,
            limit: paginate.pageSize,
            //distinct: true
        });
        return res
            .status(200)
            .send({ success: true, message: "Products retrieved successfully.", data: { count: productCount, rows: products } });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error." })
    }
}

const updateProduct = async (req, res) => {
    try {
        const updateProductData = req.body;
        
        if(req.files.length) {
            const files = req.files;
            const images = files.map((file) => {
                return {
                    image: file.filename,
                    product: req.params.id
                };
            });
            await productImages.destroy({ where: { product: req.params.id } });
            await productImages.bulkCreate(images);
        }   
        const product = await Product.update(updateProductData, {
            where: { id: req.params.id },
            
            returning: true
        })
        return res
            .status(200)
            .send({ success: true, message: "Products updated successfully.", data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error." })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.destroy({
            where: { id: req.params.id }
        })
        return res
            .status(200)
            .send({ success: true, message: "Products deleted successfully.", data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error." })
    }
}

module.exports = { addProduct, getAllProduct, updateProduct, getProduct, deleteProduct }