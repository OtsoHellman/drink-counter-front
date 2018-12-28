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
import { getAllWithKonni } from '../utils/helpers';
import socketIOClient from "socket.io-client";

class Home extends Component {

    constructor() {
        super()
        this.state = {
            URL: 'http://localhost:3001',
            response: [],
            testi: {}
        }
    }

    componentDidMount() {
        const socket = socketIOClient(this.state.URL);
        socket.on("toinen", res => {
            console.log(res.data)
            this.setState({ data: res.data })
        });
        this.getData()
    }

    getData = () => {
        getAllWithKonni()
            .then((res) => {
                this.setState({
                    data: res.data
                })
            })
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
