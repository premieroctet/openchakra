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
import CalendarToday from '@material-ui/icons/CalendarToday';
import Chat from '@material-ui/icons/Chat';
import StarIcon from '@material-ui/icons/Star';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import moment from 'moment';
import Link from 'next/link';
import axios from 'axios';

const { config } = require('../../config/config');
const url = config.apiUrl;

moment.locale('fr');

class About extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      alfred: [],
      languages: [],
      dense: false,
      valueRating: 0,
      nbCommentary: 0,
      shop:[],
      user: ''
    }
  }

  componentDidMount() {
    axios.get(`${url}myAlfred/api/shop/alfred/${this.props.alfred}`)
      .then( response  =>  {
        let shop = response.data;
        this.setState({
          user: shop.alfred,
          idAlfred: shop.alfred._id,
          languages: shop.alfred.languages,
          services: shop.services,
          shop:shop,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render(){
    const {shop, languages, user} = this.state;
    const {classes, alfred, profil} = this.props;
    const preventDefault = event => event.preventDefault();

    const StyledRating = withStyles({
      iconFilled: {
        color: '#4fbdd7',
      },
    })(Rating);

    return (
      <Grid container className={classes.mainContainer}>
        <Grid item style={{width: '100%'}}>
          <Grid>
            <Typography variant="h3" className={classes.titleAbout}>
              A propos de {user.firstname}
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
                <Grid>
                  <img style={{width: 30, height : 30}} alt={"commentary"} title={"commentary"} src={'../../static/assets/img/userServicePreview/commentaires.svg'}/>
                </Grid>
              </ListItemAvatar>
              <LinkMaterial href="#" onClick={preventDefault} color="primary " className={classes.link}>{this.state.nbCommentary} Commentaires</LinkMaterial>
            </ListItem>
            {shop.identity_card ?
              <ListItem>
                <ListItemAvatar>
                  <Grid>
                    <img style={{width: 30, height : 30}} alt={"commentary"} title={"commentary"} src={'../../static/assets/img/userServicePreview/id.svg'}/>
                  </Grid>
                </ListItemAvatar>
                <ListItemText
                  primary={"Pièce d’identité vérifiée"}
                />
              </ListItem>
              :
              <ListItem>
                <ListItemAvatar>
                  <Grid>
                    <img style={{width: 30, height : 30}} alt={"commentary"} title={"commentary"} src={'../../static/assets/img/userServicePreview/nonId.svg'}/>
                  </Grid>
                </ListItemAvatar>
                <ListItemText
                  primary={"Pièce d’identité non vérifiée"}
                />
              </ListItem>
            }
            <ListItem>
              <ListItemAvatar>
                <Grid>
                  <img style={{width: 30, height : 30}} alt={"commentary"} title={"commentary"} src={'../../static/assets/img/userServicePreview/calendrier.svg'}/>
                </Grid>
              </ListItemAvatar>
              <ListItemText
                primary={"Membre depuis " + moment(alfred.creation_date).format('MMMM YYYY')}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Grid>
                  <img style={{width: 30, height : 30}} alt={"commentary"} title={"commentary"} src={'../../static/assets/img/userServicePreview/alfred.svg'}/>
                </Grid>
              </ListItemAvatar>
              <ListItemText
                //TODO A MODIFIER QUAND DATE CREATION BOUTIQUE SERA STOCKE
                primary={alfred.creation_shop ? "Alfred depuis " + moment(alfred.creation_shop).format('MMMM YYYY') : "Alfred depuis " + moment(alfred.creation_date).format('MMMM YYYY')}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Grid>
                  <img style={{width: 30, height : 30}} alt={"commentary"} title={"commentary"} src={'../../static/assets/img/userServicePreview/langues.svg'}/>
                </Grid>
              </ListItemAvatar>
                <ListItemText
                  primary={languages.length >= 1 ? "Langue : " + languages.join(' - ') : "Langue : non renseigné"}
                />
            </ListItem>
            { profil ?
              <ListItem>
                <Link
                  href={{
                    pathname: "../viewProfile",
                    query: { id: alfred._id }
                  }}
                >
                  <Typography
                    style={{
                      color: "rgb(47, 188, 211)",
                      cursor: "pointer"
                    }}
                  >
                    Voir le profil
                  </Typography>
                </Link>
              </ListItem> : null
            }
          </List>
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
