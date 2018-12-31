import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { sendUserData } from "../utils/helpers";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import classNames from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';

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

const styles1 = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

const variantIcon = {
    success: CheckCircleIcon,
    error: ErrorIcon,
};

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

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

    handleSuccessfulClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            successfulSnackBarOpen: false
        })
    }

    handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
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

                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={this.state.successfulSnackBarOpen}
                            autoHideDuration={3000}
                            onClose={this.handleSuccessfulClose}
                        >
                            <MySnackbarContentWrapper
                                onClose={this.handleSuccessfulClose}
                                variant="success"
                                className={classes.margin}
                                message="User added successfully!"
                            />
                        </Snackbar>

                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={this.state.errorSnackBarOpen}
                            autoHideDuration={3000}
                            onClose={this.handleErrorClose}
                        >
                            <MySnackbarContentWrapper
                                onClose={this.handleErrorClose}
                                variant="error"
                                className={classes.margin}
                                message="Invalid name or weight!"
                            />
                        </Snackbar>
                    </form>
                </div>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(addUser);