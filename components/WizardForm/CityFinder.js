import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import axios from 'axios';
import {ErrorMessage} from 'formik';

const {config} = require('../../config/config');
const url = config.apiUrl;

class CityFinder extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            code: '',
            cities: [],
            check: false,
            city: null,
            user: {},
            address: {},


        };
        this.onChange2 = this.onChange2.bind(this);
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(url+'myAlfred/api/users/current')
            .then(res => {
                let data = res.data;
                this.setState({user: data, address: data.billing_address});
                const code = this.state.address.zip_code;
                const newCode = code.substring(0,2);
                this.setState({code: newCode});

                axios.get(`https://geo.api.gouv.fr/communes?codeDepartement=${newCode}&fields=nom&format=json&geometry=centre`)
                    .then(response => {
                        const data2 = response.data;
                        this.setState({cities: data2, check: true});


                    })
                    .catch(err => {
                        console.log(err);
                    })


            })





    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });

    };

    onChange2 = city => {
        this.setState({ city });
        this.props.formikCtx.form.setFieldValue(`submission.${this.props.index}.city`, city)
    };

    onSubmit = e => {

        const code = this.state.code;

        axios.get(`https://geo.api.gouv.fr/communes?codeDepartement=${code}&fields=nom&format=json&geometry=centre`)
            .then(res => {
                const data = res.data;
                console.log(data)
                this.setState({cities: data, check: true});


            })
            .catch(err => {
                console.log(err);
            })


    };

    render()  {
        const {cities} = this.state;
        const {check} = this.state;
        const {city} =  this.state;
        const options = cities.map(citie => ({
            label: citie.nom,
            value: citie.nom
        }));
        console.log(options)


        return (
            <Grid>
                <Grid item>
                    <TextField
                        id="standard-with-placeholder"
                        label="Code département"
                        placeholder="Code département"
                        margin="normal"
                        variant="outlined"
                        style={{ width: '100%' }}
                        type="text"
                        name="code"
                        value={this.state.code}
                        onChange={this.onChange}
                        helperText="Choisissez la ville où le service sera pratiqué. Pour cela, entrez les deux premiers numéros du département de la ville (ex : pour Rouen, 76)"
                    />
                </Grid>
                <Grid item style={{ display: 'flex', justifyContent: 'start'}}>
                    <Button type="button" color="primary" onClick={() => this.onSubmit()}>
                        Valider
                    </Button>
                </Grid>
                {check ?
                    <Grid item>
                        <Select
                            styles={{menu: (styles) => Object.assign(styles, {zIndex: 1000})}}
                            value={city}
                            onChange={this.onChange2}
                            options={options}
                            helperText="Choisissez maintenant votre ville en la recherchant dans le menu"
                        />
                    </Grid>
                    : ''}
                <ErrorMessage name={`submission.${this.props.index}.city`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
            </Grid>
        );
    };
}

export default CityFinder;
