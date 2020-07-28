import React from 'react'
import IngredientsContext from '../../../../context/ingredients-context'
import { shallow } from 'enzyme'
import IngredientListItem from '../IngredientListItem'
import ingredients from '../../../tests/fixtures/ingredients'

test('should render IngredientListItem with ingredient',() => {
    const wrapper = shallow(
        <IngredientsContext.Provider value={ingredients}>
            <IngredientListItem {...ingredients[2]}/>
        </IngredientsContext.Provider>)
    expect(wrapper).toMatchSnapshot()
});