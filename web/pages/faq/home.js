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
        this.state={
          faq:null,
          alfredFaq: false,
        }
    }

    componentDidMount() {
      this.setState({
        faq:FAQ,
        alfredFaq: false,
      })
    }

    filteredFaq = () => {
      const {alfredFaq, faq}=this.state
      return alfredFaq ? faq['alfred']:faq['client']
    }

    setAlfred = alfred => {
      console.log(alfred)
      this.setState({alfredFaq: alfred})
    }

    render() {
        const {classes} = this.props;
        const {faq, alfredFaq} = this.state

        if (!faq) {
          return null
        }
        const filteredFaqs = this.filteredFaq()

        return (

            <Fragment>

                <Header></Header>
                <Grid className={classes.menuContainer}>
                    <Grid style={{paddingRight: '25px'}} onClick={() => this.setAlfred(false)}>
                            <Grid className={classes.linkBloc}>
                                <img style={{margin: '0 auto', paddingBottom: '16px'}}
                                     src="/static/assets/faq/star.svg" />
                                <p className={classes.linkText}>Je suis client</p>
                            </Grid>
                    </Grid>
                    <Grid>
                            <Grid className={classes.linkBloc} onClick={() => this.setAlfred(true)}>
                                <img style={{margin: '0 auto', width: '30px', paddingBottom: '10px'}}
                                     src="/static/assets/faq/amp.svg" />
                                <p className={classes.linkText}>Je suis Alfred</p>
                            </Grid>
                    </Grid>
                </Grid>
                {
                    Object.keys(filteredFaqs).map( category => {
                      const items=filteredFaqs[category]
                      return (
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography>{category}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Grid container>
                                  {items.map( i => {
                                    return (
                                      <Grid>
                                      <Accordion>
                                      <AccordionSummary expandIcon={<ExpandMoreIcon/>}>{i.title}</AccordionSummary>
                                      <AccordionDetails>
                                        <div dangerouslySetInnerHTML={{ __html: i.contents}} />
                                      </AccordionDetails>
                                      </Accordion>
                                      </Grid>
                                    )
                                  })}
                                  </Grid>
                                </AccordionDetails>
                            </Accordion>
                      )
                    })
                }
                <Footer/>
            </Fragment>
        )
    }
}

export default withStyles(styles)(Home);
