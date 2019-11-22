import React, { Fragment } from 'react';
import Layout from '../hoc/Layout/Layout';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import axios from "axios";
import Router from "next/dist/client/router";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Link from 'next/link';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import moment from "moment";


const _ = require('lodash');

const { config } = require('../config/config');
const url = config.apiUrl;
moment.locale('fr');
const styles = theme => ({
    bigContainer: {
        marginTop: 80
    }
});

class searchHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            serviceUser: [],
            copyService: [],
            copyFilterPro: [],
            copyFilterParticulier: [],
            uniqCategory: '',
            uniqShop: [],
            idAlfred: [],
            checkedB: false,
            checkedParticulier: false,
        }
    }

    static getInitialProps ({ query: { service, serviceLabel, city, date, dateISO, day, hour } }) {
        return { service_id: service, service_label: serviceLabel,city:city, date:date, dateISO: dateISO,day:day, hour:hour }

    }

    componentDidMount() {
        const service_id = this.props.service_id;
        const service_label = this.props.service_label;
        const city = this.props.city;
        const date = this.props.date;
        const dateISO = this.props.dateISO;
        const day = this.props.day;
        const hour = this.props.hour;

        const obj = {
      service:service_id, city:city, date:date, day:day,hour:hour,serviceLabel:service_label, dateISO:dateISO
    };
    axios.post(url+'myAlfred/api/serviceUser/home/search',obj)
        .then(res => {
            let serviceUser = res.data;
          this.setState({serviceUser: serviceUser, copyService:serviceUser});
          serviceUser.forEach(s => {
              this.setState({uniqCategory: s.service.category.label})
          })
        })
        .catch(err => console.log(err))
    }

    search(){
        const service_id = this.props.service_id;
        const service_label = this.props.service_label;
        const city = this.props.city;
        const date = this.props.date;
        const dateISO = this.props.dateISO;
        const day = this.props.day;
        const hour = this.props.hour;

        const obj = {
            service:service_id, city:city, date:date, day:day,hour:hour,serviceLabel:service_label, dateISO:dateISO
        };
        axios.post(url+'myAlfred/api/serviceUser/home/search',obj)
            .then(res => {
                let serviceUser = res.data;
                this.setState({serviceUser: serviceUser, copyService:serviceUser});
                serviceUser.forEach(s => {
                    this.setState({uniqCategory: s.service.category.label})
                })
            })
            .catch(err => console.log(err))
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.checked} );
    };

    async filter(){
        const arrayShop = [];
        this.setState({idAlfred:[]});
        const serviceUser = this.state.serviceUser;
            serviceUser.forEach(s => {
                axios.get(url+'myAlfred/api/shop/alfred/'+s.user._id)
                    .then( res => {
                        let shop = res.data;
                        const index = arrayShop.findIndex(i=>i._id == shop._id);
                        if(index === -1){
                            arrayShop.push(shop);

                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            });
            await this.setState({uniqShop: arrayShop});
            if(this.state.checkedB){
                this.setState({idAlfred:[]});
                setTimeout(()=>{

                    const arrayService = this.state.serviceUser;
                    const arrayIndex = [];
                    this.state.uniqShop.forEach(u => {
                        if(u.is_particular){
                            this.state.idAlfred.push(u.alfred._id)
                        }
                    });
                    this.state.serviceUser.forEach((f,index) => {
                        this.state.idAlfred.forEach(i => {
                            if(f.user._id === i){
                                arrayIndex.push(index);
                            }
                        })
                    });
                    for (let t = arrayIndex.length -1; t >= 0; t--){
                        arrayService.splice(arrayIndex[t],1);
                    }
                    this.setState({serviceUser:arrayService,copyFilterPro:arrayService});

                    },2000)
            } else {
                this.search();
            }
    }

    async filterParticulier(){
            const arrayShop = [];
            const serviceUser = this.state.serviceUser;
            serviceUser.forEach(s => {
                axios.get(url + 'myAlfred/api/shop/alfred/' + s.user._id)
                    .then(res => {
                        let shop = res.data;
                        const index = arrayShop.findIndex(i => i._id == shop._id);
                        if (index === -1) {
                            arrayShop.push(shop);

                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            });
            await this.setState({uniqShop: arrayShop});

            if(this.state.checkedParticulier){
                this.setState({idAlfred:[]});
                setTimeout(() => {

                    const arrayService = this.state.serviceUser;
                    const arrayIndex = [];
                    this.state.uniqShop.forEach(u => {
                        if (u.is_professional) {
                            this.state.idAlfred.push(u.alfred._id)
                        }
                    });
                    this.state.serviceUser.forEach((f, index) => {
                        this.state.idAlfred.forEach(i => {
                            if (f.user._id === i) {
                                arrayIndex.push(index);
                            }
                        })
                    });
                    for (let t = arrayIndex.length - 1; t >= 0; t--)
                        arrayService.splice(arrayIndex[t], 1);

                    this.setState({serviceUser: arrayService,copyFilterParticulier:arrayService});

                }, 2000)
            } else {
                this.search();

            }
    }

    render() {
        const {classes} = this.props;
        const serviceUser = this.state.serviceUser;
        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        <Grid container>
                            {this.state.checkedParticulier ? <Grid item xs={3}></Grid> :

                                <Grid item xs={3}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.checkedB}
                                                onChange={e=>{this.handleChange(e);this.filter()}}
                                                value={this.state.checkedB}
                                                color="primary"
                                                name={'checkedB'}
                                            />
                                        }
                                        label="Pro"
                                    />
                                </Grid>
                            }

                            {this.state.checkedB ? null : <Grid item xs={3}>



                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.checkedParticulier}
                                            onChange={e=>{this.handleChange(e);this.filterParticulier()}}
                                            value={this.state.checkedParticulier}
                                            color="primary"
                                            name={'checkedParticulier'}
                                        />
                                    }
                                    label="Particulier"
                                />


                            </Grid>}
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                    <h3>{this.state.uniqCategory}</h3>
                            </Grid>


                                            {serviceUser.map((a,index) => (

                                                        <Grid key={index} item xs={3}>
                                                            <Card>
                                                                <p>{a.service.label} par {a.user.firstname}</p>

                                                                <p>{a.service_address.city}
                                                                </p>
                                                            </Card>
                                                        </Grid>
                                                    )

                                            )}
                                </Grid>
                    </Grid>
                </Layout>
            </Fragment>

        )
    }
}


export default withStyles(styles)(searchHome);
