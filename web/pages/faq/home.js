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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import styles from '../../static/css/pages/faq/home';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import CloseIcon from '@material-ui/icons/Close';
import LayoutFaq from "../../hoc/Layout/LayoutFaq"

class Home extends React.Component {


    constructor(props) {
        super(props);
        this.state={
          faq:null,
          alfredFaq: false,
          search: '',
        }
    }

    componentDidMount() {
      this.setState({
        faq:FAQ,
        alfredFaq: false,
      })
    }

    filteredFaq = () => {
      var {alfredFaq, faq, search}=this.state;
      var faqs=alfredFaq ? faq['alfred']:faq['client'];
      if (search) {
        search = search.toLowerCase();
        const allFaqs={...faq['alfred'], ...faq['client']};
        var res={};
        Object.keys(allFaqs).forEach(cat => {
            if (cat.toLowerCase().includes(search)) {
              res[cat]=allFaqs[cat]
            }
            else allFaqs[cat].forEach( topic => {
              if (topic.title.toLowerCase().includes(search) || topic.contents.toLowerCase().includes(search)) {
                if (!res[cat]) {res[cat]=[]}
                res[cat].push(topic)
              }
            });
        });
        faqs=res
      }
      return faqs
    };

    setAlfred = alfred => {
      this.setState({alfredFaq: alfred})
    };

    onSearchChange = ev => {
      this.setState({search: ev.target.value})
    };

    onSearchClear = () => {
      this.setState({search: ''})
    };

  render() {
    const {classes} = this.props;
    const {faq, alfredFaq, search} = this.state;

    if (!faq) {
      return null
    }
    const searching = Boolean(search);
    const filteredFaqs = this.filteredFaq();

    return (
      <Grid>
        <LayoutFaq>
          <Grid container className={classes.menuContainer}>
            { searching ? null :
              <Grid className={classes.logoContainer}>
                <Grid style={{paddingRight: '25px', cursor : 'pointer'}} onClick={() => this.setAlfred(false)}>
                  <Grid className={classes.linkBloc}>
                    <img title={'star'} alt={'star'} style={{margin: '0 auto', paddingBottom: '16px'}} src="/static/assets/faq/star.svg" />
                    <Typography className={classes.linkText} style={{fontWeight: alfredFaq ? 'normal' :'bold'}}>Je suis client</Typography>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid className={classes.linkBloc} onClick={() => this.setAlfred(true)}>
                    <img title={'ampoulelogo'} alt={'ampoulelogo'} style={{margin: '0 auto', width: '30px', paddingBottom: '10px'}} src="/static/assets/faq/amp.svg" />
                    <Typography className={classes.linkText} style={{fontWeight: alfredFaq ? 'bold' :'normal'}}>Je suis Alfred</Typography>
                  </Grid>
                </Grid>
              </Grid>
            }
            <Grid>
              <Input
                id="standard-with-placeholder"
                label="Recherche"
                placeholder="Recherche"
                style={{width: '100%'}}
                type={"text"}
                value={search}
                onChange={this.onSearchChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.onSearchClear}
                      disabled={!searching}
                    >
                      {<CloseIcon /> }
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
          </Grid>
          {
            Object.keys(filteredFaqs).map( category => {
              const items=filteredFaqs[category];
              return (
                <Accordion key={category}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography>{category}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container>
                      {items.map( i => {
                        return (
                          <Accordion key={i.title}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                              {i.title}
                            </AccordionSummary>
                            <AccordionDetails>
                              <div dangerouslySetInnerHTML={{ __html: i.contents}} />
                            </AccordionDetails>
                          </Accordion>
                        )
                      })}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              )
            })
          }
        </LayoutFaq>
      </Grid>
    )
  }
}

export default withStyles(styles)(Home);
