import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React, {useState} from 'react'
import Grid from '@material-ui/core/Grid'
import AlarmOnIcon from '@material-ui/icons/AlarmOn'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import TextsmsIcon from '@material-ui/icons/Textsms'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../../static/css/components/TrustAndSecurity/TrustAndSecurity'
import CustomIcon from '../../../components/CustomIcon/CustomIcon'

function TrustAndSecurity({t, classes}) {
  const [items] = useState([
    {
      title: ReactHtmlParser(t('TRUST_SECURITY.first_item.title')),
      text: ReactHtmlParser(t('TRUST_SECURITY.first_item.text')),
      icon: <CustomIcon className={'customtrustalarm'} style={{height: 35, width: 35, backgroundSize: 'contain'}} materialIcon={<AlarmOnIcon fontSize="large"/>}/>,
    },
    {
      title: ReactHtmlParser(t('TRUST_SECURITY.second_item.title')),
      text: ReactHtmlParser(t('TRUST_SECURITY.second_item.text')),
      icon: <CustomIcon className={'customtrustshield'} style={{height: 35, width: 35, backgroundSize: 'contain'}} materialIcon={<VerifiedUserIcon fontSize="large"/>}/>,
    },
    {
      title: ReactHtmlParser(t('TRUST_SECURITY.third_item.title')),
      text: ReactHtmlParser(t('TRUST_SECURITY.third_item.text')),
      icon: <CustomIcon className={'customtrustmessage'} style={{height: 35, width: 35, backgroundSize: 'contain'}} materialIcon={<TextsmsIcon fontSize="large"/>}/>,
    },
  ])

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

export default withTranslation(null, {withRef: true})(withStyles(styles)(TrustAndSecurity))
