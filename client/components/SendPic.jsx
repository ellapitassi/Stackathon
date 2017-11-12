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
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        const pic = evt.target.value;
        this.setState({
            pic
        });
    }

    handleSubmit(evt) {
        // console.log("EVT.TARGET: ", evt.target)
        evt.preventDefault();
        //const pic = evt.target.value;
        const addPic = this.props.addPicThunk;
        addPic(this.state.pic)
        this.setState({
            pic: ''
        });

    }

    render() {
        const pic = this.state.pic;
        const handleSubmit = this.handleSubmit;
        const handleChange = this.handleChange;
        return (
            <div className="well" style={{ marginTop: '20px' }}>
                <form className="form-horizontal" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Upload Picture</legend>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">Picture URL:</label>
                            <div className="col-xs-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    onChange={handleChange}
                                    value={pic}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-success">
                            Search
                        </button>
                    </fieldset>
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
