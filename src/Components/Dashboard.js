import React, { Component } from 'react';
import 'react-vis/dist/style.css';
import {
    FlexibleWidthXYPlot,
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
            <div className="chart">
                <FlexibleWidthXYPlot
                    xType="ordinal"
                    stackBy="y"
                    height={400}
                >
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <VerticalBarSeries
                        color="#12939A"
                        data={this.props.data}
                    />
                </FlexibleWidthXYPlot>
            </div>
        );
    }
}

export default Dashboard;