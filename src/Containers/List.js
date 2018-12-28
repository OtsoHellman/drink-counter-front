import React, { Component } from 'react';
import '../App.css';
import { getAllUserData } from '../utils/helpers';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import UserCard from '../Components/UserCard';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from "react-router-dom";

const styles = theme => ({
    fab: {
      position: 'absolute',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },
  });

class List extends Component {

    constructor(props) {
        super(props)
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
        const { classes } = this.props;
        return (
            <div className="App">
                {this.state.users.map(user => (
                    <UserCard key={user.username} user={user} />
                ))}
                <Fab color="primary" aria-label="Add" className={classes.fab} component={NavLink} to="/addUser" >
                    <AddIcon />
                </Fab>
            </div>
        );
    }
}
export default withStyles(styles, { withTheme: true })(List);