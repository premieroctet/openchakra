import CustomButton from '../CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
const {setAxiosAuthentication}=require('../../utils/authentication')
import React, {useEffect} from 'react'
import Router from 'next/router'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
const {isLoggedUserAlfred}=require('../../utils/context')

import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  containerAddService: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      boxShadow: 'rgba(0, 0, 0, 0.15) 0px 16px 32px, rgba(0, 0, 0, 0.1) 0px 3px 8px',
      borderRadius: 10,
    },
  },
  buttonAddService: {
    textTransform: 'initial',
    fontWeight: 'bold',
  },
  descriptionAddService: {
    color: 'rgba(39,37,37,35%)',
    textAlign: 'center',
  },
  containerTitle: {
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.only('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.only('md')]: {
      display: 'none',
    },
  },
}))

function AddService(props) {
  const {t} = props
  const classes= useStyles()
  
  useEffect(() => {
    setAxiosAuthentication()
  }, [])

  function clickService() {
    // Router.push(isLoggedUserAlfred() ? `/myShop/services?user=${this.props.user}` : '/creaShop/creaShop')
    Router.push('/creaShop/creaShop')
  }


  return (
    <Grid className={classes.containerAddService}>
      <Grid className={classes.containerTitle}>
        <h3 className={'customaddservicestitle'}>{ReactHtmlParser(t('ADD_SERVICES.title'))}</h3>
      </Grid>
      <CustomButton classes={{root: `customaddservicesbutton ${classes.buttonAddService}`}} onClick={clickService} startIcon={<AddCircleOutlineIcon />}>
        { isLoggedUserAlfred() ?
          ReactHtmlParser(t('SHOP.addService'))
          :
          ReactHtmlParser(t('SHOP.createShop'))
        }
      </CustomButton>
      <Typography className={`customaddservicessubtitle ${classes.descriptionAddService}`}>{ReactHtmlParser(t('ADD_SERVICES.add_service'))}</Typography>
    </Grid>
  )
  
}

export default withTranslation('custom')(AddService)
