import React, { Component } from 'react';
import {
    Route,
    NavLink,
    BrowserRouter
} from "react-router-dom";
import Home from './Containers/Home'
import User from './Containers/User'
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
              <BrowserRouter>
                <div>
                    <ul className="header">
                        <li><NavLink exact to="/">Home</NavLink> </li>
                        <li><NavLink to="/user">User</NavLink></li>
                    </ul>
                  <div className="content">
                    <Route exact path="/" component={Home} />
                    <Route path="/user" component={User} />
                  </div>
                </div>
              </BrowserRouter>
            </div>
        );
    }
}

export default App;
