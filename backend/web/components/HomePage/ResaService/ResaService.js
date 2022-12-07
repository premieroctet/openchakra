import { canAlfredSelfRegister } from '../../../config/config';
import CustomButton from '../../CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
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
      <Grid className={classes.ResaServiceMainContainer} id={'anchorService'}>
        <Grid className={classes.becomeAlfredContainer}>
          <Grid>
            <h2 className={`customresaserviceh2 ${classes.becomeAlfredTitle}`}>{ReactHtmlParser(this.props.t('RESA_SERVICE.title'))}</h2>
          </Grid>
          <Grid>
            <p className={`customresaservicetext ${classes.becomeAlfredText}`}>{ReactHtmlParser(this.props.t('RESA_SERVICE.text'))}</p>
          </Grid>
          {canAlfredSelfRegister() && <Grid>
            <CustomButton
              variant={'contained'}
              className={`customresaservicebutton ${classes.resaServiceButton}`}
              onClick={this.handleController}
              style={{
                color: homePage ? 'rgba(178,204,251,1)' : '#F8CF61',
              }}
            >{ReactHtmlParser(this.props.t('RESA_SERVICE.button'))}</CustomButton>
          </Grid>
          }
        </Grid>
        <Grid/>
      </Grid>
    )
  }
}

export default withTranslation(null, {withRef: true})(withStyles(styles)(ResaService))
