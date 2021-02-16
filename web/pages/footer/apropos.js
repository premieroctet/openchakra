import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from "@material-ui/core/styles";
import styles from '../../static/css/pages/footer/apropos/apropos';
import LayoutFaq from "../../hoc/Layout/LayoutFaq";
import Typography from "@material-ui/core/Typography";

class Apropos extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <LayoutFaq>
        <Grid container spacing={4} style={{margin: 0, width: '100%'}}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.containerApropos}>
            <Grid className={classes.containerWidth}>
              <Grid>
                <h2 style={{textAlign: 'center'}}>Fondé en 2019</h2>
              </Grid>
              <Grid>
                <Typography style={{textAlign: 'justify'}}>My Alfred est né de l’envie de nous simplifier la vie. Nous voulions répondre à une
                  question simple : Comment gagner du temps ? Aujourd’hui, nous sommes heureux de répondre
                  à une multitude de problématiques. En créant une plateforme d’économie collaborative,
                  nous voulons simplifiez votre quotidien mais nous espérons aussi rapprocher les
                  générations, développer l’entrepreunariat, contribuer au développement des compétences
                  de chacun et créer une communauté où il fait bon vivre.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.containerApropos}>
            <Grid className={classes.containerWidth}>
              <Grid>
                <h2 style={{textAlign: 'center'}}>Nous sommes My Alfred</h2>
              </Grid>
              <Grid>
                <Typography style={{textAlign: 'justify'}}>Nous sommes persuadés que l’économie collaborative favorise le développement de nouvelles
                  formes d’emploi pour des entrepreneurs qui ont soif de liberté, de créativité et
                  d’activité multiples.
                  Nous mettons en relation des particuliers, des entrepreneurs pour que chacun puisse
                  proposer ou disposer de tous les services. Nous apportons de la visibilité, de l’équité,
                  de la transparence, un espace communautaire où chacun participe au développement d’une
                  économie responsable.
                  Nous avons à cœur de faire prendre conscience à chacun d’entre nous que seul on sait
                  faire peu de choses, ensemble on peut tout faire.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.containerApropos}>
            <Grid className={classes.containerWidth}>
              <Grid>
                <h2 style={{textAlign: 'center'}}>My Alfred, qu'est-ce que c'est ?</h2>
              </Grid>
              <Grid>
                <Typography style={{textAlign: 'justify'}}>My Alfred crée des liens entre les personnes en leur donnant la possibilité de réserver
                  des services partout en France. Les Alfred constituent le moteur de la communauté et
                  fournissent à notre communauté des services de qualités, comme s’ils le faisaient pour
                  eux même. Plus de 20 000 prestations sont recensées sur My Alfred, portées par plusieurs
                  milliers d’Alfred compétents, talentueux et bienveillants.
                </Typography>

              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.containerApropos}>
            <Grid className={classes.containerWidth}>
              <Grid>
                <h2 style={{textAlign: 'center'}}>Qu'est-ce que les services d’Alfred ? </h2>
              </Grid>
              <Grid>
                <Typography style={{textAlign: 'justify'}}>Si vous disposez d’un talent, d’une passion ou tout simplement de temps, vous pouvez
                  gagner de l'argent en les mettant à la disposition de notre communauté. En quelques
                  minutes, vous proposez vos services, fixez vos conditions et créez votre profil
                  d’Alfred, vous permettant de bénéficier d’une grande visibilité, une interface
                  personnalisée propre à vos services, à votre personnalité.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.containerApropos}>
            <Grid className={classes.containerWidth}>
              <Grid>
                <h2 style={{textAlign: 'center'}}>Notre mission</h2>
              </Grid>
              <Grid>
                <Typography style={{textAlign: 'justify'}}>Notre mission est de créer un lieu de rencontres et d’opportunités, où trouver la bonne
                  personne n’est plus un problème.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.containerApropos}>
            <Grid className={classes.containerWidth}>
              <Grid>
                <h2 style={{textAlign: 'center'}}>Notre vision</h2>
              </Grid>
              <Grid>
                <Typography style={{textAlign: 'justify'}}>Nous aimerions que My Alfred puisse vous accompagner au quotidien. Notre communauté est
                  au coeur de ce que nous faisons et nous souhaitons créez un espace où règne la confiance
                  et la simplicité.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
      </Grid>
      </LayoutFaq>
    )
  }
}

export default withStyles(styles)(Apropos)
