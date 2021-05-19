import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import AlgoliaPlaces from "algolia-places-react";
import TextField from "@material-ui/core/TextField";
import PhoneIphoneOutlinedIcon from "@material-ui/icons/PhoneIphoneOutlined";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import NumberFormat from 'react-number-format';
import PropTypes from "prop-types";
import styles from '../../../static/css/components/RegisterSteps/RegisterSecondPage/RegisterSecondPage'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CguContent from "../../CguContent/CguContent";
import DialogActions from "@material-ui/core/DialogActions";
const {ACCOUNT_MIN_AGE} = require('../../../utils/consts');


function NumberFormatCustom(props) {
  const {inputref, onChange, ...other} = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
    />
  );
}

NumberFormatCustom.propTypes = {
  //inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

class RegisterSecondPage extends React.Component{

  constructor() {
    super();
    this.state={
      open: false
    }
  }

  dialogCgu = (classes) => {
    const {open} = this.state;

    const handleClose = () => {
      this.setState({open: false})
    };

    return (
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle onClose={() => this.setState({open: false})}/>
        <DialogContent>
          <CguContent/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={'secondary'}>Fermer</Button>
        </DialogActions>
      </Dialog>
    )
  }

  handleOpenCgu = () => {
    this.setState({open: true})
  }

  render() {
    const{classes, state}= this.props;

    return(
      <Grid container>
        <Grid className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
            <Grid item>
              <h3 className={classes.subtitle}>Adresse postale</h3>
            </Grid>
            <Grid item className={classes.textStyle}>
              <Typography><em>Votre adresse ne sera pas visible, mais nous l’utiliserons
                pour vous
                proposer
                ou proposer vos services aux utilisateurs ou Alfred proches de chez vous.</em></Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
            <Grid item style={{width: '100%'}}>
              <AlgoliaPlaces
                className={classes.textFieldAlgo}
                placeholder='Recherchez votre adresse'
                options={{
                  appId: 'plKATRG826CP',
                  apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                  language: 'fr',
                  countries: ['fr'],
                  type: 'address',

                }}
                onChange={(suggestion) => this.props.onChangeAddress(suggestion)}
                onClear={() => this.props.onChangeAddress(null)}
              />
              <em style={{color: 'red'}}>{state.cityError}</em>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
            <Grid item>
              <h3 className={classes.subtitle}>Date de naissance</h3>
            </Grid>
            <Grid item>
              <Typography className={classes.textStyle}><em>
                {`Pour vous inscrire, vous devez être âgé d’au moins ${ACCOUNT_MIN_AGE} ans.
                  Les autres utilisateurs ne verront pas votre date de naissance.`}</em>
              </Typography>
            </Grid>
            <Grid item className={classes.datenaissance} style={{display: 'flex', alignItems: 'center'}}>
              <Grid container style={{justifyContent: 'space-between', flexWrap: 'nowrap'}}>
                <Grid item style={{width: '30%'}}>
                  <TextField
                    label="Jour"
                    placeholder="Jour"
                    onChange={(e) => this.props.onChangeBirthdayDate(e)}
                    inputProps={{
                      maxLength: 2,
                    }}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    error={state.birthdayError}
                    helperText={state.birthdayError}
                  />
                </Grid>
                <Grid item style={{width: '30%'}}>
                  <TextField
                    label="Mois"
                    placeholder="Mois"
                    onChange={(e) => this.props.onChangeBirthdayMonth(e)}
                    inputProps={{
                      maxLength: 2,
                    }}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    error={state.birthdayError}
                  />
                </Grid>
                <Grid item style={{width: '30%'}}>
                  <TextField
                    label="Année"
                    placeholder="Année"
                    onChange={(e) => this.props.onChangeBirthdayYear(e)}
                    inputProps={{
                      maxLength: 4,
                    }}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    error={state.birthdayError}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
            <Grid item>
              <h3 className={classes.subtitle}>Téléphone</h3>
            </Grid>
            <Grid item>
              <Typography className={classes.textStyle}><em>L'ajout de votre numéro de téléphone permet aux membres
                My-Alfred
                de disposer d'un moyen pour vous contacter.</em>
              </Typography>
            </Grid>
            <Grid item container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
              <Grid item>
                <PhoneIphoneOutlinedIcon className={classes.colorIcon}/>
              </Grid>
              <Grid item style={{width: '70%'}}>
                <TextField
                  id="standard-with-placeholder"
                  label="Numéro de téléphone"
                  placeholder="Numéro de téléphone"
                  style={{width: '100%'}}
                  type={'number'}
                  name="phone"
                  value={state.phone}
                  onChange={(e) => this.props.onChangePhone(e)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
            <Grid item>
              <Grid container style={{marginTop: 15, alignItems: 'center'}}>
                <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                  <Checkbox
                    checked={state.checked}
                    onChange={(e) => this.props.handleChecked(e)}
                    value="checked"
                    color="primary"
                  />
                </Grid>
                <Grid  item xl={11} lg={11} md={11} sm={11} xs={11}>
                  <Button onClick={this.handleOpenCgu} classes={{root: classes.buttonCGU}} style={{color: '#2FBCD3'}}>J’accepte les
                    conditions
                    générales d’utilisation de My-Alfred.</Button>
                  {this.dialogCgu()}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(RegisterSecondPage);
