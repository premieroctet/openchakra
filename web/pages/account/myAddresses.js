import {COMPANY_NAME, MY_ADDRESSES} from '../../utils/i18n'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import HandleAddresses from '../../components/HandleAddresses/HandleAddresses'
const {clearAuthenticationToken, setAxiosAuthentication} = require('../../utils/authentication')
import React from 'react'
import axios from 'axios'
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import Router from 'next/router'
import {withStyles} from '@material-ui/core/styles'
import Head from 'next/head'
import styles from '../../static/css/pages/myAddresses/myAddresses'
import LayoutAccount from '../../hoc/Layout/LayoutAccount'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import LayoutMobile from '../../hoc/Layout/LayoutMobile'


moment.locale('fr')

class myAddresses extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,

    }
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)

    setAxiosAuthentication()
    axios.get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data
        this.setState({
          user: user,
        })
      })
      .catch(err => {
        console.error(err)
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/'})
        }
      })

  }


  content = () => {
    return(
      <Grid style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <Grid>
            <h2 className={'customadressestitle'}>{ ReactHtmlParser(this.props.t('MY_ADDRESSES.title'))}</h2>
          </Grid>
          <Grid>
            <Typography className={'customadressessubtitle'} style={{color: 'rgba(39,37,37,35%)'}}>{ReactHtmlParser(this.props.t('MY_ADDRESSES.subtitle'))}.</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid>
          <HandleAddresses/>
        </Grid>
      </Grid>
    )
  };

  render() {
    const {classes, t} = this.props
    const {user} = this.state

    if (!user) {
      return null
    }

    return (
      <React.Fragment>
        <Head>
          <title>Profil-Mes adresses de prestation-{t('COMPANY_NAME')}</title>
          <meta property="description"
            content="Renseignez vos adresses de prestation et recherchez des Alfred là où vous le souhaitez ! Des services entre particuliers dans toute la France. Réservez dès maintenant votre Alfred mécanicien, plombier, électricien, coiffeur, coach sportif…"/>
        </Head>
        <Grid className={classes.hideOnlyMobile} >
          <LayoutAccount>
            {this.content(classes)}
          </LayoutAccount>
        </Grid>
        <Grid className={classes.hideOnLaptop}>
          <LayoutMobile currentIndex={4}>
            {this.content(classes)}
          </LayoutMobile>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withTranslation(null, {withRef: true})(withStyles(styles)(myAddresses))
