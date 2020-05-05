import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import {Helmet} from 'react-helmet';
import styles from './transactions/transactionsStyle'
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

moment.locale('fr');


class transactions extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            user: {},
            tabs: false,
            paid: [],
            paidSoon: []
        }
        this.callDrawer = this.callDrawer.bind(this)
    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get('/myAlfred/api/users/current')
            .then(res => {
                this.setState({user: res.data});
            })
            .catch(err => {
                    if(err.response.status === 401 || err.response.status === 403) {
                        localStorage.removeItem('token');
                        Router.push({pathname: '/login'})
                    }
                }
            );

        axios.get('/myAlfred/api/booking/account/paid')
            .then(res => {
                this.setState({paid: res.data})
            })
            .catch();

        axios.get('/myAlfred/api/booking/account/paidSoon')
            .then(res => {
                this.setState({paidSoon: res.data})
            })
            .catch()
    }
    handleClicktabs2 =() => {
        this.setState({ tabs: true });
    };

    handleClicktabs =() => {
        this.setState({ tabs: false });
    };

    callDrawer(){
        this.child.current.handleDrawerToggle();
    }


    render() {
        const {classes} = this.props;
        const {tabs, paid, paidSoon} = this.state;

        return (
            <Fragment>
            <Helmet>
                <title>compte - Historique des transactions - My Alfred </title>
                <meta property="description" content="Retrouvez l'ensemble des services rémunérés que vous avez consommé sur My Alfred depuis votre historique des transactions. My Alfred des services entre particuliers assurés, un paiement sécurisé ! " />
              </Helmet>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        <Grid style={{zIndex: 0}}>
                            <ResponsiveDrawer ref={this.child} isActiveIndex={3}/>
                        </Grid>
                        <Grid>
                            <Grid>
                                <IconButton
                                  color="inherit"
                                  aria-label="open drawer"
                                  edge="start"
                                  onClick={this.callDrawer}
                                  className={classes.menuButton}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={9} className={classes.containerLeft}>
                            <Grid container className={classes.tabweb} style={{paddingRight:20}}>
                                <Grid item xs={12}>
                                    <h1 style={{color: 'dimgray',fontWeight: '100'}}>Historique des transactions</h1>
                                </Grid>
                                <Grid item xs={6} style={{textAlign:"center"}}>
                                    <h2 onClick={this.handleClicktabs} style={{color:'#828181',fontWeight: '100',cursor: 'pointer',marginLeft: '0%',position: 'sticky'}}>Commandes passées</h2>
                                </Grid>
                                <Grid item xs={6} style={{textAlign:"center"}}>
                                    <h2 onClick={this.handleClicktabs2}  style={{color:'#828181',fontWeight: '100',cursor: 'pointer',marginLeft: '0%',position: 'sticky'}}>Commandes à venir</h2><br/>
                                </Grid>

                                <Grid item xs={6}>
                                    {tabs ?
                                        <React.Fragment>
                                            <hr className={classes.trait1} style={{marginTop:'-10px'}}/>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <hr className={classes.trait3} style={{marginTop:'-10px'}}/>
                                        </React.Fragment>}
                                </Grid>
                                <Grid item xs={6}>
                                    {tabs ?
                                        <React.Fragment>
                                            <hr className={classes.trait} style={{marginTop:'-10px'}}/>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <hr className={classes.trait2} style={{marginTop:'-10px'}}/>
                                        </React.Fragment>}
                                </Grid>

                            </Grid>
                            <Grid container className={classes.tabmobile}>
                                <Grid item xs={6} style={{textAlign:"center"}}>
                                    <h2 onClick={this.handleClicktabs} style={{color:'#828181',fontWeight: '100',cursor: 'pointer',marginLeft: '25%'}}>Commandes passées</h2>
                                </Grid>
                                <Grid item xs={6} >
                                    <h2 onClick={this.handleClicktabs2}  style={{color:'#828181',fontWeight: '100', textAlign: 'center',cursor: 'pointer'}}>Commandes à venir</h2><br/>
                                </Grid>

                                <Grid item xs={6} style={{textAlign:"center"}}>
                                    {tabs ?
                                        <React.Fragment>
                                            <hr className={classes.trait1}/>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <hr className={classes.trait3}/>
                                        </React.Fragment>}
                                </Grid>
                                <Grid item xs={6} >
                                    {tabs ?
                                        <React.Fragment>
                                            <hr className={classes.trait}/>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <hr className={classes.trait2}/>
                                        </React.Fragment>}
                                </Grid>


                            </Grid>

                            <Grid container style={{marginBottom:20, marginTop: '50px'}}>
                                {tabs ?
                                <React.Fragment>

                                        <Grid className={classes.historesp} container>
                                            {paidSoon.map((e,index) => (
                                                <Grid key={index} container style={{borderBottom: '#9f919178 solid 1px', padding: '20px 0'}}>
                                                    <Grid item xs={8}>
                                                        <Typography style={{marginBottom: '30px', fontSize: '1.1rem'}}>{e.end_date}</Typography>
                                                        <Typography style={{marginBottom: '30px', fontSize: '1.1rem'}}>{e.alfred.firstname} - {e.date_prestation} - {e.service}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography style={{color: '#26A7C6', textAlign: 'center',marginTop: '20px', fontSize: '1.5rem'}}>{e.amount.toFixed(2)}€</Typography>
                                                    </Grid>
                                                </Grid>
                                            ))}

                                        </Grid>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <Grid className={classes.historesp} container>
                                        {paid.map((e,index) => (
                                            <Grid key={index} container style={{borderBottom: '#9f919178 solid 1px', padding: '20px 0'}}>
                                                <Grid item xs={8}>
                                                    <Typography style={{marginBottom: '30px', fontSize: '1.1rem'}}>{moment(e.date_payment).format('DD/MM/YYYY')}</Typography>
                                                    <Typography style={{marginBottom: '30px', fontSize: '1.1rem'}}>{e.alfred.firstname} - {e.date_prestation} - {e.service}</Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography style={{color: '#26A7C6', textAlign: 'center',marginTop: '20px', fontSize: '1.5rem'}}>{e.amount.toFixed(2)}€</Typography>
                                                </Grid>
                                            </Grid>
                                        ))}

                                    </Grid>
                                </React.Fragment>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Layout>
                {/* <Footer/>*/}


            </Fragment>
        );
    };
}



export default withStyles(styles)(transactions);
