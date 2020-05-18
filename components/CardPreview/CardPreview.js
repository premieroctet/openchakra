import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './CardPreviewStyle'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import RoomIcon from '@material-ui/icons/Room';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Link from 'next/link';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
const {computeDistanceKm}=require('../../utils/functions');
import axios from 'axios';
import { toast } from 'react-toastify';
import UserAvatar from '../Avatar/UserAvatar';
import { computeAverageNotes } from '../../utils/functions';

class CardPreview extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dense: true,
      score: 0,
      service: [],
      alfred:[],
      shop:[],
      open: false,
      id_service: '',
      page: false,
      reviews:[],
    }
  }

  componentDidMount() {
    if(typeof this.props.services.user === 'string'){
      axios.get('/myAlfred/api/shop/alfred/'+this.props.services.user)
        .then( res => {
          this.setState({shop: res.data, alfred:res.data.alfred, score:res.data.alfred.score}, () =>
            axios.get(`/myAlfred/api/reviews/profile/customerReviewsCurrent/${this.props.services.user}`)
              .then (res => {
                var reviews = res.data;
                if (this.props.services._id) {
                  reviews = reviews.filter( r => r.serviceUser._id===this.props.services._id);
                }
                this.setState({reviews:reviews})
              })
              .catch (err => console.log(err))
          )
        })
        .catch( err => console.log(err))
    }else{
      axios.get('/myAlfred/api/shop/alfred/'+this.props.services.user._id)
        .then( res => {
          this.setState({shop: res.data, alfred:res.data.alfred, score:res.data.alfred.score}, () =>
            axios.get(`/myAlfred/api/reviews/profile/customerReviewsCurrent/${this.props.services.user._id}`)
              .then (res => {
                var reviews = res.data;
                if (this.props.services._id) {
                  reviews = reviews.filter( r => r.serviceUser._id===this.props.services._id);
                }
                this.setState({reviews:reviews})
              })
              .catch (err => console.log(err))
          )
        })
        .catch( err => console.log(err))
    }


  }

  handleClickOpen(id) {
    this.setState({id_service: id, open:true});
  }

  handleClose() {
    this.setState({id_service:'', open:false});
  }

  deleteService(id) {
    axios.delete('/myAlfred/api/serviceUser/' + id)
      .then(() => {
        toast.error('Service supprimé');
        this.setState({open:false,id_service:''});
        this.props.needRefresh();
      })
      .catch(err => console.log(err))
  }

  render(){
    const {classes, services, userState, isOwner, gps, needAvatar} = this.props;
    const service = services.service;
    const { shop, reviews } = this.state;

    const distance = gps ? computeDistanceKm(gps, services.service_address.gps) : '';

    const StyledRating = withStyles({
      iconFilled: {
        color: '#4fbdd7',
      },
    })(Rating);

      const notes = computeAverageNotes(reviews.map(r => r.note_alfred));


    return (
      <Grid>
        <Card className={classes.card}>
          <Grid className={classes.cardMedia} style={{ backgroundImage:  'url("' + service.picture + '")'}}>
            { shop.is_professional ?
              <Grid className={classes.statusMedia}>
                <Chip label="PRO" className={classes.chipStyle}/>
              </Grid>
              :null
            }
            {userState && isOwner ?
              <Grid>
                <Grid className={classes.actionMediaEdit}>
                  <Link href={'/myShop/services?id=' + services._id}>
                    <IconButton aria-label="Edit" className={classes.iconButtonStyle}>
                      <EditIcon style={{color: '#4fbdd7'}}/>
                    </IconButton>
                  </Link>
                </Grid>
                <Grid className={classes.actionMediaRemove}>
                  <IconButton aria-label="remove" className={classes.iconButtonStyle}>
                    <DeleteForeverIcon onClick={()=>this.handleClickOpen(services._id)} style={{color: '#f87280'}}/>
                  </IconButton>
                </Grid>
              </Grid>
              : null
            }
            { needAvatar ?
              <Grid className={classes.avatar}>
                <Grid>
                  <UserAvatar classes={'avatarLetter'} user={services.user} className={classes.avatarLetter} />
                </Grid>
                <Grid style={{marginTop: 20}}>
                  <Grid style={{display:'flex', flexDirection: 'column'}} className={classes.contentDistanceUnderAvatar}>
                    <Grid>
                      <Typography component="p" className={classes.sizeTextUnderAvatar}>
                        {services.service_address ?
                          services.service_address.city === undefined || services.service_address.city === "" ? "Non renseigné" : services.service_address.city : "Non renseigné"
                        }

                      </Typography>
                    </Grid>
                    { distance ?
                      <Grid style={{display: 'flex'}}>
                        <Grid>
                          <RoomIcon className={classes.checkCircleIcon}/>
                        </Grid>
                        <Grid>
                          <Typography component="p" className={classes.sizeTextUnderAvatar}>
                            à {distance} km
                          </Typography>
                        </Grid>
                      </Grid>
                      : null
                    }

                  </Grid>
                </Grid>
              </Grid>
               :
              null
            }
          </Grid>
          <CardContent>
            <Grid  className={classes.cardContent}>
              <Grid className={classes.cardContentPosition}>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.sizeText}>
                  { /** FIX get category */ }
                  { /** service.category==undefined ? '':`${service.category.label}`*/ }
                </Typography>
                <Grid className={classes.cardContentHeader}>
                  <Typography component="p" className={classes.sizeText}>
                    {service.label}
                  </Typography>
                </Grid>
                <Box component="fieldset" mb={3} borderColor="transparent" className={classes.boxRating}>
                  <Badge badgeContent={notes.global ? notes.global.toFixed(2) : 0} color={'primary'} classes={{badge: classes.badge}}>
                    <StyledRating name="read-only" value={notes.global} readOnly className={classes.rating} precision={0.5}/>
                  </Badge>
                </Box>
              </Grid>
              <Grid className={classes.cardContentRight}>
                {
                  needAvatar === false ?
                    <Grid className={classes.flexPosition}>
                      <Typography variant="body2" color="textSecondary" component="p" className={classes.sizeText}>
                        {services.service_address ?
                          services.service_address.city === undefined || services.service_address.city === "" ? "Non renseigné" : services.service_address.city : "Non renseigné"
                        }
                      </Typography>
                      <RoomIcon className={classes.checkCircleIcon}/>
                    </Grid> : null
                }
                <Grid>
                  <Link href={'userServicePreview?id=' + services._id}>
                    <Button variant="contained" color="primary" className={classes.button}>
                      {userState && isOwner ? "Visualiser" : "Réserver"}
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.responsiveListContainer}>
              <List dense={this.state.dense} className={classes.flexPosition}>
                <Grid style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                  <Grid>
                    <ListItem className={classes.noPadding}>
                      <ListItemIcon className={classes.minWidth}>
                        <img src={services.graduated && services.graduated !== "" && services.graduated !== null && services.graduated !== undefined ? '../../static/assets/img/iconCardAlfred/graduated.svg' : '../../static/assets/img/iconCardAlfred/no_graduated.svg'} alt={'Diplome'} title={'Diplome'} className={classes.imageStyle}/>
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
                        <img src={services.is_certified && services.is_certified !== "" && services.is_certified !== null && services.is_certified !== undefined ? '../../static/assets/img/iconCardAlfred/certificate.svg' : '../../static/assets/img/iconCardAlfred/no_certificate.svg'} alt={'Certifié'} title={'Certifié'} className={classes.imageStyle}/>
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
                        <img src={services.level && services.level !== "" && services.level !== null && services.level !== undefined ? '../../static/assets/img/iconCardAlfred/experience.svg' : '../../static/assets/img/iconCardAlfred/no_experience.svg'} alt={'Expérimenté'} title={'Expérimenté'} className={classes.imageStyle}/>
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
          </CardContent>
        </Card>
        <Dialog
          open={this.state.open}
          onClose={()=>this.handleClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Supprimer un service"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Voulez-vous vraiment supprimer ce service de votre boutique ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>this.handleClose2()} color="primary">
              Annuler
            </Button>
            <Button onClick={()=>this.deleteService(this.state.id_service)} color="secondary" autoFocus>
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>

    )
  }
}

CardPreview.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(CardPreview);
