const {withTranslation} = require('react-i18next')
const {Switch, Accordion, AccordionSummary, AccordionDetails} = require('@material-ui/core')

import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {withStyles} from '@material-ui/core/styles'
import {feurstImgPath} from '../../pages/configurator'

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 54,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    color: '#f50057',
    '&.Mui-disabled': {
      color: '#e886a9',
    },
    '&.Mui-checked': {
      color: '#95cc97',
    },
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundColor: 'white',
    },
    '&.Mui-checked .MuiSwitch-thumb': {
      backgroundColor: '#f8cf61',
    },
    padding: 1,
    '&$checked': {
      transform: 'translateX(28px)',
      color: theme.palette.common.white,
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
    backgroundColor: '#646464',
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({classes, ...props}) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  )
})


function UseCase(props) {

  const groundImages = {
    STANDARD: `${feurstImgPath}/terrain_standard.png`,
    DUR: `${feurstImgPath}/terrain_dur.png`,
    'TRES DUR': `${feurstImgPath}/terrain_tres_dur.png`,
    ABRASIF: `${feurstImgPath}/terrain_abrasif.png`,
    'TRES ABRASIF': `${feurstImgPath}/terrain_tres_abrasif.png`,
  }

  return (
    <>
      <h2>{props.t('USE_CASE.use_case_label')}</h2>
      <div className='flex flex-col justify-center gap-x-4 md-flex-row md-flex-wrap'>
        {
          Object.entries(props.grounds).map(entry => {
            const [hardness, groundTypes]=entry
            return (
              <Accordion key={hardness}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                  aria-controls={`panel${hardness}-content`}
                  id={`panel${hardness}-header`}>
                  <span>
                    <img src={groundImages[hardness]} alt="" width={80} height={80} />
                  </span>
                  <span>{hardness}</span>
                </AccordionSummary>
                <AccordionDetails className='flex flex-col'>
                  {groundTypes.map(groundType => (
                    <div key={groundType} className='flex items-center'>
                      <label htmlFor={groundType.replace(/\s/g, '')}>
                        <IOSSwitch name="ground" id={groundType.replace(/\s/g, '')} value={groundType} checked={props.ground === groundType } onChange={ev => { props.onGroundChange(ev.target.value) }} />
                        <span className='materialName'>{groundType}</span>
                      </label>
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            )
          })
        }
      </div>
    </>

  )
}

const validator = state => {
  return !!state.ground
}

const TransUseCase=withTranslation('feurst', {withRef: true})(UseCase)
module.exports={UseCase: TransUseCase, useCaseValidator: validator}
