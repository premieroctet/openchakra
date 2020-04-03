import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import Footer from '../../hoc/Layout/Footer/Footer';
import { Typography } from '@material-ui/core';
//import dynamic from 'next/dynamic'
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import '../../static/charts.css';
/**
const Chart = dynamic(import('react-apexcharts'), {
    ssr: false,
})
*/
import loadable from 'loadable-components';
import NavBarShop from '../../components/NavBar/NavBarShop/NavBarShop';
import NavbarMobile from '../../components/NavbarMobile/NavbarMobile';
const Chart = loadable(() => import('react-apexcharts'));

moment.locale('fr');

const { config } = require('../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 75,
        flexGrow: 1,
        [theme.breakpoints.down('xs')]: {
           marginBottom: 100,
        }
    },
    exportSVG: {
        fontFamily: 'sans-serif!important',
        color: '#2FBCD3',
    },
    exportPNG: {
        fontFamily: 'sans-serif!important',
        color: '#2FBCD3',
    },
    hidesm: {
        minWidth: '271px',
        [theme.breakpoints.down('sm')]: {
            display:'none'
        }
    }

    ,hidelg: {
        [theme.breakpoints.up('md')]: {
            display:'none',
        }

    },
    trigger:{
        [theme.breakpoints.down('sm')]: {
            marginTop: -10,
            width: '100%',
            marginLeft:'0px',
            height:'30px',
            backgroundColor:'#2FBCD3',

            display:'block',
            transition: 'display 0.7s',
            borderRadius:'5px',
            '&:focus': {
                display:'none',
                transition: 'display 0.7s',

            }
        }

    },
    responsiveContainer: {
        [theme.breakpoints.down('sm')]: {
            width:'135%!important',

        }
    }

    ,toggle: {
        [theme.breakpoints.down('sm')]: {  marginLeft:'-75px',
            transition: 'margin-left 0.7s',

            '&:hover': {
                marginLeft:'0px',
                transition: 'margin-left 0.7s',
                boxShadow: '11px 6px 23px -24px rgba(0,0,0,0.75)',

            }
        }
    },
    thechart:{
        [theme.breakpoints.down('sm')]: {
            width:'100%!important'
        }
    },
    therevenus:{
        [theme.breakpoints.down('sm')]: {
            width:'100%!important'
        }
    },
    shopbar:{
        [theme.breakpoints.down('md')]: {
            display: 'none',
        }
    },
    bottombar:{visibility:'hidden', [theme.breakpoints.down('sm')]: {
            visibility:'visible',
            boxShadow: '2px -5px 14px -15px rgba(0,0,0,0.75)'
        }},
    topbar:{visibility:'visible', position: 'sticky', top: 75, zIndex:999,[theme.breakpoints.down('sm')]: {
            visibility:'hidden',
        }},


});

class revenus extends React.Component {
    constructor(props) {
        super(props);
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
    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        const revenus1layer = this.state.revenus;
        revenus1layer.forEach((revenus1layerbis) => {
            const revenus2layer = revenus1layerbis.data;
            revenus2layer.forEach((revenus2layerbis) => {
                const revenusall = revenus2layerbis.x;

            })
        });
        const newRevenus = [];
        const year = new Date().getFullYear();
        axios.get(url+'myAlfred/api/performances/incomes/'+year)
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
            .catch(err => console.log(err))
        axios.get(url+'myAlfred/api/performances/incomes/totalComing/'+year)
            .then(res => {
                this.setState({totalComing: parseInt(res.data),totalYear:parseInt(res.data)+this.state.totalPaid});
            })
            .catch(err => console.log(err))

        axios.get(url+'myAlfred/api/users/current').then(res => {
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
        axios.get(url+'myAlfred/api/performances/incomes/'+this.state.year)
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
            .catch(err => console.log(err))

        axios.get(url+'myAlfred/api/performances/incomes/totalComing/'+this.state.year)
            .then(res => {
                this.setState({totalComing: parseFloat(res.data),totalYear:parseFloat(res.data)+this.state.totalPaid});
            })
            .catch(err => console.log(err))
    };

    render() {
        const {classes} = this.props;


        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        <NavBarShop userId={this.state.userId}/>
                        <Grid className={classes.toggle}  item xs={3} style={{}}>

                            <div className={classes.trigger}></div>
                            <Grid container style={{justifyContent: 'center',}}>
                                <Grid item style={{marginTop: 30,width: 281}} className={classes.hidesm}>
                                    <Link href={'/performances/revenus'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex',cursor:"pointer"}}>
                                            <img src={'../static/revenus-2.svg'} alt={'user'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a  style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mes revenus
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 30,width: 281}} className={classes.hidelg}>
                                    <Link href={'/performances/revenus'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center',cursor:"pointer"}}>
                                            <img src={'../static/revenus-2.svg'} alt={'user'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a  style={{fontSize: '1.1rem',cursor:"pointer"}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/performances/statistiques'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex',cursor:"pointer"}}>
                                            <img src={'../static/view.svg'} alt={'sign'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mes statistiques
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10}} className={classes.hidelg}>
                                    <Link href={'/performances/statistiques'}>
                                        <div style={{padding: '30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center',cursor:"pointer"}}>
                                            <img src={'../static/view.svg'} alt={'sign'} height={70} width={27} style={{marginleft: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidelg}>
                                    <Link href={'/performances/evaluations'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center',cursor:"pointer"}}>
                                            <img src={'../static/chat.svg'} alt={'picture'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/performances/evaluations'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex',cursor:"pointer"}}>
                                            <img src={'../static/chat.svg'} alt={'picture'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mes évaluations
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidelg}>
                                    <Link href={'/performances/historique'}>
                                        <div style={{padding:'30px', lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center',cursor:"pointer"}}>
                                            <img src={'../static/history.svg'} alt={'check'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/performances/historique'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'2',paddingLeft:5,paddingRight:5,display:'flex',cursor:"pointer"}}>
                                            <img src={'../static/history.svg'} alt={'check'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Historique des <br/>transactions
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>


                            </Grid>
                        </Grid>


                        <Grid item xs={9} style={{paddingLeft: 20,  marginBottom: '20px'}}>
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
