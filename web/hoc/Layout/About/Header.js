import React from 'react';
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {NAVBAR_MENU} from "../../../utils/i18n";
import Link from '../../../components/Link/Link'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {withStyles} from "@material-ui/core/styles";
import styles from '../../../static/css/components/Layout/About/Header/Header';
import ScrollMenu from "../../../components/ScrollMenu/ScrollMenu";


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      searchBar: false,
      aboutMenu: false,
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
      ]
    }

  }

  render() {

    const {classes, index} = this.props;
    let {title, content, searchBar, aboutMenu, becomeAlfredMenu, active, classNameMenu, items} = this.state;

    if (process.browser) {
      if (window.location.pathname === '/footer/apropos') {
        title = 'Nos valeurs';
        content = 'd\'entreprise mais surtout d\'humain';
        aboutMenu = true;
        classNameMenu = classes.menuHeaderActive;

      } else if (window.location.pathname === '/footer/ourCommunity') {
        title = 'Notre Communauté';
        content = 'Qui nous fait vivre';
        aboutMenu = true;
        classNameMenu = classes.menuHeaderActive;

      } else if (window.location.pathname === '/footer/ourTeam') {
        title = 'Notre Équipe';
        content = 'Qui nous fait vivre';
        aboutMenu = true;
        classNameMenu = classes.menuHeaderActive;

      } else if (window.location.pathname === '/faq') {
        title = 'FAQ';
        content = 'Pour trouver vos réponses';
      } else if (window.location.pathname === '/footer/becomeAlfred') {
        title = 'Devenir un Alfred';
        content = 'les bases'
      }
    }
    return (

      <Grid>
        <Grid style={{
          backgroundImage: "url('../../../static/assets/img/footer/footerBanner.svg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%'
        }}><Link href={'/'}>
          <Grid style={{
            display: 'flex',
            color: 'white',
            padding: '15px'
          }}>
            <ArrowBackIcon style={{
              marginTop: '12px'
            }}/>
            <p>Retour sur My Alfred</p>
          </Grid>
        </Link>
          <Grid style={{color: 'white', textAlign: 'center', lineHeight: '0.6em'}}>
            <h3 style={{
              paddingTop: '30px',
              fontSize: '1.5vw'
            }}>{title}</h3>
            <p style={{
              paddingBottom: '100px'
            }}>{content}</p>
          </Grid>
        </Grid>
        {
          aboutMenu ?
            <Grid className={classes.layoutScrollMenu}>
              <ScrollMenu categories={items} indexCat={index} mode={'faq'}/>
            </Grid>
            : null}
      </Grid>
    )

  }

}


export default withStyles(styles)(Header);
