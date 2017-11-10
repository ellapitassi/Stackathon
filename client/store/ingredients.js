import axios from 'axios'
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';


const initialState= {
    ingredient: '',
    ingredientList: [],
}

//ACTION TYPES
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

//ACTION CREATORS
function addIngredient(ingredient) {
    return {
        type: ADD_INGREDIENT,
        ingredient
    }
}

//THUNK CREATORS
export function addIngredientThunk(ingredient) {
    return function thunk(dispatch) {
        console.log("HERE", ingredient)
        const action = addIngredient(ingredient);
                return dispatch(action);
    }
}

//REDUCER
export default function reducer(state = initialState, action) {

    switch (action.type) {

        case ADD_INGREDIENT:
            console.log("NEW INGREDIENT LIST", [...state.ingredientList, action.ingredient])
            return Object.assign({}, state, {
                
                ingredientList: [...state.ingredientList, action.ingredient]
            });


        default:
            return state;
    }

}
