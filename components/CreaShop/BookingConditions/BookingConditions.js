import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './BookingConditionsStyle'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class BookingConditions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      checked: false,
      dates: [],
      isDiplome: false,
      isCertification: false
    }
  }

  render() {
    const {classes} = this.props;

    return (
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid className={classes.contentLeft}>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <Typography className={classes.policySizeTitle}>Vos conditions de réservation</Typography>
              </Grid>
              <Grid>
                <Grid>
                  <Grid>
                    <h3 className={classes.policySizeSubtitle}>Comment les utilisateurs peuvent réserver vos services ? </h3>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid>
                    <ButtonSwitch style={{width : '100%'}} isOption={false} isPrice={false} label={"Tous les utilisateurs doivent envoyer une demande de réservation que vous devez valider dans les 24H."}/>
                  </Grid>
                  <Grid>
                    <ButtonSwitch  isOption={false} isPrice={false} label={"Les utilisateurs peuvent réserver mes services directement sans demande de réservation."}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Grid>
                  <h3 className={classes.policySizeSubtitle}>Pour réserver mes services, les utilisateurs doivent : </h3>
                </Grid>
                <Grid>
                  <Grid>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.clientAddress}
                          onChange={()=>{
                            this.setState({clientAddress : !this.state.clientAddress})
                          }
                          }
                          value={this.state.clientAddress}
                          color="primary"
                        />
                      }
                      label="Respecter les conditions My-Alfred (profil vérifié)"
                    />
                  </Grid>
                  <Grid>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.clientAddress}
                          onChange={()=>{
                            this.setState({clientAddress : !this.state.clientAddress})
                          }
                          }
                          value={this.state.clientAddress}
                          color="primary"
                        />
                      }
                      label="Avoir une photo de profil"
                    />
                  </Grid>
                  <Grid>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.clientAddress}
                          onChange={()=>{
                            this.setState({clientAddress : !this.state.clientAddress})
                          }
                          }
                          value={this.state.clientAddress}
                          color="primary"
                        />
                      }
                      label="Avoir déposer une pièce d’identité officielle"
                    />
                  </Grid>
                  <Grid>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.clientAddress}
                          onChange={()=>{
                            this.setState({clientAddress : !this.state.clientAddress})
                          }
                          }
                          value={this.state.clientAddress}
                          color="primary"
                        />
                      }
                      label="Etre recommandé par d’autres Alfred"
                    />
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

BookingConditions.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (BookingConditions);
