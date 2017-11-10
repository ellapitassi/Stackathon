import axios from 'axios'
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';


const initialState = {
    recipeList: []
}

//ACTION TYPES
export const GET_RECIPES = "GET_RECIPES";

//ACTION CREATORS
function getRecipes(recipeList) {
    return {
        type: GET_RECIPES,
        recipeList
    }
}


//THUNK CREATORS
export function searchRecipesThunk(foods) { //['carrots', 'fish']
    return function thunk(dispatch) {
        console.log("FOODS: ", foods)
        const foodItems = foods.join(",")
        console.log("FOOD ITEMS: ",foodItems)
        return axios.get(`http://food2fork.com/api/search?key=667b96492c4f7ed199468b1eb8b4e16f
&q=${foodItems}`)
            .then(res => {
                //console.log("RES.DATA: ",res.data)
                return dispatch(getRecipes(res.data.recipes))
            })
    }
}
//dispatch an action that adds recipies to redux store

//REDUCER
export default function reducer(state = initialState, action) {

    switch (action.type) {

        case GET_RECIPES:
            return Object.assign({}, state, {
                recipeList: action.recipeList
            });

        default:
            return state;
    }

}
