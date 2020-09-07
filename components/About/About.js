import Grid from '@material-ui/core/Grid';
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import styles from './AboutStyle';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Link from 'next/link';
import axios from 'axios';
import Badge from '@material-ui/core/Badge';

const {frenchFormat}=require('../../utils/text')
moment.locale('fr');

// FIX : Commentaires : faire un lien vers le profil
class About extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      alfred: [],
      languages: [],
      dense: false,
      user: {},
      userId: '',
      isAlfred: false,
      creationShop: '',
    };
    this.isAlfred = this.isAlfred.bind(this)
  }

  componentDidMount() {
    axios.get(`/myAlfred/api/users/users/${this.props.alfred}`)
      .then( response  =>  {
        let user = response.data;
        this.setState({
          user: user,
          userId: user._id,
          isAlfred: user.is_alfred,
          languages: user.languages,
        }, () => this.isAlfred());
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  isAlfred(){
    if(this.state.isAlfred){
      axios.get(`/myAlfred/api/shop/alfred/${this.state.userId}`).then( response =>{
        let shop = response.data;
        this.setState({
          creationShop : shop.creation_date
        })
      }).catch( error => {
        console.log(error)
      })
    }
  }

  render(){
    const {languages, user, creationShop} = this.state;
    const {classes, alfred, needTitle} = this.props;

    const StyledRating = withStyles({
      iconFilled: {
        color: '#4fbdd7',
      },
    })(Rating);

    const inProfile = process.browser && window.location.pathname.includes('viewProfile')

    return (
      <Grid container className={classes.mainContainer}>
        <Grid item style={{width: '100%'}}>
          <Grid className={classes.titleContainer}>
            <Typography variant="h3" className={classes.titleAbout}>
              {frenchFormat(`A propos de ${user.firstname}`)}
            </Typography>
          </Grid>
          <List dense={this.state.dense} className={classes.listStyle}>
            {
              needTitle !== false ?
                <ListItem>
                  <Box component="fieldset" mb={3} borderColor="transparent" className={classes.boxRating}>
                    <Badge badgeContent={user.score} color={'primary'} classes={{badge: classes.badge}}>
                      <StyledRating name="read-only" value={user.score} readOnly precision={0.5}/>
                    </Badge>
                  </Box>
                </ListItem> : null
            }
            <ListItem>
              <ListItemAvatar>
                <Grid>
                  <img style={{width: 30, height : 30}} alt={"commentary"} title={"commentary"} src={'../../static/assets/img/userServicePreview/commentaires.svg'}/>
                </Grid>
              </ListItemAvatar>
              <Link
                href={{
                  pathname: "/viewProfile",
                  query: { id: alfred }
                }}
              >
                <a
                  className={classes.link}
                  target="_blank"
                >
                  {user.number_of_reviews} commentaires
                </a>
              </Link>
            </ListItem>
            {user.id_confirmed ?
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
                primary={"Membre depuis " + moment(user.creation_date).format('MMMM YYYY')}
              />
            </ListItem>
            {
              user.is_alfred ?
                <ListItem>
                  <ListItemAvatar>
                    <Grid>
                      <img style={{width: 30, height : 30}} alt={"commentary"} title={"commentary"} src={'../../static/assets/img/userServicePreview/alfred.svg'}/>
                    </Grid>
                  </ListItemAvatar>
                  <ListItemText
                    //TODO A MODIFIER QUAND DATE CREATION BOUTIQUE SERA STOCKE
                    primary={"Alfred depuis " + moment(creationShop).format('MMMM YYYY')}
                  />
                </ListItem> : null
            }

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
            <ListItem>
              <Link
                href={{
                  pathname: inProfile ? "/shop" : "/viewProfile",
                  query: inProfile ? { id_alfred : alfred } : { id : alfred }
                }}
              >
                <Typography
                  style={{
                    color: "rgb(47, 188, 211)",
                    cursor: "pointer"
                  }}
                >
                { inProfile ? 'Voir les services' :  'Voir le profil' }
                </Typography>
              </Link>
            </ListItem>
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
