import React, {Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import Header from "../../hoc/Layout/About/Header";
import Footer from "../../hoc/Layout/About/Footer";
import Link from '../../components/Link/Link'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import {withStyles} from "@material-ui/core/styles";
import styles from '../../static/css/pages/homePage/index';

class Contact extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;

        return (
            <Fragment>
                <Header/>
                <Grid style={{
                    padding: '0 400px',
                    marginBottom: '50px',
                    marginTop: '50px'
                }}>
                    <p style={{fontWeight: 'bold'}}>Service client - Nos heures d'ouverture</p>
                    <Grid style={{display: 'flex'}}>
                        <p style={{width: '200px', lineHeight: '2px'}}>Du Lundi au Vendredi</p>
                        <p style={{lineHeight: '2px'}}> 10H - 18 H</p>
                    </Grid>
                    <Grid style={{display: 'flex'}}>
                        <p style={{width: '200px', lineHeight: '2px'}}>Samedi</p>
                        <p style={{lineHeight: '2px'}}>Fermé</p>
                    </Grid>
                    <Grid style={{display: 'flex'}}>
                        <p style={{width: '200px', lineHeight: '2px'}}>Dimanche</p>
                        <p style={{lineHeight: '2px'}}>Fermé</p>
                    </Grid>
                </Grid>
                <Grid style={{
                    padding: '0 350px'
                }}>
                    <h3>Nous contacter</h3>
                    <Accordion style={{
                        marginBottom: '10px',
                        width: '40%'
                    }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Par e-mail</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <Grid style={{display: 'flex'}}>
                                    <MailOutlineIcon style={{paddingRight: '5px'}}/>
                                    <a style={{
                                        color: 'black',
                                        borderBottom: '1 px solid black',
                                        '&:hover': {
                                            color: '#84A5E0',
                                            borderBottom: '#84A5E0'
                                        }
                                    }} href={'mailto:hello@my-alfred.io'}>
                                        hello@my-alfred.io
                                    </a>
                                </Grid>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>

                <Grid style={{
                    display: ' flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginTop: '25px',
                    marginBottom: '50px'
                }}>
                    <Grid style={{margin: '0 auto', textAlign: 'center'}}>
                        <p style={{fontWeight: 'bold'}}>Consultez notre FAQ</p>
                        <p>Retrouvez les questions fréquentes</p>
                        <Link href={'/faq/home'}>
                            <p style={{
                                width: '70px',
                                color: 'white',
                                backgroundColor: '#84A5E0',
                                borderRadius: '37px',
                                margin: '0 auto',
                            }}>
                                FAQ
                            </p>
                        </Link>
                    </Grid>
                </Grid>

                <Footer/>
            </Fragment>
        )
    }
}

export default withStyles(styles)(Contact)
