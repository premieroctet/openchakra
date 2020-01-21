import Grid from '@material-ui/core/Grid';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './AlfredConditionsStyle'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Checkbox from '@material-ui/core/Checkbox';

class About extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      flexible_cancel:true
    }
  }
  render(){
    const {classes} = this.props;

    return (
      <Grid container>
        <Grid className={classes.mainContainer}>
          <hr className={classes.hrStyle}/>
          <Grid className={classes.containerBooking}>
            <Grid>
              <h3>Les conditions de réservation de Maelis</h3>
            </Grid>
            <Grid>
              <Button color="secondary" className={classes.button}>
                Modifier
              </Button>
            </Grid>
          </Grid>
          <Grid className={classes.containerAlfred}>
            <Grid className={classes.alignCheckbox}>
              <Grid>
                <Checkbox
                  checked={this.state.flexible_cancel}
                  onChange={this.handleChangeF}
                  value={'flexible_cancel'}
                  color="primary"
                  inputProps={{
                    'aria-label': 'secondary checkbox',
                  }}
                  icon={<CircleUnchecked/>}
                  checkedIcon={<RadioButtonCheckedIcon />}
                />
              </Grid>
              <Grid>
                <p>Conditions My-Alfred (adresse email & numéro de téléphone confirmés).</p>
              </Grid>
            </Grid>
            <Grid className={classes.alignCheckbox}>
              <Grid>
                <Checkbox
                  checked={this.state.flexible_cancel}
                  onChange={this.handleChangeF}
                  value={'flexible_cancel'}
                  color="primary"
                  inputProps={{
                    'aria-label': 'secondary checkbox',
                  }}
                  icon={<CircleUnchecked/>}
                  checkedIcon={<RadioButtonCheckedIcon />}
                />
              </Grid>
              <Grid>
                <p>Photo de profil.</p>
              </Grid>
            </Grid>
            <Grid className={classes.alignCheckbox}>
              <Grid>
                <Checkbox
                  checked={this.state.flexible_cancel}
                  onChange={this.handleChangeF}
                  value={'flexible_cancel'}
                  color="primary"
                  inputProps={{
                    'aria-label': 'secondary checkbox',
                  }}
                  icon={<CircleUnchecked/>}
                  checkedIcon={<RadioButtonCheckedIcon />}
                />
              </Grid>
              <Grid>
                <p>Pièce d'identité officielle.</p>
              </Grid>
            </Grid>
        </Grid>
          <hr className={classes.hrStyle}/>
          <Grid className={classes.containerPosition}>
            <Grid className={classes.contentPosition}>
              <Grid className={classes.containerBooking}>
                <Grid>
                  <h3>Comment réserver Maelis</h3>
                </Grid>
                <Grid>
                  <Button color="secondary" className={classes.button}>
                    Modifier
                  </Button>
                </Grid>
              </Grid>
              <Grid className={classes.alignCheckbox}>
                <Grid>
                  <Checkbox
                    checked={this.state.flexible_cancel}
                    onChange={this.handleChangeF}
                    value={'flexible_cancel'}
                    color="primary"
                    inputProps={{
                      'aria-label': 'secondary checkbox',
                    }}
                    icon={<CircleUnchecked/>}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                </Grid>
                <Grid>
                  <p>Maelïs dispose de 24h pour répondre aux demandes de réservation</p>
                </Grid>
              </Grid>
              <Grid className={classes.alignCheckbox}>
                <Grid>
                  <Checkbox
                    checked={this.state.flexible_cancel}
                    onChange={this.handleChangeF}
                    value={'flexible_cancel'}
                    color="primary"
                    inputProps={{
                      'aria-label': 'secondary checkbox',
                    }}
                    icon={<CircleUnchecked/>}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                </Grid>
                <Grid>
                  <p>Les utilisateurs peuvent réserver les services de Maêlis sans demande de réservation.</p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <hr className={classes.hrStyle}/>
        <Grid>
          <h3>Message de bienvenue</h3>
        </Grid>
        <Grid className={classes.containerPosition}>
          <Grid className={classes.contentWelcomePosition}>
            <Grid>
              <img src={'../../static/assets/img/iconCardAlfred/Castor applaudit.svg'} alt={'fatCastor'} title={'fatCastor'} className={classes.imgFatCastor}/>
            </Grid>
            <Grid className={classes.texfieldContent}>
              <TextField
                id="outlined-multiline-static"
                label="Message de bienvenue"
                multiline
                rows="4"
                defaultValue="Merci pour votre réservation !"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
        <hr className={classes.hrStyle}/>
        <Grid className={classes.containerPosition}>
          <Grid className={classes.contentPosition}>
            <Grid className={classes.containerBooking}>
              <Grid>
                <h3>Conditions d’annulation de Maelis</h3>
              </Grid>
              <Grid>
                <Button color="secondary" className={classes.button}>
                  Modifier
                </Button>
              </Grid>
            </Grid>
            <Grid className={classes.alignCheckbox}>
              <Grid>
                <Grid>
                  <Checkbox
                    checked={this.state.flexible_cancel}
                    onChange={this.handleChangeF}
                    value={'flexible_cancel'}
                    color="primary"
                    inputProps={{
                      'aria-label': 'secondary checkbox',
                    }}
                    icon={<CircleUnchecked/>}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                </Grid>
              </Grid>
              <Grid>
                <p>
                  Flexible : en cas d’annulation jusqu’à 1 jour de la prestation, Maelîs procédera au
                  remboursement intégral de la réservation.
                </p>
              </Grid>
            </Grid>
            <Grid className={classes.alignCheckbox}>
              <Grid>
                <Grid>
                  <Checkbox
                    checked={this.state.flexible_cancel}
                    onChange={this.handleChangeF}
                    value={'flexible_cancel'}
                    color="primary"
                    inputProps={{
                      'aria-label': 'secondary checkbox',
                    }}
                    icon={<CircleUnchecked/>}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                </Grid>
              </Grid>
              <Grid>
                <p>
                  Modéré : en cas d’annulation jusqu’à 5 jour de la prestation, Maelîs procédera
                  au remboursement intégral de la réservation.
                </p>
              </Grid>
            </Grid>
            <Grid className={classes.alignCheckbox}>
              <Grid>
                <Grid>
                  <Checkbox
                    checked={this.state.flexible_cancel}
                    onChange={this.handleChangeF}
                    value={'flexible_cancel'}
                    color="primary"
                    inputProps={{
                      'aria-label': 'secondary checkbox',
                    }}
                    icon={<CircleUnchecked/>}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                </Grid>
              </Grid>
              <Grid>
                <p>
                  Stricte: en cas d’annulation jusqu’à 10 jour de la prestation, Maelîs procédera au
                  remboursement intégral de la réservation.
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <hr className={classes.hrStyle}/>
      </Grid>
    )
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(About);
