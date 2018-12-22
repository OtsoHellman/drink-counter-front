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

    addDrink = () => {
        addDrinkByUsername(this.props.location.pathname.substring(6))
            .then(() => {
                this.getUserData()
            })
    }

    render() {
        return (
            <div className="App">
                <h2>{this.state.userdata.username}</h2>
                <p>gender: {this.state.userdata.gender}</p>
                <p>könni: {this.state.userdata.konni}</p>
                <button onClick={this.addDrink}>Add drink</button>
            </div>
        );
    }
}

export default User;
