import React, {useEffect, useState} from 'react'
import {Typography} from '@material-ui/core'
import {withTranslation} from 'react-i18next'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../static/css/components/InfoBar/InfoBar'
import '../../static/assets/css/custom.css'
import {INFOBAR} from '../../utils/i18n'


function RandomDisplay(props) {
  const {classes, arrayText, loop} = props
  const [indexCurrent, setindexCurrent] = useState(0)
  const [text, setText] = useState(INFOBAR.randomTextA)

  function randomExcluded(min, max, excluded) {
    let n
    while (true) {
      n = Math.floor(3*Math.random())
      if(n !== excluded) {
        break
      }
    }
    return n
  }

  function displayRandomly() {
    setTimeout(() => {
      let r_text = arrayText
      let random = randomExcluded(0, 3, indexCurrent)
      setindexCurrent(random)
      setText(r_text[random])
    }, 5000)
  }


  useEffect(() => {
    if(loop) {
      displayRandomly()
    }
  }, [indexCurrent])

  return(
    <Typography className={`${classes.infoBarColorText} customheaderinfobar`}>{text}</Typography>
  )
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(RandomDisplay))
