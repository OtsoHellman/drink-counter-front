import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { NavLink } from "react-router-dom";

const styles = {
  card: {
    minWidth: 275,
    margin: '20px 10px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const SimpleCard = (props) => {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent style={{ textDecoration: 'none' }} component={NavLink} to={"user/" + props.user.username}>
        <Typography variant="h5" component="h2">
            {props.user.username}
        </Typography>
      </CardContent>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
