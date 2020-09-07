import Grid from '@material-ui/core/Grid';
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import styles from './CardCommentaryStyle';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

class CardCommentary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {classes} = this.props;

    return (
      <Grid>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            title="NOM prénom"
            subheader="Commenté le 20/03/2020"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              This impressive paella is a perfect party dish and a fun meal to cook together with your
              guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
          </CardContent>


        </Card>
      </Grid>
    );
  }
}

CardCommentary.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,

};

export default withStyles(styles, {withTheme: true})(CardCommentary);
