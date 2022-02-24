const {Grid, MenuItem, Select, Switch, Accordion, AccordionSummary, AccordionDetails} = require('@material-ui/core')

import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {withStyles} from '@material-ui/core/styles'


const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
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
    backgroundColor: '#f8cf61',
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


const groundImages = {
  STANDARD: './static/assets/feurst/IMG_9ED5370B226C-1-08.png',
  DUR: './static/assets/feurst/IMG_9ED5370B226C-1-09.png',
  'TRES DUR': './static/assets/feurst/IMG_9ED5370B226C-1-10.png',
  ABRASIF: './static/assets/feurst/IMG_9ED5370B226C-1-10.png',
  'TRES ABRASIF': './static/assets/feurst/IMG_9ED5370B226C-1-11.png',
}

function UseCase(props) {

  const groundsHardness = new Set(props.grounds.map(({groundHardness}) => groundHardness))

  return (
    <Grid >
      
      <h2>Sélectionnez votre usage</h2>
      <div>
        {
          [...groundsHardness].map(hardness => (
            <Accordion key={hardness}>
              <AccordionSummary expandIcon='▲'
                aria-controls={`panel${hardness}-content`}
                id={`panel${hardness}-header`}>
                <span sx={{width: '33%', flexShrink: 0}}>
                  <img src={groundImages[hardness]} alt="" width={80} height={80} />
                </span>
                <span sx={{color: 'gray'}}>{hardness}</span>
              </AccordionSummary>
              <AccordionDetails className='flex flex-col'>
                {props.grounds.map(({groundType, groundHardness: groundHard}) => {
                  return groundHard === hardness ? (
                    <div className='flex items-center'>
                      <IOSSwitch name="ground" value={groundType} checked={props.ground === groundType } onChange={ev => { props.onGroundChange(ev.target.value) }} /> {groundType}
                    </div>
                  ) : null
                  
                })}
              </AccordionDetails>
            </Accordion>
          ))
        }
        
      </div>
      

    </Grid>

  )
}

const validator = state => {
  return !!state.ground
}

module.exports={UseCase, useCaseValidator: validator}
