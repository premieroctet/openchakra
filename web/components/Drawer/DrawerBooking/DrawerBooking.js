import CustomButton from '../../CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import CancelIcon from '@material-ui/icons/Cancel'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'
import DatePicker from 'react-datepicker'
import Divider from '@material-ui/core/Divider'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch'
import BookingDetail from '../../BookingDetail/BookingDetail'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import styles from '../../../static/css/components/DrawerBooking/DrawerBooking'
import withStyles from '@material-ui/core/styles/withStyles'
const isEmpty = require('../../../server/validation/is-empty')
const {getLoggedUserId} = require('../../../utils/context')
const {isMomentAvailable} = require('../../../utils/dateutils')
const moment = require('moment')
const lodash = require('lodash')

moment.locale('fr')
import '../../../static/assets/css/custom.css'
import {DRAWER_BOOKING} from '../../../utils/i18n'

class DrawerBooking extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      expanded: false,
    }
  }

  handleChange = panel => (event, isExpanded) => {
    this.setState({expanded: isExpanded ? panel : false})
  }

  selectedPresta = prestations => (
    lodash.sortBy(prestations, p => (p && p.prestation ? p.prestation.order: 0)).map((p, index) => (
      <Grid container style={{display: 'flex', alignItems: 'center', width: '100%', marginBottom: '5%'}} key={index}>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
          <Grid container style={{display: 'flex', flexDirection: 'column'}}>
            <Grid>
              <Typography>{p.prestation.label}</Typography>
            </Grid>
            <Grid style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Grid>
                <Typography style={{color: 'rgba(39,37,37,35%)'}}>
                  {p.price ? p.price.toFixed(2) : '?'}€
                </Typography>
              </Grid>
              <Grid style={{marginLeft: '5%', marginRight: '5%'}}>
                <Typography style={{color: 'rgba(39,37,37,35%)'}}>/</Typography>
              </Grid>
              <Grid style={{whiteSpace: 'nowrap'}}>
                <Typography style={{color: 'rgba(39,37,37,35%)'}}>{p.billing ? p.billing.label : '?'}</Typography>
              </Grid>
            </Grid>
            {p.prestation.cesu_eligible && this.props.use_cesu ?
              <Grid>
                <Typography style={{color: 'rgba(39,37,37,35%)'}}><em>
                  {ReactHtmlParser(this.props.t(this.props.alfred_pro ? 'PRESTATION.cis_eligible': 'PRESTATION.cesu_eligible'))}
                </em></Typography>
              </Grid>
              : null
            }
          </Grid>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={6} style={{display: 'flex', flexDirection: 'row-reverse'}}>
          <Grid style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Grid>
              <IconButton onClick={this.props.onQtyChanged('remove', p._id)}>
                <RemoveIcon/>
              </IconButton>
            </Grid>
            <Grid style={{marginLeft: '4%', marginRight: '4%'}}>
              <Typography>{this.props.count[p._id] ? this.props.count[p._id] : 0}</Typography>
            </Grid>
            <Grid>
              <IconButton onClick={this.props.onQtyChanged('add', p._id)}>
                <AddIcon/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    ))
  )

  accordion = (prestations, fltr, classes) => {
    return(
      <Accordion classes={{root: classes.userServicePreviewAccordionNoShadow}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>{fltr ? fltr : ''}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>
          {this.selectedPresta(prestations)}
        </AccordionDetails>
      </Accordion>
    )
  }

  getExcludedTimes = () => {
    let currMoment=moment(this.props.date || new Date()).set({hour: 0, minute: 0})
    let exclude=[]
    while (currMoment.hour()!=23 || currMoment.minute()!=30) {
      if (!isMomentAvailable(currMoment, this.props.availabilities)) {
        exclude.push(currMoment.toDate())
      }
      currMoment.add(30, 'minutes')
    }
    return exclude
  }

  render() {

    const {expanded} = this.state
    const {warningPerimeter, warningBudget, warningSelf, side, classes, service, alfred, date, time, errors,
      count, serviceUser, isChecked, location, pick_tax, total, customer_fee,
      cesu_total, filters, pricedPrestations, excludedDays, role, company_amount,
      avocotes, all_avocotes, alfred_pro, title, serviceMode} = this.props

    const excludedTimes = this.getExcludedTimes()

    const res = (
      <Grid>
        {
          warningPerimeter || warningBudget || warningSelf ?
            <Grid className={classes.userServicePreviewWarningContainer}>
              <Grid>
                <CancelIcon classes={{root: classes.cancelButton}}/>
              </Grid>
              <Grid>
                { warningPerimeter ? <Typography>{ReactHtmlParser(this.props.t('DRAWER_BOOKING.warning_perimiter'))}</Typography> : null }
                { warningBudget ? <Typography>{ReactHtmlParser(this.props.t('DRAWER_BOOKING.warning_budget'))}</Typography> : null }
                { warningSelf ? <Typography>{ReactHtmlParser(this.props.t('DRAWER_BOOKING.warning_self'))}</Typography> : null }
              </Grid>
            </Grid> : null
        }
        <Grid className={classes.borderContentRight}>
          <Grid className={classes.mainDrawerBooking}>
            <Grid style={{marginBottom: 30}}>
              <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
                <Grid>
                  <Typography variant='h6' style={{color: '#505050', fontWeight: 'bold'}}>{title}</Typography>
                </Grid>
                <Grid className={classes.hideOnBigSreen}>
                  <IconButton aria-label='Edit' className={classes.iconButtonStyle}>
                    <CloseIcon classes={{root: classes.cancelButton}} onClick={this.props.toggleDrawer(side, false)}/>
                  </IconButton>
                </Grid>
              </Grid>
              <Grid style={{marginTop: '5%'}}>
                <Grid style={{padding: '10px 16px', display: 'flex', alignItems: 'center', border: '1px solid rgba(112,112,112,0.5)', borderRadius: 14, width: '100%'}}>
                  <Grid style={{width: '50%'}}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputComponent: () => {
                          return (
                            <DatePicker
                              selected={date}
                              dateFormat='dd/MM/yyyy'
                              onChange={this.props.onChangeDate}
                              placeholderText='Date'
                              locale='fr'
                              minDate={new Date()}
                              className={classes.datePickerStyle}
                              excludeDates={excludedDays}
                            />
                          )
                        },
                        disableUnderline: true,
                      }}
                    />
                  </Grid>
                  <Divider style={{height: 28, margin: 4}} orientation='vertical' />
                  <Grid style={{width: '50%', marginLeft: '3%'}}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputComponent: () => {
                          return (
                            <DatePicker
                              selected={time}
                              onChange={this.props.onChangeTime}
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={30}
                              timeCaption='Heure'
                              placeholderText={ReactHtmlParser(this.props.t('DRAWER_BOOKING.hours'))}
                              dateFormat='HH:mm'
                              locale='fr'
                              className={classes.datePickerStyle}
                              excludeTimes={excludedTimes}
                            />
                          )
                        },
                        disableUnderline: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <em className={classes.cancelButton}>{errors.datetime}</em>
              </Grid>
            </Grid>
            <Grid style={{marginBottom: 30}}>
              <Accordion classes={{root: `customdrawerbookaccordion ${classes.rootAccordion}`}} expanded={this.state.expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon/>}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography>{ReactHtmlParser(this.props.t('DRAWER_BOOKING.presta_choice'))}</Typography>
                </AccordionSummary>
                <AccordionDetails classes={{root: classes.userServicePreviewAccordionDetails}}>
                  {
                    Object.keys(filters).sort().map((key, index) => {
                      let fltr = key
                      let prestations = filters[key]
                      return (
                        <Grid style={{zIndex: 0}} key={index}>
                          {
                            fltr === '' ?
                              this.selectedPresta(prestations) :
                              this.accordion(prestations, fltr, classes)
                          }
                        </Grid>
                      )
                    })
                  }
                </AccordionDetails>
              </Accordion>
              <Grid>
                <em className={classes.cancelButton}>{errors.prestations}</em>
              </Grid>
            </Grid>
            <Grid style={{marginBottom: 30}}>
              <Accordion classes={{root: `customdrawerbookaccordion ${classes.rootAccordion}`}} expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography style={{color: '#505050'}}>{ReactHtmlParser(this.props.t('DRAWER_BOOKING.presta_place'))}</Typography>
                </AccordionSummary>
                <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>
                  { serviceMode || (serviceUser.location && this.props.isInPerimeter()) &&
                    <Grid>
                      <ButtonSwitch
                        key={moment()}
                        id={this.props.clientAddressId}
                        label={this.props.clientAddress}
                        isEditable={false}
                        isPrice={false}
                        isOption={false}
                        checked={location === this.props.clientAddressId}
                        onChange={this.props.onLocationChanged}/>
                    </Grid>
                  }
                  {
                    (serviceMode || (serviceUser.location && serviceUser.location.alfred && alfred.firstname)) &&
                      <Grid>
                        <ButtonSwitch
                          key={moment()}
                          id='alfred'
                          label={`Chez ${serviceMode ? 'le prestataire' : alfred.firstname}`}
                          isEditable={false}
                          isPrice={false}
                          isOption={false}
                          checked={location === 'alfred'}
                          onChange={this.props.onLocationChanged}/>
                      </Grid>
                  }
                  {
                    serviceUser.location && serviceUser.location.visio &&
                      <Grid>
                        <ButtonSwitch
                          key={moment()}
                          id='visio'
                          label={'En visio'}
                          isEditable={false}
                          isPrice={false}
                          isOption={false}
                          checked={location === 'visio'}
                          onChange={this.props.onLocationChanged}/>
                      </Grid>
                  }
                  <Grid>
                    <em className={classes.cancelButton}>{errors.location}</em>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            {serviceUser.pick_tax || this.props.travel_tax ?
              <Grid style={{marginBottom: 30}}>
                <Accordion classes={{root: `customdrawerbookaccordion ${classes.rootAccordion}`}} expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                  >
                    <Typography>{ReactHtmlParser(this.props.t('DRAWER_BOOKING.presta_option'))}</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>
                    {this.props.travel_tax ?
                      <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Grid>{ReactHtmlParser(this.props.t('DRAWER_BOOKING.deplacement_cost'))}</Grid>
                        <Grid>{this.props.travel_tax}€</Grid>
                      </Grid>
                      : null
                    }
                    {serviceUser.pick_tax && location === 'alfred' ?
                      <Grid>
                        <Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                          <Grid style={{display: 'flex', alignItems: 'center'}}>
                            <Grid>
                              <label>{ReactHtmlParser(this.props.t('DRAWER_BOOKING.delivery'))}</label>
                            </Grid>
                          </Grid>
                          {
                            isChecked ?
                              <Grid>
                                {serviceUser.pick_tax.toFixed(2)}€
                              </Grid> : null
                          }
                        </Grid>
                      </Grid>
                      : null
                    }
                  </AccordionDetails>
                </Accordion>
              </Grid>
              : null
            }
            <Grid style={{marginBottom: 30}}>
              <Accordion classes={{root: classes.userServicePreviewAccordionNoShadow}} expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography>{ReactHtmlParser(this.props.t('DRAWER_BOOKING.display_details'))}</Typography>
                </AccordionSummary>
                <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>
                  <Grid style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
                    <Grid >
                      <Typography>{this.props.getLocationLabel()}</Typography>
                    </Grid>
                    <Grid style={{display: 'flex', alignItems: 'center'}}>
                      <Typography>Le {date ? moment(date).format('DD/MM/YYYY') : ''} à {time ? moment(time).format('HH:mm') : ''}</Typography>
                    </Grid>
                  </Grid>
                  <Grid style={{display: 'flex', flexDirection: 'column'}}>
                    <BookingDetail
                      prestations={pricedPrestations}
                      count={count}
                      travel_tax={this.props.travel_tax}
                      pick_tax={pick_tax}
                      company_amount={company_amount}
                      total={total}
                      role={role}
                      customer_fee={customer_fee}
                      cesu_total={cesu_total}
                      alfred_pro={alfred_pro}
                    />
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid>
              { all_avocotes.length>0 &&
              <Grid style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: 20}}>
                <Typography>{ReactHtmlParser(this.props.t('DRAWER_BOOKING.resa_avc'))}</Typography>
                <Select value={avocotes} name='avocotes' multi={false} onChange={this.props.onAvocotesChanged}>
                  {all_avocotes.map(avocotes =>
                    <MenuItem value={avocotes._id}>{`${avocotes.user.full_name} pour ${avocotes.prestations.map(p => p.name).join(',')}`}</MenuItem>,
                  )}
                </Select>
              </Grid>
              }
            </Grid>
            <Grid>
              <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Grid style={{width: '100%'}}>
                  <CustomButton
                    classes={{root: `custombookinresabutton ${classes.userServicePButtonResa}`}}
                    variant='contained'
                    color='primary'
                    aria-label='add'
                    disabled={getLoggedUserId() && !isEmpty(errors)}
                    onClick={() => this.props.book(true)}
                  >
                    <Typography>{ReactHtmlParser(this.props.t('DRAWER_BOOKING.resa_button'))}</Typography>
                  </CustomButton>
                </Grid>
                <Grid style={{marginTop: 15, marginBottom: 15}}>
                  <Typography className={'custombookinginfoprice'} style={{color: 'rgba(39, 37, 37, 0.35)'}}>{ReactHtmlParser(this.props.t('DRAWER_BOOKING.next_step_paiment'))}</Typography>
                </Grid>
                <Grid>
                  <CustomButton
                    startIcon={<HelpOutlineIcon />}
                    disabled={!isEmpty(errors)}
                    onClick={() => this.props.book(false)}
                  >
                    <Typography style={{textDecoration: 'underline', textTransform: 'initial'}} className={'custombookingaskinfo'}>{ReactHtmlParser(this.props.t('DRAWER_BOOKING.button_info'))}</Typography>
                  </CustomButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
    return res
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(DrawerBooking))
