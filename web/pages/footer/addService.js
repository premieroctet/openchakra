import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import LayoutFaq from '../../hoc/Layout/LayoutFaq'
import NeedMoreFaq from '../../hoc/Layout/Faq/NeedMoreFaq'
import styles from '../../static/css/pages/footer/addService/addService'
import Typography from '@material-ui/core/Typography'
import '../../static/assets/css/custom.css'

class AddService extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {classes} = this.props
    return (
      <LayoutFaq>
        <Grid className={classes.mainContainerAddService}>
          <Grid style={{display: 'flex'}}>
            <Grid className={classes.hideOnMobile}>
              <h1 style={{marginRight: '25px', color: '#F8CF61'}} className={'customaddserviceone'}>1</h1>
            </Grid>
            <Grid style={{display: 'flex', flexDirection: 'column'}}>
              <Grid>
                <h3 className={`customaddserviceonetitle ${classes.titleRub}`}>Inscrivez-vous & détaillez vos informations</h3>
              </Grid>
              <Grid>
                <Typography style={{marginTop: '5px'}} className={'customaddserviceonetext'}>Commencez par vous inscrire en précisant votre adresse et
                  votre numéro de téléphone</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{display: 'flex'}}>
            <Grid className={classes.hideOnMobile}>
              <h1 style={{marginRight: '25px', color: '#84A5E0'}} className={'customaddservicetwo'}>2</h1>
            </Grid>
            <Grid style={{display: 'flex', flexDirection: 'column'}}>
              <Grid>
                <h3 className={`customaddservicetwotitle ${classes.titleRub}`}>Commencez votre recherche</h3>
              </Grid>
              <Grid>
                <Typography style={{marginTop: '5px'}} className={'customaddservicetwotext'}>Indiquez le type de service que vous recherchez dans de
                  recherche
                  et parcourez les différentes catégorie de service</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{display: 'flex'}}>
            <Grid className={classes.hideOnMobile}>
              <h1 style={{marginRight: '25px', color: '#F36B7F'}} className={'customaddservicethree'}>3</h1>
            </Grid>
            <Grid style={{display: 'flex', flexDirection: 'column'}}>
              <Grid>
                <h3 className={`customaddservicethreetitle ${classes.titleRub}`}>Choisissez votre Alfred et réservez !</h3>
              </Grid>
              <Grid>
                <Typography style={{marginTop: '5px'}} className={'customaddservicethreetext'}>Choisissez le profil et la prestation qui vous intéresse puis
                  sélectionnez vos dates et
                  vos options.
                  Cliquez sur le bouton réservez et suivez la procédure de paiement</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{marginTop: '10vh'}}>
            <NeedMoreFaq/>
          </Grid>
        </Grid>
      </LayoutFaq>
    )
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(AddService))
