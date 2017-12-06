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

        console.log("HANDLE CHANGE", this.state)
        const foodItem = evt.target.value
        var addTrueToState = { foodItem, toggle: true }


        console.log("FOODITEM: ", foodItem)           
        this.setState({
            ingredientFromFridge: this.state.ingredientFromFridge.concat(addTrueToState)
        })
        console.log("this.state: ", this.state)
    }

    handleSubmit(evt) {

        const addFoods = this.props.getFoodsFunc;
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
        console.log("FOODITEMS")

        const ingredientFromFridge = this.state.ingredientFromFridge;
        const handleSubmit = this.handleSubmit;
        const handleChange = this.handleChange;


        const foodArr = this.props.foodItemList
        var confFoods = [];
        var lessConfFoods = [];
        for (var i = 0; i < foodArr.length; i++){
            (foodArr[i].value >= 0.80) ?
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
