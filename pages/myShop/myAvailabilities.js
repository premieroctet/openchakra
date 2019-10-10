import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import Footer from '../../hoc/Layout/Footer/Footer';
import axios from "axios";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import {loadCldr, L10n } from '@syncfusion/ej2-base';
import { withStyles } from '@material-ui/core/styles';
import {  ScheduleComponent, RecurrenceEditorComponent, ViewsDirective, ViewDirective, Month, Inject, Day, Week } from '@syncfusion/ej2-react-schedule';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';


loadCldr(
  require('../../node_modules/cldr-data/supplemental/numberingSystems.json'),
  require('../../node_modules/cldr-data/main/fr-CH/ca-gregorian.json'),
  require('../../node_modules/cldr-data/main/fr-CH/currencies.json'),
  require('../../node_modules/cldr-data/main/fr-CH/numbers.json'),
  require('../../node_modules/cldr-data/main/fr-CH/timeZoneNames.json')
);


moment.locale('fr');

const { config } = require('../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 68,
        flexGrow: 1,
    },

    marginbot: {
        marginBottom: '3.5%',
    },
    hiddenone: {
        [theme.breakpoints.down('sm')]: {
            display: 'none!important',
        },
    },
    revealedone: {
        [theme.breakpoints.up('md')]: {
            display: 'none!important',
        },
    },
    containercalendar:{width:'100%',   [theme.breakpoints.down('sm')]: {
            width:'100%!important',

        }},
    containerheader:{[theme.breakpoints.down('sm')]: {
            width:'100%!important',
            marginTop:'-70px',
        }},
    bottombar:{visibility:'hidden', [theme.breakpoints.down('sm')]: {
            visibility:'visible',
            boxShadow: '2px -5px 14px -15px rgba(0,0,0,0.75)'
        }},
    topbar:{visibility:'visible', position: 'sticky', top: 65, zIndex:999,[theme.breakpoints.down('sm')]: {
            visibility:'hidden',
        }},
    hidenimg:{
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }
    ,
    dispocard:{
        minHeight:'100px',
        maxWidth:'250px',
        textAlign:'center',
        backgroundColor:'#f2f2f2',
        boxShadow: '4px 4px 41px -37px rgba(0,0,0,0.0)',
        border:'solid 1px #ccc',
        borderRadius:'10px',
        padding:'5%',
    },
    dispocardin:{
        padding:'5%',
        fontSize:'15px',
        marginBottom:10,
    },

    dispoheader:{
        height:'10%',
        color:'gray',
        width:'100%',
        backgroundColor:'#f2f2f2',
        transition: 'background-color 0.5s',
        fontSize:'15px',
        textAlign:'left',
        borderRadius:'0px',
        marginBottom:'5 px',
        '&:hover': {
            backgroundColor:'#2FBCD3',
            transition: 'background-color 0.5s',
            color: 'white',
        }
    },

    respbg:{
        [theme.breakpoints.down('sm')]: {
            marginTop: '-13%',
        }
    },
    resppic:{
        [theme.breakpoints.down('sm')]: {
            top: '17%!important',
        }
    },
});

