import {makeStyles} from '@material-ui/core/styles'
import React from 'react'
import {withTranslation} from 'react-i18next'
import {Card, CardContent, CardMedia} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
    //boxShadow: 'inherite',
  },
  mediaContainer: {
    height: '56.25%',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '2%',
    paddingBottom: '1%',
  },
  media: {
    backgroundImage: 'url(/static/basicavatar.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'block',
    borderRadius: '50%',
    width: 180,
    height: 180,
  },
  title: {
    textAlign: 'center',
    color: theme.palette.secondary.main,
  },
  description: {
    textAlign: 'center',
  },
  name: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
}))

function CardTeam(props) {
  const {data} = props
  const classes = useStyles()
  console.log(data, 'data')

  return(
    <Card className={classes.root}>
      <Grid className={classes.mediaContainer}>
        <Grid className={classes.media}/>
      </Grid>
      <CardContent>
        <Grid container spacing={2} style={{width: '100%', margin: 0}}>
          <Grid item xs={12} className={classes.name}>
            <Typography>Edwin</Typography>
          </Grid>
          <Grid item xs={12} className={classes.title}>
            <Typography><strong>Profession</strong></Typography>
          </Grid>
          <Grid item xs={12} className={classes.description}>
            <Typography variant="body2" color="textSecondary" component="p">
              This impressive paella is a perfect party dish and a fun meal to cook together with your
              guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  )
}

export default withTranslation('custom', {withRef: true})(CardTeam)
