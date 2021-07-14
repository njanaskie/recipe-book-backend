const recipesRouter = require('express').Router();
const Recipe = require('../models/recipe');
const scraper = require('../scraper/scraper');


scrapeURL = async (req, res) => {
    const auth = req.currentUser;

    if (auth) {
        try {
            const url = req.body.url
            const scrapedData = await scraper(url)
            console.log('scrapeURL', scrapedData)
            return res.json(scrapedData)
        } catch (error) {
            console.log('scrapeURL error', error)
        }

    }
    return res.status(403).send('Not authorized scrapeURL get')
}

getRecipes = async (req, res) => {
        const auth = req.currentUser;
        const limit = req.query.per_page
        const skip = req.query.page === 1 ? 0 : (req.query.page * limit) - limit
        console.log('req', req.query, skip, limit)

        if (auth) {
            const recipes = await Recipe.find({ savedBy: auth.uid })
                .skip(parseInt(skip))
                .limit(parseInt(limit))
                .sort({
                    createdAt: 'desc'
                })
            // const recipes = await Recipe.find({})
            return res.json(recipes.map((recipe) => recipe.toJSON() ));
        }
        return res.status(403).send('Not authorized get')

}

createRecipe = async (req, res) => {
    const auth = req.currentUser;
    const body = req.body

    if (auth) {
        // const scrapedData = await fetchURL(body.url)
        // console.log(scrapedData)
        // const data = {...body, ...scrapedData}
        // console.log('saving...', data);

        console.log('saving...', body);
        const recipe = new Recipe(body)
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
    updateRecipe,
    scrapeURL,
};