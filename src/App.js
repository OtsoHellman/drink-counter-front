import React, { Component } from 'react';
import {
    Route,
    BrowserRouter
} from "react-router-dom";
import Home from './Containers/Home'
import User from './Containers/User'
import List from './Containers/List'
import addUser from './Containers/AddUser'
import Menu from './Components/Menu'

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Menu/>
                        <div className="content">
                            <Route exact path="/" component={Home} />
                            <Route path="/user" component={User} />
                            <Route path="/list" component={List} />
                            <Route path="/addUser" component={addUser} />
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
