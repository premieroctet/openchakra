import Grid from '@material-ui/core/Grid';
import LinkMaterial from '@material-ui/core/Link';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './AboutStyle'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CheckCircle from '@material-ui/icons/CheckCircle';
import HighlightOff from '@material-ui/icons/HighlightOff';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Chat from '@material-ui/icons/Chat';
import StarIcon from '@material-ui/icons/Star';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';
import CancelIcon from '@material-ui/icons/Cancel';

class About extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      alfred: [],
      languages: [],
      dense: false,
      valueRating: 0,
      nbCommentary: 0,
      shop:[]
    }
  }

  render(){
    const {classes, alfred, languages, shop} = this.props;
    const preventDefault = event => event.preventDefault();

    const StyledRating = withStyles({
      iconFilled: {
        color: '#4fbdd7',
      },
    })(Rating);

    return (
      <Grid container className={classes.mainContainer}>
        <Grid item>
          <Grid>
            <Grid>
              <Typography variant="h6">
                A propos de {alfred.firstname}
              </Typography>
            </Grid>
            <List dense={this.state.dense} className={classes.listStyle}>
              <ListItem>
                <Box component="fieldset" mb={3} borderColor="transparent" className={classes.raiting}>
                  <StyledRating name="read-only" value={this.state.valueRating} readOnly/>
                </Box>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <StarIcon className={classes.iconStar}/>
                </ListItemAvatar>
                <LinkMaterial href="#" onClick={preventDefault} color="primary " className={classes.link}>{this.state.nbCommentary} Commentaires</LinkMaterial>
              </ListItem>
              {shop.identity_card ?
                <ListItem>
                  <ListItemAvatar>
                    <CheckCircle />
                  </ListItemAvatar>
                  <ListItemText
                    primary={"Pièce d’identité vérifiée"}
                  />
                </ListItem>
                :
                <ListItem>
                  <ListItemAvatar>
                    <CancelIcon />
                  </ListItemAvatar>
                  <ListItemText
                    primary={"Pièce d’identité non vérifiée"}
                  />
                </ListItem>
              }
              <ListItem>
                <ListItemAvatar>
                  <CalendarToday />
                </ListItemAvatar>
                <ListItemText
                  primary={"Membre depuis " + Moment(alfred.creation_date).format('MMMM YYYY')}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <img src={'../../static/assets/img/iconCardAlfred/iconCastor.svg'} alt={'iconCastor'} title={'iconCastor'}/>
                </ListItemAvatar>
                <ListItemText
                  //TODO A MODIFIER QUAND DATE CREATION BOUTIQUE SERA STOCKE
                  primary={alfred.creation_shop ? "Alfred depuis " + Moment(alfred.creation_shop).format('MMMM YYYY') : "Alfred depuis " + Moment(alfred.creation_date).format('MMMM YYYY')}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Chat />
                </ListItemAvatar>
                  <ListItemText
                    primary={languages.length > 1 ? "Langue : " + languages.join(' - ') : "Langue : non renseigné"}
                  />
              </ListItem>
              <ListItem>
                <LinkMaterial href="#" onClick={preventDefault} color="primary " className={classes.link}>Voir le profil</LinkMaterial>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,

};

export default  withStyles(styles, { withTheme: true })(About);
