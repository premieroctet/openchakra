import HandleAddresses from '../../components/HandleAddresses/HandleAddresses'
const {clearAuthenticationToken, setAxiosAuthentication} = require('../../utils/authentication')
import React from 'react'
import axios from 'axios'
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import Router from 'next/router'
import {withStyles} from '@material-ui/core/styles'
import {Helmet} from 'react-helmet'
import styles from '../../static/css/pages/myAddresses/myAddresses'
import LayoutAccount from '../../hoc/Layout/LayoutAccount'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import LayoutMobile from '../../hoc/Layout/LayoutMobile'
const {isB2BAdmin}=require('../../utils/context')

moment.locale('fr')

class myAddresses extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pro_mode: false,
      user: null,
      company_name: null,

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
        if (isB2BAdmin(user)) {
          axios.get('/myAlfred/api/companies/current')
            .then(res => {
              let company = res.data
              this.setState({
                company_name: company.name,
                pro_mode: true,
              })
            })
        }
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
    const {pro_mode, company_name}=this.state
    return(
      <Grid style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <Grid>
            <h2>{ pro_mode ? 'Mes sites' : 'Mes adresses'}</h2>
          </Grid>
          <Grid>
            <Typography style={{color: 'rgba(39,37,37,35%)'}}>Ici, vous pouvez gérer {pro_mode ? `les sites de ${company_name}` : 'vos adresses'}.</Typography>
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
    const {classes} = this.props
    const {user} = this.state

    if (!user) {
      return null
    }

    return (
      <React.Fragment>
        <Helmet>
          <title> Profil - Mes adresses de prestation - My Alfred </title>
          <meta property="description"
            content="Renseignez vos adresses de prestation et recherchez des Alfred là où vous le souhaitez ! Des services entre particuliers dans toute la France. Réservez dès maintenant votre Alfred mécanicien, plombier, électricien, coiffeur, coach sportif…"/>
        </Helmet>
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

export default withStyles(styles)(myAddresses)
