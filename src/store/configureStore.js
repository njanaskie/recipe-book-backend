import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth'
import ingredientsReducer from '../reducers/ingredients'
import pantryReducer from '../reducers/pantry'
import dishesReducer from '../reducers/dishes'
import filtersReducer from '../reducers/filters'
import recipesReducer from '../reducers/recipes'
import pantryDishesReducer from '../reducers/pantry-dishes'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            ingredients: ingredientsReducer,
            pantry: pantryReducer,
            dishes: dishesReducer,
            filters: filtersReducer,
            recipes: recipesReducer,
            pantryDishes: pantryDishesReducer,
            auth: authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store
}


