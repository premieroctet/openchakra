import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
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
import axios from 'axios';
import {toast} from 'react-toastify';
import UserAvatar from '../../Avatar/UserAvatar';
import {computeAverageNotes} from '../../../utils/functions';
import Avatar from "@material-ui/core/Avatar";

const {computeDistanceKm} = require('../../../utils/functions');

class CardPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cpData: {},
      dense: true,
      score: null,
      service: [],
      alfred: null,
      shop: null,
      open: false,
      id_service: '',
      page: false,
      reviews: [],
    };
  }

  componentDidMount() {
   /* axios.get(`/myAlfred/api/serviceUser/cardPreview/${this.props.services}`)
      .then(res => {
        this.setState({cpData: res.data});
      })
      .catch(err => console.error(err));*/


  }

  handleClickOpen(id) {
    this.setState({id_service: id, open: true});
  }

  handleClose() {
    this.setState({id_service: '', open: false});
  }

  deleteService(id) {
    axios.delete('/myAlfred/api/serviceUser/' + id)
      .then(() => {
        toast.error('Service supprimé');
        this.setState({open: false, id_service: ''});
        this.props.needRefresh();
      })
      .catch(err => console.error(err));
  }

  render() {
    const {style, userState, isOwner, gps, needAvatar, isAdmin, alfred, start, end} = this.props;
    const {cpData, service} = this.state;

    var distance = gps ? computeDistanceKm(gps, cpData.gps) : null;
    distance = distance ? distance.toFixed(0) : '';

    const notes = cpData.reviews ? computeAverageNotes(cpData.reviews.map(r => r.note_alfred)) : {};

    return (
      <Grid container>
        {alfred ? Object.keys(alfred).slice(start, end).map(e => {
          return(
            <Grid item xl={4} lg={4} md={4} className={style.cardPreviewMainStyle}>
              <Grid className={style.cardPreviewContainerAvatar}>
                <Avatar alt="Remy Sharp" src={alfred[e].user.picture} className={style.cardPreviewLarge} />
              </Grid>
              <Grid className={style.cardPreviewBoxContentContainer}>
                <Grid className={style.cardPreviewBoxContentPosition}>
                  <Grid className={style.cardPreviewContentIdentity}>
                    <Grid>
                      <p className={style.cardPreviewNameAlfred}>{alfred[e].user.firstname}</p>
                    </Grid>
                    <Grid>
                      <p className={style.cardPreviewLabelService}>{alfred[e].service.label}</p>
                    </Grid>
                  </Grid>
                  <Grid className={style.cardPreviewServiceContent}>
                    <Grid>
                      <p className={style.cardPreviewLabelService}>Lieux</p>
                    </Grid>
                    <Grid>
                      <Box component="fieldset" mb={alfred[e].user.score} borderColor="transparent" classes={{root: style.cardPreviewRatingBox}}>
                        <Rating
                          name="simple-controlled"
                          value={alfred[e].user.score}
                          max={1}
                          readOnly
                        />
                        <p className={style.cardPreviewLabelService}>({alfred[e].user.score})</p>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )
        }) : null}
      </Grid>

    );
  }
}

export default CardPreview;
