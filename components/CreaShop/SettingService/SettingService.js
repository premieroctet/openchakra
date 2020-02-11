import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './SettingServiceStyle'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class SettingService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      checked: false,
      clientAdress:false,
      myAddress: false,
      visioConference: false,
      outside: false
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
                <Typography className={classes.policySizeTitle}>Paramètres votre service</Typography>
              </Grid>
              <Grid >
                <h3 className={classes.policySizeSubtitle}>Quel(s) produit(s) / matériel(s) fournissez-vous dans le cadre de ce service ? </h3>
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
                  <h3 className={classes.policySizeSubtitle}>Où acceptez-vous de réaliser votre prestation ?</h3>
                </Grid>
                <Grid style={{marginLeft : 15}}>
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
                      label="A l’adresse de mon client"
                    />
                  </Grid>
                  <Grid>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.myAddress}
                          onChange={()=>{
                            this.setState({myAddress : !this.state.myAddress})
                          }
                          }
                          value={this.state.myAddress}
                          color="primary"
                        />
                      }
                      label="A mon adresse"
                    />
                  </Grid>
                  <Grid>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.visioConference}
                          onChange={()=>{
                            this.setState({visioConference : !this.state.visioConference})
                          }
                          }
                          value={this.state.visioConference}
                          color="primary"
                        />
                      }
                      label="En visio conférence"
                    />
                  </Grid>
                  <Grid>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.outside}
                          onChange={()=>{
                            this.setState({outside : !this.state.outside})
                          }
                          }
                          value={this.state.outside}
                          color="primary"
                        />
                      }
                      label="En extérieur"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Grid>
                  <h3 className={classes.policySizeSubtitle}>Options</h3>
                </Grid>
                <Grid>
                  <ButtonSwitch label={"Appliquer un forfait déplacement de"} isOption={false} isPrice={true}/>
                </Grid>
                <Grid>
                  <ButtonSwitch label={"Proposer un forfait retrait & livraison de"} isOption={false} isPrice={true}/>
                </Grid>
                <Grid>
                  <ButtonSwitch label={"Proposer un forfait cheveux longs de"} isOption={false} isPrice={true}/>
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
