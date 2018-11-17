import React, { Component } from 'react';

import { Chart } from "react-charts";
import '../App.css';

class Home extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={require('../resources/beer.png')}  className="App-logo" alt="logo" />
                    <h2 className={'header'}>
                        Kännikone
                    </h2>
                    <p>Kännimittari daa</p>

                </header>
            </div>
        );
    }
}

export default Home;