L10n.load({
    "fr-CH": {
        "schedule": {
            "day": "Journée",
            "week": "La Semaine",
            "workWeek": "Work Week",
            "month": "Mois",
            "agenda": "Agenda",
            "weekAgenda": "Week Agenda",
            "workWeekAgenda": "Work Week Agenda",
            "monthAgenda": "Month Agenda",
            "today": "Aujourd'hui",
            "noEvents": "Aucun évenement",
            "emptyContainer": "Il n'y a pas d'évenement pour ce jour.",
            "allDay": "Toute la journée",
            "start": "Début",
            "end": "Fin",
            "more": "plus",
            "close": "Fermer",
            "cancel": "Annuler",
            "noTitle": "(No Title)",
            "delete": "Supprimer",
            "deleteEvent": "Supprimer",
            "deleteMultipleEvent": "Delete Multiple Events",
            "selectedItems": "Items selected",
            "deleteSeries": "Delete Series",
            "edit": "Modifier",
            "editSeries": "Edit Series",
            "editEvent": "Modifier événement",
            "createEvent": "Créer",
            "subject": "Subject",
            "addTitle": "Ajouter une nouvelle disponibilité",
            "moreDetails": "Plus de détails",
            "save": "Ajouter",
            "editContent": "Do you want to edit only this event or entire series?",
            "deleteRecurrenceContent": "Do you want to delete only this event or entire series?",
            "deleteContent": "Etes vous sûr de vouloir supprimer cette dispo ?",
            "deleteMultipleContent": "Are you sure you want to delete the selected events?",
            "newEvent": "Ajouter une nouvelle disponibilité",
            "title": "Titre",
            "location": "Location",
            "description": "Description",
            "timezone": "Timezone",
            "startTimezone": "Start Timezone",
            "endTimezone": "End Timezone",
            "repeat": "Repeat",
            "saveButton": "Ajouter",
            "cancelButton": "Annuler",
            "deleteButton": "Supprimer",
            "recurrence": "Récurrence",
            "wrongPattern": "The recurrence pattern is not valid.",
            "seriesChangeAlert": "The changes made to specific instances of this series will be cancelled and those events will match the series again.",
            "createError": "The duration of the event must be shorter than how frequently it occurs. Shorten the duration, or change the recurrence pattern in the recurrence event editor.",
            "recurrenceDateValidation": "Some months have fewer than the selected date. For these months, the occurrence will fall on the last date of the month.",
            "sameDayAlert": "Two occurrences of the same event cannot occur on the same day.",
            "editRecurrence": "Edit Recurrence",
            "repeats": "Repeats",
            "alert": "Alert",
            "startEndError": "The selected end date occurs before the start date.",
            "invalidDateError": "The entered date value is invalid.",
            "ok": "Ok",
            "occurrence": "Occurrence",
            "series": "Series",
            "previous": "Précédent",
            "next": "Suivant",
            "timelineDay": "Timeline Day",
            "timelineWeek": "Timeline Week",
            "timelineWorkWeek": "Timeline Work Week",
            "timelineMonth": "Timeline Month"
        },

        "recurrenceeditor": {
            "none": "None",
            "daily": "Journée",
            "weekly": "La semaine",
            "monthly": "Mois",
            "month": "Mois",
            "yearly": "Yearly",
            "never": "Jamais",
            "until": "Jusqu'à",
            "count": "Count",
            "first": "First",
            "second": "Deuxième",
            "third": "",
            "fourth": "Fourth",
            "last": "Dernier",
            "repeat": "Repeat",
            "repeatEvery": "Repeat Every",
            "on": "Repeat On",
            "end": "Fin",
            "onDay": "Jour",
            "days": "Jour(s)",
            "weeks": "Week(s)",
            "months": "Month(s)",
            "years": "Year(s)",
            "every": "every",
            "summaryTimes": "time(s)",
            "summaryOn": "on",
            "summaryUntil": "jusqu'à",
            "summaryRepeat": "Repeats",
            "summaryDay": "Jours(s)",
            "summaryWeek": "week(s)",
            "summaryMonth": "month(s)",
            "summaryYear": "year(s)"
        },
    }
});


