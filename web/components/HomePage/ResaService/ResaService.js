import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import {RESA_SERVICE} from '../../../utils/i18n'
import styles from '../../../static/css/components/ResaService/ResaService'
import withStyles from '@material-ui/core/styles/withStyles'
import Router from 'next/router'
import {getLoggedUser} from '../../../utils/context'


class ResaService extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      homePage: false,
    }
  }

  componentDidMount() {
    if(Router.pathname === '/') {
      this.setState({homePage: true})
    }
  }

  handleController = () => {
    if(getLoggedUser()) {
      Router.push('/creaShop/creaShop')
    }
    else{
      this.props.triggerLogin()
    }
  }

  render() {
    const {classes} = this.props
    const {homePage} = this.state

    return (
      <Grid className={classes.ResaServiceMainContainer}>
        <Grid className={classes.becomeAlfredContainer}>
          <Grid>
            <h2 className={classes.becomeAlfredTitle}>{RESA_SERVICE.title}</h2>
          </Grid>
          <Grid>
            <p className={classes.becomeAlfredText}>{RESA_SERVICE.text}</p>
          </Grid>
          <Grid>
            <Button
              variant={'contained'}
              className={classes.resaServiceButton}
              onClick={this.handleController}
              style={{
                color: homePage ? 'rgba(178,204,251,1)' : '#F8CF61',
              }}
            >{RESA_SERVICE.button}</Button>
          </Grid>
        </Grid>
        <Grid/>
      </Grid>
    )
  }
}

export default withStyles(styles)(ResaService)
