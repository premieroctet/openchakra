import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './CardAddServiceStyle'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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
          <CardActionArea>
            <Grid className={classes.cardMedia} style={{height:300}}>
              <Grid className={classes.fabPosition}>
                <Fab color="primary" aria-label="add" className={classes.fab}>
                  <AddIcon style={{color:'white'}}/>
                </Fab>
              </Grid>
            </Grid>
            <CardContent className={classes.textPosition}>
              <Typography componen={'p'} className={classes.textStyle}>
                Ajouter un service
              </Typography>
            </CardContent>
          </CardActionArea>
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
