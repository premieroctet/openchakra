import React from 'react'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import '../../static/assets/css/custom.css'
import {withTranslation} from 'react-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {isB2BStyle} from '../../utils/context'

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
}))

function CustomTabMenu(props) {
  const {tabs} = props
  const classes = useStyles()

  return(
    <>
      {tabs ?
        <Tabs value={false} aria-label="simple tabs example">
          {
            Object.keys(tabs).map((res, index) => (
              <a href={tabs[res].url} style={{textTransform: 'initial'}}>
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
    </>
  )
}

export default withTranslation('custom', {withRef: true})(CustomTabMenu)
