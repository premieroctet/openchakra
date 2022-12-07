import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles'
import styles from '../../../static/css/components/Card/CardServiceUser/CardServiceUser'
import CustomButton from '../../CustomButton/CustomButton'
import CardSkeleton from '../CardSkeleton'
import Card from '../Card'

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

const CardServiceInfo=withTranslation(null, {withRef: true})(withStyles(styles)(RawCardServiceInfo))

class CardService extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      cpData: {},
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

  handleClickOpen =id => {
    this.setState({id_service: id, open: true})
  };

  handleClose = () => {
    this.setState({id_service: '', open: false})
  };

  deleteService(id) {
    // definCssVariable('brand', 'red')
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

  onMouseEnter = ev => {
    this.setState({animated: true})
  }

  onMouseLeave = ev => {
    this.setState({animated: false})
  }

  render() {
    const {classes, loading} = this.props
    const {cpData} = this.state

    let resa_link = `/servicePreview?id=${cpData._id}`
    if (this.props.item===null) {
      return (
        <Grid className={`customcardinfocont ${classes.carServiceInfoContainer}`}>
          <CardServiceInfo classes={classes} />
        </Grid>
      )
    }

    let picture = cpData.picture

    if (picture && !picture.startsWith('http') && !picture.startsWith('/')) {
      picture=`/${picture}`
    }
    return(
      loading ?
        <CardSkeleton />
        : <Card
          title={cpData.label}
          picture={picture}
          link={resa_link}
          Cta={<CustomButton
            variant={'contained'}
            classes={{root: `customshoprofil ${classes.buttonShowProfil}`}}
          >
            {ReactHtmlParser(this.props.t('CARD_SERVICE.button_show_profil'))}
          </CustomButton>}
        />
        
    )
  }
}

export default withTranslation(null, {withRef: true})(withStyles(styles)(CardService))
