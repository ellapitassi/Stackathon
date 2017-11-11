import React, { Component } from 'react';
import store, { getFoodItemsThunk } from '../store'
import { connect } from 'react-redux';

export class Foods extends Component {
    constructor(props) {
        super(props)
    }
    

    // componentDidMount() {
    //     console.log("THIS.PROPS: ", this.props)
    //     this.props.getFoodsFunc(this.props)
    // }

    // componentWillReceiveProps(nextProps) {
    //     console.log("NEXTPROPS: ", nextProps)
    // }

    render() {
        console.log("THIS.PROPS: ", this.props)

        const foodArr = this.props.foodItemList
        return (
            <div>
                <h3>Foods detected in your fridge:</h3>
                {
                    foodArr.map(food =>
                        (
                            <div key={food.id}>
                            <p>{food.name}</p>
                            </div>
                        )
                    )
                }

            </div>
        )
    }
}
  // {
                //     map through this.statefoodItemList??!
                // }


function mapStateToProps(state) {
    return {
        foodItemList: state.clarifai,
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getFoodsFunc: function (pic) {
//             dispatch(getFoodItemsThunk(pic))
//         }
//     }
// };

export default connect(mapStateToProps /*, mapDispatchToProps*/)(Foods)
