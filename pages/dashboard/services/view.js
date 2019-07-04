import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



import Layout from '../../../hoc/Layout/Layout';
import axios from 'axios';
import Router from "next/router";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Chip from "@material-ui/core/Chip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "next/link";

const { config } = require('../../../config/config');
const url = config.apiUrl;
const styles = {
    loginContainer: {
        alignItems: 'center',
        height: '150vh',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    card: {
        padding: '1.5rem 3rem',
        width: 400,
    },
    cardContant: {
        flexDirection: 'column',
    },
    linkText: {
        textDecoration: 'none',
        color: 'black',
        fontSize: 12,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    }
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class view extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            service: {},
            current_tags: [],
            current_equipments: [],
            current_category: '',
            all_category: [],
            all_tags: [],
            all_equipments: [],
            category: '',
            tags: [],
            equipments: [],
            majoration: '',
            isChecked: false

        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
    }

    static getInitialProps ({ query: { id } }) {
        return { service_id: id }

    }
    componentDidMount() {
        const id = this.props.service_id;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(`${url}myAlfred/api/admin/service/all/${id}`)
            .then(response => {
                let service = response.data;
                this.setState({service: service, current_tags: service.tags, current_equipments: service.equipments, current_category: service.category});

                if(typeof service.majoration != "undefined") {
                    this.setState({isChecked: true})
                }

            })
            .catch(err => {
                console.log(err);
                localStorage.removeItem('token');
                Router.push({pathname: '/login'})
            });

        axios.get(url+"myAlfred/api/admin/category/all")
            .then((response) => {
                let category = response.data;
                this.setState({all_category: category})
            }).catch((error) => {
            console.log(error)
        });

        axios.get(url+"myAlfred/api/admin/tags/all")
            .then((response) => {
                let tags = response.data;
                this.setState({all_tags: tags})
            }).catch((error) => {
            console.log(error)
        });

        axios.get(url+"myAlfred/api/admin/equipment/all")
            .then((response) => {
                let equipments = response.data;
                this.setState({all_equipments: equipments})
            }).catch((error) => {
            console.log(error)
        });

    }

    onChange = e => {
        const state = this.state.service;
        state[e.target.name] = e.target.value;
        this.setState({service:state});
    };

    onChange2 = e => {
        this.setState({ category: e.target.value });
    };

    handleChange = e => {
        this.setState({tags: e.target.value})


    };

    handleChange2 = e => {
        this.setState({equipments: e.target.value})


    };

    handleChecked () {
        this.setState({isChecked: !this.state.isChecked});
    }
    onSubmit = e => {
        e.preventDefault();
        const tags = this.state.tags;
        const category = this.state.category;
        const equipments = this.state.equipments;
        const { label,description } = this.state.service;
        const id = this.props.service_id;
        axios.put(`${url}myAlfred/api/admin/service/all/${id}`,{label,description,tags,category,equipments})
            .then(res => {

                alert('Service modifié avec succès');
                Router.push({pathname:'/dashboard/services/all'})
            })
            .catch(err => {
                console.log(err);
            })


    };

    handleClick() {
        const id = this.props.service_id;
        axios.delete(`${url}myAlfred/api/admin/service/all/${id}`)
            .then(res => {

                alert('Service supprimé avec succès');
                Router.push({pathname:'/dashboard/services/all'})
            })
            .catch(err => {
                console.log(err);
            })


    };


    render()  {
        const { classes } = this.props;
        const {service} = this.state;
        const {current_tags} = this.state;
        const {current_equipments} = this.state;
        const {current_category} = this.state;
        const {all_category} = this.state;
        const {all_tags} = this.state;
        const {all_equipments} = this.state;
        const {isChecked} = this.state;

        const categories = all_category.map(e => (

            <MenuItem value={e._id}>{e.label}</MenuItem>

        ));



        return (
            <Layout>
                <Grid container className={classes.loginContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>{service.label}</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="label"
                                        value={service.label}
                                        onChange={this.onChange}

                                    />
                                </Grid>
                                <Grid item>
                                    <Typography style={{ fontSize: 20 }}>{current_category.label}</Typography>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel shrink htmlFor="genre-label-placeholder">
                                            Catégorie
                                        </InputLabel>
                                        <Select
                                            input={<Input name="category" id="genre-label-placeholder" />}
                                            displayEmpty
                                            name="category"
                                            value={this.state.category}
                                            onChange={this.onChange2}
                                            className={classes.selectEmpty}
                                        >
                                            <MenuItem value="">
                                                <em>...</em>
                                            </MenuItem>
                                            {categories}
                                        </Select>
                                    </FormControl>

                                </Grid>
                                <Grid item>
                                    <Typography style={{ fontSize: 20 }}>Tags</Typography>
                                    {current_tags.map(e => (
                                        <p>{e.label}</p>
                                    ))}
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="select-multiple-chip">Tags</InputLabel>
                                            <Select
                                                multiple
                                                value={this.state.tags}
                                                onChange={this.handleChange}
                                                input={<Input id="select-multiple-chip" />}
                                                renderValue={selected => (
                                                    <div className={classes.chips}>
                                                        {selected.map(value => (
                                                            <Chip key={value} label={value} className={classes.chip} />
                                                        ))}
                                                    </div>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                                {all_tags.map(name => (
                                                    <MenuItem key={name._id} value={name._id} >
                                                        {name.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                </Grid>
                                <Grid item>
                                    <Typography style={{ fontSize: 20 }}>Equipements</Typography>
                                    {current_equipments.map(f => (
                                        <p>{f.label}</p>
                                    ))}
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="select-multiple-chip">Equipements</InputLabel>
                                        <Select
                                            multiple
                                            value={this.state.equipments}
                                            onChange={this.handleChange2}
                                            input={<Input id="select-multiple-chip" />}
                                            renderValue={selected => (
                                                <div className={classes.chips}>
                                                    {selected.map(value => (
                                                        <Chip key={value} label={value} className={classes.chip} />
                                                    ))}
                                                </div>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {all_equipments.map(name => (
                                                <MenuItem key={name._id} value={name._id} >
                                                    {name.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <Typography style={{ fontSize: 20 }}>Description</Typography>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="description"
                                        value={service.description}
                                        onChange={this.onChange}

                                    />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.isChecked}
                                                onChange={this.handleChecked}
                                                value={this.state.isChecked}
                                                color="primary"
                                                name={"isChecked"}
                                            />
                                        }
                                        label="Majoration ?"
                                    />

                                </Grid>
                                {isChecked ?
                                    <Grid item>
                                        <TextField
                                            id="standard-with-placeholder"
                                            margin="normal"
                                            style={{ width: '100%' }}
                                            type="text"
                                            name="majoration"
                                            value={service.majoration}
                                            onChange={this.onChange}
                                        />
                                    </Grid>
                                    : ''}
                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                        Modifier
                                    </Button>
                                    <Button type="button" variant="contained" color="secondary" style={{ width: '100%' }} onClick={this.handleClick}>
                                        Supprimer
                                    </Button>
                                </Grid>
                            </form>
                            <Link href={`editPicture?id=${this.props.service_id}`}>
                                <Button type="button" variant="contained" color="primary" style={{ width: '100%' }}>
                                    Modifier la photo
                                </Button>
                            </Link>
                        </Grid>
                    </Card>
                </Grid>
            </Layout>
        );
    };
}



export default withStyles(styles)(view);
