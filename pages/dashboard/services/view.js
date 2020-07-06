import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select2 from 'react-select';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

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
            location: {},
            home: false,
            alfred: false,
            visio: false,
            isChecked: false,
            selectedOption: null,
            selectedTags: null,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleChangeTags = this.handleChangeTags.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onTaxChange = this.onTaxChange.bind(this);
    }

    static getInitialProps ({ query: { id } }) {
        return { service_id: id }

    }
    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        const id = this.props.service_id;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(`/myAlfred/api/admin/service/all/${id}`)
            .then(response => {
                let service = response.data;
                console.log("Received from API:"+JSON.stringify(service));
                this.setState({service: service, current_tags: service.tags, current_equipments: service.equipments, current_category: service.category,
                category: service.category._id,location:service.location,home:service.location.home, alfred:service.location.alfred,visio: service.location.visio});

                if(service.majoration != null) {
                    this.setState({isChecked: true})
                }

                this.setState({selectedOption :this.state.current_equipments.map(a => ({
                        label: a.label,
                        value: a._id
                    })) });

                this.setState({selectedTags :this.state.current_tags.map(b => ({
                        label: b.label,
                        value: b._id
                    })) });




            })
            .catch(err => {
                console.error(err);
                if(err.response.status === 401 || err.response.status === 403 ) {
                    localStorage.removeItem('token');
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

        axios.get("/myAlfred/api/admin/tags/all")
            .then((response) => {
                let tags = response.data;
                this.setState({all_tags: tags})
            }).catch((error) => {
            console.log(error)
        });

        axios.get("/myAlfred/api/admin/equipment/all")
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

    onChangeLocation = e => {
      console.log("onChangeLocation");
      const service = this.state.service;
      service.location[e.target.name]=e.target.checked
      this.setState({service: service})
    }

    onChange2 = e => {
        this.setState({ category: e.target.value });
    };

    handleChange = e => {
        this.setState({tags: e.target.value})


    };

    handleChange2 = e => {
        this.setState({equipments: e.target.value})


    };

    handleChangeSelect = selectedOption => {
        this.setState({ selectedOption });

    };

    handleChangeTags = selectedTags => {
        this.setState({ selectedTags });

    };

    handleChecked () {
        this.setState({isChecked: !this.state.isChecked});
    }

    handleChecked2 () {
        this.setState({home: !this.state.home});
    }
    handleChecked3 () {
        this.setState({alfred: !this.state.alfred});
    }
    handleChecked4 () {
        this.setState({visio: !this.state.visio});
    }

    onTaxChange = e => {
      console.log("onTaxChange");
      let service = this.state.service;
      service[e.target.name]=e.target.checked;
      this.setState({service: service});
    }


    onSubmit = e => {
        e.preventDefault();
        let arrayEquipments = [];
        let arrayTags = [];
        if(this.state.selectedOption != null){
            this.state.selectedOption.forEach(c => {

                arrayEquipments.push(c.value);

            });
        }

        if(this.state.selectedTags != null){
            this.state.selectedTags.forEach(w => {

                arrayTags.push(w.value);

            });
        }

        const tags = arrayTags;
        const category = this.state.category;
        const equipments = arrayEquipments;
        const id = this.props.service_id;
        const service = this.state.service;
        const { label,description,majoration } = service;
        const location = service.location;
        const travel_tax = service.travel_tax;
        const pick_tax = service.pick_tax;

        axios.put(`/myAlfred/api/admin/service/all/${id}`,
	{label,description,tags,category,equipments,majoration,location, travel_tax, pick_tax})
            .then(res => {

                alert('Service modifié avec succès');
                Router.push({pathname:'/dashboard/services/all'})
            })
            .catch(err => {
                console.error(err);
                if(err.response.status === 401 || err.response.status === 403 ) {
                    localStorage.removeItem('token');
                    Router.push({pathname: '/login'})
                }
            })


    };

    handleClick() {
        const id = this.props.service_id;
        axios.delete(`/myAlfred/api/admin/service/all/${id}`)
            .then(res => {

                alert('Service supprimé avec succès');
                Router.push({pathname:'/dashboard/services/all'})
            })
            .catch(err => {
                console.error(err);
                if(err.response.status === 401 || err.response.status === 403 ) {
                    localStorage.removeItem('token');
                    Router.push({pathname: '/login'})
                }
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

        console.log("Render service:"+JSON.stringify(service));

        const categories = all_category.map(e => (

            <MenuItem value={e._id}>{e.label}</MenuItem>

        ));

        const options = all_equipments.map(equipment => ({
            label: equipment.label,
            value: equipment._id
        }));

        const optionsTags = all_tags.map(tag => ({
            label: tag.label,
            value: tag._id
        }));





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
                                <Grid item style={{width: '100%',marginTop: 20}}>
                                    <Typography style={{ fontSize: 20 }}>Catégorie</Typography>
                                    <FormControl className={classes.formControl} style={{width: '100%'}}>
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
                                <Grid item style={{width: '100%',marginTop: 20}}>
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
                                <Grid item style={{width: '100%',marginTop: 20}}>
                                    <Typography style={{ fontSize: 20 }}>Equipements</Typography>
                                    <FormControl className={classes.formControl} style={{width: '100%'}}>
                                        <Select2
                                            value={this.state.selectedOption}
                                            onChange={this.handleChangeSelect}
                                            options={options}
                                            isMulti
                                            isSearchable
                                            closeMenuOnSelect={false}

                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item style={{marginTop: 20}}>
                                    <Typography style={{ fontSize: 20 }}>Options possibles</Typography>
                                <FormControlLabel
                                  control={
                                    <Checkbox color="primary" icon={<CircleUnchecked/>} checkedIcon={<RadioButtonCheckedIcon />}
                                       checked={service.location?service.location.alfred:false} value={service.location?service.location.alfred:false} name="alfred" onChange={this.onChangeLocation} />
                                  }
                                  label={<React.Fragment> <p style={{fontFamily: 'Helvetica'}}>Chez l'Alfred</p> </React.Fragment>}
                                 />
                                <FormControlLabel
                                  control={
                                    <Checkbox color="primary" icon={<CircleUnchecked/>} checkedIcon={<RadioButtonCheckedIcon />}
                                       checked={service.location?service.location.client:false} value={service.location?service.location.client:false} name="client" onChange={this.onChangeLocation} />
                                  }
                                  label={<React.Fragment> <p style={{fontFamily: 'Helvetica'}}>Chez le client</p> </React.Fragment>}
                                 />
                                <FormControlLabel
                                  control={
                                    <Checkbox color="primary" icon={<CircleUnchecked/>} checkedIcon={<RadioButtonCheckedIcon />}
                                       checked={service.location?service.location.visio:false} value={service.location?service.location.visio:false} name="visio" onChange={this.onChangeLocation} />
                                  }
                                  label={<React.Fragment> <p style={{fontFamily: 'Helvetica'}}>En visioconférence</p> </React.Fragment>}
                                 />
                                <Typography style={{ fontSize: 20 }}>Frais possibles</Typography>
                                <FormControlLabel
                                  control={
                                    <Checkbox color="primary" icon={<CircleUnchecked/>} checkedIcon={<RadioButtonCheckedIcon />}
                                       checked={service.travel_tax?"checked":""} value={service.travel_tax} name="travel_tax" onChange={this.onTaxChange} />
                                  }
                                  label={<React.Fragment> <p style={{fontFamily: 'Helvetica'}}>Frais de déplacement</p> </React.Fragment>}
                                 />
                                <FormControlLabel
                                  control={
                                    <Checkbox color="primary" icon={<CircleUnchecked/>} checkedIcon={<RadioButtonCheckedIcon />}
                                       checked={service.pick_tax?"checked":""} value={service.pick_tax} name="pick_tax" onChange={this.onTaxChange} />
                                  }
                                  label={<React.Fragment> <p style={{fontFamily: 'Helvetica'}}>Frais de retrait&livraison</p> </React.Fragment>}
                                 />
                                </Grid>

                                <Grid item style={{marginTop: 20}}>
                                    <Typography style={{ fontSize: 20 }}>Description</Typography>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="description"
                                        value={service.description}
                                        onChange={this.onChange}
                                        multiline
                                        rows={4}

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
                                <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.home}
                                            onChange={()=>this.handleChecked2()}
                                            value={this.state.home}
                                            color="primary"
                                            name={"home"}
                                        />
                                    }
                                    label="Home"
                                />
                            </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.alfred}
                                                onChange={()=>this.handleChecked3()}
                                                value={this.state.alfred}
                                                color="primary"
                                                name={"alfred"}
                                            />
                                        }
                                        label="Alfred"
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.visio}
                                                onChange={()=>this.handleChecked4()}
                                                value={this.state.visio}
                                                color="primary"
                                                name={"visio"}
                                            />
                                        }
                                        label="Visio"
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
