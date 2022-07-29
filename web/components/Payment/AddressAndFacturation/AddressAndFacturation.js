import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import DrawerBookingRecap from '../../Drawer/DrawerBookingRecap/DrawerBookingRecap'
import PaymentPics from '../../PaymentPics/PaymentPics'
import Topic from '../../../hoc/Topic/Topic'
import AddressService from '../../AddressService/AddressService'
import Profile from '../../Profile/Profile'
import ListAlfredConditions from '../../ListAlfredConditions/ListAlfredConditions'
import styles from '../../../static/css/components/AddressAndFacturation/AddressAndFacturation'
import withStyles from '@material-ui/core/styles/withStyles'
import ReactHtmlParser from 'react-html-parser'
import lodash from 'lodash'

class AddressAndFacturation extends React.Component {

  constructor(props) {
    super(props)
  }

  callHandleStep = () => {
    this.props.handleStep()
  };

  render() {
    const{equipments, pricedPrestations, countPrestations, alfred, classes, alfred_pro} = this.props

    return(
      <Grid container className={classes.addressAndFactContainer}>
        <Grid item xl={6} lg={6} md={6} xs={12} sm={12} >
          <Grid className={classes.addressAndFactuMainContainer}>
            <Grid className={`customadandfaccontainer ${classes.adandfaccontainer}`}>
              <Topic
                titleTopic={ReactHtmlParser(this.props.t('ADDRESS_FACTURATION.topic_service'))}
                titleSummary={false}
                underline={false}
              >
                <AddressService
                  {...this.props}
                />
              </Topic>
            </Grid>
            <Grid className={`customadandfaccontainer ${classes.adandfaccontainer}`} style={{marginTop: '2vh'}}>
              { /** TODO Afficher ServiceAvatar si booking.is_service */ }
              {alfred &&
                <Topic
                  titleTopic={ReactHtmlParser(this.props.t('PROFIL.about', {firstname: alfred.firstname}))}
                  titleSummary={false}
                  underline={false}
                >
                  <Profile
                    user={alfred}
                  />
                </Topic>
              }
              {!lodash.isEmpty(equipments) &&
                <>
                  <Grid style={{marginTop: 30, marginBottom: 30}}>
                    <Divider className={`customadreandfacdivider ${classes.divider}`}/>
                  </Grid>
                  <Topic
                    titleTopic={ReactHtmlParser(this.props.t('BOOKING.stuff'))}
                    titleSummary={equipments.length === 0 ? ReactHtmlParser(this.props.t('BOOKING.no_stuff')) : false}
                    underline={false}
                  >
                    <ListAlfredConditions
                      wrapperComponentProps={equipments}
                      columnsXl={6}
                      columnsLG={6}
                      columnsMD={6}
                      columnsSM={6}
                      columnsXS={6}
                    />
                  </Topic>
                </>
              }
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={6} lg={6} md={6} xs={12} sm={12} className={classes.mainContainerAdressFactu}>
          <Grid className={`customadandfaccontainer ${classes.adandfaccontainer}`}>
            <Grid style={{paddingLeft: '10%', paddingTop: '5%', paddingBottom: '5%', paddingRight: '10%'}}>
              <DrawerBookingRecap
                {...this.props}
                pricedPrestations={pricedPrestations}
                countPrestations={countPrestations}
                handleStep={this.callHandleStep}
                alfred_pro={alfred_pro}
              />
            </Grid>
          </Grid>
          <Grid style={{display: 'flex', justifyContent: 'center', marginTop: '3vh'}}>
            <PaymentPics/>
          </Grid>
        </Grid>
      </Grid>
    )
  }

}

export default withTranslation(null, {withRef: true})(withStyles(styles)(AddressAndFacturation))
