import React, {Fragment} from 'react';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import '../../static/charts.css';
import styles from './revenus/revenusStyle';

/**
const Chart = dynamic(import('react-apexcharts'), {
    ssr: false,
})
*/
import loadable from 'loadable-components';
import NavBarShop from '../../components/NavBar/NavBarShop/NavBarShop';
import NavbarMobile from '../../components/NavbarMobile/NavbarMobile';
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import cookie from 'react-cookies'

const Chart = loadable(() => import('react-apexcharts'));

moment.locale('fr');

class revenus extends React.Component {

    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            userId: '',
            options: {
                chart: {
                    toolbar: {
                        show: true,
                        tools: {
                            download: true,
                            selection: true,
                            zoom: true,
                            zoomin: true,
                            zoomout: true,
                            pan: true,
                            reset: true | '<img src="/static/icons/reset.png" width="20">',
                            customIcons: []
                        },
                        autoSelected: 'zoom'
                    }
                },
                dropShadow: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    blur: 3,
                    opacity: 0.5
                },
                theme: {
                    monochrome: {
                        enabled: true,
                        color: '#2FBCD3',
                        shadeTo: 'light',
                        shadeIntensity: 0.65
                    }
                },
                xaxis: {
                    categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août','Septembre','Octobre','Novembre','Décembre']
                }
            },
            revenus: [
                {
                    name: 'revenus',
                    data: [0,0,0,0,0,0,0,0,0,0,0,0],
                }
            ],
            bookings: [],
            january: [],
            januaryAmount: 0,
            february: [],
            februaryAmount: 0,
            march: [],
            marchAmount: 0,
            april: [],
            aprilAmount: 0,
            may: [],
            mayAmount: 0,
            june: [],
            juneAmount: 0,
            july: [],
            julyAmount: 0,
            august: [],
            augustAmount: 0,
            september: [],
            septemberAmount: 0,
            october: [],
            octoberAmount: 0,
            november: [],
            novemberAmount: 0,
            december: [],
            decemberAmount: 0,
            year: new Date().getFullYear(),
            totalYear: 0,
            totalPaid: 0,
            totalComing: 0,
        };
        this.handleChange=this.handleChange.bind(this);
        this.callDrawer = this.callDrawer.bind(this)
    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = cookie.load('token')
        const revenus1layer = this.state.revenus;
        revenus1layer.forEach((revenus1layerbis) => {
            const revenus2layer = revenus1layerbis.data;
            revenus2layer.forEach((revenus2layerbis) => {
                const revenusall = revenus2layerbis.x;

            })
        });
        const newRevenus = [];
        const year = new Date().getFullYear();
        axios.get('/myAlfred/api/performances/incomes/'+year)
            .then(res => {
                let bookings = res.data;
                this.setState({bookings:bookings});
                this.setState({january:bookings[0],february:bookings[1],march:bookings[2],april:bookings[3],may:bookings[4],june:bookings[5],july:bookings[6],
                                     august:bookings[7],september:bookings[8],october:bookings[9],november:bookings[10],december:bookings[11]});

                this.state.january.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({januaryAmount:this.state.januaryAmount+amount})
                });
                this.state.february.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({februaryAmount:this.state.februaryAmount+amount})
                });
                this.state.march.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({marchAmount:this.state.marchAmount+amount})
                });
                this.state.april.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({aprilAmount:this.state.aprilAmount+amount})
                });
                this.state.may.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({mayAmount:this.state.mayAmount+amount})
                });
                this.state.june.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({juneAmount:this.state.juneAmount+amount})
                });
                this.state.july.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({julyAmount:this.state.julyAmount+amount})
                });
                this.state.august.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({augustAmount:this.state.augustAmount+amount})
                });
                this.state.september.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({septemberAmount:this.state.septemberAmount+amount})
                });
                this.state.october.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({octoberAmount:this.state.octoberAmount+amount})
                });
                this.state.december.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({decemberAmount:this.state.decemberAmount+amount})
                });
                this.state.november.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({novemberAmount:this.state.novemberAmount+amount})
                });
                newRevenus.push({data:[this.state.januaryAmount,this.state.februaryAmount,this.state.marchAmount,this.state.aprilAmount,this.state.mayAmount,
                        this.state.juneAmount,this.state.julyAmount,this.state.augustAmount,this.state.septemberAmount,this.state.octoberAmount,
                        this.state.novemberAmount,this.state.decemberAmount],name:'revenus'});
                this.setState({revenus: newRevenus});
                this.setState({totalPaid:this.state.januaryAmount+this.state.februaryAmount+this.state.marchAmount+this.state.aprilAmount+this.state.mayAmount+
                    this.state.juneAmount+this.state.julyAmount+this.state.augustAmount+this.state.septemberAmount+this.state.octoberAmount+
                    this.state.novemberAmount+this.state.decemberAmount});
            })
            .catch(err => console.error(err))
        axios.get('/myAlfred/api/performances/incomes/totalComing/'+year)
            .then(res => {
                this.setState({totalComing: parseInt(res.data),totalYear:parseInt(res.data)+this.state.totalPaid});
            })
            .catch(err => console.error(err))

        axios.get('/myAlfred/api/users/current').then(res => {
            let user = res.data;
            if(user) {
                this.setState({
                    userId: user._id,
                })
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    async handleChange(e) {
        this.setState({bookings: [],
            january: [],
            januaryAmount: 0,
            february: [],
            februaryAmount: 0,
            march: [],
            marchAmount: 0,
            april: [],
            aprilAmount: 0,
            may: [],
            mayAmount: 0,
            june: [],
            juneAmount: 0,
            july: [],
            julyAmount: 0,
            august: [],
            augustAmount: 0,
            september: [],
            septemberAmount: 0,
            october: [],
            octoberAmount: 0,
            november: [],
            novemberAmount: 0,
            december: [],
            decemberAmount: 0,totalYear: 0,
            totalPaid: 0,
            totalComing: 0,});
        const newRevenus = [];
        await this.setState({year:e.target.value});
        axios.get('/myAlfred/api/performances/incomes/'+this.state.year)
            .then(res => {
                let bookings = res.data;
                this.setState({bookings:bookings});
                this.setState({january:bookings[0],february:bookings[1],march:bookings[2],april:bookings[3],may:bookings[4],june:bookings[5],july:bookings[6],
                    august:bookings[7],september:bookings[8],october:bookings[9],november:bookings[10],december:bookings[11]});

                this.state.january.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({januaryAmount:this.state.januaryAmount+amount})
                });
                this.state.february.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({februaryAmount:this.state.februaryAmount+amount})
                });
                this.state.march.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({marchAmount:this.state.marchAmount+amount})
                });
                this.state.april.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({aprilAmount:this.state.aprilAmount+amount})
                });
                this.state.may.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({mayAmount:this.state.mayAmount+amount})
                });
                this.state.june.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({juneAmount:this.state.juneAmount+amount})
                });
                this.state.july.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({julyAmount:this.state.julyAmount+amount})
                });
                this.state.august.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({augustAmount:this.state.augustAmount+amount})
                });
                this.state.september.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({septemberAmount:this.state.septemberAmount+amount})
                });
                this.state.october.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({octoberAmount:this.state.octoberAmount+amount})
                });
                this.state.december.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({decemberAmount:this.state.decemberAmount+amount})
                });
                this.state.november.forEach(e => {
                    let amount = parseInt(e.amount);
                    this.setState({novemberAmount:this.state.novemberAmount+amount})
                });
                newRevenus.push({data:[this.state.januaryAmount,this.state.februaryAmount,this.state.marchAmount,this.state.aprilAmount,this.state.mayAmount,
                        this.state.juneAmount,this.state.julyAmount,this.state.augustAmount,this.state.septemberAmount,this.state.octoberAmount,
                        this.state.novemberAmount,this.state.decemberAmount],name:'revenus'});
                this.setState({revenus: newRevenus});
                this.setState({totalPaid:this.state.januaryAmount+this.state.februaryAmount+this.state.marchAmount+this.state.aprilAmount+this.state.mayAmount+
                        this.state.juneAmount+this.state.julyAmount+this.state.augustAmount+this.state.septemberAmount+this.state.octoberAmount+
                        this.state.novemberAmount+this.state.decemberAmount});
            })
            .catch(err => console.error(err))

        axios.get('/myAlfred/api/performances/incomes/totalComing/'+this.state.year)
            .then(res => {
                this.setState({totalComing: parseFloat(res.data),totalYear:parseFloat(res.data)+this.state.totalPaid});
            })
            .catch(err => console.error(err))
    };

    callDrawer(){
        this.child.current.handleDrawerToggle();
    }

    render() {
        const {classes} = this.props;

        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        <NavBarShop userId={this.state.userId}/>
                        <Grid className={classes.toggle}>
                            <Grid>
                                <ResponsiveDrawer ref={this.child} isActiveIndex={0} itemsDrawers={'performance'} needMargin={true}/>
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
                        </Grid>
                        <Grid item xs={9} style={{paddingLeft: 55,  marginBottom: '20px'}}>
                            <Grid container style={{marginBottom:20}}>
                                <Grid item xs={12}>
                                    <h1 style={{color: '#7E7E7E',fontWeight: '100'}}>Mes revenus</h1>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography style={{color: '#7E7E7E'}}>Revenus générés depuis l'inscription</Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Chart className={classes.thechart}
                                       options={this.state.options}
                                       series={this.state.revenus}
                                       type="bar"
                                       style={{width: '80%'}}
                                />
                            </Grid>
                            <Grid container>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Année"
                                    value={this.state.year}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"
                                >

                                        <MenuItem value={'2019'}>
                                            2019
                                        </MenuItem>
                                    <MenuItem value={'2020'}>
                                        2020
                                    </MenuItem>
                                    <MenuItem value={'2021'}>
                                        2021
                                    </MenuItem>

                                </TextField>
                            </Grid>
                            <Grid className={classes.therevenus} container style={{textAlign:'center', marginTop: '50px',borderTop: 'dimgray solid 1px',borderBottom: 'dimgray solid 1px', marginBottom: '30px', width: '80%'}}>
                                <Grid item xs={4} style={{padding: '40px 0px', borderRight: 'dimgray solid 1px',  margin: '20px 0px'}}>
                                    <Typography style={{color: '#7E7E7E',  marginBottom: '20px'}}>Revenus totaux</Typography>
                                    <Typography style={{color: '#7E7E7E', fontSize: '1.2rem'}}>{this.state.totalYear}€</Typography>
                                </Grid>
                                <Grid item xs={4} style={{padding: '40px 0px', margin: '20px 0px'}}>
                                    <Typography style={{color: '#7E7E7E',  marginBottom: '20px'}}>Revenus déjà versés</Typography>
                                    <Typography style={{color: '#7E7E7E', fontSize: '1.2rem'}}>{this.state.totalPaid}€</Typography>
                                </Grid>
                                <Grid item xs={4} style={{padding: '40px 0px',borderLeft: 'dimgray solid 1px', margin: '20px 0px'}}>
                                    <Typography style={{color: '#7E7E7E',  marginBottom: '20px'}}>Revenus à venir</Typography>
                                    <Typography style={{color: '#7E7E7E', fontSize: '1.2rem'}}>{this.state.totalComing}€</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Layout>
                <NavbarMobile userId={this.state.userId}/>
            </Fragment>
        );
    };
}



export default withStyles(styles)(revenus);
