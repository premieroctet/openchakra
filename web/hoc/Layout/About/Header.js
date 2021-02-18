import React from 'react';
import Grid from "@material-ui/core/Grid";
import {NAVBAR_MENU} from "../../../utils/i18n";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {withStyles} from "@material-ui/core/styles";
import styles from '../../../static/css/components/Layout/About/Header/Header';
import ScrollMenu from "../../../components/ScrollMenu/ScrollMenu";
import Button from "@material-ui/core/Button";
import Router from 'next/router';
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import CloseIcon from '@material-ui/icons/Close';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      searchBar: false,
      aboutMenu: false,
      aboutSearch: false,
      becomeAlfredMenu: false,
      active: false,
      classNameMenu: '',
      items: [
        {
          label: NAVBAR_MENU.aboutUs,
          url: '/footer/apropos'
        },
        {
          label: NAVBAR_MENU.ourCom,
          url: '/footer/ourCommunity'
        },
        {
          label: NAVBAR_MENU.ourTeam,
          url: '/footer/ourTeam'
        },
      ],
      search: ''
    }
  }

  componentDidMount() {
    if (Router.pathname === '/faq') {
      this.setState({aboutSearch: true})
    }
  }

  onSearchChange = ev => {
    this.setState({search: ev.target.value}, () => this.props.search())
  };

  callClearFunction = () => {
    this.setState({search: ''}, () => this.props.clearFuntion())
  };

  render() {

    const {classes} = this.props;
    let {title, content, aboutMenu, items, search, aboutSearch} = this.state;

    if (process.browser) {
      if (window.location.pathname === '/footer/apropos') {
        title = 'Nos valeurs';
        content = 'd\'entreprise mais surtout d\'humain';
        aboutMenu = true;
      } else if (window.location.pathname === '/footer/ourCommunity') {
        title = 'Notre Communauté';
        content = 'Qui nous fait vivre';
        aboutMenu = true;
      } else if (window.location.pathname === '/footer/ourTeam') {
        title = 'Notre Équipe';
        content = 'Qui nous fait vivre';
        aboutMenu = true;
      } else if (window.location.pathname === '/footer/addService') {
        title = 'Réserver un service';
        content = 'Les bases';

      } else if (window.location.pathname === '/faq') {
        title = 'FAQ';
        content = 'Pour trouver vos réponses'
      } else if (window.location.pathname === '/footer/becomeAlfred') {
        title = 'Devenir un Alfred';
        content = 'Les bases';
      }
      else if (window.location.pathname === '/contact') {
        title = 'Contact';
        content = 'Posez-nous toutes vos questions';
      }
    }

    return (
      <Grid>
        <Grid style={{
          backgroundImage: "url('../../../static/assets/img/footer/footerBanner.svg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%'
        }}>
          <Grid className={classes.containerArrowBack}>
            <Button
              classes={{root: classes.button}}
              startIcon={<ArrowBackIcon style={{color: 'white'}}/>}
              onClick={() => Router.push('/')}
            >
              Retour sur My Alfred
            </Button>
          </Grid>
          <Grid className={classes.containerTitleAndSubtitle}>
            <Grid>
              <h1 style={{color: 'white'}}>{title}</h1>
            </Grid>
            <Grid>
              <h3 style={{color: 'white'}}>{content}</h3>
            </Grid>
            {
              aboutSearch ?
                <Grid className={classes.navbarSearchContainer}>
                  <Paper classes={{root: classes.navbarSearch}}>
                    <InputBase
                      className={classes.input}
                      placeholder="Chercher dans la FAQ"
                      inputProps={{'aria-label': 'Chercher dans la FAQ'}}
                      onChange={this.onSearchChange}
                      value={search}
                    />
                    <Grid>
                      <IconButton classes={{root: classes.iconButton}} aria-label="search"
                                  onClick={this.callClearFunction}>
                        <CloseIcon/>
                      </IconButton>
                    </Grid>
                  </Paper>
                </Grid> : null
            }
          </Grid>
        </Grid>
        {
          aboutMenu ?
            <Grid className={classes.layoutScrollMenu}>
              <ScrollMenu categories={items} mode={'faq'}/>
            </Grid>
            : null
        }

      </Grid>
    )
  }
}


export default withStyles(styles)(Header);
