import React, { Component } from 'react';
import store, { getFoodItemsThunk } from '../store'
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'


class SendPic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pic: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(evt) {
        // console.log("EVT.TARGET: ", evt.target)
        evt.preventDefault();
        //const pic = evt.target.value;
        // console.log("PIC: ", evt.target)
        this.props.addPicThunk(evt.target.value)
        this.setState({
            pic: evt.target.value
        });
    }

    render() {
        const pic = this.state.pic;

        return (
            <div className="well" style={{ marginTop: '20px' }}>
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Upload Picture</legend>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">Picture URL:</label>
                            <div className="col-xs-10">
                                <input
                                    className="form-control"
                                    type="text"
                                />
                            </div>
                        </div>
                    </fieldset>
                    <button
                        type="submit"
                        className="btn btn-success">
                        Search
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        pic: state.pic
    }
};

const mapDispatchtoProps = (dispatch) => {
    return {
        addPicThunk: function (pic) {
            dispatch(getFoodItemsThunk(pic))
        }
    }
};

export default connect(mapStateToProps, mapDispatchtoProps)(SendPic);