class myAvailabilities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            shop: {},
            all_availabilities: [],
        };
        this.eventSettings = { dataSource: this.data };
    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        axios
          .get(url+'myAlfred/api/users/current')
          .then(res => {
              let user = res.data;
              if(user.is_alfred === false) {
                  Router.push('/becomeAlfredForm');
              } else {
                  this.setState({user:user});
                  axios
                    .get(url+'myAlfred/api/shop/currentAlfred')
                    .then(res => {
                        let shop = res.data;
                        this.setState({shop:shop,booking_request: shop.booking_request, no_booking_request:shop.no_booking_request,my_alfred_conditions: shop.my_alfred_conditions,
                            profile_picture: shop.profile_picture, identity_card: shop.identity_card, recommandations: shop.recommandations,
                            flexible_cancel: shop.flexible_cancel, moderate_cancel: shop.moderate_cancel, strict_cancel: shop.strict_cancel,
                            welcome_message: shop.welcome_message});
                    })
                    .catch(err =>
                      console.log(err)
                    );

                  axios.get(url+'myAlfred/api/availability/currentAlfred')
                    .then(res => {
                        let availability = res.data;
                        this.setState({all_availabilities: availability});

                    })
                    .catch(err => console.log(err));
              }
          })
          .catch(err => {
                console.log(err);
                if(err.response.status === 401 || err.response.status === 403) {
                    localStorage.removeItem('token');
                    Router.push({pathname: '/login'})
                }
            }
          );
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleChange2 = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    editorTemplate(props) {
        return (props !== undefined ? <table className="custom-event-editor" style={{ width: '100%', cellpadding: '5' }}><tbody>
        <tr><td className="e-textlabel">Je suis disponible pour :</td><td colSpan={4}>
            <DropDownListComponent id="EventType" placeholder='Service(s)' data-name="Subject" className="e-field" style={{ width: '100%' }} dataSource={['Tous', 'Service A', 'Service B']} value={props.EventType || null}/>
        </td></tr>
        <tr><td className="e-textlabel">De</td><td colSpan={4}>
            <DateTimePickerComponent locale="fr-CH" id="StartTime" data-name="StartTime" value={new Date(props.startTime || props.StartTime)} className="e-field"/>
        </td></tr>
        <tr><td className="e-textlabel">Au</td><td colSpan={4}>
            <DateTimePickerComponent locale="fr-CH" id="EndTime" data-name="EndTime" value={new Date(props.endTime || props.EndTime)} className="e-field"/>
        </td></tr>
        <tr><td className="e-textlabel">Récurrence de cette disponibilité</td><td colSpan={4}>
            <RecurrenceEditorComponent locale='fr-CH' ref={recurrObject => this.recurrObject = recurrObject} id='RecurrenceEditor ' style={{ width: '100%' }}/>
        </td></tr></tbody></table> : <div></div>);
    }


    render() {
        const {classes} = this.props;
        const {user} = this.state;
        const {all_availabilities} = this.state;

        return (
          <Fragment>
              <head>
                  <link href="https://cdn.syncfusion.com/ej2/material.css" rel="stylesheet" type="text/css"/>
              </head>
              <Layout>
                  <Grid container className={classes.bigContainer}>
                      <Grid container className={classes.topbar} justify="center" style={{backgroundColor: '#4fbdd7',marginTop: -3, height: '52px'}}>
                          <Grid item xs={1} className={classes.shopbar}></Grid>
                          <Grid item xs={2} className={classes.shopbar} style={{textAlign:"center"}}>
                              <Link href={'/myShop/services'}>
                                  <a style={{textDecoration:'none'}}>
                                      <p style={{color: "white",cursor: 'pointer'}}>Ma boutique</p>
                                  </a>
                              </Link>
                          </Grid>
                          <Grid item xs={2} className={classes.shopbar} style={{textAlign:"center"}}>
                              <Link href={'/myShop/messages'}>
                                  <a style={{textDecoration:'none'}}>
                                      <p style={{color: "white",cursor: 'pointer'}}>Messages</p>
                                  </a>
                              </Link>
                          </Grid>
                          <Grid item xs={2} className={classes.shopbar} style={{textAlign:"center"}}>
                              <Link href={'/myShop/mesreservations'}>
                                  <a style={{textDecoration:'none'}}>
                                      <p style={{color: "white",cursor: 'pointer'}}>Mes réservations</p>
                                  </a>
                              </Link>
                          </Grid>
                          <Grid item xs={2} className={classes.shopbar} style={{textAlign:"center",borderBottom: '2px solid white',zIndex:999}}>
                              <Link href={'/myShop/myAvailabilities'}>
                                  <a style={{textDecoration:'none'}}>
                                      <p style={{color: "white",cursor: 'pointer'}}>Mon calendrier</p>
                                  </a>
                              </Link>
                          </Grid>
                          <Grid item xs={2} className={classes.shopbar} style={{textAlign:"center"}}>
                              <Link href={'/myShop/performances'}>
                                  <a style={{textDecoration:'none'}}>
                                      <p style={{color: "white",cursor: 'pointer'}}>Performance</p>
                                  </a>
                              </Link>
                          </Grid>
                      </Grid>
                      <Grid className={classes.respbg} container style={{backgroundImage: `url('../../${this.state.shop.picture}')`,backgroundPosition: "center", height:'42vh',
                          backgroundSize:"cover", backgroundRepeat:"no-repeat",justifyContent:"center",alignItems:"center"}}>
                      </Grid>
                      <Grid className={classes.respbg} item style={{backgroundColor: 'rgba(0,0,0,0.25)',position:"absolute" ,width:'100%',zIndex:500,height:'42vh',top:117}}>
                      </Grid>
                      <Grid item>
                          <img src={'../'+user.picture} className={classes.resppic} style={{borderRadius:'50%',position:'absolute',top:'27%',left:'0%',right:'0%',margin: 'auto',zIndex:501, minWidth: '137px', maxWidth: '137px', maxHeight: '137px', minHeight: '137px'}} alt={'picture'}/>
                      </Grid>
                  </Grid>
                  <Grid container style={{marginTop: 20, padding:'2%'}} className={classes.containercalendar}>
                      <Grid item xs={12} md={7}>
                          <ScheduleComponent
                            locale='fr-CH'
                            eventSettings={{ dataSource: this.data }}
                            width='100%'
                            height='550px'
                            firstDayOfWeek={1}
                            editorTemplate={this.editorTemplate.bind(this)}
                          >
                              <ViewsDirective locale='fr-CH'>
                                  <ViewDirective option='Day'/>
                                  <ViewDirective option='Week'/>
                                  <ViewDirective option='Month'/>
                              </ViewsDirective>
                              <Inject locale='fr-CH' services={[Day, Week, Month]}/>
                          </ScheduleComponent>
                      </Grid>
                      <Grid className={classes.hidenimg} item md={2} style={{backgroundImage:'url(../../static/background/disponibilité.svg)', backgroundPosition:'center',backgroundSize:'contain', backgroundRepeat: 'no-repeat', }}>
                      </Grid>
                  </Grid>
              </Layout>
              <Grid container className={classes.bottombar} justify="center" style={{backgroundColor: 'white',bottom:0, position:'fixed', zIndex:'999'}}>
                  <Grid item xs={2} style={{textAlign:"center"}}>
                      <Link href={'/myShop/services'}><a style={{textDecoration:'none'}}>
                          <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/shopping-bag.png'} alt={'sign'} width={25} style={{opacity:'0.5'}}/></p></a>
                      </Link>
                  </Grid>
                  <Grid item xs={2} style={{textAlign:"center"}}>
                      <Link href={'/myShop/messages'}><a style={{textDecoration:'none'}}>
                          <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/speech-bubble.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}/></p>
                      </a></Link>
                  </Grid>
                  <Grid item xs={2} style={{textAlign:"center"}}>
                      <Link href={'/myShop/mesreservations'}><a style={{textDecoration:'none'}}>
                          <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/event.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}/></p>
                      </a></Link>
                  </Grid>
                  <Grid item xs={2} style={{textAlign:"center",zIndex:999, borderBottom: '3px solid #4fbdd7'}}>
                      <Link href={'/myShop/myAvailabilities'}><a style={{textDecoration:'none'}}>
                          <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/calendar.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}/></p>
                      </a></Link>
                  </Grid>
                  <Grid item xs={2} style={{textAlign:"center"}}>
                      <Link href={'/myShop/performances'}><a style={{textDecoration:'none'}}>
                          <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/speedometer.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}/></p>
                      </a></Link>
                  </Grid>
              </Grid>
              <Footer/>
          </Fragment>
        );
    };
}
export default withStyles(styles)(myAvailabilities);



