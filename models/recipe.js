const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  cuisine: String,
  customTags: Array,
  ingredients: Array,
  type: String,
  url: String,
  savedBy: String,
  urlSite: String,
  urlTitle: String,
  urlImage: String,
},
{ timestamps: true });

recipeSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Recipe', recipeSchema);