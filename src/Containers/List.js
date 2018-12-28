import React, { Component } from 'react';
import '../App.css';
import { NavLink } from "react-router-dom";
import { getAllUserData } from '../utils/helpers';
import UserCard from '../Components/UserCard';
import User from './User';
class List extends Component {

    constructor() {
        super()
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.getUserData()
    }

    getUserData = () => {
        getAllUserData()
            .then((res) => {
                this.setState({
                    users: res.data
                })
            })
    }

    render() {
        return (
            <div className="App">
                {this.state.users.map(user => (
                    <UserCard key={user.username} user={user}/>
                ))}
            </div>
        );
    }
}
export default List;


//<ul key={user._id}>
//<li>
//    <NavLink to={"user/" + user.username}>{user.username}</NavLink>
//</li>
//</ul>