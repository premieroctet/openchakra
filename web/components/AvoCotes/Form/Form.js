import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../../static/css/components/FormAvocotes/FormAvocotes'
import Grid from '@material-ui/core/Grid'
import {AVOCOTES} from '../../../utils/i18n'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

function Form({classes}) {
  return(
    <>
      <Grid container className={classes.mainContainer} spacing={3}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h2 className={classes.title}>{AVOCOTES.titleCordonnates}</h2>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <TextField id="standard-basic" label="Standard" />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
          <TextField id="standard-basic" label="Standard" />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
          <TextField id="standard-basic" label="Standard" />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <TextField id="standard-basic" label="Standard" />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <TextField id="standard-basic" label="Standard" />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h2 className={classes.title}>{AVOCOTES.titleDetails}</h2>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Grid style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Grid container spacing={3} style={{width: '100%', margin: 0}}>
              <Grid item>
                <Typography>Le nom</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={3} style={{width: '100%', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
              <Grid item>
                <IconButton aria-label="RemoveIcon">
                  <RemoveIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography>0</Typography>
              </Grid>
              <Grid item>
                <IconButton aria-label="AddIcon">
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Divider/>
        </Grid>
        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={3} className={classes.containerPrice}>
          <Grid item>
            <Typography>Coût total de mon installation : </Typography>
          </Grid>
          <Grid item>
            <Typography>109€</Typography>
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Button variant="contained" classes={{root: classes.buttonPaid}}>
            Payer
          </Button>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Typography>* les télecommandes ne nécessitent pas d'installation</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(Form)
