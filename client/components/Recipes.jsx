import React, { Component } from 'react';
import store, { searchRecipesThunk } from '../store'
import { connect } from 'react-redux';

export class Recipes extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        this.props.getRecipesFunc(this.props.ingredients.ingredientList)
    }


    render() {
        return (
            <div>
                <h3 align="center" background="lavender">Recipes</h3>
                <div className="recipePage">
                {
                   this.props.recipeList.length ?
                    this.props.recipeList.map(recipe =>
                        (
                        <div key={recipe.recipe_id} className="recipe">
                        <img src={recipe.image_url} className="recipeImg" />
                        <a href={recipe.source_url} className="btn btn-info" role="button">{recipe.title}</a>
                        </div>
                        )
                    )
                    : <h3>Searching for recipes...</h3>

                }
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log("SATE..recipesRECIPElIST: ", state.recipes.recipeList)
    return {
        recipeList: state.recipes.recipeList,
        ingredients: state.ingredients
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRecipesFunc: function (ingredients) {
            dispatch(searchRecipesThunk(ingredients))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)
