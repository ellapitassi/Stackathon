import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import ingredients from './ingredients'
import recipes from './recipes'
import clarifai from './clarifai'

// store will = 
//   {
//     ingredients: {
//       ingredient: '',
//       ingredientList: [],
//     },
//     recipes: {
//       recipeList: []
//     },
    // clarifai: {
    //   foodItemList: []
    // }
//   }
//and user
const reducer = combineReducers({user, ingredients, recipes, clarifai})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './ingredients'
export * from './recipes'
export * from './clarifai'
