import {withTranslation} from 'react-i18next'
const {setAxiosAuthentication}=require('../../utils/authentication')
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../static/css/components/Layout/LayoutMessages/LayoutMessages'
import Grid from '@material-ui/core/Grid'
import '../../static/assets/css/custom.css'
import Layout from './Layout'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

class LayoutMessages extends React.Component {

  constructor(props) {
    super(props)
    this.state={
    }
  }

  componentDidMount = () => {
    setAxiosAuthentication()
  }

  handleChange = (event, newValue) => {
    this.setState({tabIndex: newValue}, () => this.props.handleChange(event, newValue))
  }

  render() {
    const{children, tabIndex, classes, user}= this.props

    return(
      <Layout user={user}>
        <Grid style={{display: 'flex', justifyContent: 'center'}}>
          <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
            <Grid style={{display: 'flex', justifyContent: 'center'}}>
              <h2 className={'customlayoutmessagetitle'}>Mes Messages</h2>
            </Grid>
            <Grid>
              <Tabs
                value={user && !user.is_alfred ? 0 : tabIndex}
                onChange={user && !user.is_alfred ? null : this.handleChange}
                aria-label="scrollable force tabs"
                classes={{indicator: classes.scrollIndicator}}
              >
                {
                  user && user.is_alfred ?
                    <Tab label={'Mes messages Alfred'} className={classes.scrollMenuTabLayoutMessage} />
                    :null

                }
                <Tab label={"Mes messages d'utilisateur"} className={classes.scrollMenuTabLayoutMessage} />
              </Tabs>
            </Grid>
            <Grid style={{backgroundColor: 'rgba(249,249,249, 1)', width: '100%'}}>
              <Grid style={{margin: '0 15%', display: 'flex', justifyContent: 'center', backgroundColor: 'white', borderRadius: 27, border: '1px solid rgba(210, 210, 210, 0.5)', padding: '5% 10%', marginTop: '5vh', marginBottom: '5vh'}}>
                {children}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    )
  }

}

export default withTranslation()(withStyles(styles)(LayoutMessages))
