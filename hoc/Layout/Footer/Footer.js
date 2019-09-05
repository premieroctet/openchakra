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
    })


class Footer extends Component {
    constructor(props) {
        super(props);
      }

    render(){
        const {classes} = this.props;
        return(
            <React.Fragment>
                
                <Grid container style={{backgroundColor: '#747474', width: '100%',marginTop: '2%'}}>
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
                                        <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Devenir Alfred</Typography></a></Link>
                                    </Grid>    
                                    <Grid item xs={12} style={{textAlign: 'left'}}>
                                        <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Comment ça marche ?</Typography></a></Link>
                                    </Grid>
                                    <Grid item xs={12} style={{textAlign: 'left'}}>    
                                    <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Nous contacter</Typography></a></Link>
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        {/*Normal */}
                        <Typography className={classes.normal} style={{fontSize: '1rem', color: 'white', fontWeight: 'bold'}}>My-Alfred</Typography>
                                <Grid container className={classes.normal} style={{marginTop: '4%'}}>
                                    <Grid item xs={12}>
                                        <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Devenir Alfred</Typography></a></Link>
                                    </Grid>    
                                    <Grid item xs={12}>
                                        <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Comment ça marche ?</Typography></a></Link>
                                    </Grid>
                                    <Grid item xs={12}>    
                                    <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Nous contacter</Typography></a></Link>
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
                                        <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>FAQ Utilisateurs</Typography></a></Link>
                                    </Grid>    
                                    <Grid item xs={12} style={{textAlign: 'left'}}>
                                        <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>FAQ Alfred</Typography></a></Link>
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        {/*Normal */}
                        <Typography className={classes.normal} style={{fontSize: '1rem', color: 'white', fontWeight: 'bold'}}>Aide</Typography>
                            <Grid container className={classes.normal} style={{marginTop: '4%'}}>
                                <Grid item xs={12}>
                                    <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>FAQ Utilisateurs</Typography></a></Link>
                                </Grid>    
                                <Grid item xs={12}>
                                    <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>FAQ Alfred</Typography></a></Link>
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
                                        <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Les Catégories</Typography></a></Link>
                                    </Grid>    
                                    <Grid item xs={12} style={{textAlign: 'left'}}>
                                        <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Les Services</Typography></a></Link>
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        {/*Normal */}
                        <Typography className={classes.normal} style={{fontSize: '1rem', color: 'white', fontWeight: 'bold'}}>Services</Typography>
                            <Grid container className={classes.normal} style={{marginTop: '4%'}}>
                                <Grid item xs={12}>
                                    <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Les Catégories</Typography></a></Link>
                                </Grid>    
                                <Grid item xs={12}>
                                    <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Les Services</Typography></a></Link>
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
                                <Typography style={{fontSize: '1rem', color: 'white', fontWeight: 'bold'}}><img width={'20px'} style={{marginLeft: '3%', cursor: 'pointer'}} src="../../../../static/socialicons/facebook.png"/><img width={'20px'} style={{marginLeft: '3%', cursor: 'pointer'}} src="../../../../static/socialicons/instagram.png"/></Typography>                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container style={{marginTop: '4%'}}>
                                    <Grid item xs={12} style={{textAlign: 'left'}}>
                                        <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Mentions Légales</Typography></a></Link>
                                    </Grid>    
                                    <Grid item xs={12} style={{textAlign: 'left'}}>
                                        <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Conditions générales d'utilisation</Typography></a></Link>
                                    </Grid>    
                                    <Grid item xs={12} style={{textAlign: 'left'}}>
                                        <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Politique de confidentialité</Typography></a></Link>
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        {/*Normal */}
                        <Typography className={classes.normal} style={{fontSize: '1rem', color: 'white', fontWeight: 'bold'}}><img width={'30px'} style={{marginLeft: '3%', cursor: 'pointer'}} src="../../../../static/socialicons/facebook.png"/><img width={'30px'} style={{marginLeft: '3%', cursor: 'pointer'}} src="../../../../static/socialicons/instagram.png"/></Typography>
                            <Grid container className={classes.normal} style={{marginTop: '4%'}}>
                                    <Grid item xs={12}>
                                        <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Mentions Légales</Typography></a></Link>
                                    </Grid>    
                                    <Grid item xs={12}>
                                        <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Conditions générales d'utilisation</Typography></a></Link>
                                    </Grid>    
                                    <Grid item xs={12}>
                                        <Link href="#"><a style={{textDecoration: 'none'}}><Typography style={{color: 'white'}}>Politique de confidentialité</Typography></a></Link>
                                    </Grid>
                                </Grid>
                    </Grid>

                    <Grid item xs={4}></Grid><Grid item xs={4}><hr style={{border:'none', backgroundColor: 'white', height: '1px'}}/></Grid><Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid><Grid item xs={4}><Typography style={{color: 'white', textAlign: 'center', marginBottom: 15}}>© 2019 My-Alfred. All rights reserved.</Typography></Grid><Grid item xs={4}></Grid>
                </Grid>
                
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Footer);
