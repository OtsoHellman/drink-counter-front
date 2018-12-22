import React, { Component } from 'react';
import '../App.css';
import { NavLink } from "react-router-dom";
import { getAllUserData } from '../utils/helpers';



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
                    <ul key={user._id}>
                        <li>
                            <NavLink to={"user/" + user.username}>{user.username}</NavLink>
                        </li>
                    </ul>
                ))}
            </div>
        );
    }
}
//{this.state.users}
//{this.state.persons.map(person => <Person key={person.id} person={person} onDelete={this.deletePerson} />)}
export default List;