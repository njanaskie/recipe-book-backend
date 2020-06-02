import { useContext, useEffect, useRef } from 'react'
import database from '../firebase/firebase'
import DishesContext from '../../context/dishes-context'
import FiltersContext from '../../context/filters-context'

const useDishes = () => {
    const isCurrent = useRef(true)
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

    return dishes
}

export default useDishes