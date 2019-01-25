import React, { Component } from 'react';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import StatusSnackBar from '../Components/StatusSnackBar';

import { getUserData, addDrinkByUsername, getDrinkTypes, addDrinkType } from '../utils/helpers';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
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
        super(props)
        this.state = {
            username: '',
            gender: '',
            konni: 0,
            successfulSnackBarOpen: false,
            errorSnackBarOpen: false,
            drinkMap: {},
            keysSorted: [],
            drinkTypes: []
        }
    }

    componentDidMount() {
        this.getUserData()
        this.getDrinkData()
    }

    getDrinkData = () => {
        getDrinkTypes()
            .then((res) => {
                this.setState({
                    drinkTypes: res.data
                })
            })
    }

    getUserData = () => {
        getUserData(this.props.location.pathname.substring(6))
            .then((res) => {
                this.setState({
                    username: res.data.username,
                    gender: res.data.gender,
                    konni: res.data.konni,
                    keysSorted: res.data.keysSorted,
                    drinkMap: res.data.drinkMap
                })
            })
    }

    addDrink = (drinkTypeId) => {
        this.setState({
            successfulSnackBarOpen: false,
            errorSnackBarOpen: false
        })
        addDrinkByUsername(this.props.location.pathname.substring(6), drinkTypeId)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        successfulSnackBarOpen: true
                    })
                } else {
                    this.setState({
                        errorSnackBarOpen: true
                    })
                }
            })
            .then(() => {
                this.getUserData()
            })
    }

    handleDrinkSizeChange = (e) => {
        this.setState({
            drinkSize: Number(e.target.value)
        })
    }

    handledrinkNameChange = (e) => {
        this.setState({
            drinkName: e.target.value
        })
    }

    addDrinkType = () => {
        addDrinkType(this.state.drinkName, this.state.drinkSize)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        successfulSnackBarOpen: true
                    })
                } else {
                    this.setState({
                        errorSnackBarOpen: true
                    })
                }
            })
            .then(() => {
                this.getUserData()
                this.getDrinkData()
            })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            successfulSnackBarOpen: false,
            errorSnackBarOpen: false
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div>
                    <Grid item xs={12}>
                        <Paper className={'userTitle'}><h2>{this.state.username}</h2></Paper>
                        <p>Gender: {this.state.gender}</p>
                        <p>Könni: {this.state.konni.toFixed(2)}</p>
                        {this.state.keysSorted.length <= 0 ? '' : <h3>Favourite drinks:</h3>}
                        {this.state.keysSorted.map(key => {
                            return <p key={key}>{key}: {this.state.drinkMap[key]}</p>
                        })}

                        {this.state.drinkTypes.map(drinkType => {
                            return <Button
                                key={drinkType._id}
                                variant="contained"
                                className={classes.button}
                                color="primary"
                                onClick={() => this.addDrink(drinkType._id)}>
                                {drinkType.drinkName}
                            </Button>
                        })}

                    </Grid>
                </div>
                <form className={classes.container} >
                    <TextField
                        fullWidth
                        id="drinkName"
                        label="Custom drink name"
                        className={classes.textField}
                        onChange={this.handledrinkNameChange}
                        margin="dense"
                        variant="filled"
                    />

                    <TextField
                        fullWidth
                        id="drinkSize"
                        label="Drink size in alcohol units"
                        onChange={this.handleDrinkSizeChange}
                        type="number"
                        className={classes.textField}
                        margin="dense"
                        variant="filled"
                    />
                    <Button variant="contained" fullWidth className={classes.submitButton} onClick={this.addDrinkType}>
                        Submit
                            </Button>
                </form>
                <StatusSnackBar
                    successMessage="Drink added successfully!"
                    errorMessage="Invalid drink size!"
                    successfulSnackBarOpen={this.state.successfulSnackBarOpen}
                    errorSnackBarOpen={this.state.errorSnackBarOpen}
                    handleClose={this.handleClose}
                />
            </div>
        );
    }
}

export default withStyles(styles)(User);
