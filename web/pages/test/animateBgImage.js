import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({

  myImg: {
    backgroundImage: 'url(/static/svganimated.svg)',
    height: 500,
    width: 500,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
}))

function animateBgImage() {

  const classes = useStyles()
  
  return(
    <div className={classes.myImg}/>
  )
}

export default animateBgImage
