import React, { Component } from 'react';
import '../App.css';
import { sendUserData } from "../utils/helpers";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import classNames from 'classnames';
import StatusSnackBar from '../Components/StatusSnackBar'

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});


const genders = [
    {

        label: 'Other',
        value: 'other',
    },
    {
        label: 'Male',
        value: 'male',
    },
    {
        label: 'Female',
        value: 'female',
    },
];

class addUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            mass: '',
            gender: 'other',
            successfulSnackBarOpen: false,
            errorSnackBarOpen: false
        }
    }

    submitForm = () => {
        const userData = {
            username: this.state.username,
            mass: this.state.mass,
            gender: this.state.gender,
        }
        this.setState({
            successfulSnackBarOpen: false,
            errorSnackBarOpen: false
        })
        sendUserData(userData)
            .then((asd) => {
                if (asd.status === 200) {
                    this.setState({
                        successfulSnackBarOpen: true
                    })
                } else {
                    this.setState({
                        errorSnackBarOpen: true
                    })
                }
            })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

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
            <div className="App">
                <h2>Add user</h2>
                <div>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            fullWidth
                            id="filled-username"
                            label="Name"
                            className={classes.textField}
                            value={this.state.username}
                            onChange={this.handleChange('username')}
                            margin="dense"
                            variant="filled"
                        />

                        <TextField
                            fullWidth
                            id="filled-weight"
                            label="Weight"
                            value={this.state.mass}
                            onChange={this.handleChange('mass')}
                            type="number"
                            className={classes.textField}
                            margin="dense"
                            variant="filled"
                        />
                        <TextField
                            fullWidth
                            id="filled-select-gender"
                            select
                            label="Gender"
                            className={classes.textField}
                            value={this.state.gender}
                            onChange={this.handleChange('gender')}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            margin="dense"
                            variant="filled"
                        >
                            {genders.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Button fullWidth variant="contained" color="primary" className={classes.button} onClick={this.submitForm}>
                            Send
        <SendIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
                        </Button>


                        <StatusSnackBar
                            successMessage="User added successfully!"
                            errorMessage="Invalid name or weight!"
                            successfulSnackBarOpen={this.state.successfulSnackBarOpen}
                            errorSnackBarOpen={this.state.errorSnackBarOpen}
                            handleClose={this.handleClose}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(addUser);