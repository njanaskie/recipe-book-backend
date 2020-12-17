import React from 'react'
import { useHistory } from 'react-router-dom'
import RecipeForm from './RecipeForm'
import { useRecipesContext } from '../../context/recipes-context'

const AddRecipe = () => {
    const { recipes, addRecipe } = useRecipesContext()
    const history = useHistory()

    const onSubmit = (recipe) => {
        addRecipe(recipe)
        history.push('/')
    }

    return (
        <div>
            <RecipeForm
                onSubmit={onSubmit}
                results={recipes}
            />
        </div>
    )
}

export default AddRecipe