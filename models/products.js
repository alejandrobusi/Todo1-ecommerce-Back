const { Schema, model } = require('mongoose')

const product = new Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  stock: Number,
  imgUrl: String,
  quantity: Number,
})

module.exports = model('Product', product)