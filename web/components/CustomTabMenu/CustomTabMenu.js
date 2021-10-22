import React, {useEffect, useState} from 'react'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Grid from '@material-ui/core/Grid'
import '../../static/assets/css/custom.css'
import {withTranslation} from 'react-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {isB2BStyle} from '../../utils/context'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  navbarTabRoot: {
    opacity: 'inherit',
    color: theme.palette.white.main,
    fontWeight: ' bold',
    textTransform: 'initial',
    transition: '0.3s',
    '&:hover': {
      color: 'rgba(255, 255, 142, 1)',
    },
  },
  navabarHomepageMenu: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

function CustomTabMenu(props) {
  const {tabs} = props
  const classes = useStyles()
  const [breakpoints, setBreakpoints] = useState({
    xl: 6,
    lg: 6,
    md: 8,
    sm: 11,
  })
  
  return(
    <Grid
      xl={breakpoints.xl}
      lg={breakpoints.lg}
      md={breakpoints.md}
      sm={breakpoints.sm}
      className={classes.navabarHomepageMenu}
    >
      {tabs ?
        <Tabs value={false} aria-label="simple tabs example">
          {
            Object.keys(tabs).map((res, index) => (
              <a href={tabs[res].url}>
                <Tab
                  key={index}
                  classes={{root: `customnavbartab ${classes.navbarTabRoot}`}}
                  label={tabs[res].label}
                  onClick={tabs[res].callFunction}
                />
              </a>
            ))
          }
        </Tabs>
        : null
      }
      
    </Grid>
  )
}

export default withTranslation('custom', {withRef: true})(CustomTabMenu)
