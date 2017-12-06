
import React, { Component } from 'react';
import store, { addIngredientThunk } from '../store'
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'


class NewIngredients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredient: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(evt) {

        evt.preventDefault();

        const ingredient = evt.target.value;
        console.log('CHANGE')
        this.setState({
            ingredient: ingredient,
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();

        const addIngredient = this.props.addIngredientFunc;
        addIngredient(this.state.ingredient);
        this.setState({
            ingredient: ''
        });
    }

    render() {
        const ingredient = this.state.ingredient;
        const handleSubmit = this.handleSubmit;
        const handleChange = this.handleChange;

        return (
            <div className="well" style={{ marginTop: '20px' }}>
                <form className="form-horizontal" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Add Ingredients</legend>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">Ingredient:</label>
                            <div className="col-xs-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    onChange={handleChange}
                                    value={ingredient}
                                />
                            </div>
                        </div>
                        <div className="add-food">
                            <div className="col-xs-10 col-xs-offset-2">
                                <button
                                    type="submit"
                                    className="btn btn-success">
                                    Add
                                </button>
                            </div>
                        </div>
                        <Link to="/recipes" >
                            <button
                                type="submit"
                                className="btn btn-success">
                                Search
                            </button>
                        </Link>
                    </fieldset>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredient: state.ingredient
    }
};

const mapDispatchtoProps = (dispatch) => {
    console.log("newIngredients")
    return {
        addIngredientFunc: function (ingredient) {
            dispatch(addIngredientThunk(ingredient))
        }
    }
};

export default connect(mapStateToProps, mapDispatchtoProps)(NewIngredients);
