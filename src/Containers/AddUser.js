import React, { Component } from 'react';
import '../App.css';
import { sendUserData } from "../utils/helpers";

class List extends Component {
    constructor(){
        super()
        this.state = {
            isMale: true,
        }
    }

    handleUserNameChange = (e) => {
        this.setState({
            userName: e.target.value
        })
    }

    handleMassChange = (e) => {
        this.setState({
            mass: e.target.value
        })
    }


    toggleMaleStatus = () => {
        this.setState({
            isMale: !this.state.isMale
        })
    }

    submitForm = () => {
        const userData = {
            userName: this.state.userName,
            mass: this.state.mass,
            gender: this.state.isMale ? 'male' : 'female',
        }
        sendUserData(userData)
    }

    render() {
        return (
            <div className="App">
                <h2>Add user</h2>
                    <label>
                        Username:
                        <input type="text" name="name" onChange={this.handleUserNameChange}/>
                    </label>
                    <label>
                        Mass:
                        <input type="nunber" name="name" onChange={this.handleMassChange}/>
                    </label>
                    <label>
                        Are you male?
                        <input type="checkbox" checked={this.state.isMale} onChange={this.toggleMaleStatus}/>
                    </label>
                <button onClick={this.submitForm}>Submit</button>
            </div>
        );
    }
}

export default List;