import React, { Component } from 'react';
import store, { searchRecipesThunk } from '../store'
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'


export class Foods extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredientFromFridge: [], //[{carrots, toggle: false}, {fish, toggle: true}]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(evt) {
        evt.preventDefault();

        console.log("HANDLE CHANGE")
        const foodItem = evt.target.value
        //var addFalseToState = { foodItem, toggle: false }
        var addTrueToState = { foodItem, toggle: true }


        console.log("FOODITEM: ", foodItem)
       // if (!this.state.ingredientFromFridge.foodItem) {// || !this.state.ingredientFromFridge.foodItem.toggle){ //if its already there then we want to switch toggle
            
        this.setState({
            ingredientFromFridge: this.state.ingredientFromFridge.concat(addTrueToState)
        }) 
        //} else {
        //     this.setState({
        //         ingredientFromFridge: this.state.ingredientFromFridge.concat(addFalseToState)
        //     })
        // }
        console.log("this.state: ", this.state)
    }

    handleSubmit(evt) {
        console.log("HANDLE SUBMIT")

        console.log("this.state: ", this.state)
        console.log("this.props: ", this.props)

        //evt.preventDefault();

        const addFoods = this.props.getFoodsFunc;
        //console.log("HERE HERE HEREingredientFromFridge:", this.state.ingredientFromFridge)
        var foodArr = [];
        (this.state.ingredientFromFridge).forEach(food =>
            foodArr.push(food.foodItem)
        )
        addFoods(foodArr);
        this.setState({
            ingredientFromFridge: '',
        });

    }

    render() {
        const ingredientFromFridge = this.state.ingredientFromFridge;
        const handleSubmit = this.handleSubmit;
        const handleChange = this.handleChange;


        const foodArr = this.props.foodItemList
        var confFoods = [];
        var lessConfFoods = [];
        for (var i = 0; i < foodArr.length; i++){
            (foodArr[i].value >= 0.95) ?
            confFoods.push(foodArr[i])
            : lessConfFoods.push(foodArr[i])
        }


        return (
            <div className="foundFoods">
                <form className="form-horizontal">
                <h3>Foods detected in your fridge:</h3>
                <div className="FridgeFoods">
               {    
                    confFoods.map(food =>
                       (
                           <div className="confFoods" key={food.id}>
                               <button
                                   onClick={handleChange}
                                   type="submit"
                                   className="confFoods"
                                   value={food.name}>
                                   {food.name}
                               </button>
                           </div>
                       )
                   )
               }
               {
                   lessConfFoods.map(food =>
                       (
                           <div className="lessConfFoods" key={food.id}>
                               <button
                                    onClick={handleChange}
                                    type="submit"
                                    className="lessConfFoods"
                                    value={food.name}>
                                    {food.name}
                               </button>
                           </div>
                       )
                   )
                }
                </div>
                <Link to="/recipes" >
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="btn btn-success">
                        Search
                    </button>
                </Link>
                </form>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        foodItemList: state.clarifai,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFoodsFunc: function (food) {
            dispatch(searchRecipesThunk(food))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Foods)
