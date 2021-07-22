import React from 'react'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import styles from '../../static/css/components/ScrollMenu/ScrollMenu'
import withStyles from '@material-ui/core/styles/withStyles'
import querystring from 'querystring'
import Router from 'next/router'
import _ from 'lodash'

function a11yProps(index, res) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

class ScrollMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  controllerUrl = url => {
    Router.push(url)
  };

  handleChange = (event, newValue) => {
    this.setState({value: newValue})
  };

  render() {
    const{classes, categories, gps, mode, extraParams} = this.props

    const location=typeof window !== 'undefined' ? window.location.href : ''

    let tabIndex=0
    if (['account', 'profile', 'faq'].includes(mode)) {
      tabIndex = _.findIndex(categories.map(c => c.url), url => location.includes(url))
      tabIndex = tabIndex == -1 ? 0 : tabIndex
    }
    else if (mode=='search') {
      tabIndex = _.findIndex(categories.map(c => c._id), id => location.includes(`category=${id}`))
      tabIndex = tabIndex == -1 ? 0 : tabIndex
    }
    else {
      console.error(`ScrollMenu:Mode ${mode} inconnu`)
    }

    return(
      <Grid style={{maxWidth: '100%'}}>
        <Grid>
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            value={tabIndex}
            onChange={this.handleChange}
            aria-label="scrollable force tabs"
            scrollButtons="on"
            classes={{indicator: classes.scrollMenuIndicator}}
          >
            {
              categories ?
                categories.map((res, index) => {

                  let url = mode === 'account' ? `/account${ res.url}`
                    :
                    mode === 'profile' ? `/profile${ res.url }?${ querystring.stringify({...extraParams})}`
                      :
                      mode === 'faq' ? res.url
                        :
                        mode === 'search' ? `/search?search=1&category=${ res._id }${gps ? `&gps=${ JSON.stringify(gps)}` : ''}`
                          :
                          ''
                  return(
                    <Tab key={index} label={res.label} className={classes.scrollMenuTab} {...a11yProps(index)} onClick={() => this.controllerUrl(url)}/>
                  )
                },
                ) : null
            }
          </Tabs>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(ScrollMenu)
