import CustomButton from '../../CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import axios from 'axios'
import styles from '../../../static/css/components/Card/CardServiceUser/CardServiceUser'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {Skeleton} from '@material-ui/lab'
import '../../../static/assets/css/custom.css'

class RawCardServiceInfo extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const{classes} = this.props

    return (
      <Grid>
        <Paper elevation={1} className={`customcardinfopaper ${classes.cardServiceInfoPaper}`}>
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

const CardServiceInfo=withTranslation('custom', {withRef: true})(withStyles(styles)(RawCardServiceInfo))

class CardService extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      cpData: {},
      dense: true,
    }
  }

  componentDidMount() {
    if (this.props.item) {
      axios.get(`/myAlfred/api/service/cardPreview/${this.props.item}`)
        .then(res => {
          this.setState({cpData: res.data})
        })
        .catch(err => console.error(err))
    }
  }

  render() {
    const {classes, loading, address} = this.props
    const {cpData} = this.state

    let resa_link = `/servicePreview?id=${cpData._id}`
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

    let picture = cpData.picture

    return(
      loading ?
        cardServiceLoading() :
        <Grid className={classes.mainCardServiceContainer}>
          <Paper elevation={1} className={`customcardpaper ${classes.cardServicePaper}`}>
            <Grid container spacing={1} className={classes.cardServiceUserMainStyle} onClick={() => { window.open(resa_link, '_blank') }}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.cardServiceUserFlexContainer}>
                <Grid className={classes.cardServiceUserPicsContainer}>
                  <Grid style={{backgroundImage: `url("/${picture}")`}} className={classes.cardServiceUserBackgroundPics}>
                  </Grid>
                </Grid>

              </Grid>
              <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={1} style={{margin: 0}} className={classes.dataContainer}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.labelService}>
                  <Typography className={classes.labelDataContainer}><strong>{cpData.label}</strong></Typography>
                </Grid>
                <>
                  <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.cardServiceUserScoreAndButtonContainer}>
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
              </Grid>
            </Grid>
          </Paper>
        </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(CardService))
