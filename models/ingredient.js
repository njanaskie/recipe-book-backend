const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
});

ingredientSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Ingredient', ingredientSchema);