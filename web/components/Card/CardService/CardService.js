import CustomButton from '../../CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import axios from 'axios'
import {computeAverageNotes, computeDistanceKm} from '../../../utils/functions'
import Box from '@material-ui/core/Box'
import Rating from '@material-ui/lab/Rating'
import RoomIcon from '@material-ui/icons/Room'
import Chip from '@material-ui/core/Chip'
import styles from '../../../static/css/components/Card/CardService/CardService'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import IconButton from '@material-ui/core/IconButton'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import Router from 'next/router'
import {Skeleton} from '@material-ui/lab'
import {CARD_SERVICE} from '../../../utils/i18n'
const {isEditableUser, displayEmptyReview}=require('../../../utils/context')
import '../../../static/assets/css/custom.css'
import ListIconsSkills from '../../ListIconsSkills/ListIconsSkills'

class RawCardServiceInfo extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const{classes} = this.props

    return (
      <Grid>
        <Paper elevation={1} className={`customcardinfopaper ${classes.cardServiceInfoPaper}`}>
          <Grid className={classes.cardServiceInfoContent}>
            <Grid>
              <h2 className={`customcardinfotitle ${classes.cardServiceInfoTitle}`}>{ReactHtmlParser(this.props.t('CARD_SERVICE.card_help_title'))}</h2>
            </Grid>
            <Grid>
              <p className={`customcardinfosubtitle ${classes.cardServiceInfoText}`}>{ReactHtmlParser(this.props.t('CARD_SERVICE.card_help_chat'))}</p>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    )
  }
}

const CardServiceInfo=withTranslation('custom', {withRef: true})(withStyles(styles)(RawCardServiceInfo))

