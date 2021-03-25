import React from 'react';
import { View } from 'react-native'
// import AppRouter from '../routers/AppRouter'
import { FirebaseProvider } from '../context/firebase-context'
// import { IngredientsProvider } from '../context/ingredients-context';
// import { RecipesProvider } from '../context/recipes-context';
// import { FiltersProvider } from '../context/filters-context';
// // import AppWrapper from './AppWrapper_old';
// import useAllRecipes from '../hooks/useAllRecipes'
// import useIngredients from '../hooks/useIngredients'

const AppWrapper = (props) => {
    // const recipes = useAllRecipes()
    // const ingredients = useIngredients()

    return (
        <FirebaseProvider >
            <View>
                {props.children}
            </View>
        </FirebaseProvider>
    )
    
}

export default AppWrapper;