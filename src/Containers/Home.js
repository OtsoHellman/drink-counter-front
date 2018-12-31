import React, { Component } from 'react';
import 'react-vis/dist/style.css';
import '../App.css';
import socketIOClient from "socket.io-client";

import { API_URL } from '../config';
import Dashboard from "../Components/Dashboard";
import LineChart from "../Components/LineChart";

let socket;

class Home extends Component {

    constructor() {
        super()
        this.state = {
            timestamps: [],
            data: []
        }
    }

    componentDidMount() {
        socket = socketIOClient(API_URL);
        socket.on("allWithKonni", res => {
            this.setState({
                data: res.data,
                timestamps: res.timestamps
            })
        });
    }

    componentWillUnmount() {
        socket.close()
    }

    render() {
        return (
            <div>
                <Dashboard data={this.state.data} />
                <LineChart timestamps={this.state.timestamps} />
            </div>
        );
    }
}

export default Home;
