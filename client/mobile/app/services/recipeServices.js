import axios from 'axios';
import { firebase } from '../firebase/firebase';

// const api = axios.create({
//     baseURL: 'http://localhost:3001/api',
// })

const url = 'http://localhost:3001';

const createToken = async () => {
    const user = firebase.auth().currentUser;
    const token = user && await user.getIdToken();
    const payloadHeader = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return payloadHeader;
}

export const addRecipeService = async (recipe) => {
    const header = await createToken();
    const payload = recipe

    try {
        // console.log(payload);
        const res = await axios.post(`${url}/api/recipes`, payload, header)
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const getRecipesService = async () => {
    const header = await createToken();

    try {
        const res = await axios.get(`${url}/api/recipes`, header)
        return res.data
    } catch(e) {
        console.log(e)
    }
}

export const removeRecipeService = async ({ id }) => {
    const header = await createToken();

    try {
        const res = await axios.delete(`${url}/api/recipes/${id}`, header)
        return res.data
    } catch(e) {
        console.log(e)
    }
}

export const editRecipeService = async (id, recipe) => {
    const header = await createToken();
    const payload = recipe;

    try {
        const res = await axios.put(`${url}/api/recipes/${id}`, payload, header)
        return res.data
    } catch(e) {
        console.log(e)
    }
}