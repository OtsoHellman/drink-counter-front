import React, { Component } from 'react';
import {
    Route,
    BrowserRouter
} from "react-router-dom";
import Cookies from 'universal-cookie';
import CookieConsent from "react-cookie-consent";
import Home from './Containers/Home'
import User from './Containers/User'
import List from './Containers/List'
import MyPage from './Containers/MyPage'
import addUser from './Containers/AddUser'
import Menu from './Components/Menu'

import './App.css';

const cookies = new Cookies();

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
                        <Menu />
                        <div className="content">
                            <Route exact path="/" component={Home} />
                            <Route path="/user" render={(props) => <User {...props} cookies={cookies} />} />
                            <Route path="/list" component={List} />
                            <Route path="/addUser" component={addUser} />
                            <Route path="/myPage" render={(props) => cookies.get("username") ? <User {...props} cookies={cookies} /> : <MyPage />} />
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
