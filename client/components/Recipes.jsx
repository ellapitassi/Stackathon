import React, { Component } from 'react';
import store, { searchRecipesThunk } from '../store'
import { connect } from 'react-redux';

export class Recipes extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        //console.log("THIS.PROPS: ", this.props)
        this.props.getRecipesFunc(this.props.ingredients.ingredientList)
    }

    componentWillReceiveProps(nextProps){
       // console.log("NEXTPROPS: ", nextProps)
    }

    render() {
        return (
            <div>
                <h3 align="center">Recipes</h3>
                <div className="recipePage">
                {
                    this.props.recipeList.map(recipe =>
                        (
                        <div key={recipe.recipe_id} className="recipe">
                        <img src={recipe.image_url} className="recipeImg" />
                        <a href={recipe.source_url} className="btn btn-info" role="button">{recipe.title}</a>
                        </div>
                        )
                    )
                }
                </div>
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
        getRecipesFunc: function (ingredients) {
            dispatch(searchRecipesThunk(ingredients))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)
