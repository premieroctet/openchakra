import React from 'react'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

import {withTranslation} from 'react-i18next'
import {makeStyles} from '@material-ui/core/styles'

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
            Object.keys(tabs).map((res, index) => {
              const data=tabs[res]
              return (
                <a href={data.url} style={{textTransform: 'initial'}}>
                  <Tab
                    key={index}
                    classes={{root: `${data.classname} customnavbartab ${classes.navbarTabRoot}`}}
                    label={data.label}
                    onClick={data.callFunction}
                  />
                </a>
              )
            })
          }
        </Tabs>
        : null
      }
    </>
  )
}

export default withTranslation('custom', {withRef: true})(CustomTabMenu)
