import {makeStyles} from '@material-ui/core/styles'
import React from 'react'
import {withTranslation} from 'react-i18next'
import {Card, CardContent} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'inherit',
  },
  mediaContainer: {
    height: '56.25%',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '2%',
    paddingBottom: '1%',
  },
  media: {
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
  console.log(data, 'data')
  const classes = useStyles()

  return(
    <Card className={classes.root}>
      <Grid className={classes.mediaContainer}>
        <Grid className={classes.media} style={{backgroundImage: `url(${data.url})`}}/>
      </Grid>
      <CardContent>
        <Grid container spacing={2} style={{width: '100%', margin: 0}}>
          <Grid item xs={12} className={classes.name}>
            <Typography>{data.name}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.title}>
            <Typography><strong>{data.job}</strong></Typography>
          </Grid>
          <Grid item xs={12} className={classes.description}>
            <Typography variant="body2" color="textSecondary" component="p">
              {data.description}
            </Typography>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  )
}

export default withTranslation('custom', {withRef: true})(CardTeam)