class CardService extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      cpData: {},
      dense: true,
      score: null,
      service: null,
      shop: null,
      open: false,
      id_service: '',
      reviews: [],
      alfred: {},
    }
  }

  componentDidMount() {
    if (this.props.item) {
      axios.get(`/myAlfred/api/serviceUser/cardPreview/${this.props.item}`)
        .then(res => {
          this.setState({cpData: res.data, alfred: res.data.alfred})
        })
        .catch(err => console.error(err))
    }
  }

  handleClickOpen =id => {
    this.setState({id_service: id, open: true})
  };

  handleClose = () => {
    this.setState({id_service: '', open: false})
  };

  deleteService(id) {
    axios.delete(`/myAlfred/api/serviceUser/${id}`)
      .then(() => {
        this.setState({open: false, id_service: ''}, () => {
          if (this.props.onDelete) {
            this.props.onDelete(id)
          }
        })
      })
      .catch(err => console.error(err))
  }

  modalDeleteServices = classes => {
    return(
      <Dialog
        open={this.state.open}
        onClose={() => this.handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{ReactHtmlParser(this.props.t('CARD_SERVICE.dialog_delete_title'))}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {ReactHtmlParser(this.props.t('CARD_SERVICE.dialog_delete_content'))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={() => this.handleClose()} color="primary">
            {ReactHtmlParser(this.props.t('COMMON.btn_cancel'))}
          </CustomButton>
          <CustomButton onClick={() => this.deleteService(this.state.id_service)} className={classes.colorError}>
            {ReactHtmlParser(this.props.t('COMMON.btn_delete'))}
          </CustomButton>
        </DialogActions>
      </Dialog>
    )
  };

  render() {
    const {classes, gps, profileMode, address, loading} = this.props
    const {cpData, alfred, open} = this.state

    let distance = gps ? computeDistanceKm(gps, cpData.gps) : null
    distance = distance ? distance.toFixed(0) : ''

    const notes = cpData.reviews ? computeAverageNotes(cpData.reviews.map(r => r.note_alfred)) : {}

    let resa_link = `/userServicePreview?id=${cpData._id}`
    if (address) {
      resa_link+=`&address=${address}`
    }
    if (this.props.item===null) {
      return (
        <Grid className={`customcardinfocont ${classes.carServiceInfoContainer}`}>
          <CardServiceInfo classes={classes} />
        </Grid>
      )
    }

    const cardServiceLoading = () => {
      return(
        <Grid className={classes.mainCardServiceContainer}>
          <Paper elevation={1} className={classes.paperloadingCard}>
            <Grid className={classes.cardLoadingImgCont}>
              <Grid className={classes.cardLoadingCard}>
                <Skeleton animation="wave" variant="rect" className={classes.media} />
              </Grid>
              <Grid>
                <Skeleton animation="wave" height={10} width="50%" style={{margin: 5, marginTop: 20}}/>
              </Grid>
              <Grid>
                <Skeleton animation="wave" height={10} width="80%" style={{margin: 5}}/>
              </Grid>
              <Grid>
                <Skeleton animation="wave" height={10} width="70%" style={{margin: 5}}/>
              </Grid>
              <Grid>
                <Skeleton animation="wave" height={10} width="50%" style={{margin: 5}}/>
              </Grid>
              <Grid style={{position: 'absolute', bottom: 0, right: 0}}>
                <Skeleton animation="wave" width={80} height={50} style={{borderRadius: 24, padding: '5px 30px'}}/>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )
    }

    const picture = profileMode ? cpData.picture : alfred.picture || cpData.picture

    const editable = isEditableUser(alfred)

    return(
      loading ?
        cardServiceLoading() :
        <Grid className={profileMode ? classes.mainCardServiceContainerProfil : classes.mainCardServiceContainer}>
          <Paper elevation={1} className={profileMode ? classes.profileModecardServicePaper : `customcardpaper ${classes.cardServicePaper}`}>
            <Grid container spacing={1} className={profileMode ? classes.profileModeCardService : classes.cardServiceMainStyle} onClick={() => { profileMode && editable ? null : window.open(resa_link, '_blank') }}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={profileMode ? classes.profileModecardServiceFlexContainer : classes.cardServiceFlexContainer}>
                <Grid className={profileMode ? classes.profileModecardServicePicsContainer : classes.cardServicePicsContainer}>
                  <Grid style={{backgroundImage: `url("/${picture}")`}} className={profileMode ? classes.cardServiceBackgroundPicsProfil : classes.cardServiceBackgroundPics}>
                    {
                      profileMode && editable ?
                        <Grid style={{position: 'absolute', top: '5px', right: '5px', display: 'flex'}}>
                          <Grid>
                            <IconButton aria-label="delete" style={{backgroundColor: 'rgba(0,0,0,0.7)'}} size={'small'} onClick={() => Router.push(`/creaShop/creaShop?serviceuser_id=${cpData._id}`)}>
                              <EditIcon style={{color: 'white'}} />
                            </IconButton>
                          </Grid>
                          <Grid style={{marginLeft: '10px'}}>
                            <IconButton aria-label="delete" size={'small'} style={{backgroundColor: 'rgba(0,0,0,0.7)'}} onClick={() => this.handleClickOpen(cpData._id)}>
                              <DeleteForeverIcon style={{color: 'white'}} />
                            </IconButton>
                          </Grid>
                        </Grid>
                        :
                        <>
                          <Grid className={profileMode ? classes.cardServiceCHipNameP : classes.cardServiceChipName}>
                            <Chip label={alfred.firstname} avatar={<ListIconsSkills data={cpData} />} classes={{root: `customcardchipname ${classes.cardServiceChip}`}} />
                          </Grid>
                          {
                            cpData.is_professional ?
                              <Grid className={classes.cardServiceChipPro}>
                                <Chip label={'Pro'} classes={{root: classes.cardServiceChipBckg}}/>
                              </Grid> : null
                          }
                        </>
                    }
                  </Grid>
                </Grid>

              </Grid>
              <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={1} style={{margin: 0}} className={profileMode ? classes.profileModeDataContainer : classes.dataContainer}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={profileMode ? classes.labelServiceProfil : classes.labelService}>
                  <Typography className={classes.labelDataContainer}><strong>{cpData.label}</strong></Typography>
                </Grid>
                { profileMode ? null :
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.cardServicePlaceContainer}>
                    <Grid className={classes.cardServicePlaceLogo}>
                      <RoomIcon/>
                    </Grid>
                    <Grid className={classes.cardKmContainer}>
                      { distance &&
                        <>
                          <Grid style={{whiteSpace: 'nowrap'}}>
                            <Typography>{`À ${distance} km`}</Typography>
                          </Grid>
                          <Grid>
                            <Typography>-</Typography>
                          </Grid>
                        </>
                      }
                      <Grid style={{overflow: 'hidden'}}>
                        <Typography className={classes.stylecardServiceDistance}>{cpData.city}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                }
                {
                  profileMode ? null :
                    <>
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.containerDescription}>
                        <Typography className={classes.descriptionStyle}>{cpData.description ? cpData.description : ReactHtmlParser(this.props.t('CARD_SERVICE.no_description'))}</Typography>
                      </Grid>
                      <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.cardServiceScoreAndButtonContainer}>
                        <Grid item xl={3} lg={3} md={3} sm={3} xs={3} className={classes.cardServiceRatingContainer}>
                          <Box component="fieldset" mb={3} borderColor="transparent" classes={{root: classes.cardPreviewRatingBox}}>
                            { displayEmptyReview() || cpData.reviews && cpData.reviews.length>0 ?
                              <Rating
                                name="simple-controlled"
                                value={cpData.reviews && cpData.reviews.length>0 ? 1:0}
                                max={1}
                                readOnly
                              />
                              :
                              null
                            }
                            <Grid className={classes.cardServiceBoxRatingDisplay}>
                              <Grid className={classes.cardServiceRating}>
                                { displayEmptyReview() || notes.global && notes.global >0 ?
                                  <Typography className={classes.cardServiceLabelService}>{notes.global ? notes.global.toFixed(2) : 0}</Typography>
                                  :
                                  null
                                }
                              </Grid>
                              <Grid>
                                { displayEmptyReview() || cpData.reviews && cpData.reviews.length >0 ?
                                  <Typography className={classes.cardServiceLabelService}>({cpData.reviews ? cpData.reviews.length : 0})</Typography>
                                  :
                                  null
                                }
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                        <Grid item xl={9} lg={9} md={9} sm={9} xs={9} className={classes.buttonShowProfilContainer}>
                          <CustomButton
                            variant={'contained'}
                            classes={{root: `customshoprofil ${classes.buttonShowProfil}`}}
                          >
                            {ReactHtmlParser(this.props.t('CARD_SERVICE.button_show_profil'))}
                          </CustomButton>
                        </Grid>
                      </Grid>
                    </>
                }
              </Grid>
            </Grid>
          </Paper>
          {open ? this.modalDeleteServices(classes) : null}
        </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(CardService))
