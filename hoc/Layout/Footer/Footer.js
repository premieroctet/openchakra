import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
        responsive:{
            [theme.breakpoints.up('md')]: {
                display: 'none'
            },
        },
        normal:{
            [theme.breakpoints.down('sm')]: {
                display: 'none'
            },
        }
    });

class Footer extends Component {
    constructor(props) {
        super(props);
      }

    render(){
        const {classes} = this.props;
        return(
            <React.Fragment>
                <Grid container style={{backgroundColor: '#747474'}}>
                    <Grid item md={3} sm={6} xs={12} style={{textAlign: 'center', margin: '2% 0px'}}>
                        {/*Responsive */}
                        <ExpansionPanel className={classes.responsive} style={{backgroundColor: '#747474',border: 'none', boxShadow: 'none'}}>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon style={{color:'white'}} />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            >
                                <Typography style={{fontSize: '1rem', color: 'white', fontWeight: 'bold'}}>My-Alfred</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container>
                                    <Grid item xs={12} style={{textAlign: 'left'}}>
                                        <Link href="/creaShop/creaShop"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Devenir Alfred</Typography></a></Link>
                                    </Grid>
                                    <Grid item xs={12} style={{textAlign: 'left'}}>
                                        <Link href="/faq"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Comment ça marche ?</Typography></a></Link>
                                    </Grid>
                                    <Grid item xs={12} style={{textAlign: 'left'}}>
                                    <Link href="/footer/contactPage"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Nous contacter</Typography></a></Link>
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        {/*Normal */}
                        <Typography className={classes.normal} style={{fontSize: '1rem', color: 'white', fontWeight: 'bold'}}>My-Alfred</Typography>
                                <Grid container className={classes.normal} style={{marginTop: '4%'}}>
                                    <Grid item xs={12}>
                                        <Link href="/creaShop/creaShop"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Devenir Alfred</Typography></a></Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Link href="/faq"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Comment ça marche ?</Typography></a></Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                    <Link href="/footer/contactPage"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Nous contacter</Typography></a></Link>
                                    </Grid>
                                </Grid>
                    </Grid>

                    <Grid item md={3} sm={6} xs={12} style={{textAlign: 'center', margin: '2% 0px'}}>

                        {/*Responsive */}
                        <ExpansionPanel className={classes.responsive} style={{backgroundColor: '#747474',border: 'none', boxShadow: 'none'}}>
                            <ExpansionPanelSummary
                             style={{textAlign: 'center'}}
                            expandIcon={<ExpandMoreIcon style={{color:'white'}} />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            >
                            <Typography style={{textAlign: 'center', fontSize: '1rem', color: 'white', fontWeight: 'bold'}}>Aide</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container style={{marginTop: '4%'}}>
                                    <Grid item xs={12} style={{textAlign: 'left'}}>
                                        <Link href="/faq"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>FAQ utilisateurs</Typography></a></Link>
                                    </Grid>
                                    <Grid item xs={12} style={{textAlign: 'left'}}>
                                        <Link href={'/faq'}><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>FAQ Alfred</Typography></a></Link>
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        {/*Normal */}
                        <Typography className={classes.normal} style={{fontSize: '1rem', color: 'white', fontWeight: 'bold'}}>Aide</Typography>
                            <Grid container className={classes.normal} style={{marginTop: '4%'}}>
                                <Grid item xs={12}>
                                    <Link href="/faq"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>FAQ utilisateurs</Typography></a></Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link href={'/faq'}><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>FAQ Alfred</Typography></a></Link>
                                </Grid>
                            </Grid>
                    </Grid>

                    <Grid item md={3} sm={6} xs={12} style={{textAlign: 'center', margin: '2% 0px'}}>

                        {/*Responsive */}
                        <ExpansionPanel className={classes.responsive} style={{backgroundColor: '#747474',border: 'none', boxShadow: 'none'}}>
                            <ExpansionPanelSummary
                             style={{textAlign: 'center'}}
                            expandIcon={<ExpandMoreIcon style={{color:'white'}} />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            >
                            <Typography style={{textAlign: 'center', fontSize: '1rem', color: 'white', fontWeight: 'bold'}}>Services</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container style={{marginTop: '4%'}}>
                                    <Grid item xs={12} style={{textAlign: 'left'}}>
                                        <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Les catégories</Typography></a></Link>
                                    </Grid>
                                    <Grid item xs={12} style={{textAlign: 'left'}}>
                                        <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Les services</Typography></a></Link>
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        {/*Normal */}
                        <Typography className={classes.normal} style={{fontSize: '1rem', color: 'white', fontWeight: 'bold'}}>Services</Typography>
                            <Grid container className={classes.normal} style={{marginTop: '4%'}}>
                                <Grid item xs={12}>
                                    <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Les catégories</Typography></a></Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Les services</Typography></a></Link>
                                </Grid>
                            </Grid>
                    </Grid>

                    <Grid item md={3} sm={6} xs={12} style={{textAlign: 'center', margin: '2% 0px'}}>

                        {/*Responsive */}
                        <ExpansionPanel className={classes.responsive} style={{backgroundColor: '#747474',border: 'none', boxShadow: 'none'}}>
                            <ExpansionPanelSummary
                             style={{textAlign: 'center'}}
                            expandIcon={<ExpandMoreIcon style={{color:'white'}} />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            >

                                <Typography style={{fontSize: '1rem', color: 'white', fontWeight: 'bold'}}>
                                    <Link href="https://www.facebook.com/myalfred1/"><a style={{textDecoration: 'none', color: 'white'}} target="_blank">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fab"
                                         style={{cursor: 'pointer', width: '20px'}}
                                         data-icon="facebook" role="img" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 512 512" className="svg-inline--fa fa-facebook fa-w-16 fa-5x">
                                        <path fill="currentColor"
                                              d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                                              className=""/>
                                    </svg>
                                        </a></Link>
                                        <Link href="https://www.instagram.com/my_alfred_/"><a style={{textDecoration: 'none', color: 'white'}} target="_blank">
                                    <svg aria-hidden="true" focusable="false" style={{
                                        cursor: 'pointer',
                                        width: '20px',
                                        marginLeft: '3%'
                                    }} data-prefix="fab" data-icon="instagram" role="img"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                         className="svg-inline--fa fa-instagram fa-w-14 fa-lg">
                                        <path fill="currentColor"
                                              d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                                              className=""/>
                                    </svg>
                                    </a></Link>
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container style={{marginTop: '4%'}}>
                                    <Grid item xs={12} style={{textAlign: 'left'}}>
                                        <Link href="/footer/legalNotice"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Mentions légales</Typography></a></Link>
                                    </Grid>
                                    <Grid item xs={12} style={{textAlign: 'left'}}>
                                        <Link href="/footer/cguPage"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Conditions générales d'utilisation</Typography></a></Link>
                                    </Grid>
                                    <Grid item xs={12} style={{textAlign: 'left'}}>
                                        <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Politique de confidentialité</Typography></a></Link>
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        {/*Normal */}
                        <Typography className={classes.normal} style={{fontSize: '1rem', color: 'white', fontWeight: 'bold'}}><Link href="https://www.facebook.com/myalfred1/"><a style={{textDecoration: 'none', color: 'white'}} target="_blank"><svg aria-hidden="true" focusable="false" data-prefix="fab" style={{cursor: 'pointer',width: '31px', marginBottom: '-8px', }} data-icon="facebook" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-facebook fa-w-16 fa-5x"><path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg></a></Link><Link href="https://www.instagram.com/my_alfred_/"><a style={{textDecoration: 'none', color: 'white'}} target="_blank"><svg aria-hidden="true" focusable="false" style={{cursor: 'pointer',width: '30px', marginBottom: '-10px',marginLeft: '10px'}} data-prefix="fab" data-icon="instagram" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-instagram fa-w-14 fa-lg"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg></a></Link></Typography>
                            <Grid container className={classes.normal} style={{marginTop: '4%'}}>
                                    <Grid item xs={12}>
                                        <Link href="/footer/legalNotice"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Mentions légales</Typography></a></Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Link href="/footer/cguPage"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Conditions générales d'utilisation</Typography></a></Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Politique de confidentialité</Typography></a></Link>
                                    </Grid>
                                </Grid>
                    </Grid>

                    <Grid item xs={4}></Grid><Grid item xs={4}><hr style={{border:'none', backgroundColor: 'white', height: '1px'}}/></Grid><Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid><Grid item xs={4}><Typography style={{color: 'white', textAlign: 'center', marginBottom: 15}}>© {new Date().getFullYear()} My-Alfred. Tous droits réservés.</Typography></Grid><Grid item xs={4}></Grid>
                </Grid>
                <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/5065724.js"></script>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Footer);
