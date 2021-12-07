const Product = require('../models/products')
const Purchase = require('../models/purchases')
const { validationResult } = require('express-validator');

const createPurchase = async( req,res ) => {
  try {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {name, lastName, email, street, height, apartment, telephone, items} = req.body

    const newPurchase = new Purchase({
      name,
      lastName,
      email,
      street,
      height,
      apartment,
      telephone,
      items,
    })
    
    await newPurchase.save()
    
    await updateStock(items)
    
    res.status(200).json(`ok`) 
    
  } catch (error) {
    res.json(`something has failed. error : ${error}`) 
  }
}

const updateStock = async(items) => {
  items.forEach(async (item) => {
    const product = await Product.findOne({ _id: item._id });
    product.stock = item.stock;
    await product.save();
})
}

const getPurchases = async(req,res) =>{

  const products = await Product.find({})
  
  res.json(products)
}


module.exports = { createPurchase, getPurchases }