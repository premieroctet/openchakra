import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Router from "next/router";
import Modal from "@material-ui/core/Modal";
import EditPicture from "../../components/profile/editPicture";
import Card from "@material-ui/core/Card";
import Booking from "../../components/profile/booking";
import Messages from "../../components/profile/messages";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Prestations from '../../components/alfredDashboard/prestations';

moment.locale('fr');

const { config } = require('../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 70,
            flexGrow: 1,
    },
});
class home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            is_alfred: false


        };
    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user});



                if(user.is_alfred) {
                    this.setState({is_alfred: true})
                }

            })
            .catch(err => {
                    console.log(err);
                    localStorage.removeItem('token');
                    Router.push({pathname: '/login'})
                }
            );
    }


    render() {
        const {classes} = this.props;
        const {user} = this.state;
        const {is_alfred} = this.state;
        const unauthorized = <h3>Accès refusé</h3>;


        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        {is_alfred ?
                            <Fragment>

                                <Grid item xs={4}>
                                    <Grid container style={{width: '90%', borderRight: '0.5px solid lightgrey',height: '90vh'}}>
                                        <Grid container style={{display: 'flex',alignItems: 'center', justifyContent: 'center'}}>
                                            <Grid item>
                                                <img src={`../../../${user.picture}`} style={{borderRadius: '50%'}} alt="picture"/>

                                            </Grid>
                                            <Grid item style={{marginLeft: 10}}>
                                                <p>Bonjour,</p>
                                                <p>{user.name} {user.firstname}</p>
                                            </Grid>

                                        </Grid>


                                        <Grid container style={{display: 'flex',alignItems: 'center', justifyContent: 'center'}}>
                                            <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                                                <p>{user.email}</p>
                                            </Grid>
                                            <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                                                <p>{moment(user.birthday).format('L')}</p>
                                            </Grid>
                                            <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                                                <p>{user.phone}</p>
                                            </Grid>
                                            <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                                                <p>{user.job}</p>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <div style={{position: 'relative',width: '100%'}}>
                                               <Link href={"/dashboardAlfred/editShop"}>
                                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%', color: 'white',maxHeight:60
                                                        ,position: 'absolute',bottom: 0}}>
                                                        Modifier mon shop
                                                    </Button>
                                                </Link>
                                            </div>

                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={8}>

                                    <Grid container>
                                        <Grid item xs={6} style={{maxWidth: '45%'}}>
                                            <AppBar position="sticky" color="inherit" style={{height: 48}}>
                                                <Toolbar style={{minHeight: 48}}>
                                                    <Typography variant="h6" style={{fontSize: 14,textTransform: "uppercase"}} color="inherit">
                                                        Statistiques
                                                    </Typography>
                                                </Toolbar>
                                            </AppBar>
                                            <Card style={{paddingLeft: 30}}>
                                                <p>Nombre de vues du shop : {user.number_of_views}</p><br/>
                                                <p>Nombre d'avis : {user.number_of_reviews}</p><br/>
                                                <p>Note globale : {user.score}</p><br/>
                                                {user.super_alfred ? <p>Vous êtes un super Alfred</p> : <p>Vous n'êtes pas un super Alfred</p>}

                                            </Card>
                                        </Grid>
                                        <Grid item xs={6} style={{marginLeft: 10}}>
                                            <Card>
                                                <AppBar position="sticky" color="inherit" style={{height: 48}}>
                                                    <Toolbar style={{minHeight: 48}}>
                                                        <Typography variant="h6" style={{fontSize: 14,textTransform: "uppercase"}} color="inherit">
                                                            Mes Revenus
                                                        </Typography>
                                                    </Toolbar>
                                                </AppBar>


                                            </Card>
                                        </Grid>
                                    </Grid>
                                    <Grid container style={{marginTop: 30}}>

                                        <Grid item xs={12}>
                                            <Card style={{height: 300, overflowY:"auto"}}>
                                                <AppBar position="sticky" color="inherit" style={{height: 48}}>
                                                    <Toolbar style={{minHeight: 48}}>
                                                        <Typography variant="h6" style={{fontSize: 14,textTransform: "uppercase"}} color="inherit">
                                                            Mes prestations réalisées
                                                        </Typography>
                                                    </Toolbar>
                                                </AppBar>

                                                <Prestations/>
                                            </Card>
                                        </Grid>

                                    </Grid>


                                </Grid>








                            </Fragment>
                            : unauthorized}
                    </Grid>
                </Layout>
            </Fragment>
        );
    };
}

export default withStyles(styles)(home);
