import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../../hoc/Layout/Layout';
import styles from './reservationPageStyle'
import Grid from '@material-ui/core/Grid';
import Router from "next/router";
import axios from 'axios';
import BannerReservation from '../../components/BannerReservation/BannerReservation';
import About from '../../components/About/About';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UserAvatar from '../../components/avatar/UserAvatar';
import SkillsAlfred from '../../components/SkillsAlfred/SkillsAlfred';
import Typography from '@material-ui/core/Typography';
import isEmpty from '../../server/validation/is-empty';


const { config } = require('../../config/config');
const url = config.apiUrl;

class reservationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      shop: {},
      serviceUser: {},
      service: {},
      equipments: [],
      prestations: [],
      flexible2: false,
      moderate2: false,
      strict2: false,
      haveOptions: false,
      languages:[],
      alfred:[],
      test:{}
    }
  }

  static getInitialProps ({ query: { id } }) {
    return { service_id: id }
  }

  componentDidMount() {
    const id = this.props.service_id;
    localStorage.setItem("path", Router.pathname);
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "token"
    );
    axios.get(url + "myAlfred/api/users/current").then(res => {
        let user = res.data;
        this.setState({ user: user });
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 401 || err.response.status === 403) {
          localStorage.removeItem("token");
          Router.push({ pathname: "/login" });
        }
      });


    axios.get(url + `myAlfred/api/serviceUser/${id}`).then(res => {
        let serviceUser = res.data;
        this.setState({
          serviceUser: serviceUser,
          service: serviceUser.service,
          equipments: serviceUser.equipments,
          prestations: serviceUser.prestations
        });
        axios.get(url + "myAlfred/api/shop/alfred/" + this.state.serviceUser.user._id).then(res => {
            let shop = res.data;
            this.setState({
              shop: shop,
              flexible2: shop.flexible_cancel,
              moderate2: shop.moderate_cancel,
              strict2: shop.strict_cancel,
            });
          })
          .catch(err => console.log(err));
      }).catch(err =>{
        console.log(err)
    });
  }

  render() {
    const {classes} = this.props;
    const {user, serviceUser, shop, service, alfred, equipments} = this.state;
    console.log(shop, 'shop');
    console.log(serviceUser, 'serviceUser');
    console.log(user, 'user');
    console.log(service, 'service');
    console.log(equipments, 'equipments')

    const StyledRating = withStyles({
      iconFilled: {
        color: '#4fbdd7',
      },
    })(Rating);

    return (
      <Grid>
        <Layout>
          <Grid style={{width: '100%'}}>
            <BannerReservation serviceUser={service} shop={shop} user={user}/>
            <Grid className={classes.mainContainer}>
              <Grid style={{width: '50%', backgroundColor: 'red'}}>
                <Grid style={{backgroundColor: 'orange', display: ' flex'}}>
                  <Grid style={{width: '80%'}}>
                    <Grid style={{backgroundColor : 'pink'}}>
                      <Grid>
                        <Typography variant="h6">{service.label} par {user.firstname}</Typography>
                      </Grid>
                    </Grid>
                    <Grid style={{backgroundColor: 'blue', display: 'flex', alignItems: 'center'}}>
                      <Grid>
                        <Box component="fieldset" mb={3} borderColor="transparent" className={classes.boxRating}>
                          <Badge badgeContent={0} color={'primary'} className={classes.badgeStyle}>
                            <StyledRating name="read-only" value={3} readOnly className={classes.rating} />
                          </Badge>
                        </Box>
                      </Grid>
                      <Grid>
                        <a href={"#"}>Voir plus de commentaires</a>
                      </Grid>
                    </Grid>
                    <Grid style={{backgroundColor : 'yellow'}}>
                      <Grid>
                        <p>Coiffeuse depuis plus de 10 ans, je vous propose mes services de Coiffure à domicile pour partager ma passion pour la coiffure .
                          J’ai également suivi une formation de visagiste, me permettant de vous conseiller au mieux ! </p>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid style={{backgroundColor: 'brown', width : '20%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Grid item className={classes.itemAvatar}>
                      <UserAvatar classes={'avatarLetter'} user={user} className={classes.avatarLetter} />
                      <Typography style={{marginTop:20}} className={classes.textAvatar}>{user.firstname}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className={classes.responsiveListContainer} style={{backgroundColor: 'purple'}}>
                  <List dense={this.state.dense} className={classes.flexPosition}>
                    <Grid style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                      <Grid>
                        <ListItem className={classes.noPadding}>
                          <ListItemIcon className={classes.minWidth}>
                            <img src={'../../static/assets/img/iconCardAlfred/graduated.svg'} alt={'Diplome'} title={'Diplome'} className={classes.imageStyle}/>
                          </ListItemIcon>
                          <ListItemText
                            classes={{primary:classes.sizeText}}
                            primary={"Diplômé(e)"}
                          />
                        </ListItem>
                      </Grid>
                      <Grid>
                        <ListItem className={classes.noPadding} style={{marginLeft : 5}}>
                          <ListItemIcon  className={classes.minWidth}>
                            <img src={'../../static/assets/img/iconCardAlfred/certificate.svg'} alt={'Certifié'} title={'Certifié'} className={classes.imageStyle}/>
                          </ListItemIcon>
                          <ListItemText
                            classes={{primary:classes.sizeText}}
                            primary="Certifié(e)"
                          />
                        </ListItem>
                      </Grid>
                      <Grid>
                        <ListItem className={classes.noPadding} style={{marginLeft : 5}}>
                          <ListItemIcon className={classes.minWidth}>
                            <img src={'../../static/assets/img/iconCardAlfred/experience.svg'} alt={'Expérimenté'} title={'Expérimenté'} className={classes.imageStyle}/>
                          </ListItemIcon>
                          <ListItemText
                            classes={{primary:classes.sizeText}}
                            primary="Expérimenté(e)"
                          />
                        </ListItem>
                      </Grid>
                    </Grid>
                  </List>
                </Grid>
                <Grid>
                  <Grid>
                    <Grid style={{backgroundColor : 'grey'}}>
                      <Grid className={classes.skillsContentContainer}>
                        <SkillsAlfred alfred={user}/>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid>
                    <Typography variant="h6">{user.firstname} fournit :</Typography>
                  </Grid>
                  <Grid>
                    <p>Dans le cadre de son service, votre Alfred peut fournir du matériel et des produits en fonction des prestations. Ces produits & matériels sont fournis sans surcoût. </p>
                  </Grid>
                  <Grid>
                    <Grid container spacing={1}>
                      {equipments.map((result) => {
                        return (
                          <Grid key={result.id} item xl={2} lg={4} md={4} sm={4} xs={4}>
                            <img src={`../../static/equipments/${result.logo.slice(0, -4)}_Selected.svg`} height={100} width={100} alt={`${result.name_logo.slice(0, -4)}_Selected.svg`} />
                          </Grid>
                        )
                      })
                      }
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid style={{width: '50%', backgroundColor:'green'}}/>
            </Grid>
          </Grid>
        </Layout>
      </Grid>

    )
  }
}

reservationPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(reservationPage);
