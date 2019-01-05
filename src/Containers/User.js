import React, { Component } from 'react';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SnackbarContent from '@material-ui/core/SnackbarContent';

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
                    drinkMap: res.data.drinkMap,
                    keysSorted: res.data.keysSorted
                })
            })
    }

    addDrink = (drinkTypeId) => {
        this.setState({
            successfulSnackBarOpen: false,
            errorSnackBarOpen: false
        })
        addDrinkByUsername(this.props.location.pathname.substring(6), drinkTypeId)
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
            .then(() => {
                this.getUserData()
                this.getDrinkData()
            })
    }

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
                        message="Drink added successfully!"
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
                        message="Invalid drink size!"
                    />
                </Snackbar>
            </div>
        );
    }
}

export default withStyles(styles)(User);
