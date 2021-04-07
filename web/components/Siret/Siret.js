import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import styles from '../../static/css/components/Siret/Siret';
import ButtonSwitch from '../ButtonSwitch/ButtonSwitch';
import {SHOP} from '../../utils/i18n';

const moment = require('moment');
const {SIRET} = require('../../config/config');
const {ENTITES} = require('../../utils/consts');
const {compact, compute_vat_number, isSiretSirenLength}=require('../../utils/text')
moment.locale('fr');

const DATE_COUPURE_INSEE = moment('2020-06-09');

class siret extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      siret: '',
      name: '',
      vat_subject: false,
      vat_number: null,
    };
    if (this.props.company) {
      console.log(`Got company:${JSON.stringify(this.props.company)}`)
      this.state = this.props.company;
    }
    this.onChange = this.onChange.bind(this);
    this.setCompanyData = this.setCompanyData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.company) {
      this.setState(nextProps.company);
    }
  }

  onChange = e => {
    let {name, value} = e.target;
    var st={}
    if (name === 'siret') {
      value = compact(value)
      if (this.state.vat_subject) {
        st['vat_number'] = compute_vat_number(value)
      }
    }
    if (name === 'creation_date') {
      value = moment(value).format('DD/MM/YYYY');
    }
    st[name]=value
    this.setState(st,
      () => {
        this.props.onChange(this.state);
        if (name === 'siret') {
          this.onSubmit();
        }
      });
  };

  onVatSubjectChanged = (id, checked) =>{
    var vat_number = checked ? this.state.vat_number : null
    if (checked && !vat_number) {
      vat_number = compute_vat_number(this.state.siret)
    }
    this.setState({vat_subject: checked, vat_number: vat_number},
      () => this.props.onChange(this.state));
  };


  onSubmit = e => {
    const code = this.state.siret;

    if (!isSiretSirenLength(code)) {
      return
    }

    const config = {
      headers: {Authorization: `Bearer ${SIRET.token}`},
    };

    axios.get(`${SIRET.siretUrl}/${code}`, config)
      .then(res => {
        this.setCompanyData(res.data.etablissement);
      })
      .catch(err => {
        console.error(err);
        axios.get(`${SIRET.sirenUrl}/${code}`, config)
          .then(res => {
            this.setCompanyData(res.data);
          })
          .catch(err => {
            this.setState({
              name: '',
              siret: '',
            }, () => this.props.onChange(this.state));
            console.error(err);
          });
      });
  };

  setCompanyData(data) {
    const uniteLegale = data.uniteLegale.periodesUniteLegale ? data.uniteLegale.periodesUniteLegale[0] : data.uniteLegale;
    this.setState({
        name: uniteLegale.denominationUniteLegale || `${data.uniteLegale.prenomUsuelUniteLegale || uniteLegale.prenomUsuelUniteLegale} ${uniteLegale.nomUniteLegale}`,
        errors: null,
      }, () => this.props.onChange(this.state),
    );
  }

  render() {
    const {classes} = this.props;

    const coupureToday = DATE_COUPURE_INSEE.format('DD/MM/YY') === moment().format('DD/MM/YY');

    return (
      <Grid>
        {coupureToday ?
          <Typography style={{color: 'red'}}>
            En raison de l'arrêt des serveurs de l'INSEE ce {`${DATE_COUPURE_INSEE.format('DD/MM/YY')}`},
            nous ne pouvons renseigner automatiquement vos informations à partir de votre numéro Siret
            <br/>Merci de saisir tous les champs manuellement
          </Typography>
          :
          null
        }
        <Grid>
          <Grid container spacing={3}>
            <Grid item xl={12} xs={12}>
              <TextField
                id="filled-with-placeholder"
                label="Siret/Siren"
                variant="outlined"
                name={'siret'}
                value={this.state.siret}
                onChange={this.onChange}
                classes={{root: classes.textField}}
              />
            </Grid>
            <Grid container>
              <Grid item xl={6}>
                <em style={{color: 'red'}}>{this.state.errors}</em>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xl={6} xs={12}>
              <TextField
                id="filled-with-placeholder"
                label="Nom"
                variant="outlined"
                type="text"
                name={'name'}
                value={this.state.name}
                onChange={this.onChange}
                classes={{root: classes.textField}}

              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
              <ButtonSwitch
                label={<Typography className={classes.policySizeContent}>{SHOP.creation.is_professional_vat_subject}</Typography>}
                onChange={this.onVatSubjectChanged}
                name={'vat_subject'}
                checked={this.state.vat_subject}/>
            </Grid>
            {
              this.state.vat_subject ?
                <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
                  <TextField
                    id="outlined-basic"
                    label={SHOP.creation.textfield_ntva}
                    variant="outlined"
                    onChange={this.onChange}
                    name={'vat_number'}
                    value={this.state.vat_number}
                  />
                </Grid> : null
            }
          </Grid>
        </Grid>
      </Grid>
    );
  };
}


export default withStyles(styles)(siret);
