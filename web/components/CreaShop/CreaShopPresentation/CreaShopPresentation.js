import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import styles from '../componentStyle';
import {Typography} from '@material-ui/core';
import '../../../static/assets/police/signatra.css';

class CreaShopPresentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {classes} = this.props;

    return (
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <Typography className={classes.policySizeTitle}>Nous allons vous aider à créer votre service & devenir
                  un Alfred en 3 minutes ! </Typography>
              </Grid>
              <Grid className={classes.contentTextSize}>
                <Grid>
                  <Grid>
                    <h3>Etape 1 </h3>
                    <hr className={classes.hrStyle}/>
                  </Grid>
                  <Grid>
                    <Grid>
                      <h3 className={classes.policySizeSubtitle}>Choisissez votre premier super talent ! </h3>
                    </Grid>
                    <Grid>
                      <Typography className={classes.policySizeContent}>Sélectionnez le premier service que vous souhaitez
                        proposer ! Et comme un talent en appelle un autre, vous pourrez ajouter autant de services que
                        vous voulez</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid>
                    <h3>Etape 2 </h3>
                    <hr className={classes.hrStyle}/>
                  </Grid>
                  <Grid>
                    <Grid>
                      <h3 className={classes.policySizeSubtitle}>Vous êtes chez vous ! Fixez vos règles et vos
                        conditions…</h3>
                    </Grid>
                    <Grid>
                      <Typography className={classes.policySizeContent}>Indiquez vos disponibilités, paramètres de réservation et
                        vos conditions d’annulation</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid style={{height: 250}}>
                  <Grid>
                    <h3>Etape 3</h3>
                    <hr className={classes.hrStyle}/>
                  </Grid>
                  <Grid>
                    <Grid>
                      <h3 className={classes.policySizeSubtitle}>Présentez-vous !</h3>
                    </Grid>
                    <Grid>
                      <Typography className={classes.policySizeContent}>Renseignez votre profil Alfred, partagez vos
                        réalisations, et décrivez-vous ! </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CreaShopPresentation);
