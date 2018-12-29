import React, { Component } from 'react';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { getUserData, addDrinkByUsername } from '../utils/helpers';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },

    submitButton: {
        marginTop: 16,
        margin: theme.spacing.unit,
    }
});

class User extends Component {

    constructor(props) {
        super()
        this.state = {
            userdata: []
        }
    }

    componentDidMount() {
        this.getUserData()
    }

    getUserData = () => {
        getUserData(this.props.location.pathname.substring(6))
            .then((res) => {
                this.setState({
                    userdata: res.data
                })
            })
    }

    addDrink = (drinkSize) => {
        addDrinkByUsername(this.props.location.pathname.substring(6), drinkSize)
            .then(() => {
                this.getUserData()
            })
    }

    handleDrinkSizeChange = (e) => {
        this.setState({
            drinkSize: Number(e.target.value)
        })
    }

    submitCustomSizeDrink = () => {
        this.addDrink(this.state.drinkSize)
    }

    render() {
        const { classes } = this.props;
        return (

            <Grid item xs={12}>
                <Paper className={'userTitle'}><h2>{this.state.userdata.username}</h2></Paper>
                <p>Gender: {this.state.userdata.gender}</p>
                <p>Könni: {this.state.userdata.konni}</p>
                <Button variant="contained" className={classes.button} color="primary" onClick={() => this.addDrink(1.0)}>
                    0.33l
                </Button>
                <Button variant="contained" className={classes.button} color="primary" onClick={() => this.addDrink(1.5)}>
                    0.50l
                </Button>
                <Button variant="contained" className={classes.button} color="primary" onClick={() => this.addDrink(1.0)}>
                    12cl
                </Button>
                <Button variant="contained" className={classes.button} color="secondary" onClick={() => this.addDrink(1.0)}>
                    glögi
                </Button>
                <Grid item xs={12}>
                    <TextField
                        id="drinkSize"
                        label="Custom drink size"
                        className={classes.textField}
                        onChange={this.handleDrinkSizeChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <Button variant="contained" className={classes.submitButton} onClick={this.submitCustomSizeDrink}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(User);
