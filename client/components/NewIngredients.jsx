
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
        //console.log('evt.target.value: ', evt.target.value)
        const ingredient = evt.target.value;
        this.setState({
            ingredient: ingredient,
        });
    }

    handleSubmit(evt) {
        console.log("this.state: ", this.state)
        console.log("this.props: ", this.props)

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
                        <div className="form-group">
                            <div className="col-xs-10 col-xs-offset-2">
                                <button
                                    type="submit"
                                    className="btn btn-success">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </fieldset>
                </form>
                <Link to="/recipes" >
                    <button
                        type="submit"
                        className="btn btn-success">
                        Search
                    </button>
                </Link>
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
    return {
        addIngredientFunc: function (ingredient) {
            dispatch(addIngredientThunk(ingredient))
        }
    }
};

export default connect(mapStateToProps, mapDispatchtoProps)(NewIngredients);
