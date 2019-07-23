import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from "@material-ui/core/Typography";
import EditInformations from '../components/profile/editInformations';
import EditPassword from '../components/profile/editPassword';
import EditAddress from '../components/profile/editAddress';
import EditOtherAddress from '../components/profile/editOtherAddress';
import Booking from '../components/profile/booking';
import Messages from '../components/profile/messages';
import EditPicture from '../components/profile/editPicture';
import Modal from "@material-ui/core/Modal";

moment.locale('fr');

const { config } = require('../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 70,
        flexGrow: 1,
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: 'white',
        border: '1px solid lightgrey',
        borderRadius: 6,
        outline: 'none',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },

});

class profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            address: false,
            job: false,
            phone: false,
            currentAddress: {},
            otherAddress: false,
            currentOtherAddress: {},
            picture: false,
            currentPicture: '',
            is_alfred: false,
            value: 0,
            setValue: 0,
            value2: 0,
            setValue2: 0,
            open: false,

        };
        this.handleChangeTabs = this.handleChangeTabs.bind(this);
        this.handleChangeTabs2 = this.handleChangeTabs2.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user});


                if(typeof user.billing_address != 'undefined') {
                    this.setState({address: true, currentAddress: user.billing_address})
                } else {
                    this.setState({address:false})
                }
                if(typeof user.phone != "undefined") {
                    this.setState({phone: true})
                } else {
                    this.setState({phone: false})
                }
                if(typeof user.job != "undefined") {
                    this.setState({job: true})
                } else {
                    this.setState({job: false})
                }
                if(typeof user.picture !="undefined") {
                    this.setState({picture: true})
                } else {
                    this.setState({picture: false})
                }
                if(typeof user.service_address === "undefined") {
                    this.setState({otherAddress:false})
                } else {
                    this.setState({otherAddress: true, currentOtherAddress: user.service_address})
                }

                if(user.is_alfred) {
                    this.setState({is_alfred: true})
                }





            })
            .catch(err => {
                    console.log(err);
                if(err.response.status === 401 || err.response.status === 403) {
                    localStorage.removeItem('token');
                    Router.push({pathname: '/login'})
                }
            }
            );
    }

    handleChangeTabs(event, value) {
        this.setState({value});
    }

    handleChangeTabs2(event, value2) {
        this.setState({value2});
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };


    render() {
        const {classes} = this.props;
        const {user} = this.state;
        const alfred = this.state.is_alfred;
        const address = this.state.address;
        const otherAddress = this.state.otherAddress;
        const phone = this.state.phone;
        const job = this.state.job;
        const picture = this.state.picture;
        const link = <Link href={"/addAddress"}><a>Ajouter une adresse</a></Link>;
        const link2 = <Link href={"/addOtherAddress"}><a>Ajouter une seconde adresse</a></Link>;
        const addPicture = <Link href={"/addPicture"}><a>Ajouter une photo de profile</a></Link>;
        const {currentAddress} = this.state;
        const {currentOtherAddress} = this.state;
        const currentPicture = <img src={`../../${user.picture}`} style={{borderRadius: '50%',cursor:"pointer"}} alt="picture" onClick={this.handleOpen}/>;

        const fullAddress = <React.Fragment><h4>Adresse principale</h4>
            <p>Adresse : {currentAddress.address}</p>
            <p>Ville : {currentAddress.city}</p>
            <p>Code postal : {currentAddress.zip_code}</p>
            <p>Pays : {currentAddress.country}</p>
        </React.Fragment>;

        const fullOtherAddress = <React.Fragment><h4>Autre adresse</h4>
            <p>Adresse : {currentOtherAddress.address}</p>
            <p>Ville : {currentOtherAddress.city}</p>
            <p>Code postal : {currentOtherAddress.zip_code}</p>
            <p>Pays : {currentOtherAddress.country}</p></React.Fragment>
        ;

        const addPhone = <Link href={"/addPhone"}><a>Ajouter un téléphone</a></Link>;
        const currentPhone = <p>{user.phone}</p>;

        const addJob = <Link href={"/addJob"}><a>Ajouter un emploi</a></Link>;
        const currentJob = <p>Métier : {user.job}</p>;

        const {value} = this.state;
        const {value2} = this.state;

        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>

                        <Grid item xs={4}>
                            <Grid container style={{width: '90%', borderRight: '0.5px solid lightgrey',height: '90vh'}}>
                                <Grid container style={{display: 'flex',alignItems: 'center', justifyContent: 'center'}}>
                                <Grid item>
                                    {picture ? currentPicture : addPicture}

                                </Grid>
                                    <Grid item style={{marginLeft: 10}}>
                                        <p>Bonjour,</p>
                                        <p>{user.name} {user.firstname}</p>
                                    </Grid>

                                </Grid>

                                {/*<Button size="small" color={'primary'} type={'button'} onClick={this.handleOpen}>
                                        Modifier ma photo
                                    </Button>*/}
                                    <Modal
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                        open={this.state.open}
                                        onClose={this.handleClose}
                                    >
                                        <div className={classes.paper}>
                                            <EditPicture/>
                                        </div>
                                    </Modal>


                            <Grid container style={{display: 'flex',alignItems: 'center', justifyContent: 'center'}}>
                                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                                    <p>{user.email}</p>
                                </Grid>
                                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                                    <p>{moment(user.birthday).format('L')}</p>
                                </Grid>
                                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                                    {phone ? currentPhone : addPhone}
                                </Grid>
                                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                                    {job ? currentJob : addJob}
                                </Grid>
                            </Grid>
                            <Grid container>
                            {alfred ? <Link href={"/dashboardAlfred/home"}>
                                <Button type="submit" variant="contained" color="primary" style={{ width: '100%', color: 'white' }}>
                                    Dashboard Alfred
                                </Button>
                            </Link> : ''}

                            </Grid>
                        </Grid>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container>


                            <Grid container>
                                <Grid item xs={6}>
                                    <Card>
                                        <AppBar position="static" color={'primary'}>
                                            <Tabs value={value} indicatorColor={'secondary'} onChange={this.handleChangeTabs}>
                                                <Tab label="Informations" />
                                                <Tab label="Sécurité" />
                                            </Tabs>
                                        </AppBar>
                                        {value === 0 && <TabContainer>
                                            <EditInformations/>
                                        </TabContainer>}

                                        {value === 1 && <TabContainer>
                                            <EditPassword/>
                                        </TabContainer>}


                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card>
                                        <AppBar position="static" color={'primary'}>
                                            <Tabs value={value2} indicatorColor={'secondary'} onChange={this.handleChangeTabs2}>
                                                <Tab label="Adresse principale" />
                                                <Tab label="Adresse secondaire" />
                                            </Tabs>
                                        </AppBar>
                                        {value2 === 0 && <TabContainer>
                                            <EditAddress/>
                                        </TabContainer>}

                                        {value2 === 1 && <TabContainer>
                                            <EditOtherAddress/>
                                        </TabContainer>}


                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Card>
                                        <Booking/>

                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card>
                                        <Messages/>


                                    </Card>
                                </Grid>
                            </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Layout>

            </Fragment>
        );
    };
}

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

export default withStyles(styles)(profile);
