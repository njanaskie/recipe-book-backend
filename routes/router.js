const express = require('express')
const recipesController = require('../controllers/recipes')
const ingredientsController = require('../controllers/ingredients')
const router = express.Router()

router.get('/recipes', recipesController.getRecipes)
router.post('/recipes', recipesController.createRecipe)
router.delete('/recipes/:id', recipesController.removeRecipe)
router.put('/recipes/:id', recipesController.updateRecipe)
router.post('/recipes/scrape', recipesController.scrapeURL)

router.get('/ingredients', ingredientsController.getIngredients)
router.post('/ingredients', ingredientsController.createIngredient)
router.delete('/ingredients/:id', ingredientsController.removeIngredient)

module.exports = router;