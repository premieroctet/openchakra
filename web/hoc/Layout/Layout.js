import {withTranslation} from 'react-i18next'
import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Divider from '@material-ui/core/Divider'
import {ThemeProvider} from 'styled-components'
import {MinGlobalStyles} from '../../styles/MinglobalStyles'
import ScrollMenu from '../../components/ScrollMenu/ScrollMenu'
import InfoBar from '../../components/InfoBar/InfoBar'
import styles from '../../static/css/pages/layout/layoutStyle'
import LoggedAsBanner from '../../components/LoggedAsBanner'
import {setAxiosAuthentication} from '../../utils/authentication'
import {getLoggedUserId} from '../../utils/context'
import {PRO, PART} from '../../utils/consts'
import TrustAndSecurity from './TrustAndSecurity/TrustAndSecurity'
import Footer from './Footer/Footer'
import NavBar from './NavBar/NavBar'


class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      logged: false,
      categories: [],
      user: {},
    }
  }

  componentDidMount() {
    setAxiosAuthentication()

    if (getLoggedUserId()) {
      this.setState({logged: true})
    }

    if (this.state.logged) {
      axios.get('/myAlfred/api/users/current')
        .then(res => {
          let data = res.data
          this.setState({
            user: data,
            gps: data.billing_address ? data.billing_address.gps : null,
          })
        })
        .catch(err => {
          console.error((err))
        })
    }

    axios.get(`/myAlfred/api/category/${PART}`)
      .then(res => {
        let cat = res.data
        // Set label en fonction de PRO PART
        cat.forEach(c => {
          c.label=c.particular_label
        })
      })
      .catch(err => {
        console.error((err))
      })


  }

  render() {
    const {children, selectedAddress, classes, gps, keyword} = this.props
    const {categories} = this.state

    return (
      <ThemeProvider theme={{}}>
        <Grid>
          <LoggedAsBanner />
          <Grid className={classes.hiddenOnMobile}>
            <InfoBar/>
          </Grid>
          <NavBar selectedAddress={selectedAddress} keyword={keyword} key={this.logged}/>
          <Grid>
            <Grid className={classes.layoutScrollMenu}>
              <ScrollMenu categories={categories} gps={gps} mode={'search'}/>
            </Grid>
            <Grid className={classes.filterMenuDivierContainer}>
              <Divider className={classes.filterMenuDividerStyle}/>
            </Grid>
          </Grid>
          {children}
          <Grid className={classes.mainContainerStyleFooter}>
            <Grid className={classes.hiddenOnMobile}>
              <Divider style={{width: '100%'}}/>
              <Grid style={{marginTop: '2vh', marginBottom: '2vh'}}>
                <TrustAndSecurity/>
              </Grid>
            </Grid>
            <Grid className={`customgeneralfooter ${classes.generalWidthFooter}`}>
              <Grid style={{width: '85%'}}>
                {<Footer/>}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <MinGlobalStyles />
      </ThemeProvider>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(Layout))
