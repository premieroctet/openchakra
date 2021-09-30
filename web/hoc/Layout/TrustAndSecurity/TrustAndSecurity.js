import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React, {useEffect, useState} from 'react'
import Grid from '@material-ui/core/Grid'
import AlarmOnIcon from '@material-ui/icons/AlarmOn'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import TextsmsIcon from '@material-ui/icons/Textsms'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../../static/css/components/TrustAndSecurity/TrustAndSecurity'

function TrustAndSecurity({t, classes}) {
  const [customCss, setCustomCss]= useState('')
  const [items, setItems] = useState([
    {
      title: ReactHtmlParser(t('TRUST_SECURITY.first_item.title')),
      text: ReactHtmlParser(t('TRUST_SECURITY.first_item.text')),
      icon: <AlarmOnIcon className={'customtrustandsecurityicon'} fontSize="large"/>,
    },
    {
      title: ReactHtmlParser(t('TRUST_SECURITY.second_item.title')),
      text: ReactHtmlParser(t('TRUST_SECURITY.second_item.text')),
      icon: <VerifiedUserIcon className={'customtrustandsecurityicon'} fontSize="large"/>,
    },
    {
      title: ReactHtmlParser(t('TRUST_SECURITY.third_item.title')),
      text: ReactHtmlParser(t('TRUST_SECURITY.third_item.text')),
      icon: <TextsmsIcon className={'customtrustandsecurityicon'} fontSize="large"/>,
    },
  ])


  useEffect(() => {
    const xhttp = new XMLHttpRequest()
    xhttp.onload = function() {
      setCustomCss(this.responseText)
    }
    xhttp.open('GET', '../../../static/assets/css/custom.css')
    xhttp.send()
  })
  
  useEffect(() => {
    let newArr = [...items]
    if(customCss.includes('customTrustAlarm')) {
      newArr[0].icon = <div className={'customTrustAlarm'}/>
      setItems(newArr)
    }
    else if(customCss.includes('customTrustShield')) {
      newArr[1].icon = <div className={'customTrustShield'}/>
      setItems(newArr)
    }
    else if(customCss.includes('customTrustMessage')) {
      newArr[2].icon = <div className={'customTrustMessage'}/>
      setItems(newArr)
    }
  }, [customCss])

  return(
    <Grid container spacing={2} style={{margin: 0, width: '100%'}} className={classes.trustAndSecurityMainContainer} >
      {
        items.map((res, index) => (
          <Grid key={index} item xl={4} lg={4} md={4} sm={4} xs={4} className={classes.trustAndSecurityContent}>
            <Grid>
              {res.icon}
            </Grid>
            <Grid style={{marginLeft: '3vh'}}>
              <Grid>
                <Typography className={'customtrustandsecuritytitle'}><strong>{res.title}</strong></Typography>
              </Grid>
              <Grid>
                <Typography className={'customtrustandsecuritytext'}>{res.text}</Typography>
              </Grid>
            </Grid>
          </Grid>
        ))
      }
    </Grid>
  )
  
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(TrustAndSecurity))
