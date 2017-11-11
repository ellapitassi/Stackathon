import axios from 'axios'
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import history from '../history';


const initialState = []


//ACTION TYPES
export const GET_FOOD_ITEMS = "GET_FOOD_ITEMS";

//ACTION CREATORS
function getFoodItems(foodItemList) {
    return {
        type: GET_FOOD_ITEMS,
        foodItemList
    }
}


// 'use strict';
// var express = require('express');

// Require the client
const Clarifai = require('clarifai');

// initialize with your api key. This will also work in your browser via http://browserify.org/
const app = new Clarifai.App({
    apiKey: 'b31b9e78ac534c658bc750262f72fb0d'
});

export function getFoodItemsThunk(pic = `https://samples.clarifai.com/food.jpg`) {
    return function thunk(dispatch) {
        console.log("PIC: ", pic)

    app.models.predict('bd367be194cf45149e75f01d59f77ba7', pic)
        .then( res => {
            //console.log(JSON.stringify(res))
            //console.log((res).outputs[0].data.concepts)
            // return dispatch(getFoodItems(JSON.stringify(res)))
            //dispatch(getFoodItems(JSON.stringify(res)))//this is setting it on the global state which is how 
            dispatch(getFoodItems((res).outputs[0].data.concepts))
            //foodItems has access
            //console.log("JSON.STRINGIFY(RES): ", JSON.stringify(res).outputs)
            return (res).outputs[0].data.concepts //array with objects and the food word is at index .name
        })
       // function (response) {
            // do something with response
            //console.log(JSON.stringify(response))
            //dispatch action - take the data that comes back and put it on the store

        //},

        .then(foundFoods => history.push({
            pathname: `/fridgeitems`
        }))
        .catch(function (err){
            // there was an error
            return 'ERROR: ' + err;
        })
    }
}

//REDUCER
export default function reducer(state = initialState, action) {

    switch (action.type) {

        case GET_FOOD_ITEMS:
            return action.foodItemList
        default:
            return state;
    }
}
