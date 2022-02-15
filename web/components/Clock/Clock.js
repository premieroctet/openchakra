import {Grid} from '@material-ui/core'
import React from 'react'
import lodash from 'lodash'
import {withStyles} from '@material-ui/core/styles'


const theme = ({
  on: {
    color: 'white',
    fontWeight: 'bolder',
  },
  off: {
    color: 'lightGray',
    fontWeight: 'lighter',
  },
  all: {
    fontSize: 'xx-large',
    backgroundColor: '#333',
    height: '95vh',
    textAlign: 'center',
  },
})

function Clock(props) {

  let {classes, hours, minutes} = props
  hours=2
  minutes=48
  const LETTERS='ILNESTUDEUXQUATRETROISNEUFUNESEPTHUITSIXCINQMIDIXMINUITONZERHEURESMOINSOLEDIXETRQUARTPMDVINGT-CINQUETSDEMIEPAM'.split('')

  const HOURS={
    0: lodash.range(49, 55), 1: lodash.range(26, 29), 2: lodash.range(7, 11),
    3: lodash.range(17, 22), 4: lodash.range(11, 17), 5: lodash.range(40, 44),
    6: lodash.range(37, 40), 7: lodash.range(29, 33), 8: lodash.range(33, 37),
    9: lodash.range(22, 22+4), 10: lodash.range(46, 49), 11: lodash.range(55, 59),
    12: lodash.range(44, 48),
  }

  const MINUTES={
    0: [], 1: lodash.range(94, 98), 2: lodash.range(74, 77),
    3: lodash.range(77, 79).concat(lodash.range(80, 85)), 4: lodash.range(88, 93), 5: lodash.range(88, 98),
    6: lodash.range(99, 101).concat(lodash.range(102, 107)),
    7: lodash.range(66, 71).concat(lodash.range(88, 98)),
    8: lodash.range(66, 71).concat(lodash.range(88, 93)),
    9: lodash.range(66, 71).concat(lodash.range(72, 74)).concat(lodash.range(80, 85)),
    10: lodash.range(66, 71).concat(lodash.range(74, 77)),
    11: lodash.range(66, 71).concat(lodash.range(94, 98)),
  }
  let on=[]
  // Il est
  if (minutes>=35) { hours+=1}
  on=on.concat(lodash.range(0, 2)).concat(lodash.range(3, 6))
  // Heures
  on=on.concat(HOURS[hours] || HOURS[hours%12])
  // Texte HEURE ou HEURES
  on=on.concat(hours%12==0 ? [] : lodash.range(60, hours%12==1 ? 65 : 66))
  // Minutes
  on=on.concat(MINUTES[Math.floor(minutes/5)])

  return (
    <>
      <Grid container xs={12} className={classes.all}>
        {lodash.chunk(LETTERS, 11).map((letters, row) => (
          <Grid container xs={12}>
            {letters.map((l, col) => {
              const idx=row*11+col
              return (
                <Grid item xs={1} className={on.includes(idx) ? classes.on : classes.off}>{l}</Grid>
              )
            },
            )}
          </Grid>
        ))
        }
      </Grid>
    </>
  )
}

module.exports=withStyles(theme)(Clock)
