import React from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";


class testAlgolia extends React.Component{

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

    onChange({query, rawAnswer, suggestion, suggestionIndex}) {
        this.setState({city: suggestion.city, address: suggestion.name, zip_code: suggestion.postcode,country: suggestion.country,
        lat: suggestion.latlng.lat, lng: suggestion.latlng.lng});

    }

    render() {

        const {lat} = this.state;
        const {lng} = this.state;

        return (
           <React.Fragment>
        <AlgoliaPlaces
            placeholder='Write an address here'

            options={{
                appId: 'plKATRG826CP',
                apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                language: 'fr',
                countries: ['fr'],
                type: 'address',

            }}

            onChange={(suggestion) =>this.onChange(suggestion)}
        />

               <form onSubmit={this.onSubmit}>
                   <Grid item>
                       <TextField
                           id="standard-with-placeholder"
                           label="Adresse"
                           placeholder="Adresse"
                           margin="normal"
                           style={{ width: '100%' }}
                           type="text"
                           name="address"
                           value={this.state.address}
                           onChange={this.onChange}
                       />
                   </Grid>
                   <Grid item>
                       <TextField
                           id="standard-with-placeholder"
                           label="Ville"
                           placeholder="Ville"
                           margin="normal"
                           style={{ width: '100%' }}
                           type="text"
                           name="city"
                           value={this.state.city}
                           onChange={this.onChange}
                       />
                   </Grid>
                   <Grid item>
                       <TextField
                           id="standard-with-placeholder"
                           label="Code postal"
                           placeholder="Code postal"
                           margin="normal"
                           style={{ width: '100%' }}
                           type="text"
                           name="zip_code"
                           value={this.state.zip_code}
                           onChange={this.onChange}
                       />
                   </Grid>
                   <Grid item>
                       <TextField
                           id="standard-with-placeholder"
                           label="Pays"
                           placeholder="Pays"
                           margin="normal"
                           style={{ width: '100%' }}
                           type="text"
                           name="country"
                           value={this.state.country}
                           onChange={this.onChange}
                       />
                   </Grid>


                   <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                       <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                           Ajouter
                       </Button>
                   </Grid>
               </form>
               {lat} {lng}
           </React.Fragment>

        );
    };
}

export default testAlgolia;
