import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './CreaShopPresentationStyle';
import Button from '@material-ui/core/Button';


class CreaShopPresentation extends React.Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  render() {
    const {classes} = this.props;

    return(
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid className={classes.contentLeft}>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <h2>Nous allons vous aider à créer votre service & devenir un Alfred en 3 minutes !  </h2>
              </Grid>
              <Grid style={{width: 500}}>
                <Grid>
                  <Grid>
                    <h2 style={{fontFamily: 'Signatra'}}>Etape 1 </h2>
                    <hr/>
                  </Grid>
                  <Grid>
                    <Grid>
                      <h3>Choisissez votre premier super talent ! </h3>
                    </Grid>
                    <Grid>
                      <p>Sélectionnez le premier service que vous souhaitez proposer ! Et comme un talent en appel un autre, vous pourrez en ajouter autant de services que vous voulez</p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid>
                    <h2>Etape 2 </h2>
                    <hr/>
                  </Grid>
                  <Grid>
                    <Grid>
                      <h3>Vous êtes chez vous ! Fixez vos règles et vos conditions…</h3>
                    </Grid>
                    <Grid>
                      <p>Indiquez vos disponibilités ,paramètres de
                        réservation et vos conditions d’annulation</p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid>
                    <h2>Etape 3</h2>
                    <hr/>
                  </Grid>
                  <Grid>
                    <Grid>
                      <h3>Présentez-vous ! </h3>
                    </Grid>
                    <Grid>
                      <p>Renseignez votre profil Alfred, partager vos réalisations, et décrivez vous ! </p>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <hr/>
            <Grid className={classes.contentLeftFooter}>
              <Grid style={{display: "flex",justifyContent: "space-between"}}>
                <Grid>
                  <Button color="primary">Retour</Button>
                </Grid>
                <Grid>
                  <Button variant="contained" color="secondary">Suivant</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.contentRight}>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

CreaShopPresentation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (CreaShopPresentation);
