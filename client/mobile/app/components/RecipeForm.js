import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    SafeAreaView,
    Button,
    Dimensions,
    Platform,
    TouchableOpacity,
    FlatList
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
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { Feather } from "@expo/vector-icons";
import { Divider, Text, Title, Subheading } from 'react-native-paper';
import MultiSelectForm from './MultiSelectForm';

const { width, height } = Dimensions.get("window");
const Item = ({item}) => (
    <View
        // key={tag}
        style={[
            styles.selectedItem,
            {
            width: item.length * 6 + 50,
            justifyContent: 'center',
            height: 30,
            borderColor: '#e9e9e9'
            },
            // tagContainerStyle || {}
            ]
        }
    >
        <Text
            style={[
                {
                flex: 1,
                color: '#525966',
                fontSize: 15
                },
                // styleTextTag && styleTextTag,
                // fontFamily ? { fontFamily } : {}
            ]}
            numberOfLines={1}
        >
            {item}
        </Text>
    </View>
)

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
    const [isTagModalVisible, setIsTagModalVisible] = useState(false);

    console.log(state)
    
    const toggleTagModal = () => {
        setIsTagModalVisible(!isTagModalVisible);
      };

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
        // console.log(newItem, 'vs', state.customTagOptions)
        if (newItem.every(tag => state.customTagOptions.includes(tag))) {
            // console.log('1')
            setState({ ...state, customTags: newItem })
        } else {
            // console.log('2')
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

    const renderItem = ({item}) => (
        <Item item={item} />
    )


    return (
        <SafeAreaView style={styles.container} onSubmit={onSubmit}>
            <Title style={styles.title}>I want to save...</Title>
            <Text style={styles.subtitle}>Copy the recipe URL link into the text bar</Text>
            <TextInput
                style={styles.input}
                placeholder='Insert URL'
                placeholderTextColor="#aaaaaa"
                onChangeText={(url) => setState({ ...state, url })}
                value={state.url}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <View style={styles.subtitleGroup}>
                <Text style={styles.subtitle}>Add the type of recipe</Text>
                <TouchableOpacity onPress={clearSelectedTypes}>
                    <Text style={styles.clearButton} >Clear selection</Text>
                </TouchableOpacity>
            </View>
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
                styleInputGroup={styles.multiSelectInputGroup}
                searchInputStyle={styles.multiSelectSearchInputStyle}
                styleDropdownMenu={styles.multiSelectDropdownMenu}
                styleSelectorContainer={styles.multiSelectSelector}
                styleTextDropdown={styles.multiSelectTextDropdown}
                hideSubmitButton={true}
                textInputProps={{ editable: false, autoFocus: false }}
                searchInputPlaceholderText="Select Type"
                searchIcon={false}
                hideDropdown={true}
                textInputProps={{ autoFocus: false }}
            />
            <View style={styles.subtitleGroup}>
                <Text style={styles.subtitle}>Add the recipe cuisine</Text>
                <TouchableOpacity onPress={clearSelectedCuisines}>
                    <Text style={styles.clearButton} >Clear selection</Text>
                </TouchableOpacity>
            </View>
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
                styleInputGroup={styles.multiSelectInputGroup}
                searchInputStyle={styles.multiSelectSearchInputStyle}
                styleDropdownMenu={styles.multiSelectDropdownMenu}
                styleSelectorContainer={styles.multiSelectSelector}
                styleTextDropdown={styles.multiSelectTextDropdown}
                hideSubmitButton={true}
                textInputProps={{ editable: false, autoFocus: false, paddingRight: 20 }}
                searchInputPlaceholderText="Select Cuisine"
                searchIcon={false}
                hideDropdown={true}
                textInputProps={{ autoFocus: false }}
            />
            <Text style={styles.subtitle}>Add all or some of the ingredients used in the recipe. This can be used to search for recipes in the future.</Text>
            <MultiSelect
                items={ingredients || []}
                uniqueKey="id"
                onSelectedItemsChange={(selectedItems) => setState({ ...state, ingredients: selectedItems })}
                selectedItems={state.ingredients}
                selectText="Select Ingredients"
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
                styleSelectorContainer={styles.multiSelectSelector}
                styleTextDropdown={styles.multiSelectTextDropdown}
                hideSubmitButton={true}
                hideDropdown={true}
                textInputProps={{ autoFocus: false }}
            />
            <Text style={styles.subtitle}>Add your own tags to categorize recipes however you want</Text>
            <Button title='Add tags' onPress={toggleTagModal}/>
            <Modal
                isVisible={isTagModalVisible}
                onBackdropPress={toggleTagModal}
            >
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
                    selectText="Select Custom Tags"
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
                    styleSelectorContainer={styles.multiSelectSelector}
                    styleTextDropdown={styles.multiSelectTextDropdown}
                    hideSubmitButton={true}
                    hideDropdown={true}
                    textInputProps={{ autoFocus: false }}
                />
            </Modal>
            <View>
                <FlatList
                    horizontal
                    data={state.customTags}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                />
            </View>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    clearButton: {
        flex: 3,
        fontSize: 12,
        color: 'darkgrey',
        marginRight: 16,
        marginTop: 10
    },
    title: {
        alignSelf: 'center'
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
        // marginBottom: 30,
        marginRight: 20,
        marginLeft: 20,
        paddingLeft: 16,
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
        // marginBottom: 30,
        marginRight: 20,
        marginLeft: 20,
    },
    multiSelectInputGroup: {
        marginRight: 20
    },
    multiSelectDropdownMenu: {
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: 16,
        // marginLeft: 16,
        marginTop: 10,
        marginBottom: 10
    },
    multiSelectSelector: {
        justifyContent: 'center',
        marginRight: 16,
        marginLeft: 16,
        marginTop: 16
    },
    multiSelectSearchInputStyle: {
        justifyContent: 'center',
        padding: 20,
        paddingRight: 10
    },
    multiSelectTextDropdown: {
        paddingLeft: 16
    },
    selectedItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingTop: 3,
        paddingRight: 3,
        paddingBottom: 3,
        margin: 3,
        borderRadius: 20,
        borderWidth: 2,
    },
    subtitle: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10
    },
    subtitleGroup: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10
    }
})