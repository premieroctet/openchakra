import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './SettingServiceStyle'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch';

class SettingService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      checked: false
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
                <h2>Paramètres votre service</h2>
              </Grid>
              <Grid >
                <h3>Quel(s) produit(s) / matériel(s) fournissez-vous dans le cadre de ce service ? </h3>
              </Grid>
              <Grid className={classes.contentTextSize}>
                <Grid item xs={3} sm={3} md={2}>
                  <label style={{cursor: 'pointer'}}>
                    <img src={'../../static/equipments/Appareil_photo_Selected.svg'} height={100} width={100} alt={"test"} title={"title"}/>
                    {/*{e.checked === true ? <img src={`../../static/equipments/${e.logo.slice(0, -4)}_Selected.svg`} height={100} width={100} alt={`${e.name_logo.slice(0, -4)}_Selected.svg`} /> : <img src={`../../static/equipments/${e.logo}`} height={100} width={100} alt={e.name_logo} />}*/}
                    <Checkbox
                      style={{display: 'none'}}
                      color="primary"
                      type="checkbox"
                      checked={this.state.checked}
                      onChange={() => {
                        this.state.checked = !this.state.checked;
                      }}
                    />
                  </label>
                </Grid>
              </Grid>
              <Grid>
                <Grid>
                  <Typography>
                    Où acceptez-vous de réaliser votre prestation ?
                  </Typography>
                </Grid>
                <Grid>
                  <Grid>
                    <Button variant="outlined" className={classes.button}>
                      A l’adresse de mon client
                    </Button>
                  </Grid>
                  <Grid>
                    <Button variant="outlined" className={classes.button}>
                      A mon adresse
                    </Button>
                  </Grid>
                  <Grid>
                    <Button variant="outlined" className={classes.button}>
                      En visioconférence
                    </Button>
                  </Grid>
                  <Grid>
                    <Button variant="outlined" className={classes.button}>
                      En extérieur
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Grid>
                  <Typography>
                    Options
                  </Typography>
                </Grid>
                <Grid>
                  <ButtonSwitch label={"Appliquer un forfait déplacement de"} isOption={false}/>
                </Grid>
                <Grid>
                  <ButtonSwitch label={"Proposer un forfait retrait & livraison de"} isOption={false}/>
                </Grid>
                <Grid>
                  <ButtonSwitch label={"Proposer un forfait cheveux longs de"} isOption={false}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.contentRight}/>
        </Grid>
      </Grid>
    );
  }
}

SettingService.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (SettingService);
