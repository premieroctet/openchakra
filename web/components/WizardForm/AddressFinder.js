import React from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

class AddressFinder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      city: '',
      zip_code: '',
      address: '',
      country: '',
      lat: '',
      lng: '',
    };

  }

  onChange({suggestion}) {
    this.setState({
      city: {label: suggestion.city, value: suggestion.city},
      address: {label: suggestion.name, value: suggestion.name},
      zip_code: {label: suggestion.postcode, value: suggestion.postcode},
      country: {label: suggestion.country, value: suggestion.country},
      lat: {label: suggestion.latlng.lat, value: suggestion.latlng.lat},
      lng: {label: suggestion.latlng.lng, value: suggestion.latlng.lng},
    });
    this.props.formikCtx.form.setFieldValue(`submission.${this.props.index}.city`, this.state.city);
    this.props.formikCtx.form.setFieldValue(`submission.${this.props.index}.address`, this.state.address);
    this.props.formikCtx.form.setFieldValue(`submission.${this.props.index}.country`, this.state.country);
    this.props.formikCtx.form.setFieldValue(`submission.${this.props.index}.postal_code`, this.state.zip_code);
    this.props.formikCtx.form.setFieldValue(`submission.${this.props.index}.lat`, this.state.lat);
    this.props.formikCtx.form.setFieldValue(`submission.${this.props.index}.lng`, this.state.lng);
  }

  render() {

    return (
      <React.Fragment>
        <AlgoliaPlaces
          placeholder='Veuillez renseigner votre adresse'

          options={{
            appId: 'plKATRG826CP',
            apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
            language: 'fr',
            countries: ['fr'],
            type: 'address',

          }}

          onChange={(suggestion) => this.onChange(suggestion)}
        />
        <Grid item>
          <TextField
            inputProps={{
              readOnly: true,
              style: {cursor: 'default'},
            }}
            InputLabelProps={{shrink: true}}
            color="primary"
            variant="outlined"
            label="Adresse"
            placeholder="Adresse"
            margin="normal"
            style={{width: '100%'}}
            type="text"
            name="address"
            value={this.state.address.value}
            onChange={this.onChange}
          />
        </Grid>
        <Grid item>
          <TextField
            inputProps={{
              readOnly: true,
              style: {cursor: 'default'},
            }}
            InputLabelProps={{shrink: true}}
            color="primary"
            variant="outlined"
            label="Ville"
            placeholder="Ville"
            margin="normal"
            style={{width: '100%'}}
            type="text"
            name="city"
            value={this.state.city.value}
            onChange={this.onChange}
          />
        </Grid>
        <Grid item>
          <TextField
            inputProps={{
              readOnly: true,
              style: {cursor: 'default'},
            }}
            InputLabelProps={{shrink: true}}
            color="primary"
            variant="outlined"
            label="Code postal"
            placeholder="Code postal"
            margin="normal"
            style={{width: '100%'}}
            type="text"
            name="zip_code"
            value={this.state.zip_code.value}
            onChange={this.onChange}
          />
        </Grid>
        <Grid item>
          <TextField
            inputProps={{
              readOnly: true,
              style: {cursor: 'default'},
            }}
            id="standard-with-placeholder"
            InputLabelProps={{shrink: true}}
            color="primary"
            variant="outlined"
            label="Pays"
            placeholder="Pays"
            margin="normal"
            style={{width: '100%'}}
            type="text"
            name="country"
            value={this.state.country.value}
            onChange={this.onChange}
          />
        </Grid>
      </React.Fragment>

    );
  };
}

export default AddressFinder;
