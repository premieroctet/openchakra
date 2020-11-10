import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import layoutStyle from "../../static/css/pages/layout/layoutStyle"
import Header from "../../hoc/Layout/About/Header";
import Footer from "../../hoc/Layout/About/Footer";
import Link from 'next/link';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

class Contact extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Fragment>
                <Header/>
                <Grid className={layoutStyle.navbarTopContainer}>
                    <Grid style={{padding: '0 300px', marginBottom: '100px'}}>
                        <h1>Contact</h1>
                        <Accordion style={{marginBottom: '10px'}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Via le chat en direct ?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography style={{color: '#707070'}}>
                                    chat
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion style={{marginBottom: '10px'}}>
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
                                        <a
                                            style={{
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
                        <Accordion style={{marginBottom: '10px'}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Par téléphone ?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography style={{color: '#707070'}}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                                    ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion style={{marginBottom: '10px'}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Par courrier</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography style={{color: '#707070'}}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                                    ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
                <Footer/>
            </Fragment>
        )
    }
}

export default (Contact)
