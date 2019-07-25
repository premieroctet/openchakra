import React from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from 'axios';

const {config} = require('../config/config');
const url = config.apiUrl;

class testAvailability extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            monday_event: [],
            active: false,
            month_begin: '',
            month_end: '',
            monday_begin: '',
            monday_end: '',
            monday_service: '',
            monday_all_service: false,
            monday: false,
            all_service: [],



        };

        this.handleChecked=this.handleChecked.bind(this);

    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(url+'myAlfred/api/serviceUser/currentAlfred')
            .then(res => {
                let data = res.data;
                this.setState({all_service: data})
            })
            .catch(err => console.log(err))
    }

    handleChecked () {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const obj = {
            begin: this.state.monday_begin,
            end: this.state.monday_end,
            service: this.state.monday_service,
            all_services: this.state.monday_all_service
        };
        this.state.monday_event.push(obj);
        console.log(this.state.monday_event);

        this.setState({monday_begin: '',monday_end: '',monday_service: '',monday_all_service: false})
    };


    render() {
        const {monday} = this.state;
        const {active} = this.state;
        const {all_service} = this.state;

        return (
            <React.Fragment>

                <form onSubmit={this.onSubmit}>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.monday}
                                    onChange={this.handleChecked}
                                    value={this.state.monday}
                                    color="primary"
                                    name={'monday'}
                                />
                            }
                            label="Lundi"
                        />
                    </Grid>
                    {monday ?
                        <React.Fragment>
                            <Grid item>
                                <TextField
                                    id="standard-with-placeholder"
                                    label="De"
                                    margin="normal"
                                    style={{ width: '100%' }}
                                    type="time"
                                    name="monday_begin"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    value={this.state.monday_begin}
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="standard-with-placeholder"
                                    label="A"
                                    margin="normal"
                                    style={{ width: '100%' }}
                                    type="time"
                                    name="monday_end"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    value={this.state.monday_end}
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <FormControl style={{width: '100%'}} disabled={this.state.monday_all_service}>
                                <InputLabel htmlFor="age-simple">Service</InputLabel>
                                <Select
                                    value={this.state.monday_service}
                                    onChange={this.onChange}
                                    inputProps={{
                                        name: 'monday_service',
                                        id: 'age-simple',
                                    }}
                                    style={{width: '100%'}}

                                >
                                    {all_service.map((e,index) => (
                                        <MenuItem key={index} value={e._id}>{e.service.label}</MenuItem>
                                    ))}


                                </Select>
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.monday_all_service}
                                        onChange={this.handleChecked}
                                        value={this.state.monday_all_service}
                                        color="primary"
                                        name={'monday_all_service'}
                                    />
                                }
                                label="Tous les services"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.active}
                                        onChange={this.handleChecked}
                                        value={this.state.active}
                                        color="primary"
                                        name={'active'}
                                    />
                                }
                                label="Répéter pour une période ?"
                            />
                            {active ?
                            <React.Fragment>
                                <FormControl style={{width: '100%'}}>
                                    <InputLabel htmlFor="age-simple">A partir de</InputLabel>
                                    <Select
                                        value={this.state.month_begin}
                                        onChange={this.onChange}
                                        inputProps={{
                                            name: 'month_begin',
                                            id: 'age-simple',
                                        }}
                                        style={{width: '100%'}}

                                    >
                                        <MenuItem value={'Janvier'}>Janvier</MenuItem>
                                        <MenuItem value={'Février'}>Février</MenuItem>
                                        <MenuItem value={'Mars'}>Mars</MenuItem>
                                        <MenuItem value={'Avril'}>Avril</MenuItem>
                                        <MenuItem value={'Mai'}>Mai</MenuItem>
                                        <MenuItem value={'Juin'}>Juin</MenuItem>
                                        <MenuItem value={'Juillet'}>Juillet</MenuItem>
                                        <MenuItem value={'Août'}>Août</MenuItem>
                                        <MenuItem value={'Septembre'}>Septembre</MenuItem>
                                        <MenuItem value={'Octobre'}>Octobre</MenuItem>
                                        <MenuItem value={'Novembre'}>Novembre</MenuItem>
                                        <MenuItem value={'Décembre'}>Décembre</MenuItem>


                                    </Select>
                                </FormControl>

                                <FormControl style={{width: '100%'}}>
                                <InputLabel htmlFor="age-simple">Jusqu'à</InputLabel>
                                <Select
                                value={this.state.month_end}
                                onChange={this.onChange}
                                inputProps={{
                                name: 'month_end',
                                id: 'age-simple',
                            }}
                                style={{width: '100%'}}

                                >
                                <MenuItem value={'Janvier'}>Janvier</MenuItem>
                                <MenuItem value={'Février'}>Février</MenuItem>
                                <MenuItem value={'Mars'}>Mars</MenuItem>
                                <MenuItem value={'Avril'}>Avril</MenuItem>
                                <MenuItem value={'Mai'}>Mai</MenuItem>
                                <MenuItem value={'Juin'}>Juin</MenuItem>
                                <MenuItem value={'Juillet'}>Juillet</MenuItem>
                                <MenuItem value={'Août'}>Août</MenuItem>
                                <MenuItem value={'Septembre'}>Septembre</MenuItem>
                                <MenuItem value={'Octobre'}>Octobre</MenuItem>
                                <MenuItem value={'Novembre'}>Novembre</MenuItem>
                                <MenuItem value={'Décembre'}>Décembre</MenuItem>


                                </Select>
                                </FormControl>
                            </React.Fragment>

                                :null}

                            <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                    Ajouter un créneau horaire
                                </Button>
                            </Grid>
                        </React.Fragment>
                        : null}




                </form>

            </React.Fragment>

        );
    };
}

export default testAvailability;
