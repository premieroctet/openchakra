import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import styles from '.././Siret/SiretStyle';

const moment = require('moment');
const {SIRET} = require('../../config/config')
const {ENTITES} = require('../../utils/consts')

moment.locale('fr');

const DATE_COUPURE_INSEE = moment("2020-06-09")

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
        if (this.props.company) {
          this.state = this.props.company
        }
        this.onChange = this.onChange.bind(this);
        this.setCompanyData = this.setCompanyData.bind(this);
    }

    componentWillReceiveProps(nextProps){
       if(nextProps.company){
         this.setState(nextProps.company)
       }
    }

    onChange = e => {
      let {name, value} = e.target;
      if (name==='siret') {
        value = value.replace(/ /g, '');
      }
      if (name==='creation_date') {
        value=moment(value).format('DD/MM/YYYY')
      }
      this.setState({ [name]: value },
        () => {
          this.props.onChange(this.state)
          if (name=='siret') this.onSubmit()
        });

    };



    onSubmit = e => {


        const code = this.state.siret;

        const config = {
          headers: { Authorization: `Bearer ${SIRET.token}` }
        };

        axios.get(`${SIRET.siretUrl}/${code}`, config)
            .then(res => {
              this.setCompanyData(res.data.etablissement);
            })
            .catch(err => {
              console.error(err)
               axios.get(`${SIRET.sirenUrl}/${code}`, config)
                 .then(res => {
                   this.setCompanyData(res.data);
                 })
                 .catch(err => {
                    this.setState({
                      name:'',
                      status: '',
                      creation_date:'',
                      naf_ape: '',
                    }, () => this.props.onChange(this.state));
                    console.error(err);
                 })
              })
    };

    setCompanyData(data) {
      const uniteLegale = data.uniteLegale.periodesUniteLegale ? data.uniteLegale.periodesUniteLegale[0] : data.uniteLegale
      const date = data.uniteLegale.dateCreationUniteLegale;
      const year = date.substring(0,4);
      const month = date.substring(5,7);
      const day = date.substring(8,10);
      const result = day+'/'+month+'/'+year;
      this.setState({
        name: uniteLegale.denominationUniteLegale || `${data.uniteLegale.prenomUsuelUniteLegale || uniteLegale.prenomUsuelUniteLegale} ${uniteLegale.nomUniteLegale}`,
        naf_ape: uniteLegale.activitePrincipaleUniteLegale,
        status: ENTITES[uniteLegale.categorieJuridiqueUniteLegale],
        creation_date: result,
        errors: null,
      }, () => this.props.onChange(this.state)
      );
    }

    render()  {
        const { classes } = this.props;

        const coupureToday=DATE_COUPURE_INSEE.format('DD/MM/YY')==moment().format('DD/MM/YY')

        return (
          <>
           { coupureToday ?
            <Typography style={{color:'red'}}>
              En raison de l'arrêt des serveurs de l'INSEE ce {`${DATE_COUPURE_INSEE.format('DD/MM/YY')}`},
              nous ne pouvons renseigner automatiquement vos informations à partir de votre numéro Siret
              <br/>Merci de saisir tous les champs manuellement
              </Typography>
              :
              null
          }
            <Grid container>
                <Grid item style={{display: 'flex'}}>
                  <Grid>
                    <Typography>SIRET/SIREN</Typography>
                    <TextField
                      id="filled-with-placeholder"
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
                    placeholder="Nom"
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
                  placeholder="Code NAF/APE"
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
                  placeholder="Statut juridique"
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
            </>
        );
    };
}



export default withStyles(styles)(siret);
