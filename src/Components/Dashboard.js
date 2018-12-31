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

class Dashboard extends Component {

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
                            data={this.props.data}
                        />
                    </XYPlot>
                </div>
            </div>
        );
    }
}

export default Dashboard;