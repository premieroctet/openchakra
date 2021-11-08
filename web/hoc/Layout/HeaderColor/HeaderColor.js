import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Router from 'next/router'
import styles from '../../../static/css/components/HeaderColor/HeaderColor'
import { withStyles } from '@material-ui/core/styles'

class HeaderColor extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      bgColor: false,
    }
  }

  componentDidMount() {
    if(Router.pathname === '/paymentSuccess') {
      this.setState({bgColor: true})
    }
  }

  render() {
    const {classes} = this.props
    const {bgColor} = this.state
    return(
      <Grid style={{height: '2vh', backgroundColor: bgColor}} className={`customheadercolorbg ${bgColor ? classes.secondaryBackground : classes.primaryBackground}`}/>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(HeaderColor))
