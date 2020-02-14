import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './SettingServiceStyle'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch';

class SettingService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      clientAdress:false,
      myAddress: false,
      visioConference: false,
      outside: false,
    };
    this.stateButton = this.stateButton.bind(this);
  }

  stateButton(e){
    let name = e.target.name;
    console.log(name);
    this.setState({[e.target.name]: !this.state[name]});
  }

  render() {
    const {classes} = this.props;
    return (
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid className={classes.contentLeft}>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <Typography className={classes.policySizeTitle}>Paramétrez votre service</Typography>
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
                  <Grid style={{marginBottom: 10}}>
                    <input type={"button"} value={"A l’adresse de mon client"} name={"clientAdress"} onClick={this.stateButton} className={ this.state.clientAdress ? classes.activeButton : classes.button}/>
                  </Grid>
                  <Grid style={{marginBottom: 10}}>
                    <input type={"button"} value={"A mon adresse"} name={"myAddress"} onClick={this.stateButton} className={ this.state.myAddress ? classes.activeButton : classes.button}/>
                  </Grid>
                  <Grid style={{marginBottom: 10}}>
                    <input type={"button"} value={"En visioconférence"} name={"visioConference"} onClick={this.stateButton} className={ this.state.visioConference ? classes.activeButton : classes.button}/>
                  </Grid>
                  <Grid>
                    <input type={"button"} value={"En extérieur "} name={"outside"} onClick={this.stateButton} className={ this.state.outside ? classes.activeButton : classes.button}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className={classes.options}>
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
