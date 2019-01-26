import React, { Component } from 'react';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import StatusSnackBar from '../Components/StatusSnackBar';
import MenuItem from '@material-ui/core/MenuItem';

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
    dense: {
        marginTop: 16,
    },
    submitButton: {
        marginTop: 16,
        margin: theme.spacing.unit,
    }
});

const timeDeltas = [
    {
        label: 'now',
        value: 0,
    },
    {
        label: '15 minutes ago',
        value: 15 * 60 * 1000,
    },
    {
        label: '30 minutes ago',
        value: 30 * 60 * 1000,
    },
    {
        label: '45 minutes ago',
        value: 45 * 60 * 1000,
    },
    {
        label: '1 hour ago',
        value: 60 * 60 * 1000,
    },
    {
        label: '1.5 hours ago',
        value: 90 * 60 * 1000,
    },
    {
        label: '2 hours ago',
        value: 120 * 60 * 1000,
    },
    {
        label: '3 hours ago',
        value: 180 * 60 * 1000,
    },
    {
        label: '4 hours ago',
        value: 240 * 60 * 1000,
    },
    {
        label: '5 hours ago',
        value: 300 * 60 * 1000,
    },
    {
        label: '6 hours ago',
        value: 360 * 60 * 1000,
    },
];

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
            drinkTypes: [],
            timeDelta: 0,
            myPage: true
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

    getUserName = () => {
        const path = this.props.location.pathname.split('/').filter(x => x)
        if (path[0] === "user" && path.length > 1) {
            return path[1]
        } else if (path[0] === "myPage") {
            return this.props.cookies.get("username")
        } else {
            window.location.assign("/")
        }
    }

    getUserData = () => {
        getUserData(this.getUserName())
            .then((res) => {
                this.setState({
                    username: res.data.username,
                    gender: res.data.gender,
                    konni: res.data.konni,
                    keysSorted: res.data.keysSorted,
                    drinkMap: res.data.drinkMap,
                    myPage: this.props.cookies.get("username") === res.data.username ? true : false
                })
            })
    }

    addUserAsFavourite = () => {
        this.props.cookies.set('username', this.state.username, { path: '/' })
        this.setState({
            myPage: true
        })
    }

    addDrink = (drinkTypeId) => {
        this.setState({
            successfulSnackBarOpen: false,
            errorSnackBarOpen: false
        })
        addDrinkByUsername(this.props.location.pathname.substring(6), drinkTypeId, this.state.timeDelta)
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

    handleDrinkTimeDeltaChange = (e) => {
        this.setState({
            timeDelta: e.target.value
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
                        <Paper className={'userTitle'}>
                            <h2>{this.state.username}</h2>
                        </Paper>
                        {this.state.myPage ? '' : <Button
                            key={`${this.state.username}-favourite`}
                            variant="contained"
                            style={{ backgroundColor: "#ffbb02" }}
                            className={classes.button}
                            onClick={() => this.addUserAsFavourite()}>
                            Set as default user
                            </Button>
                        }
                        <p>Gender: {this.state.gender}</p>
                        <p>Könni: {this.state.konni.toFixed(2)}</p>
                        {this.state.keysSorted.length <= 0 ? '' : <h3>Favourite drinks:</h3>}
                        {this.state.keysSorted.map(key => {
                            return <p key={key}>{key}: {this.state.drinkMap[key]}</p>
                        })}
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                fullWidth
                                id="filled-select-timeDelta"
                                select
                                label="Select time for the drink"
                                className={classes.textField}
                                value={this.state.timeDelta}
                                onChange={this.handleDrinkTimeDeltaChange}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="dense"
                                variant="filled"
                            >
                                {timeDeltas.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </form>

                        <h4>Add a new drink</h4>
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
                <h4>Add a new custom drink</h4>
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
