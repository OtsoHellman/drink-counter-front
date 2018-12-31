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

import { getUserData, addDrinkByUsername } from '../utils/helpers';


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
            errorSnackBarOpen: false
        }
    }

    componentDidMount() {
        this.getUserData()
    }

    getUserData = () => {
        getUserData(this.props.location.pathname.substring(6))
            .then((res) => {
                this.setState({
                    username: res.data.username,
                    gender: res.data.gender,
                    konni: res.data.konni
                })
            })
    }

    addDrink = (drinkSize, drinkType) => {
        this.setState({
            successfulSnackBarOpen: false,
            errorSnackBarOpen: false
        })
        addDrinkByUsername(this.props.location.pathname.substring(6), drinkSize, drinkType)
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

    handleDrinkTypeChange = (e) => {
        this.setState({
            drinkType: e.target.value
        })
    }

    submitCustomSizeDrink = () => {
        this.addDrink(this.state.drinkSize, this.state.drinkType)
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
                        <Button variant="contained" className={classes.button} color="primary" onClick={() => this.addDrink(1.0, '0.33l Olut')}>
                            0.33l Olut
                </Button>
                        <Button variant="contained" className={classes.button} color="primary" onClick={() => this.addDrink(1.5, '0.5l Olut')}>
                            0.5l Olut
                </Button>
                        <Button variant="contained" className={classes.button} color="primary" onClick={() => this.addDrink(1.0, 'Lonkero')}>
                            Lonkero
                </Button>
                        <Button variant="contained" className={classes.button} color="primary" onClick={() => this.addDrink(1.0, 'Siideri')}>
                            Siideri
                </Button>
                        <Button variant="contained" className={classes.button} color="primary" onClick={() => this.addDrink(1.0, '12cl Viini')}>
                            12cl Viini
                </Button>
                        <Button variant="contained" className={classes.button} color="primary" onClick={() => this.addDrink(1.33, '16cl Viini')}>
                            16cl Viini
                </Button>
                        <Button variant="contained" className={classes.button} color="primary" onClick={() => this.addDrink(1.33, '4cl Shotti')}>
                            4cl Shotti
                </Button>
                        <Button variant="contained" className={classes.button} color="primary" onClick={() => this.addDrink(1.33, 'Viskisuihku')}>
                            Viskisuihku
                </Button>
                        <Button variant="contained" className={classes.button} color="secondary" onClick={() => this.addDrink(1.0, 'Glögi')}>
                            glögi
                </Button>
                    </Grid>
                </div>
                <form className={classes.container} >
                    <TextField
                        fullWidth
                        id="drinkType"
                        label="Custom drink name"
                        className={classes.textField}
                        onChange={this.handleDrinkTypeChange}
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
                    <Button variant="contained" fullWidth className={classes.submitButton} onClick={this.submitCustomSizeDrink}>
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
