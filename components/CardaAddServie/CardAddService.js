import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './CardAddServiceStyle'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class CardAddService extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    const {classes} = this.props;

    return (
      <Grid>
        <Card className={classes.card}>
          <Grid className={classes.cardMedia}>
          </Grid>
          <CardContent>
          </CardContent>
        </Card>
      </Grid>
    )
  }
}

CardAddService.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(CardAddService);
