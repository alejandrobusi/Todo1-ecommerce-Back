const Product = require('../models/products')
const { validationResult } = require('express-validator');

const createProduct = async( req,res ) => {
  console.log("entra")
  try {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  const { name, description, category, price, stock, imgUrl, quantity} = req.body

  const newProduct = new Product({
    name,
    description,
    category,
    price,
    stock,
    imgUrl,
    quantity : 0
  })
  
  await newProduct.save()
  res.status(200).jsonjson(`product "${newProduct.name}" with ID ${newProduct._id} created`) 
  
  } catch (error) {
    res.status(400).json(`something has failed. error : ${error}`) 
  }
}

const getProducts = async(req,res) =>{

  const products = await Product.find({})
  
  res.json(products)
}

const getProductsById = async(req,res) =>{

  const product = await Product.findById(req.params.prodId)
  
  res.json(product)
}

const deleteProduct = async ( req, res ) => {
  
  const { id } = req.body
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  await Product.deleteOne({ _id: id });
  res.status(200).json(`it was successfully eliminated ${id}` , res.status)
}

const editProduct = async ( req, res ) => {

  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const productEdit = await Product.findByIdAndUpdate(req.params.prodId , req.body, {new: true})
  
  res.status(200).json(productEdit) 
  }


module.exports = { createProduct, deleteProduct, editProduct, getProducts, getProductsById }