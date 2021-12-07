const { Schema, model } = require('mongoose')

const purchase = new Schema({
  name: String,
  lastName: String,
  email: String,
  street: String,
  height: String,
  apartment: String,
  telephone: String,
  items: Array,

})

module.exports = model('Purchase', purchase)