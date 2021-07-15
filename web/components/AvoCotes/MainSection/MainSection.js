import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../../static/css/components/MainSectionAvocotes/MainSectionAvocotes'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import {AVOCOTES} from '../../../utils/i18n'
import Typography from '@material-ui/core/Typography'
import Form from '../Form/Form'


function MainSection({classes}) {
  return(
    <>
      <Grid container spacing={3} className={classes.mainContainer}>
        <Grid container spacing={3} item xl={5} lg={5} md={12} sm={12} xs={12} className={classes.containerText}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <h2 className={classes.titleSection}>{AVOCOTES.titleSection}</h2>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Typography>{AVOCOTES.description}</Typography>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Typography className={classes.secondText}>{AVOCOTES.descriptionSecond}</Typography>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <h2 className={classes.titleSection}>{AVOCOTES.titleEquipment}</h2>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Typography>Les équipments</Typography>
          </Grid>
        </Grid>
        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} className={classes.dividerContainer}>
          <Divider orientation={'vertical'}/>
        </Grid>
        <Grid container item xl={5} lg={5} md={12} sm={12} xs={12} className={classes.mainContainerForm}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.containerForm}>
            <Form/>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(MainSection)
