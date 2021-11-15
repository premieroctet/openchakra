import LoggedAsBanner from '../../components/LoggedAsBanner'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../static/css/components/Layout/LayoutFaq/LayoutFaq'
import Header from './About/Header'
import Footer from './About/Footer'
import Router from 'next/router'
import '../../static/assets/css/custom.css'


class LayoutFaq extends React.Component {
  constructor(props) {
    super(props)
    this.child = React.createRef()

    this.state = {
      becomeAlfredPage: false,
      search: '',
    }

  }

  componentDidMount() {
    if (Router.pathname === '/footer/becomeAlfred') {
      this.setState({becomeAlfredPage: true})
    }
  }

  sendSearch = () => {
    let state = this.child.current.state
    this.setState({search: state.search}, () => this.props.onSearchChange())
  };

  callClearFunction = () => {
    this.setState({search: ''}, () => this.props.callClearFunction())
  };


  render() {
    const {classes, children} = this.props
    const {becomeAlfredPage} = this.state

    return (
      <Grid className={classes.mainContainerLayoutFaq}>
        <LoggedAsBanner />
        <Header ref={this.child} search={this.sendSearch} clearFuntion={this.callClearFunction}/>
        <Grid className={becomeAlfredPage ? classes.becomeAlfredPageContainer : classes.childrenContainer}>
          {children}
        </Grid>
        <Grid className={`customlayoutfaqfootercont ${classes.footerContainerFaq}`}>
          <Footer/>
        </Grid>
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(LayoutFaq))
