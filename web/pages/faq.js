import React from 'react';
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core/styles";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {FAQ} from '../utils/i18n'
import styles from '../static/css/pages/faq';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import LayoutFaq from "../hoc/Layout/LayoutFaq";
import NeedMoreFaq from "../hoc/Layout/Faq/NeedMoreFaq";

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
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

    const matches = (search_arr, text) => {
      return search_arr.every(s => text.toLowerCase().includes(s))
    };

    var {alfredFaq, faq, search}=this.state;
    var faqs=alfredFaq ? faq['alfred']:faq['client'];
    if (search) {
      search = search.toLowerCase().split(' ').map(s => s.trim()).filter(s => s);
      const allFaqs={...faq['alfred'], ...faq['client']};
      var res={};
      Object.keys(allFaqs).forEach(cat => {
        if (cat.toLowerCase().includes(search)) {
          res[cat]=allFaqs[cat]
        }
        else allFaqs[cat].forEach( topic => {
          if (matches(search, topic.title) || matches(search, topic.contents)) {
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

  onSearchClear = () => {
    this.setState({search: ''})
  };

  onSearchChange = () =>{
    let state = this.child.current.state;
    this.setState({search: state.search})
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
      <LayoutFaq onSearchChange={this.onSearchChange} ref={this.child} callClearFunction={this.onSearchClear}>
        <Grid style={{display: 'flex', flexDirection: 'column'}}>
          <Grid container className={classes.menuContainer}>
            { searching ? null :
              <Grid className={classes.logoContainer}>
                <Grid onClick={() => this.setAlfred(false)} className={classes.blockContainer}>
                  <Grid className={classes.linkBloc}>
                    <Grid>
                      <img title={'star'} alt={'star'} width={50} height={50} src="/static/assets/faq/star.svg" />
                    </Grid>
                    <Grid>
                      <Typography className={classes.linkText} style={{fontWeight: alfredFaq ? 'normal' :'bold'}}>Je suis client</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid  className={classes.blockContainer}>
                  <Grid className={classes.linkBloc} onClick={() => this.setAlfred(true)}>
                    <Grid>
                      <img title={'ampoulelogo'} alt={'ampoulelogo'} width={50} height={50} src="/static/assets/faq/amp.svg" />
                    </Grid>
                    <Grid>
                      <Typography className={classes.linkText} style={{fontWeight: alfredFaq ? 'bold' :'normal'}}>Je suis Alfred</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            }
          </Grid>
          <Grid style={{marginTop :'10vh'}}>
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
          </Grid>
          <Grid style={{marginTop :'10vh'}}>
            <NeedMoreFaq/>
          </Grid>
        </Grid>
      </LayoutFaq>
    )
  }
}

export default withStyles(styles)(Home);
