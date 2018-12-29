import React, { Component } from 'react';
import 'react-vis/dist/style.css';
import {
    XYPlot,
    VerticalBarSeries,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis
} from 'react-vis';
import '../App.css';
import socketIOClient from "socket.io-client";

import { API_URL } from '../config';
import Dashboard from "../Components/Dashboard";

let socket;

class Home extends Component {

    constructor() {
        super()
        this.state = {}
    }

    componentDidMount() {
        socket = socketIOClient(API_URL);
        socket.on("allWithKonni", res => {
            this.setState({ data: res.data })
        });
    }

    componentWillUnmount() {
        socket.close()
    }

    render() {
        return (
            <div>
                <Dashboard data={this.state.data}/>
            </div>
        );
    }
}

export default Home;
