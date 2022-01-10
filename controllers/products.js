const Product = require('../models/products')
const { validationResult } = require('express-validator');

const createProduct = async( req,res ) => {
  try {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array(), status: 400 });
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
    return res.json( {product: newProduct, status: 200}) 
  
  } catch (error) {
    return res.status(400).json(`something has failed. error : ${error}`) 
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
    return res.json({ errors: errors.array(), status:400});
  }
  await Product.deleteOne({ _id: id });
  return res.json({prodDelete: id, status: 200})
}

const editProduct = async ( req, res ) => {
  console.log(req)
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array(), status: 400 });
  }
  const productEdit = await Product.findByIdAndUpdate(req.params.prodId , req.body, {new: true})
  
    return res.json({product:productEdit, status: 200}) 
  }


module.exports = { createProduct, deleteProduct, editProduct, getProducts, getProductsById }