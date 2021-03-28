import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Button,
    Dimensions,
    Platform
    } from "react-native";
import { useFirebaseContext } from '../context/firebase-context'
import recipeTypes from '../fixtures/recipeTypes'
import recipeCuisines from '../fixtures/recipeCuisines'
import selectCustomTags from '../selectors/custom-tags'
import { useIngredientsContext } from '../context/ingredients-context'
import { useRecipesContext } from '../context/recipes-context'
import { TextInput } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MultiSelect from 'react-native-multiple-select';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { Feather } from "@expo/vector-icons";
import { RadioButton } from 'react-native-paper';

const { width, height } = Dimensions.get("window");

export default RecipeForm = (props) => {
    const { isGuest, user } = useFirebaseContext()
    const { recipes } = useRecipesContext()
    const formResults = props.results ? props.results : recipes
    const initialFormState = {
        url: '',
        ingredients: [],
        type: [],
        cuisine: [],
        // createdAt: '',
        customTags: [],
        savedBy: '',
        error: '',
        customTagOptions: []
    }
    const [state, setState] = useState(initialFormState)
    const { ingredients } = useIngredientsContext()
    const allCustomTags = formResults ? selectCustomTags(formResults) : []
    const uid = user.uid

    console.log(state)
    
    useEffect(() => {
        setState({
            url: props.url || '',
            ingredients: props.ingredients || [],
            type: props.type || [],
            cuisine: props.cuisine || [],
            // createdAt: moment(props.createdAt) || moment(),
            savedBy: props.savedBy || uid,
            customTags: props.customTags || [],
            customTagOptions: props.customTagOptions || allCustomTags,
            error: '',
        })
    }, [props])

    const onSubmit = (e) => {
        e.preventDefault()

        const recipe = {
            url: state.url,
            ingredients: state.ingredients,
            type: state.type,
            cuisine: state.cuisine,
            // createdAt: state.createdAt.valueOf(),
            customTags: state.customTags,
            savedBy: state.savedBy
        }

        if (!state.url) {
            setState({ ...state, error: 'Please provide recipe URL' })
        } else {
            props.onSubmit(recipe)
            setState(initialFormState)
        }
    }

    const onURLChange = (e) => {
        const url = e.target.value
        if (url) {
            setState({ ...state, url })
        }
    }

    const onIngredientChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, ingredients: value })
    }

    const onTypeChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, type: value })
    }

    const onCuisineChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, cuisine: value })
    }

    const onCustomTagChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, customTags: value })
    }

    const onAddCustomTag = (newItem) => {
        console.log(newItem, 'vs', state.customTagOptions)
        if (newItem.every(tag => state.customTagOptions.includes(tag))) {
            console.log('1')
            setState({ ...state, customTags: newItem })
        } else {
            console.log('2')
            setState((prevState) => ({
                ...state,
                customTagOptions: [...prevState.customTagOptions, newItem[newItem.length - 1]]
            }))
        }
    }

    clearSelectedTypes = () => {
        _multiSelectType._removeAllItems();
    };

    clearSelectedCuisines = () => {
        _multiSelectCuisine._removeAllItems();
     };


    return (
        <SafeAreaView style={styles.container} onSubmit={onSubmit}>
            <TextInput
                style={styles.input}
                placeholder='Insert URL'
                placeholderTextColor="#aaaaaa"
                onChangeText={(url) => setState({ ...state, url })}
                value={state.url}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <MultiSelect
                single
                items={recipeTypes.map(recipeType => {
                    return {
                        id: recipeType,
                        name: recipeType
                    }
                })}
                ref={c => _multiSelectType = c}
                uniqueKey="id"
                onSelectedItemsChange={(selectedItems) => setState({ ...state, type: selectedItems })}
                selectedItems={state.type}
                selectText="Select Type"
                // searchInputPlaceholderText="Search Ingredients..."
                // onChangeInput={ (text)=> console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                tagContainerStyle={{ height: 30 }}
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                // displayKey="name"
                styleMainWrapper={styles.multiSelectContainer}
                // styleInputGroup={}
                searchInputStyle={styles.multiSelectSearchInputStyle}
                styleDropdownMenu={styles.multiSelectDropdownMenu}
                hideSubmitButton={true}
                textInputProps={{ editable: false, autoFocus: false }}
                searchInputPlaceholderText="Select Type"
                searchIcon={false}
                hideDropdown={true}
            />
            <Button title='Clear type' onPress={clearSelectedTypes}/>
            <MultiSelect
                single
                items={recipeCuisines.map(recipeCuisine => {
                    return {
                        id: recipeCuisine,
                        name: recipeCuisine
                    }
                })}
                ref={c => _multiSelectCuisine = c}
                uniqueKey="id"
                onSelectedItemsChange={(selectedItems) => setState({ ...state, cuisine: selectedItems })}
                selectedItems={state.cuisine}
                selectText="Select Cuisine"
                // searchInputPlaceholderText="Search Ingredients..."
                // onChangeInput={ (text)=> console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                tagContainerStyle={{ height: 30 }}
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                // displayKey="name"
                styleMainWrapper={styles.multiSelectContainer}
                // styleInputGroup={}
                searchInputStyle={styles.multiSelectSearchInputStyle}
                styleDropdownMenu={styles.multiSelectDropdownMenu}
                hideSubmitButton={true}
                textInputProps={{ editable: false, autoFocus: false }}
                searchInputPlaceholderText="Select Cuisine"
                searchIcon={false}
                hideDropdown={true}
            />
            <Button title='Clear cuisines' onPress={clearSelectedCuisines}/>
            <MultiSelect
                items={ingredients || []}
                uniqueKey="id"
                onSelectedItemsChange={(selectedItems) => setState({ ...state, ingredients: selectedItems })}
                selectedItems={state.ingredients}
                selectText="Pick Ingredients"
                searchInputPlaceholderText="Search Ingredients..."
                // onChangeInput={ (text)=> console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                tagContainerStyle={{ height: 30 }}
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                // displayKey="name"
                styleMainWrapper={styles.multiSelectContainer}
                styleInputGroup={styles.multiSelectInputGroup}
                searchInputStyle={styles.multiSelectSearchInputStyle}
                styleDropdownMenu={styles.multiSelectDropdownMenu}
                hideSubmitButton={true}
                hideDropdown={true}
            />
            <MultiSelect
                items={state.customTagOptions.map(option => {
                    return {
                        id: option,
                        name: option
                    }
                })}
                uniqueKey="id"
                onSelectedItemsChange={onAddCustomTag}
                selectedItems={state.customTags}
                canAddItems={true}
                // onAddItem={(selectedItems) => setState({ ...state, customTags: selectedItems })}
                // onAddItem={(newItem) => setState({ ...state, customTagOptions: newItem })}
                selectText="Pick Custom Tags"
                searchInputPlaceholderText="Search Custom Tags..."
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                tagContainerStyle={{ height: 30 }}
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                // displayKey="name"
                styleMainWrapper={styles.multiSelectContainer}
                styleInputGroup={styles.multiSelectInputGroup}
                searchInputStyle={styles.multiSelectSearchInputStyle}
                styleDropdownMenu={styles.multiSelectDropdownMenu}
                // hideSubmitButton={true}
                hideDropdown={true}
            />
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    title: {

    },
    line: {
        alignSelf: 'center',
        borderBottomColor: '#101010',
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingTop: 60,
        width: '80%'
    },
    logo: {
        flex: 1,
        height: 120,
        width: 120,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 16
    },
    closeText: {
        fontSize: 24,
        color: '#00479e',
        textAlign: 'center',
    },
    multiSelectContainer: {
        // height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
    },
    multiSelectInputGroup: {
        paddingRight: 20
    },
    multiSelectDropdownMenu: {
        justifyContent: 'center',
        marginRight: 20,
        marginLeft: 20
    },
    multiSelectSearchInputStyle: {
        padding: 20,
        paddingRight: 10 }
})