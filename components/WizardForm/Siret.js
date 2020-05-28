import { toast } from 'react-toastify';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import styles from '.././Siret/SiretStyle'
const moment = require('moment');
moment.locale('fr');

class siret extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            siret: '',
            naf_ape: '',
            creation_date: '',
            name: '',
            status: '',
        };
        this.onChange = this.onChange.bind(this);
        this.setCompanyData = this.setCompanyData.bind(this);
    }

    onChange = e => {
      let {name, value} = e.target;
      console.log(`*Before:${name}=>${value}`)
      if (name==='siret') {
        value = value.replace(/ /g, '');
      }
      if (name==='creation_date') {
        value=moment(value).format('DD/MM/YYYY')
      }
      console.log(`After:${name}=>${value}`)
      this.setState({ [name]: value },
        () => {
          this.props.onChange(this.state)
          if (name=='siret') this.onSubmit()
        });

    };


  setCompanyData(data) {
    const date = data.date_creation;
    const year = date.substring(0,4);
    const month = date.substring(4,6);
    const day = date.substring(6,8);
    const result = day+'/'+month+'/'+year;
    this.setState({
      name: data.l1_normalisee,
      naf_ape: data.activite_principale,
      status: data.libelle_nature_juridique_entreprise,
      creation_date: result,
      errors: null,
    }, () => this.props.onChange(this.state)
    );
  }

    onSubmit = e => {


        const code = this.state.siret;

        axios.get(`https://entreprise.data.gouv.fr/api/sirene/v1/siret/${code}`)
            .then(res => {
              this.setCompanyData(res.data.etablissement);
            })
            .catch(err => {
               axios.get(`https://entreprise.data.gouv.fr/api/sirene/v1/siren/${code}`)
                 .then(res => {
                   this.setCompanyData(res.data.siege_social);
                 })
                 .catch(err => {
                    this.setState({
                      name:'',
                      status: '',
                      creation_date:'',
                      naf_ape: '',
                      errors: 'Siret/Siren inconnu, merci de saisir les données manuellement'
                    }, () => this.props.onChange(this.state));
                    console.error(err);
                 })
              })
    };

    render()  {
        const { classes } = this.props;

        return (
            <Grid container>
                <Grid item style={{display: 'flex'}}>
                  <Grid>
                    <TextField
                      id="filled-with-placeholder"
                      label="Siret/Siren"
                      placeholder="Siret/Siren"
                      margin="normal"
                      variant="outlined"
                      type="text"
                      name={'siret'}
                      value={this.state.siret}
                      onChange={this.onChange}
                      className={classes.textFieldSiret}
                    />
                  </Grid>
                  <Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={12} md={6}>
                    <em style={{color:'red'}}>{this.state.errors}</em>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={12} md={6}>
                  <Typography>Date de création</Typography>
                    <TextField
                      id="filled-with-placeholder"
                      margin="normal"
                      variant="outlined"
                      type="date"
                      name={'creation_date'}
                      value={moment(this.state.creation_date, "DD/mm/YYYY").format('YYYY-mm-DD')}
                      onChange={this.onChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                  <Typography>Nom entreprise</Typography>
                  <TextField
                    id="filled-with-placeholder"
                    label="Nom"
                    margin="normal"
                    variant="outlined"
                    type="text"
                    name={'name'}
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                  <Typography>Code NAF/APE</Typography>
                  <TextField
                  id="filled-with-placeholder"
                  label="Code NAF/APE"
                  margin="normal"
                  variant="outlined"
                  type="text"
                  name={'naf_ape'}
                  value={this.state.naf_ape}
                  onChange={this.onChange}
                  />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                  <Typography>Statut juridique</Typography>
                  <TextField
                  id="filled-with-placeholder"
                  label="Statut juridique"
                  margin="normal"
                  variant="outlined"
                  type="text"
                  name={'status'}
                  value={this.state.status}
                  onChange={this.onChange}
                  />
                  </Grid>
                </Grid>
            </Grid>
        );
    };
}



export default withStyles(styles)(siret);
