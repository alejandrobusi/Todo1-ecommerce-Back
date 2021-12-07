const { Router } = require('express')
const { body } = require('express-validator');
const { jwtvalidator } = require('../middleware/jwtvalidator')
const { createProduct, deleteProduct, editProduct, getProducts, getProductsById } = require('../controllers/products');
const route = Router()

route.post('/products', jwtvalidator,
body('name').trim().escape().notEmpty().withMessage("name empty").isLength({max : 60}).withMessage('maximum character is 60'),
body('description').trim().escape().notEmpty().exists().withMessage("description empty").isLength({max : 2100}).withMessage('maximum character is 2100'),
body('category').trim().escape().notEmpty().withMessage("category empty"),
body('price').trim().escape().isNumeric().withMessage('it is not number').notEmpty().withMessage("price empty"), 
body('stock').trim().escape().isNumeric().withMessage('it is not number').notEmpty().withMessage("stock empty"), 
body('imgUrl').trim().notEmpty().withMessage("url empty").isURL().withMessage('it is not a url'),
createProduct)

route.get('/products', getProducts)

route.delete('/products', jwtvalidator,
body('id').notEmpty().withMessage("isnb empty"),

deleteProduct )

route.get('/products/:prodId', getProductsById)

route.patch('/products/:prodId', jwtvalidator, 
body('name').trim().escape().notEmpty().withMessage("name empty").isLength({max : 60}).withMessage('maximum character is 60'),
body('description').trim().escape().notEmpty().exists().withMessage("description empty").isLength({max : 2100}).withMessage('maximum character is 2100'),
body('category').trim().escape().notEmpty().withMessage("category empty"),
body('price').trim().escape().isNumeric().withMessage('it is not number').notEmpty().withMessage("price empty"), 
body('stock').trim().escape().isNumeric().withMessage('it is not number').notEmpty().withMessage("stock empty"), 
body('imgUrl').trim().notEmpty().withMessage("url empty").isURL().withMessage('it is not a url'),
editProduct)

module.exports = route 