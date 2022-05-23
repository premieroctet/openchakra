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
import styles from '../../../static/css/components/Card/CardServiceUser/CardServiceUser'
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
const {isEditableUser, hideEmptyEvaluations}=require('../../../utils/context')
import '../../../static/assets/css/custom.css'
import ListIconsSkills from '../../ListIconsSkills/ListIconsSkills'

class RawCardServiceUserInfo extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const{classes} = this.props

    return (
      <Grid>
        <Paper elevation={1} className={`customcardinfopaper ${classes.cardServiceUserInfoPaper}`}>
          <Grid className={classes.cardServiceUserInfoContent}>
            <Grid>
              <h2 className={`customcardinfotitle ${classes.cardServiceUserInfoTitle}`}>{ReactHtmlParser(this.props.t('CARD_SERVICE.card_help_title'))}</h2>
            </Grid>
            <Grid>
              <p className={`customcardinfosubtitle ${classes.cardServiceUserInfoText}`}>{ReactHtmlParser(this.props.t('CARD_SERVICE.card_help_chat'))}</p>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    )
  }
}

const CardServiceUserInfo=withTranslation('custom', {withRef: true})(withStyles(styles)(RawCardServiceUserInfo))

class CardServiceUser extends React.Component {
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
      animated: false,
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

  onMouseEnter = ev => {
    this.setState({animated: true})
  }

  onMouseLeave = ev => {
    this.setState({animated: false})
  }

  render() {
    const {classes, gps, profileMode, address, loading, booking_id} = this.props
    const {cpData, alfred, open, animated} = this.state

    let distance = gps ? computeDistanceKm(gps, cpData.gps) : null
    distance = distance ? distance.toFixed(0) : ''

    const notes = cpData.reviews ? computeAverageNotes(cpData.reviews.map(r => r.note_alfred)) : {}

    let resa_link = `/userServicePreview?id=${cpData._id}`
    if (booking_id) {
      resa_link+=`&booking_id=${booking_id}`
    }
    if (address) {
      resa_link+=`&address=${address}`
    }
    if (this.props.item===null) {
      return (
        <Grid className={`customcardinfocont ${classes.carServiceInfoContainer}`}>
          <CardServiceUserInfo classes={classes} />
        </Grid>
      )
    }

    const cardServiceLoading = () => {
      return(
        <Grid className={classes.mainCardServiceUserContainer}>
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

    let picture = profileMode ? cpData.picture : alfred.picture || cpData.picture

    if (picture && !animated && picture.toLowerCase().endsWith('.gif')) {
      const filename = picture.split('/').slice(-1).pop()
      picture=`myAlfred/api/users/still_profile/${filename}`
    }

    const editable = isEditableUser(alfred)

    return(
      loading ?
        cardServiceLoading() :
        <Grid onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className={profileMode ? classes.mainCardServiceUserContainerProfil : classes.mainCardServiceUserContainer}>
          <Paper elevation={1} className={profileMode ? classes.profileModeCardServiceUserPaper : `customcardpaper ${classes.cardServiceUserPaper}`}>
            <Grid container spacing={1} className={profileMode ? classes.profileModeCardServiceUser : classes.cardServiceUserMainStyle} onClick={() => { profileMode && editable ? null : window.open(resa_link, '_blank') }}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={profileMode ? classes.profileModeCardServiceUserFlexContainer : classes.cardServiceUserFlexContainer}>
                <Grid className={profileMode ? classes.profileModeCardServiceUserPicsContainer : classes.cardServiceUserPicsContainer}>
                  <Grid style={{backgroundImage: `url("/${picture}")`}} className={profileMode ? classes.cardServiceUserBackgroundPicsProfil : classes.cardServiceUserBackgroundPics}>
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
                          <Grid className={profileMode ? classes.cardServiceUserChipNamePro : classes.cardServiceUserChipName}>
                            <Chip label={alfred.firstname} avatar={<ListIconsSkills data={cpData} />} classes={{root: `customcardchipname ${classes.cardServiceUserChip}`}} />
                          </Grid>
                          {
                            cpData.is_professional ?
                              <Grid className={classes.cardServiceUserChipPro}>
                                <Chip label={'Pro'} classes={{root: `customcardchippro ${classes.cardServiceUserChipBckg}`}}/>
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
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.cardServiceUserPlaceContainer}>
                    <Grid className={classes.cardServiceUserPlaceLogo}>
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
                        <Typography className={classes.cardServiceUserDistance}>{cpData.city}</Typography>
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
                      <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.cardServiceUserScoreAndButtonContainer}>
                        <Grid item xl={3} lg={3} md={3} sm={3} xs={3} className={classes.cardServiceUserRatingContainer}>
                          <Box component="fieldset" mb={3} borderColor="transparent" classes={{root: classes.cardPreviewRatingBox}}>
                            { !hideEmptyEvaluations() || cpData.reviews && cpData.reviews.length>0 ?
                              <Rating
                                name="simple-controlled"
                                value={cpData.reviews && cpData.reviews.length>0 ? 1:0}
                                max={1}
                                readOnly
                              />
                              :
                              null
                            }
                            <Grid className={classes.cardServiceUserBoxRatingDisplay}>
                              <Grid className={classes.cardServiceUserRating}>
                                { !hideEmptyEvaluations() || notes.global && notes.global >0 ?
                                  <Typography className={classes.cardServiceUserLabelService}>{notes.global ? notes.global.toFixed(2) : 0}</Typography>
                                  :
                                  null
                                }
                              </Grid>
                              <Grid>
                                {!hideEmptyEvaluations() || cpData.reviews && cpData.reviews.length >0 ?
                                  <Typography className={classes.cardServiceUserLabelService}>({cpData.reviews ? cpData.reviews.length : 0})</Typography>
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

export default withTranslation('custom', {withRef: true})(withStyles(styles)(CardServiceUser))
