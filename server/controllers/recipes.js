const recipesRouter = require('express').Router();
const Recipe = require('../models/recipe')


getRecipes = async (req, res) => {
        const auth = req.currentUser;

        if (auth) {
            const recipes = await Recipe.find({ savedBy: auth.uid })
            // const recipes = await Recipe.find({})
            return res.json(recipes.map((recipe) => recipe.toJSON() ));
        }
        return res.status(403).send('Not authorized get')

}

createRecipe = async (req, res) => {
    const auth = req.currentUser;

    if (auth) {
        // console.log('authenticated!', auth);
        const recipe = new Recipe(req.body)
        const savedRecipe = await recipe.save()

        return res.status(201).json(savedRecipe);
    }
    return res.status(403).send('Not authorized post')

}

removeRecipe = async (req, res) => {
    const auth = req.currentUser;

    if (auth) {
        try {
            const recipe = await Recipe.findById(req.params.id);
            if (!recipe) {
              res.status(404).json({
                success: false,
                error: 'Not Found'
              });
            }
        
            await recipe.delete();
            return res.status(200).json({
              success: true,
              data: {}
            });
          } catch (error) {
            console.log(error)
          }
    }   
    return res.status(403).send('Not authorized post')

    // if (auth) {
    //     await Recipe.findOneAndDelete({ _id: req.params.id }, (err, recipe) => {
    //         if (err) {
    //             return res.status(400).json({ success: false, error: err })
    //         }

    //         if (!recipe) {
    //             return res
    //                 .status(404)
    //                 .json({ success: false, error: `Recipe not found` })
    //         }

    //         return res.status(200).json({ success: true, data: recipe })
    //     }).catch(err => console.log(err))
    // }   
    // return res.status(403).send('Not authorized post')

}

updateRecipe = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'recipe not found!',
            })
        }
        recipe.url = body.url
        recipe.ingredients = body.ingredients
        recipe.customTags = body.customTags
        recipe.cuisine = body.cuisine
        recipe.type = body.type
        recipe
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: recipe._id,
                    message: 'recipe updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'recipe not updated!',
                })
            })
    })
}

module.exports = {
    getRecipes,
    createRecipe,
    removeRecipe,
    updateRecipe
};