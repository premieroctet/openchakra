import {withTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import React, {useEffect, useState} from 'react'
import Typography from '@material-ui/core/Typography'
import {Divider} from '@material-ui/core'
import Router from 'next/router'

import {makeStyles} from '@material-ui/core/styles'

const useStyle = makeStyles(theme => ({
  topicDivider: {
    height: 6,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 27,
    width: '3vw',
    [theme.breakpoints.down('xs')]: {
      width: '15vw',
    },
  },
}))

function Topic(props) {
  const classes = useStyle()
  const {titleTopic, titleSummary, needBackground, underline, children, tReady, t, ...rest} = props
  const [subTitleColor, setSubTitleColor]= useState('rgba(39,37,37,35%)')


  useEffect(() => {
    if(Router.pathname === '/confirmPayment') {
      setSubTitleColor('rgba(248, 207, 97, 1)')
    }
  })

  return(
    <Grid {...rest} style={{width: '100%'}}>
      <Grid>
        <h3>{titleTopic}</h3>
      </Grid>
      {
        titleSummary ?
          <Grid>
            <Typography style={{color: subTitleColor}}>{titleSummary}</Typography>
          </Grid> : null
      }
      {
        underline ?
          <Grid style={{marginTop: '2%'}}>
            <Divider className={`customtopicdivider ${classes.topicDivider}`}/>
          </Grid> : null
      }
      {children ?
        <Grid style={{marginTop: '3vh', backgroundColor: needBackground ? 'rgba(229,229,229,1)' : 'white', borderRadius: 27}}>
          { children }
        </Grid>
        :
        null
      }
    </Grid>
  )
}

export default withTranslation('custom')(Topic)
