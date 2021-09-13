import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Link from '../../../components/Link/Link'
import {withStyles} from '@material-ui/core/styles'
import '../../../static/assets/css/custom.css'
import {FAQ_NEED_MORE} from '../../../utils/i18n'

const styles = () => ({
  link: {
    fontWeight: 'bold',
    borderBottom: '1px solid black',
    '&:hover': {
      color: '#84A5E0',
      borderBottom: '1px solid #84A5E0',
    },
  },
})

class NeedMoreFaq extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {classes} = this.props
    return (
      <Grid style={{
        display: ' flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <Grid style={{margin: '0 auto'}}>
          <h3 style={{fontWeight: 'bold'}} className={'customaddservicewantmore'}>{FAQ_NEED_MORE.link}</h3>
          <p>{FAQ_NEED_MORE.you_can}<Link href={'/contact'}>
            <span className={classes.link}>{FAQ_NEED_MORE.contact_us}</span>
          </Link>
          </p>
        </Grid>
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(NeedMoreFaq))
