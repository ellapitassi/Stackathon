import React, { Component } from 'react';
import store, { searchRecipesThunk } from '../store'
import { connect } from 'react-redux';

export class Recipes extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        console.log("THIS.PROPS: ", this.props)

        this.props.getRecipesFunc(this.props.ingredients.ingredientList)
    }

    componentWillReceiveProps(nextProps){
        console.log("NEXTPROPS: ", nextProps)
    }

    render() {
        return (
            <div>
                <h3>Recipes</h3>
                {
                    this.props.recipeList.map(recipe =>
                        (
                        <div key={recipe.recipe_id}>
                        <a href={recipe.source_url} className="btn btn-info" role="button">{recipe.title}</a>
                        </div>
                        )
                    )
                }

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        recipeList: state.recipes.recipeList,
        ingredients: state.ingredients
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRecipesFunc: function (recipes) {//CHANGE THIS VARIABLE TO INGREDIENTS
            dispatch(searchRecipesThunk(recipes))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)
