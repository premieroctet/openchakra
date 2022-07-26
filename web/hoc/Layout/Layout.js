import React, {useState, useEffect} from 'react'
import {withTranslation} from 'react-i18next'
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
import {PRO, PART} from '../../utils/consts'
import {getDataModel} from '../../config/config'
import * as themes from '../../styles/themes'
import * as globalStyles from '../../styles/globalStyles'
import {useUserContext} from '../../contextes/user.context'
import TrustAndSecurity from './TrustAndSecurity/TrustAndSecurity'
import Footer from './Footer/Footer'
import NavBar from './NavBar/NavBar'

const themeToUse = themes[getDataModel()] || themes.orig
const ProjectGlobalStyles = globalStyles[getDataModel()] || globalStyles.orig

const Layout = ({children, selectedAddress, classes, keyword}) => {

  const {user} = useUserContext()
  const gps = user?.billing_address
  const [categories, setCategories] = useState([])

  useEffect(() => {
    setAxiosAuthentication()

    axios.get(`/myAlfred/api/category/${PART}`)
      .then(res => {
        let cat = res.data
        // Set label en fonction de PRO PART
        cat.forEach(c => {
          c.label=c.particular_label
        })
        setCategories(cat)
      })
      .catch(err => {
        console.error((err))
      })
  }, [])

  return (
    <ThemeProvider theme={themeToUse || {}}>
      <Grid>
        <LoggedAsBanner />
        <Grid className={classes.hiddenOnMobile}>
          <InfoBar/>
        </Grid>
        <NavBar selectedAddress={selectedAddress} keyword={keyword} key={user?._id}/>
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
      {ProjectGlobalStyles && <ProjectGlobalStyles />}
    </ThemeProvider>
  )
}


export default withTranslation('custom', {withRef: true})(withStyles(styles)(Layout))
