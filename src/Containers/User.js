import React, { Component } from 'react';
import '../App.css';

import { getUserData, addDrinkByUsername } from '../utils/helpers';

class User extends Component {

    constructor() {
        super()
        this.state = {
            userdata: []
        }
    }

    componentDidMount() {
        this.getUserData()
    }

    getUserData = () => {
        getUserData(this.props.location.pathname.substring(6))
            .then((res) => {
                this.setState({
                    userdata: res.data
                })
            })
    }

    addDrink = (drinkSize) => {
        addDrinkByUsername(this.props.location.pathname.substring(6), drinkSize)
            .then(() => {
                this.getUserData()
            })
    }

    handleDrinkSizeChange = (e) => {
        this.setState({
            drinkSize: Number(e.target.value)
        })
    }

    submitCustomSizeDrink = () => {
        this.addDrink(this.state.drinkSize)
    }

    render() {
        return (
            <div className="App">
                <h2>{this.state.userdata.username}</h2>
                <p>gender: {this.state.userdata.gender}</p>
                <p>könni: {this.state.userdata.konni}</p>
                <button onClick={() => this.addDrink(1.0)}>0.33l</button>
                <button onClick={() => this.addDrink(1.5)}>0.50l</button>
                <label>
                    Custom drink size:
                    <input type="number" name="drinkSize" onChange={this.handleDrinkSizeChange} />
                </label>
                <button onClick={this.submitCustomSizeDrink}>Submit</button>
            </div>
        );
    }
}

export default User;
