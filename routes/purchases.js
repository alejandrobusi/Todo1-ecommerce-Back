const { Router } = require('express')
const { body } = require('express-validator');
const { jwtvalidator } = require('../middleware/jwtvalidator')
const { createPurchase, getPurchases } = require('../controllers/purchases');

const route = Router()

route.post('/purchases', createPurchase)

route.get('/purchases', getPurchases)


module.exports = route 