import React from "react";
import Grid from "@material-ui/core/Grid";
import CancelIcon from "@material-ui/icons/Cancel";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import DatePicker from "react-datepicker";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ButtonSwitch from "../../ButtonSwitch/ButtonSwitch";
import BookingDetail from "../../BookingDetail/BookingDetail";
import Button from "@material-ui/core/Button";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import styles from '../../../static/css/components/DrawerBooking/DrawerBooking';
import withStyles from "@material-ui/core/styles/withStyles";
const isEmpty = require('../../../server/validation/is-empty');
const moment = require('moment');
moment.locale('fr');

class DrawerBooking extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      expanded: false
    }
  }

  handleChange = panel => (event, isExpanded) => {
    this.setState({expanded: isExpanded ? panel : false})
  };

  selectedPresta = (prestations, classes) => (
     prestations.map((p, index) => (
        <Grid container style={{display: 'flex', alignItems: 'center', width: '100%', marginBottom: '5%'}} key={index}>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
            <Grid container style={{display: 'flex', flexDirection: 'column'}}>
              <Grid>
                <Typography>{p.prestation.label}</Typography>
              </Grid>
              <Grid style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Grid>
                  <Typography style={{color:'rgba(39,37,37,35%)'}}>{p.price ? p.price.toFixed(2) : '?'}€</Typography>
                </Grid>
                <Grid style={{marginLeft : '5%', marginRight: '5%'}}>
                  <Typography style={{color:'rgba(39,37,37,35%)'}}>/</Typography>
                </Grid>
                <Grid style={{whiteSpace: 'nowrap'}}>
                  <Typography style={{color:'rgba(39,37,37,35%)'}}>{p.billing ? p.billing.label : '?'}</Typography>
                </Grid>
                {p.prestation.cesu_eligible && this.props.use_cesu ?
                  <Grid>
                    <Typography><em>Eligible au <a href={'#'}>CESU</a></em></Typography>
                  </Grid>
                  : null
                }
              </Grid>
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
  );

  accordion = (prestations,fltr, classes) => {
    return(
      <Accordion classes={{root: classes.userServicePreviewAccordionNoShadow}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{fltr ? fltr : ''}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>
          {this.selectedPresta(prestations, classes)}
        </AccordionDetails>
      </Accordion>
    )
  };

  render() {
    const {expanded} = this.state;
    const {warningPerimeter, side, classes, service, alfred, date, time, errors, count, serviceUser, isChecked, location, pick_tax, total, commission, cesu_total, filters, pricedPrestations} = this.props;

    return(
      <Grid>
        {
          !warningPerimeter ?
            <Grid className={classes.userServicePreviewWarningContainer}>
              <Grid>
                <CancelIcon color={'secondary'}/>
              </Grid>
              <Grid>
                <Typography>Attention, cet Alfred se trouve loin de chez vous !</Typography>
              </Grid>
            </Grid> : null
        }
        <Grid className={classes.borderContentRight}>
          <Grid className={classes.mainDrawerBooking}>
            <Grid style={{marginBottom: 30}}>
              <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
                <Grid>
                  <Typography variant="h6" style={{color: '#505050', fontWeight: 'bold'}}>{service.label} - {alfred.firstname}</Typography>
                </Grid>
                <Hidden lgUp>
                  <Grid>
                    <IconButton aria-label="Edit" className={classes.iconButtonStyle}>
                      <CloseIcon color={'secondary'} onClick={this.props.toggleDrawer(side, false)}/>
                    </IconButton>
                  </Grid>
                </Hidden>
              </Grid>
              <Grid style={{marginTop: '5%'}}>
                <Grid style={{padding: '10px 16px', display: 'flex', alignItems: 'center', border: '1px solid rgba(112,112,112,0.5)', borderRadius: 14, width: '100%'}}>
                  <Grid style={{width: '50%'}}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputComponent:(inputRef) => {
                          return (
                            <DatePicker
                              selected={date}
                              dateFormat="dd/MM/yyyy"
                              onChange={this.props.onChangeDate}
                              placeholderText="Date"
                              locale='fr'
                              minDate={new Date()}
                              className={classes.datePickerStyle}
                            />
                          )
                        },
                        disableUnderline: true
                      }}
                    />
                  </Grid>
                  <Divider style={{height: 28, margin: 4}} orientation="vertical" />
                  <Grid style={{width: '50%', marginLeft: '3%'}}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputComponent:(inputRef) => {
                          return (
                            <DatePicker
                              selected={time}
                              onChange={this.props.onChangeTime}
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={30}
                              timeCaption="Heure"
                              placeholderText="Heure"
                              dateFormat="HH:mm"
                              locale='fr'
                              minDate={new Date()}
                              className={classes.datePickerStyle}
                            />
                          )
                        },
                        disableUnderline: true
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <em style={{color: '#f87280'}}>{errors['datetime']}</em>
              </Grid>
            </Grid>
            <Grid style={{marginBottom: 30}}>
              <Accordion classes={{root: classes.rootAccordion}} expanded={this.state.expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon/>}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Choix de la presta</Typography>
                </AccordionSummary>
                <AccordionDetails classes={{root: classes.userServicePreviewAccordionDetails}}>
                  {
                  Object.keys(filters).sort().map((key, index) => {
                    let fltr = key;
                    let prestations = filters[key];
                    return (
                      <Grid style={{zIndex: 0}} key={index}>
                        {
                          fltr === '' ?
                            this.selectedPresta(prestations, classes) :
                            this.accordion(prestations,fltr, classes)
                        }
                      </Grid>
                    );
                  })
                }
                </AccordionDetails>
              </Accordion>
              <Grid>
                <em style={{color: '#f87280'}}>{errors['prestations']}</em>
              </Grid>
            </Grid>
            <Grid style={{marginBottom: 30}}>
              <Accordion classes={{root: classes.rootAccordion}} expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography style={{color: '#505050'}}>Lieu de la prestation</Typography>
                </AccordionSummary>
                <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>
                  { serviceUser.location && serviceUser.location.client && this.props.isInPerimeter() ?
                    <Grid>
                      <ButtonSwitch
                        key={moment()}
                        id='client'
                        label={'A mon adresse principale'}
                        isEditable={false}
                        isPrice={false}
                        isOption={false}
                        checked={location === 'client'}
                        onChange={this.props.onLocationChanged}/>
                    </Grid>
                    : null
                  }
                  {
                    serviceUser.location && serviceUser.location.alfred && alfred.firstname !== undefined ?
                      <Grid>
                        <ButtonSwitch
                          key={moment()}
                          id='alfred'
                          label={'Chez ' + alfred.firstname}
                          isEditable={false}
                          isPrice={false}
                          isOption={false}
                          checked={location === 'alfred'}
                          onChange={this.props.onLocationChanged}/>
                      </Grid>
                      : null
                  }
                  {
                    serviceUser.location && serviceUser.location.visio ?
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
                      : null
                  }
                  <Grid>
                    <em style={{color: '#f87280'}}>{errors['location']}</em>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            {serviceUser.pick_tax || this.props.computeTravelTax() ?
              <Grid style={{marginBottom: 30}}>
                <Accordion classes={{root: classes.rootAccordion}} expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Option(s) de la prestation</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>
                    {serviceUser.travel_tax && location === 'client' ?
                      <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Grid>
                          Frais de déplacement
                        </Grid>
                        <Grid>
                          {serviceUser.travel_tax.toFixed(2)}€
                        </Grid>
                      </Grid>
                      : null
                    }
                    {serviceUser.pick_tax && location === 'alfred' ?
                      <Grid>
                        <Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                          <Grid style={{display: 'flex', alignItems: 'center'}}>
                            <Grid>

                            </Grid>
                            <Grid>
                              <label>Retrait & livraison</label>
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
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Afficher les détails</Typography>
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
                      travel_tax={this.props.computeTravelTax()}
                      pick_tax={pick_tax}
                      total={total}
                      client_fee={commission}
                      cesu_total={cesu_total}
                    />
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid>
              <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Grid style={{width: '100%'}}>
                  <Button
                    classes={{root: classes.userServicePButtonResa}}
                    variant="contained"
                    color="primary"
                    aria-label="add"
                    disabled={!isEmpty(errors)}
                    onClick={() => this.props.book(true)}
                  >
                    <Typography>Réserver</Typography>
                  </Button>
                </Grid>
                <Grid style={{marginTop:15,  marginBottom: 15}}>
                  <Typography style={{color: 'rgba(39, 37, 37, 0.35)'}}>Choix du paiement à l’étape suivante</Typography>
                </Grid>
                <Grid>
                  <Button
                    startIcon={<HelpOutlineIcon />}
                    disabled={!isEmpty(errors)}
                    onClick={() => this.props.book(false)}
                  >
                    <Typography style={{textDecoration: 'underline', textTransform: 'initial'}}>Demande d’informations</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

}

export default withStyles(styles)(DrawerBooking);
