import { useContext, useEffect, useRef } from 'react'
import database from '../firebase/firebase'
import DishesContext from '../../context/dishes-context'
import FiltersContext from '../../context/filters-context'

const useDishes = () => {
    const isCurrent = useRef(true)
    const { filters } = useContext(FiltersContext)
    const { dishes, dishDispatch } = useContext(DishesContext)

    useEffect(() => {
        return () => {
            isCurrent.current = false
        }
    }, [])

    useEffect(() => {
        database.collection('dishes')
        .get()
        .then((snapshot) => {
            if (isCurrent.current) {
                const dishes = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                    }))
    
                dishDispatch({ type: 'SET_DISHES', dishes})
                console.log('useDishes current')
            }
        });
    }, [])
    if (filters) {
        console.log(filters)
        console.log(dishes)
    }
    const filteredDishes = filters ? dishes
        .filter(dish => 
            dish.name.toLowerCase().includes(filters.text.toLowerCase()) &&
            dish.keyIngredients.some(keyIngredient => keyIngredient.includes(filters.keyIngredients)) &&
            dish.cuisine.toLowerCase().includes(filters.cuisine.toLowerCase()) &&
            dish.type.toLowerCase().includes(filters.dishType.toLowerCase())
        )
        :
            dishes

    return filteredDishes
}

export default useDishes