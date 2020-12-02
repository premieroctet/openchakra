import React, {Fragment} from 'react';
import Grid from "@material-ui/core/Grid";
import HeaderFaq from "../../hoc/Layout/Faq/HeaderFaq";
import Header from "../../hoc/Layout/About/Header";
import Footer from "../../hoc/Layout/About/Footer";
import {withStyles} from "@material-ui/core/styles";
import Link from '../../components/Link/Link';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {FAQ} from '../../utils/i18n'

const styles = theme => ({
    menuContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    linkBloc: {
        width: '100%',
        padding: '30px 30px 30px 30px',
        margin: '25px',
        borderRadius: '30px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        '&:hover': {
            border: '0.2px solid grey',
        }
    },
    linkText: {
        margin: '0 auto'
    },
    accord: {
        padding: '0 300px'
    }
});

class Home extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;

        function renderFaq(faq) {


            return (
                Array.from(Array(faq.length), (e, i) => {
                        return (
                            <Grid className={classes.accord}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography key={i}>{i}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography style={{color: '#707070'}}>
                                            non
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        )
                    }
                )
            )
        }

// console.log(`faq.${prop} = ${faq[prop].title}`);


        return (

            <Fragment>

                <Header></Header>
                <Grid className={classes.menuContainer}>
                    <Grid style={{paddingRight: '25px'}}>
                        <Link href={'/faq/addService'}>
                            <Grid className={classes.linkBloc}>
                                <img style={{margin: '0 auto', paddingBottom: '16px'}}
                                     src="../../static/assets/faq/star.svg" alt=""/>
                                <p className={classes.linkText}>Je suis client</p>
                            </Grid>
                        </Link>
                    </Grid>
                    <Grid>
                        <Link href={'/faq/becomeAlfred'}>
                            <Grid className={classes.linkBloc}>
                                <img style={{margin: '0 auto', width: '30px', paddingBottom: '10px'}}
                                     src="../../static/assets/faq/amp.svg"
                                     alt=""/>
                                <p className={classes.linkText}>Je suis Alfred</p>
                            </Grid>
                        </Link>
                    </Grid>
                </Grid>
                {
                    renderFaq(FAQ.alfred)
                }
                {/*<Grid className={classes.accord}>*/}
                {/*    <Accordion>*/}
                {/*        <AccordionSummary*/}
                {/*            expandIcon={<ExpandMoreIcon/>}*/}
                {/*            aria-controls="panel1a-content"*/}
                {/*            id="panel1a-header"*/}
                {/*        >*/}
                {/*            <Typography>{FAQ.alfred[3].title}</Typography>*/}
                {/*        </AccordionSummary>*/}
                {/*        <AccordionDetails>*/}
                {/*            <Typography style={{color: '#707070'}}>*/}
                {/*                {FAQ.alfred[3].text}*/}
                {/*            </Typography>*/}
                {/*        </AccordionDetails>*/}
                {/*    </Accordion>*/}
                {/*</Grid>*/}
                <Footer/>
            </Fragment>
        )
    }
}

export default withStyles(styles)(Home);
