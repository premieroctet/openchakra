const {setAxiosAuthentication} = require('../../utils/authentication')
import React from 'react'
import axios from 'axios'
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import Router from 'next/router'
import {withStyles} from '@material-ui/core/styles'
import {Helmet} from 'react-helmet'
import styles from '../../static/css/pages/paymentMethod/paymentMethod'
import LayoutAccount from '../../hoc/Layout/LayoutAccount'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import LayoutMobile from '../../hoc/Layout/LayoutMobile'
import HandleCB from '../../components/HandleCB/HandleCB'
import HandleRIB from '../../components/HandleRIB/HandleRIB'

moment.locale('fr')

class paymentMethod extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
    }
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    setAxiosAuthentication()
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        this.setState({
          user: res.data,
        })
      })
      .catch(err => {
        console.error(err)
      },
      )
  }

  content = () => {
    return (
      <Grid style={{display: 'flex', flexDirection: 'column'}}>
        <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <Grid>
            <h2>Modes de paiement</h2>
          </Grid>
          <Grid>
            <Typography style={{color: 'rgba(39,37,37,35%)'}}>N'hésitez pas à enregistrer un mode de paiement pour aller
              plus vite lors de vos réservations.</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid>
          <HandleCB/>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid>
          <HandleRIB/>
        </Grid>
      </Grid>

    )
  };

  render() {
    const {classes} = this.props
    const {user} = this.state

    if (!user) {
      return null
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>Compte - Modes de paiement - My Alfred </title>
          <meta property="description"
            content="Accédez à votre compte My Alfred, première application d'offres de services entre particuliers. La création de votre compte est gratuite et sécurisée. Créez votre compte sur My Alfred en quelques clics pour trouvez ou offrir vos services !"/>
        </Helmet>
        <Grid className={classes.layoutAccountContainer}>
          <LayoutAccount>
            {this.content(classes)}
          </LayoutAccount>
        </Grid>
        <Grid className={classes.layoutMobileContainer}>
          <LayoutMobile>
            {this.content(classes)}
          </LayoutMobile>
        </Grid>

      </React.Fragment>
    )
  }
}


export default withStyles(styles)(paymentMethod)
