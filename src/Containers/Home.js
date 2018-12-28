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

const URL = 'http://localhost:3001'
const socket = socketIOClient(URL);

class Home extends Component {

    constructor() {
        super()
        this.state = {}
    }

    componentDidMount() {
        socket.on("allWithKonni", res => {
            this.setState({ data: res.data })
        });
    }

    componentWillUnmount() {
        socket.close()
    }

    render() {
        return (
            <div className="App">
                <div className="chart-container">
                    <XYPlot
                        xType="ordinal"
                        stackBy="y"
                        width={300}
                        height={300}
                    >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis />
                        <VerticalBarSeries
                            color="#12939A"
                            data={this.state.data}
                        />
                    </XYPlot>
                </div>
            </div>
        );
    }
}

export default Home;
