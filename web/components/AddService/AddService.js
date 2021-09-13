import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
const {setAxiosAuthentication}=require('../../utils/authentication')
import React from 'react'
import Router from 'next/router'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import styles from '../../static/css/components/AddService/AddService'
import {Button} from '@material-ui/core'
import {SHOP, ADD_SERVICES} from '../../utils/i18n'
import Typography from '@material-ui/core/Typography'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
const {isLoggedUserAlfred}=require('../../utils/context')
import '../../static/assets/css/custom.css'

class AddService extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    setAxiosAuthentication()
  };

  clickService = () => {
    // Router.push(isLoggedUserAlfred() ? `/myShop/services?user=${this.props.user}` : '/creaShop/creaShop')
    Router.push('/creaShop/creaShop')
  };

  render() {
    const {classes}=this.props

    return (
      <Grid className={classes.containerAddService}>
        <Grid className={classes.containerTitle}>
          <h3 className={'customaddservicestitle'}>{ReactHtmlParser(this.props.t('ADD_SERVICES.title'))}</h3>
        </Grid>
        <Button classes={{root: `customaddservicesbutton ${classes.buttonAddService}`}} onClick={this.clickService} startIcon={<AddCircleOutlineIcon />}>
          { isLoggedUserAlfred() ?
            ReactHtmlParser(this.props.t('SHOP.addService'))
            :
            ReactHtmlParser(this.props.t('SHOP.createShop'))
          }
        </Button>
        <Typography className={`customaddservicessubtitle ${classes.descriptionAddService}`}>{ReactHtmlParser(this.props.t('ADD_SERVICES.add_service'))}</Typography>
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(AddService))
