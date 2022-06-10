import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import LayoutMobile from '../../hoc/Layout/LayoutMobile'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Router from 'next/router'

class PaymentResponsive extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Grid>
        <LayoutMobile>
          <Grid>
            <Grid>
              <h2>{ReactHtmlParser(this.props.t('PAYMENT_RESPONSIVE.title'))}</h2>
            </Grid>
          </Grid>
          <Grid style={{marginTop: '5vh'}}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button onClick={() => Router.push('/account/paymentMethod')}>
                <ListItemText primary={ReactHtmlParser(this.props.t('PAYMENT_RESPONSIVE.my_payment'))} secondary={ReactHtmlParser(this.props.t('PAYMENT_RESPONSIVE.secondary_payment'))}/>
                <ListItemIcon style={{display: 'flex', flexDirection: 'row-reverse'}}>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
              </ListItem>
            </List>
          </Grid>
        </LayoutMobile>
      </Grid>
    )
  }
}


export default withTranslation('custom', {withRef: true})(PaymentResponsive)
