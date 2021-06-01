import React, {Fragment} from "react";
import Grid from "@material-ui/core/Grid";
import LayoutFaq from "../../hoc/Layout/LayoutFaq";
import ResaService from '../../components/HomePage/ResaService/ResaService';
import {withStyles} from "@material-ui/core/styles";
import styles from '../../static/css/pages/footer/becomeAlfred/becomeAlfred';
import Typography from "@material-ui/core/Typography";
const {ACCOUNT_MIN_AGE}=require('../../utils/consts')

class BecomeAlfred extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <LayoutFaq>
        <Grid container style={{margin: 0, width: '100%'}}>
          <Grid container style={{ margin:'0 10%', padding: '5% 10%'}} spacing={3}>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12} style={{display: 'flex', flexDirection: 'row'}}>
              <Grid className={classes.hiddenXs}>
                <Typography style={{marginRight: '25px', color: '#F8CF61', fontSize: 34, fontWeight: 'bold'}}>1</Typography>
              </Grid>
              <Grid style={{display: 'flex', flexDirection: 'column'}}>
                <Grid>
                  <h3>Proposez vos services</h3>
                </Grid>
                <Grid>
                  <Typography style={{marginTop: '5px', textAlign: 'justify'}}>Vous n'avez aucun frais à payer pour proposer vos services.
                    Indiquez simplement vos prestations en vous appuyant sur une liste de plus de 2000
                    services proposées sur My-Alfred. Un service n'apparaît pas ? Soumettez-le à nos équipes
                    !</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12} style={{display: 'flex', flexDirection: 'row'}}>
              <Grid className={classes.hiddenXs}>
                <Typography style={{marginRight: '25px',color: '#84A5E0', fontSize: 34, fontWeight: 'bold'}}>2</Typography>
              </Grid>
              <Grid style={{display: 'flex', flexDirection: 'column'}}>
                <Grid>
                  <h3>Fixez vos conditions</h3>
                </Grid>
                <Grid>
                  <Typography style={{marginTop: '5px', textAlign: 'justify'}}>Indiquez vos disponibilités (jours, heures...) ainsi que vos
                    tarifs et tous les critères pour définir votre prestation. Si vous avez besoin d'aide,
                    nous sommes là pour vous accompagner dans la création de votre boutique de compétences
                    ! </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12} style={{display: 'flex', flexDirection: 'row'}}>
              <Grid className={classes.hiddenXs}>
                <Typography style={{marginRight: '25px',color: '#F36B7F', fontSize: 34, fontWeight: 'bold'}}>3</Typography>
              </Grid>
              <Grid style={{display: 'flex', flexDirection: 'column'}}>
                <Grid>
                  <h3>Choisissez votre Alfred et réservez !</h3>
                </Grid>
                <Grid>
                  <Typography style={{marginTop: '5px', textAlign: 'justify'}}>Choisissez le profil et la prestation qui vous intéresse puis
                    sélectionnez vos dates et
                    vos options.
                    Cliquez sur le bouton réservez et suivez la procédure de paiement</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        <Grid container className={classes.howItWorksComponent}>
          <Grid className={classes.generalWidthContainer}>
            <ResaService/>
          </Grid>
        </Grid>
        <Grid container style={{ margin:'0 10%', padding: '5% 10%'}} spacing={3}>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Grid>
              <h2 style={{textAlign: 'center'}}>Pourquoi devenir Alfred ?</h2>
            </Grid>
            <Grid>
              <Typography style={{textAlign: 'justify'}}>My-Alfred vous permet, de manière simple et sécurisée, de mettre vos services à disposition
                de tout un chacun. Un talent pour la décoration ? Une passion pour la cuisine ? Ou tout
                simplement du temps : proposez vos services et complétez vos revenus. Vous avez un contrôle
                total sur vos disponibilités, vos prix et le détail de vos prestations.</Typography>
            </Grid>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Grid>
              <h2 style={{textAlign: 'center'}}>Qui peut devenir Alfred ?</h2>
            </Grid>
            <Grid>
              <Typography style={{textAlign: 'justify'}}>
                {`Nous sommes tous des Alfred dès l'âge de ${ACCOUNT_MIN_AGE} ans. Chacun d'entre nous doit pouvoir partager
                ses savoir faire, ses compétences, ses passions... Tantôt consommateur d'Alfred, tantôt
                Alfred, rejoignez la communauté Alfred en quelques clics !`}`</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container style={{ margin:'0 10%', padding: '0 10%'}} spacing={3}>
          <Grid style={{width: '100%'}}>
            <h1 style={{textAlign: 'center'}}>Créez votre boutique à votre façon</h1>
          </Grid>
          <Grid container spacing={3} style={{marginTop: '5vh'}}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Grid>
                <h2 style={{textAlign: 'center'}}>Vous proposez vos services</h2>
              </Grid>
              <Grid>
                <Typography style={{textAlign: 'justify'}}>A travers la création de votre boutique, vous proposez vos services en décrivant
                  l'ensemble de vos prestations. Vous pouvez à tout moment revenir sur votre boutique,
                  ajouter ou supprimer des services. Les différentes étapes de création de votre boutique
                  sont extrêmement simples. À vous de jouer !</Typography>
              </Grid>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Grid>
                <h2 style={{textAlign: 'center'}}>Vous affichez vos disponibilités</h2>
              </Grid>
              <Grid>
                <Typography style={{textAlign: 'justify'}}>Vous indiquez vos disponibilités (jours, heures...) ainsi que vos tarifs et tous les
                  critères pour définir votre prestations. Vous pouvez synchroniser votre calendrier
                  My-Alfred avec vos autres calendriers et éviter de manquer un rendez-vous. Tous vos
                  calendriers sont mis à jour automatiquement</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Grid>
                <h2 style={{textAlign: 'center'}}>Vous fixez vos prix</h2>
              </Grid>
              <Grid>
                <Typography style={{textAlign: 'justify'}}>C'est à vous de fixer les prix de vos services : nos outils de tarifications sont là pour
                  vous aider à proposer le meilleur prix. Vous pouvez facilement ajouter des éléments
                  personnalisés, notamment des tarifs de week-end, de nuit, des packages de
                  services...</Typography>
              </Grid>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Grid>
                <h2 style={{textAlign: 'center'}}>Vous déterminez vos règles</h2>
              </Grid>
              <Grid>
                <Typography style={{textAlign: 'justify'}}>Pour que les utilisateurs de My-Alfred puissent facilement comprendre vos services, vous
                  définissez vos règles avant qu'ils puissent réserver. S'ils enfreignent les règles après
                  avoir réservé, vous pourrez annuler leur réservation sans aucune pénalité.</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </Grid>
      </LayoutFaq>
    );
  }

}

export default withStyles(styles)(BecomeAlfred)
