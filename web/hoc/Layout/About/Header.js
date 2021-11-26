import CustomButton from '../../../components/CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import {withStyles} from '@material-ui/core/styles'
import styles from '../../../static/css/components/Layout/About/Header/Header'
import ScrollMenu from '../../../components/ScrollMenu/ScrollMenu'
import Router from 'next/router'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import CloseIcon from '@material-ui/icons/Close'
import {HEADER} from '../../../utils/i18n'



class Header extends React.Component {
  constructor(props) {
    super(props)
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
          label: ReactHtmlParser(this.props.t('NAVBAR_MENU.aboutUs')),
          url: '/footer/apropos',
        },
        {
          label: ReactHtmlParser(this.props.t('NAVBAR_MENU.ourCom')),
          url: '/footer/ourCommunity',
        },
        {
          label: ReactHtmlParser(this.props.t('NAVBAR_MENU.ourTeam')),
          url: '/footer/ourTeam',
        },
      ],
      search: '',
      isTeamPage: false,
    }
  }

  componentDidMount() {
    if (Router.pathname === '/faq') {
      this.setState({aboutSearch: true})
    }
    if(Router.pathname === '/footer/ourTeam') {
      this.setState({isTeamPage: true})
    }
  }

  onSearchChange = ev => {
    this.setState({search: ev.target.value}, () => this.props.search())
  };

  callClearFunction = () => {
    this.setState({search: ''}, () => this.props.clearFuntion())
  };

  render() {

    const {classes} = this.props
    let {title, content, aboutMenu, items, search, aboutSearch, isTeamPage} = this.state

    if (process.browser) {
      if (window.location.pathname === '/footer/apropos') {
        title = ReactHtmlParser(this.props.t('HEADER.title_our_values'))
        content = ReactHtmlParser(this.props.t('HEADER.content_our_values'))
        aboutMenu = true
      }
      else if (window.location.pathname === '/footer/ourCommunity') {
        title = ReactHtmlParser(this.props.t('HEADER.title_our_community'))
        content = ReactHtmlParser(this.props.t('HEADER.content_our_community'))
        aboutMenu = true
      }
      else if (window.location.pathname === '/footer/ourTeam') {
        title = ReactHtmlParser(this.props.t('HEADER.title_team'))
        content = ReactHtmlParser(this.props.t('HEADER.content_title_team'))
        aboutMenu = true
      }
      else if (window.location.pathname === '/footer/addService') {
        title = ReactHtmlParser(this.props.t('HEADER.title_resa'))
        content = ReactHtmlParser(this.props.t('HEADER.content_resa'))

      }
      else if (window.location.pathname === '/faq') {
        title = ReactHtmlParser(this.props.t('HEADER.title_faq'))
        content = ReactHtmlParser(this.props.t('HEADER.content_faq'))
      }
      else if (window.location.pathname === '/footer/becomeAlfred') {
        title = ReactHtmlParser(this.props.t('HEADER.title_become'))
        content = ReactHtmlParser(this.props.t('HEADER.content_become'))
      }
      else if (window.location.pathname === '/contact') {
        title = ReactHtmlParser(this.props.t('HEADER.contact_title'))
        content = ReactHtmlParser(this.props.t('HEADER.contact_content'))
      }
    }

    return (
      <Grid>
        <Grid className={isTeamPage ? 'customlayoutfaqheaderbannerteam' : 'customlayoutfaqheaderbanner'} style={{
          backgroundImage: "url('/static/assets/img/footer/footerBanner.svg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          minHeight: 400,
        }}>
          <Grid className={classes.containerArrowBack}>
            <CustomButton
              classes={{root: `customheaderfaqbackbutton ${classes.button}`}}
              startIcon={<ArrowBackIcon style={{color: 'white'}}/>}
              onClick={() => Router.push('/')}
            >
              {ReactHtmlParser(this.props.t('HEADER.button_back_home'))}
            </CustomButton>
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
                  <Paper classes={{root: `customfaqinputpaper ${classes.navbarSearch}`}}>
                    <InputBase
                      classes={{root: ` ${classes.input}`}}
                      placeholder={ReactHtmlParser(this.props.t('HEADER.placeholder_search'))}
                      inputProps={{'aria-label': ReactHtmlParser(this.props.t('HEADER.placeholder_search'))}}
                      onChange={this.onSearchChange}
                      value={search}
                    />
                    <Grid>
                      <IconButton classes={{root: `customfaqiconsearchbar ${classes.iconButton}`}} aria-label="search"
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


export default withTranslation('custom', {withRef: true})(withStyles(styles)(Header))
