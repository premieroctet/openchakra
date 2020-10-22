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
const isEmpty = require('../../../server/validation/is-empty');
const moment = require('moment');
moment.locale('fr');

class DrawerBooking extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
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
          <Grid style={{width: '80%', paddingTop: '5%', paddingBottom: '5%'}}>
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
                      classes={{root: classes.navbarRootTextField}}
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
                      classes={{root: classes.navbarRootTextField}}
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
              <Accordion classes={{root: classes.rootAccordion}}>
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
                          <Accordion classes={{root: classes.userServicePreviewAccordionNoShadow}}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon/>}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography>{fltr ? fltr : ''}</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>
                              {prestations.map((p, index) => {
                                return (
                                  <Grid container style={{display: 'flex', alignItems: 'center', width: '100%', marginBottom: '5%'}} key={index}>
                                    <Grid item xl={6}>
                                      <Grid style={{display: 'flex', flexDirection: 'column'}}>
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
                                          <Grid>
                                            <Typography style={{color:'rgba(39,37,37,35%)'}}>{p.billing ? p.billing.label : '?'}</Typography>
                                          </Grid>
                                          {p.prestation.cesu_eligible && this.state.use_cesu ?
                                            <Grid>
                                              <Typography><em>Eligible au <a href={'#'}>CESU</a></em></Typography>
                                            </Grid>
                                            : null
                                          }
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item xl={6} style={{display: 'flex', flexDirection: 'row-reverse'}}>
                                      <Grid style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                        <Grid>
                                          <IconButton onClick={this.props.onQtyChanged('remove', p._id)}>
                                            <RemoveIcon/>
                                          </IconButton>
                                        </Grid>
                                        <Grid style={{marginLeft: '4%', marginRight: '4%'}}>
                                          <Typography>{count[p._id] ? count[p._id] : 0}</Typography>
                                        </Grid>
                                        <Grid>
                                          <IconButton onClick={this.props.onQtyChanged('add', p._id)}>
                                            <AddIcon/>
                                          </IconButton>
                                        </Grid>

                                      </Grid>
                                    </Grid>
                                  </Grid>
                                );
                              })}
                            </AccordionDetails>
                          </Accordion>
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
              <Accordion classes={{root: classes.rootAccordion}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography style={{color: '#505050'}}>Lieu de la prestation</Typography>
                </AccordionSummary>
                <AccordionDetails>
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
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Option(s) de la prestation</Typography>
                </AccordionSummary>
                <AccordionDetails>
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
              : null
            }
            <Grid style={{marginBottom: 30}}>
              <Accordion classes={{root: classes.userServicePreviewAccordionNoShadow}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Afficher les détails</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid style={{marginTop: 20, marginLeft: 10}}>
                    <Grid style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
                      <Grid style={{marginLeft: 10}}>
                        <Typography>{this.props.getLocationLabel()}</Typography>
                      </Grid>
                    </Grid>
                    <Grid style={{display: 'flex', alignItems: 'center'}}>
                      <Grid style={{marginLeft: 10}}>
                        <Typography>Le {date ? moment(date).format('DD/MM/YYYY') : ''} à {time ? moment(time).format('HH:mm') : ''}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid style={{display: 'flex', flexDirection: 'column', marginLeft: 15, marginRight: 15, marginBottom: 30}}>
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
                <Grid>
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

export default DrawerBooking;
