import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


import Select2 from 'react-select';
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
import Link from "next/link";
import cookie from 'react-cookies'
import Checkbox from '@material-ui/core/Checkbox'

const styles = {
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 67,
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
            prestation: {},
            current_service: '',
            current_search_filter: [],
            current_category: '',
            current_billing: [],
            current_filter_presentation: '',
            current_job: null,
            current_tags: [],
            all_category: [],
            all_service: [],
            all_billing: [],
            all_job: [],
            all_search_filter: [],
            all_filter_presentation: [],
            all_tags: [],
            category: '',
            service: '',
            billing: '',
            cesu_eligible: false,
            filter_presentation: '',
            search_filter: [],
            job: '',
            description: '',
            tags: [],
            selectedTags: null,
            selectedFilter: null,
            selectedBilling: null,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChangeTags = this.handleChangeTags.bind(this);
        this.handleChangeFilter = this.handleChangeFilter.bind(this);
        this.handleChangeBilling = this.handleChangeBilling.bind(this);
    }

    static getInitialProps ({ query: { id } }) {
        return { prestation_id: id }

    }
    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        const id = this.props.prestation_id;
        axios.defaults.headers.common['Authorization'] = cookie.load('token')
        axios.get(`/myAlfred/api/admin/prestation/all/${id}`)
            .then(response => {
                let prestation = response.data;
                this.setState({prestation: prestation, current_service: prestation.service,
                    current_billing: prestation.billing, current_category: prestation.category,
                    current_job: prestation.job, current_filter_presentation: prestation.filter_presentation,
                    current_search_filter: prestation.search_filter, current_tags: prestation.tags,
                    cesu_eligible: prestation.cesu_eligible });
                this.setState({service: prestation.service._id,billing: prestation.billing._id,
                filter_presentation: prestation.filter_presentation ? prestation.filter_presentation._id : null, job: prestation.job ? prestation.job._id : ''});

                this.setState({selectedTags :this.state.current_tags.map(b => ({
                        label: b.label,
                        value: b._id
                    })) });

                this.setState({selectedFilter :this.state.current_search_filter.map(p => ({
                        label: p.label,
                        value: p._id
                    })) });

                this.setState({selectedBilling :this.state.current_billing.map(q => ({
                        label: q.label,
                        value: q._id
                    })) });


            })
            .catch(err => {
                console.error(err);
                if(err.response && (err.response.status === 401 || err.response.status === 403)) {
                    cookie.remove('token', { path: '/' })
                    Router.push({pathname: '/login'})
                }
            });

        axios.get("/myAlfred/api/admin/category/all")
            .then((response) => {
                let category = response.data;
                this.setState({all_category: category})
            }).catch((error) => {
            console.log(error)
        });

        axios.get("/myAlfred/api/admin/service/all")
            .then((response) => {
                let service = response.data;
                this.setState({all_service: service})
            }).catch((error) => {
            console.log(error)
        });

        axios.get("/myAlfred/api/admin/billing/all")
            .then((response) => {
                let billing = response.data;
                this.setState({all_billing: billing})
            }).catch((error) => {
            console.log(error)
        });

        axios.get("/myAlfred/api/admin/job/all")
            .then((response) => {
                let job = response.data;
                this.setState({all_job: job})
            }).catch((error) => {
            console.log(error)
        });

        axios.get("/myAlfred/api/admin/searchFilter/all")
            .then((response) => {
                let search_filter = response.data;
                this.setState({all_search_filter: search_filter})
            }).catch((error) => {
            console.log(error)
        });

        axios.get("/myAlfred/api/admin/filterPresentation/all")
            .then((response) => {
                let filter_presentation = response.data;
                this.setState({all_filter_presentation: filter_presentation})
            }).catch((error) => {
            console.log(error)
        });

        axios.get("/myAlfred/api/admin/tags/all")
            .then((response) => {
                let tags = response.data;
                this.setState({all_tags: tags})
            }).catch((error) => {
            console.log(error)
        });

    }

    onChange = e => {
        const state = this.state.prestation;
        state[e.target.name] = e.target.value;
        this.setState({prestation:state});
    };

    onCesuChange = e => {
      const checked = e.target.checked
      this.setState({cesu_eligible:checked});
    };

    onChange2 = e => {
      const {name, value} = e.target
      this.setState({ [name]: value });
      if (name=='service') {
        this.setState({current_service: this.state.all_service.find(s => s._id.toString()==value.toString())})
      }
      if (name=='filter_presentation') {
        this.setState({current_filter_presentation: this.state.all_filter_presentation.find(f => f._id.toString()==value.toString())})
      }
    };

    handleChangeFilter = selectedFilter => {
        this.setState({ selectedFilter });

    };

    handleChangeTags = selectedTags => {
        this.setState({ selectedTags });

    };

    handleChangeBilling = selectedBilling => {
        this.setState({ selectedBilling });

    };

    onSubmit = e => {
        e.preventDefault();
        let arrayFilter = [];
        let arrayTags = [];
        let arrayBilling = [];
        if(this.state.selectedFilter != null){
            this.state.selectedFilter.forEach(c => {

                arrayFilter.push(c.value);

            });
        }

        if(this.state.selectedTags != null){
            this.state.selectedTags.forEach(w => {

                arrayTags.push(w.value);

            });
        }

        if(this.state.selectedBilling != null){
            this.state.selectedBilling.forEach(w => {

                arrayBilling.push(w.value);

            });
        }
        const tags = arrayTags;
        const service = this.state.service;
        const category = this.state.category;
        const billing = arrayBilling;
        const search_filter = arrayFilter;
        const job = this.state.job;
        const filter_presentation = this.state.filter_presentation;
        const { label,price,description } = this.state.prestation;
        const id = this.props.prestation_id;
        const calculating = null
        const cesu_eligible = this.state.cesu_eligible

        axios.put(`/myAlfred/api/admin/prestation/all/${id}`,{
          label,price,billing,category,service,search_filter,filter_presentation,
          calculating,job,description,tags, cesu_eligible})
            .then(res => {
                alert('Prestation modifiée avec succès');
                Router.push({pathname:'/dashboard/prestations/all'})
            })
            .catch(err => {
                console.error(err);
            })


    };

    handleClick() {
        const id = this.props.prestation_id;
        axios.delete(`/myAlfred/api/admin/prestation/all/${id}`)
            .then(res => {

                alert('Prestation supprimée avec succès');
                Router.push({pathname:'/dashboard/prestations/all'})
            })
            .catch(err => {
                console.error(err);
            })


    };


    render()  {
        const { classes } = this.props;
        const {prestation} = this.state;
        const {current_service} = this.state;
        const {current_billing} = this.state;
        const {current_category} = this.state;
        const {current_search_filter} = this.state;
        const {current_filter_presentation} = this.state;
        const {current_job} = this.state;
        const {current_tags} = this.state;
        const {all_category} = this.state;
        const {all_service} = this.state;
        const {all_billing} = this.state;
        const {all_search_filter} = this.state;
        const {all_filter_presentation} = this.state;
        const {all_job} = this.state;
        const {all_tags} = this.state;

        const categories = all_category.map(e => (

            <MenuItem value={e._id}>{e.label}</MenuItem>

        ));

        const options = all_search_filter.map(equipment => ({
            label: equipment.label,
            value: equipment._id
        }));

        const optionsTags = all_tags.map(tag => ({
            label: tag.label,
            value: tag._id
        }));

        const optionsBilling = all_billing.map(billing => ({
            label: billing.label,
            value: billing._id
        }));



        return (
            <Layout>
                <Grid container className={classes.loginContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>{prestation.label}</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="label"
                                        value={prestation.label}
                                        onChange={this.onChange}

                                    />
                                </Grid>
                                <Grid item style={{marginTop: 20, display: 'flex', 'align-items':'center'}} >
                                  <Checkbox
                                    name={`cesu_eligible`}
                                    checked={this.state.cesu_eligible}
                                    onChange={this.onCesuChange}
                                  />
                                  <Typography>Eligible au CESU</Typography>
                                </Grid>
                                <Grid item style={{marginTop: 20}}>
                                    <Typography style={{ fontSize: 20 }}>Prix moyen</Typography>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="price"
                                        value={prestation.price}
                                        onChange={this.onChange}

                                    />
                                </Grid>
                                { /**
                                  <Grid item style={{width: '100%',marginTop:20}}>
                                      <Typography style={{ fontSize: 20 }}>{current_category.label}</Typography>
                                      <FormControl className={classes.formControl} style={{width: '100%'}}>
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
                                */ }
                                <Grid item style={{width: '100%',marginTop:20}}>
                                    <Typography style={{ fontSize: 20 }}>{current_service.label}</Typography>
                                    <FormControl className={classes.formControl} style={{width: '100%'}}>
                                        <InputLabel shrink htmlFor="genre-label-placeholder">
                                            Service
                                        </InputLabel>
                                        <Select
                                            input={<Input name="service" id="genre-label-placeholder" />}
                                            displayEmpty
                                            name="service"
                                            value={this.state.service}
                                            onChange={this.onChange2}
                                            className={classes.selectEmpty}
                                        >
                                            <MenuItem value="">
                                                <em>...</em>
                                            </MenuItem>
                                            {all_service.map(e => (
                                                <MenuItem key={e._id} value={e._id} >
                                                    {e.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item style={{width: '100%',marginTop:20}}>
                                    <Typography style={{ fontSize: 20 }}>Méthodes de facturations</Typography>

                                    <FormControl className={classes.formControl} style={{width: '100%'}}>
                                        <Select2
                                            value={this.state.selectedBilling}
                                            onChange={this.handleChangeBilling}
                                            options={optionsBilling}
                                            isMulti
                                            isSearchable
                                            closeMenuOnSelect={false}

                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item style={{width: '100%',marginTop:20}}>
                                    <Typography style={{ fontSize: 20 }}>{current_filter_presentation.label}</Typography>
                                    <FormControl className={classes.formControl} style={{width: '100%'}}>
                                        <InputLabel shrink htmlFor="genre-label-placeholder">
                                            Filtre de présentation
                                        </InputLabel>
                                        <Select
                                            input={<Input name="filter_presentation" id="genre-label-placeholder" />}
                                            displayEmpty
                                            name="filter_presentation"
                                            value={this.state.filter_presentation}
                                            onChange={this.onChange2}
                                            className={classes.selectEmpty}
                                        >
                                            <MenuItem value="">
                                                <em>...</em>
                                            </MenuItem>
                                            {all_filter_presentation.map(e => (
                                                <MenuItem key={e._id} value={e._id} >
                                                    {e.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item style={{width: '100%',marginTop:20}}>
                                    <Typography style={{ fontSize: 20 }}>{current_job ? current_job.label : ''}</Typography>
                                    <FormControl className={classes.formControl} style={{width: '100%'}}>
                                        <InputLabel shrink htmlFor="genre-label-placeholder">
                                            Métier
                                        </InputLabel>
                                        <Select
                                            input={<Input name="job" id="genre-label-placeholder" />}
                                            displayEmpty
                                            name="job"
                                            value={this.state.job}
                                            onChange={this.onChange2}
                                            className={classes.selectEmpty}
                                        >
                                            <MenuItem key={''} value="">
                                                <em>...</em>
                                            </MenuItem>
                                            {all_job.map(e => (
                                                <MenuItem key={e._id} value={e._id} >
                                                    {e.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item style={{marginTop:20}}>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        multiline
                                        rows={4}
                                        name="description"
                                        value={prestation.description}
                                        onChange={this.onChange}
                                        helperText={"Description"}
                                    />
                                </Grid>
                                <Grid item style={{width: '100%',marginTop:20}}>
                                    <Typography style={{ fontSize: 20 }}>Tags</Typography>
                                    <FormControl className={classes.formControl} style={{width: '100%'}}>
                                        <Select2
                                            value={this.state.selectedTags}
                                            onChange={this.handleChangeTags}
                                            options={optionsTags}
                                            isMulti
                                            isSearchable
                                            closeMenuOnSelect={false}

                                        />
                                    </FormControl>
                                </Grid>



                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                        Modifier
                                    </Button>
                                    <Button type="button" variant="contained" color="secondary" style={{ width: '100%' }} onClick={this.handleClick}>
                                        Supprimer
                                    </Button>
                                </Grid>
                            </form>
                            <Link href={`editPicture?id=${this.props.prestation_id}`}>
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
