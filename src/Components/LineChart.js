// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, { Component } from 'react';

import {
  FlexibleWidthXYPlot,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  DiscreteColorLegend,
  Hint,
  XAxis
} from 'react-vis';
import 'react-vis/dist/style.css';
import '../App.css';


class LineChart extends Component {
  state = {
    highlightSeries: null,
    highlightTipX: null,
    highlightTipY: null
  }

  render() {

    return (
        <div className="App">
          <FlexibleWidthXYPlot height={500} xType="time">
            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis />
            <YAxis />
            {this.props.timestamps.map(d => {
              return (<LineSeries
                key={d.username}
                data={d.graphData}
                label={d.username}
                curve={'curveMonotoneX'}
                onSeriesClick={() => {
                  this.setState({
                    highlightSeries: d.username,
                    highlightTipX: d.graphData[d.graphData.length - 1].x,
                    highlightTipY: d.graphData[d.graphData.length - 1].y
                  })
                }
                }
                onSeriesMouseOut={() =>
                  setTimeout(() => {
                    if (this.state.highlightSeries === d.username) {
                      this.setState({
                        highlightSeries: null,
                        highlightTipX: null,
                        highlightTipY: null
                      })
                    }
                  }, 1000)
                }
                strokeWidth={d.username === this.state.highlightSeries ? 3 : 1}
              />)
            })}
            {
              this.state.highlightSeries && <Hint
                value={{ y: this.state.highlightTipY, x: this.state.highlightTipX, user: this.state.highlightSeries}}
                format={(data) => (
                  [{
                    title: "user",
                    value: this.state.highlightSeries
                  },
                  {
                    title: "könni",
                    value: this.state.highlightTipY.toFixed(2)
                  }
                ]
                )}>
              </Hint>
            }
            <DiscreteColorLegend items={this.props.timestamps.map(d => (
              `${d.username} ${d.graphData[d.graphData.length - 1].y.toFixed(2)}`
            ))} />
          </FlexibleWidthXYPlot >
        </div>
    )
  }
}



export default LineChart