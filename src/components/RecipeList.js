import React, { useState } from 'react'
import { Pagination } from 'semantic-ui-react'
import RecipeListPagination from './RecipeListPagination'
import RecipeListItem from './RecipeListItem'
import useRecipes from '../hooks/useRecipes'
import useNextRecipe from '../hooks/useNextRecipe'
import useFilteredRecipes from '../hooks/useFilteredRecipes'
import useAllRecipes from '../hooks/useAllRecipes'
import { config } from '../../config'

export const RecipeList = (props) => {
    const initialFormState = {
        activePage: 1,
        // isNextPage: false,
        // isPreviousPage: false,
        // isNextButtonDisabled: false,
        // isPreviousButtonDisabled: false,
    }
    const [pageState, setPageState] = useState(initialFormState)
    // const results = useRecipes(pageState)
    // const nextResult = useNextRecipe(results)
    const results = useAllRecipes()
    const startIndex = (pageState.activePage * config.itemsPerPage) - config.itemsPerPage
    const endIndex = startIndex + config.itemsPerPage
    const paginatedItems = results.recipes && results.recipes.slice(startIndex, endIndex)

    console.log(results)
    console.log(paginatedItems)
    console.log(startIndex, endIndex)

    // if (results.lastVisible && results.nextHidden) {
    //     console.log(results.lastVisible.id)
    //     console.log(results.nextHidden.id)
    // }

    // React.useEffect(() => {
    //     if (pageState.isNextPage === true && pageState.activePage === 3) {
    //         setPageState({ ...pageState, isNextButtonDisabled: true })
    //     }
    // }, [])

    // React.useEffect(() => {
    //     if (pageState.activePage === 1) {
    //         setPageState({ ...pageState, isPreviousButtonDisabled: true })
    //     } 
    //     // else if (pageState.isNextPage === true && results.count < config.itemsFetched) {
    //     //     setPageState({ ...pageState, isNextButtonDisabled: true })
    //     //     console.log(pageState)
    //     //     console.log(results)
    //     // }
    // }, [pageState.activePage])
    
    // const onNextPage = () => {
    //     setPageState(prevState => ({
    //         activePage: prevState.activePage+1,
    //         isNextPage: true,
    //         isPreviousPage: false 
    //     }))
    // }

    // const onPreviousPage = () => {
    //     setPageState(prevState => ({
    //         activePage: prevState.activePage-1,
    //         isNextPage: false,
    //         isPreviousPage: true
    //     }))
    // }

    const handlePageChange = (e, { activePage }) => setPageState({ activePage })

    if (!results.recipes || !results.recipes.length) {
        return <div className='content-container'><span className="list-item--message">No recipes</span></div>
    }

    const tableItems = paginatedItems.map((recipe) => {
        return (
            <RecipeListItem key={recipe.id} recipe={recipe} />
        )
    })


//     <RecipeListPagination
//     activePage={pageState.activePage}
//     onNextPage={onNextPage}
//     onPreviousPage={onPreviousPage}
//     isNextButtonDisabled={pageState.isNextButtonDisabled}
//     isPreviousButtonDisabled={pageState.isPreviousButtonDisabled}
//     // totalPages={10}
// />
    
    return (
        <div className="content-container">
            <div className='dish-table'>
                {tableItems}
                <Pagination
                    activePage={pageState.activePage}
                    onPageChange={handlePageChange}
                    totalPages={results.count / config.itemsPerPage}
                />
            </div>
        </div>
    )
}

export default RecipeList