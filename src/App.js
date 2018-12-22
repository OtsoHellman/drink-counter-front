import React, { Component } from 'react';
import {
    Route,
    NavLink,
    BrowserRouter
} from "react-router-dom";
import Home from './Containers/Home'
import User from './Containers/User'
import List from './Containers/List'
import addUser from './Containers/AddUser'

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <ul className="header">
                            <li className="front-page-li"><NavLink exact to="/">Home</NavLink> </li>
                            <li className="front-page-li"><NavLink to="/list">List</NavLink></li>
                            <li className="front-page-li"><NavLink to="/addUser">Add user</NavLink></li>
                        </ul>
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
