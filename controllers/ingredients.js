const ingredientsRouter = require('express').Router();
const Ingredient = require('../models/ingredient')


getIngredients = async (req, res) => {
    const auth = req.currentUser;

    if (auth) {
        const ingredients = await Ingredient.find({}).sort( { name: 1 } )
        return res.json(ingredients.map((ingredient) => ingredient.toJSON() ));
    }
    return res.status(403).send('Not authorized get')
}
// ingredientsRouter.get('/ingredients', (req, res) => {
//     // const auth = req.currentUser;

//     // if (auth) {
//         // const ingredient = await Ingredient.find({})
//         // console.log('authenticated!', auth);
//         return res.send('Hi, from within the ingredients router GET'); 
//     // }
//     // console.log(req.currentUser)
//     // return res.status(403).send('Not authorized get')
// });

createIngredient = (req, res) => {
    const auth = req.currentUser;

    if (auth) {
        // console.log('authenticated!', auth);
        const ingredient = new Ingredient(req.body)
        const savedIngredient = ingredient.save()

        return res.status(201).json(savedIngredient);
    }
    return res.status(403).send('Not authorized post')

}
// ingredientsRouter.post('/ingredients', (req, res) => {
//     // const auth = req.currentUser;

//     // if (auth) {
//     //     console.log('authenticated!', auth);
//         const ingredient = new Ingredient(req.body)
//         const savedIngredient = ingredient.save()

//         return res.status(201).json(savedIngredient);
//     // }
//     // return res.status(403).send('Not authorized post')
// });

removeIngredient = async (req, res) => {
    const auth = req.currentUser;

    if (auth) {

        await Ingredient.findOneAndDelete({ _id: req.params.id }, (err, ingredient) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }

            if (!ingredient) {
                return res
                    .status(404)
                    .json({ success: false, error: `Ingredient not found` })
            }

            return res.status(200).json({ success: true, data: ingredient })
        }).catch(err => console.log(err))

    }
    return res.status(403).send('Not authorized post')

}

module.exports = {
    getIngredients,
    createIngredient,
    removeIngredient
};