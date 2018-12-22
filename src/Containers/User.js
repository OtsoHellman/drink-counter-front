import React, { Component } from 'react';
import '../App.css';

import { getUserData } from '../utils/helpers';

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

    render() {
        return (
            <div className="App">
                <h2>{this.state.userdata.username}</h2>
                <p>gender: {this.state.userdata.gender}</p>
                <p>könni: {this.state.userdata.konni}</p>
            </div>
        );
    }
}

export default User;
