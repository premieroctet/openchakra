import React from 'react';
import axios from 'axios';
import moment from 'moment';
import BigCalendar from 'react-big-calendar'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import '../../static/styleform.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../static/stylecalendar.css';
import { throwStatement } from '@babel/types';

const styles = theme => ({
  cardContainer: {
    height: '120vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: '1.5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    maxHeight: 700,
    overflow: 'auto',
    width: '55%',
  },
  cardHeader: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  cardProgressBar: {
    display: 'flex',
    flexGrow: 1,
  },
  cardBody: {
    display: 'flex',
    flexGrow: 8,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    backgroundColor: 'lightgrey',
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 232,
    },
  },
  chip: {
    marginRight: 5,
    marginBottom: 5,
  },
  categoryExpansion: {
    marginBottom: 5,
  },
  textinput: {
    marginTop: '35px',
  },
  dlidentite1: {
    lineHeight: 5.3,
    '&:hover': {
      cursor: 'pointer',
      color: '#000080',
    }
  },
  dlidentite2: {
    '&:hover': {
      cursor: 'pointer',
      color: '#000080',
    }
  },
  vridentite: {
    marginTop: 35,
  },
  titre1: {
    fontSize: 18,
  },
  titre2: {
    fontSize: 18,
  },
  titre3: {
    fontSize: 18,
  },
  titre4: {
    fontSize: 18,
  },
  petit1: {
    fontSize: 12,
  },
  petit2: {
    fontSize: 12,
  },
  checkboxespart: {
    marginTop: 25,
  },
  finpres: {
    marginTop: 25,
  },
  obligations: {
    marginTop: 31,
  },
  input: {
    display: 'none',
  },
  button: {
    margin: theme.spacing,
  },
  calendar: {
    minHeight: '400px',
  },
  checkboxesMonth: {
    marginTop: '20px',
  },
});

moment.locale('fr');
const localizer = BigCalendar.momentLocalizer(moment);

class BecomeAlfred extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorie: '',
      service: '',
      filter: '',
      prestation: '',
      perimeter: '',
      city: '',
      minimum_basket: '',
      deadline_before_booking: '',
      prices: [],
      equipments: [],
      prestations: [],
      filterArr: [],
      prestationsArr: [],
      categoriesBack: [],
      servicesBack: [],
      prestationsFiltersBack: [],
      prestationsBack: [],
      equipementsBack: [],

      // Alfred's presentation
      id_recto: '',
      id_verso: '',
      picture: '',
      serviceDescription: '',
      phone: '',
      isParticular: false,
      isProfessional: false,
      isMicro_company: false,
      isIndividualCompany: false,
      siret: '',
      creationDate: '',
      denomination: '',
      nafape: '',
      isEngaged: false,
      isCertified: false,
      myCardR: '',
      myCardV: '',

      // Calendar
      cal_events: [],
      daysOff: false,
      extendedTwelveMonths: false,
      january: false,
      february: false,
      march: false,
      april: false,
      may: false,
      june: false,
      july: false,
      august: false,
      september: false,
      october: false,
      november: false,
      december: false,
    };

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleServiceChange = this.handleServiceChange.bind(this);
    this.handlePrestationChange = this.handlePrestationChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleEquipmentChange = this.handleEquipmentChange.bind(this);
    this.handlePrestationPriceChange = this.handlePrestationPriceChange.bind(this);
    this.handlePrestationSelectChange = this.handlePrestationSelectChange.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.handlePerimeter = this.handlePerimeter.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleMinimumBasket = this.handleMinimumBasket.bind(this);
    this.handleDeadlineBeforeBooking = this.handleDeadlineBeforeBooking.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);

    // Alfred's Presentation
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRecto = this.handleRecto.bind(this);
    this.handleVerso = this.handleVerso.bind(this);
  }

  componentDidMount() {
    let self = this;
    axios.get('http://localhost:5000/myAlfred/api/category/all')
      .then(response => {
        const categoriesBack = response.data;
        this.setState({ categoriesBack: categoriesBack });
        console.log(this.state);
      })

    axios.get('http://localhost:5000/myAlfred/api/calendar/all')
      .then(function (response) {

        let events = response.data;

        for (let i = 0; i < events.length; i++) {

          for (let j = 0; j < events[i].events.length; j++) {

            events[i].events[j].start = moment.utc(events[i].events[j].start).toDate();
            events[i].events[j].end = moment.utc(events[i].events[j].end).toDate();


          }
          self.setState({
            cal_events: events[i].events
          })
        }


      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleRecto(e) {
    this.setState({
      myCardR: e.target.files[0]
    })
  }

  handleVerso(e) {
    this.setState({
      myCardV: e.target.files[0]
    })
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      this.setState({
        cal_events: [
          ...this.state.cal_events,
          {
            start,
            end,
            title,
          },
        ],
      });
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
      axios.post('http://localhost:5000/myAlfred/api/calendar/add', {
        title: title,
        start: start,
        end: end
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  onDeleteClick(id) {
    const r = window.confirm("Would you like to remove this event?");
    if (r) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
      axios
        .delete(`http://localhost:5000/myAlfred/api/calendar/event/${id}`)
        .then(res =>
          console.log(res)
        )
        .catch(err =>
          console.log(err)
        );

      window.location.reload();
    }
  }

  async handleCategoryChange(e) {
    if (this.state.service != '' || this.state.filter != '' || this.state.prestations.length > 0) {
      this.setState({
        service: '',
        filter: '',
        prestations: [],
      });
    }
    await this.setState({ categorie: e.target.value });
    console.log(this.state.categorie);
    axios.get(`http://localhost:5000/myAlfred/api/service/all/${this.state.categorie}`)
      .then(response => {
        const servicesBack = response.data
        this.setState({ servicesBack: servicesBack })
        console.log(this.state.servicesBack);
      })
  }

  async handleServiceChange(e) {
    if (this.state.filter != '' || this.state.prestations.length > 0) {
      await this.setState({
        filter: '',
        prestations: [],
      });
    }
    await this.setState({ service: e.target.value });
    console.log(this.state.service);
    axios.get(`http://localhost:5000/myAlfred/api/prestation/${this.state.service}`)
      .then(response => {
        const prestationsFiltersBack = response.data
        this.setState({ prestationsFiltersBack: prestationsFiltersBack })
        console.log(this.state.prestationsFiltersBack);
      });

    axios.get(`http://localhost:5000/myAlfred/api/service/${this.state.service}`)
      .then(response => {
        const equipementsBack = response.data.equipments
        this.setState({ equipementsBack: equipementsBack })
        console.log(equipementsBack);
      })
  }

  async handleFilterChange(e) {
    if (this.state.prestations.length > 0) {
      await this.setState({
        prestations: [],
      });
    }
    await this.setState({ filter: e.target.value });
    console.log(this.state.filter);
    axios.get(`http://localhost:5000/myAlfred/api/prestation/${this.state.service}/${this.state.filter}`)
      .then(response => {
        const prestationsBack = response.data
        this.setState({ prestationsBack: prestationsBack })
        console.log(this.state.prestationsBack);
      })
  }

  async handlePrestationChange(e) {
    const { prestations, prestation, price } = this.state;
    const item = e.target.value;
    const arr = prestations;

    await this.setState({
      prestations: [...arr, {
        id: prestation,
        price: price,
      }],
    })
    console.log(prestations);
  }

  async handleEquipmentChange(e) {
    const { equipments, equipment } = this.state;
    const item = e.target.value;
    const arr = equipments;

    await this.setState({
      // equipments: [...arr, item],
      equipment: item,
    })
    console.log(equipment);
  }

  async handlePrestationSelectChange(e) {
    await this.setState({
      prestation: e.target.value,
    })
    console.log(this.state.prestation);
  }

  async handlePrestationPriceChange(e) {
    await this.setState({
      price: e.target.value,
    })
    console.log(this.state.price);
    console.log(this.state);
  }

  handlePerimeter(e) {
    this.setState({
      perimeter: e.target.value,
    });
  }

  handleCity(e) {
    this.setState({
      city: e.target.value,
    });
  }

  handleDeadlineBeforeBooking(e) {
    this.setState({
      deadline_before_booking: e.target.value,
    });
  }

  handleMinimumBasket(e) {
    this.setState({
      minimum_basket: e.target.value,
    });
  }

  handleForm() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    axios.post(`http://localhost:5000/myAlfred/api/serviceUser/add`, {
      service: this.state.service,
      prestation: this.state.prestation,
      price: this.state.price,
      city: this.state.city,
      perimeter: this.state.perimeter,
      minimum_basket: this.state.minimum_basket,
      deadline_before_booking: this.state.deadline_before_bookin,
      equipment: this.state.equipment,
    })
      .then((response) => {
        console.log(response);
        this.setState({
          service: response.data._id,
        })

        axios.post("http://localhost:5000/myAlfred/api/shop/add", {
      service: this.state.service,
      description: 'test',
      booking_request: true,
      my_alfred_conditions: true,
      profile_picture: true,
      identity_card: true,
      recommandations: true,
      welcome_message: 'Hello',
      flexible_cancel: true,
      moderate_cancel: true,
      strict_cancel: true,
      id_recto: '',
      id_verso: '',
      verified_phone: true,
      is_particular: this.state.isParticular,
      is_professional: this.state.isProfessional,
      self_employed: this.state.isMicro_company,
      individual_company: this.state.isIndividualCompany,

      creation_date: this.state.creationDate,
      siret: this.state.siret,
      naf_ape: this.state.nafape,

    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      })
      .catch(function (error) {
        console.log(error);
      });

    const formData = new FormData();
    formData.append('myImage', this.state.myImage);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    axios.post("http://localhost:5000/myAlfred/api/users/profile/picture", formData, config)
      .then((response) => {
        alert("Photo ajouté");
      }).catch((error) => {
        console.log(error)
      });

    const idCardForm = new FormData();
    idCardForm.append('myCardR', this.state.myCardR);
    idCardForm.append('myCardV', this.state.myCardV);
    axios.post("http://localhost:5000/myAlfred/api/users/profile/idCard", idCardForm, config)
      .then((response) => {
        alert("id ajouté")
      }).catch((error) => {
        console.log(error)
      })

  }

  handleFileChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.files[0]
    })
  }

  // Alfred's presentation
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });

    console.log(this.state);
  }

  render() {
    const { classes } = this.props;
    const servicesShow = this.state.categorie;
    const filterShow = this.state.service;
    const prestationsShow = this.state.filter;
    const equipementShow = this.state.service;
    const { cal_events } = this.state;

    const events = cal_events.map(event => (

      <tr key={event._id}>
        <td>{event.title}</td>
        <td>{moment(event.start).format('l')}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, event._id)}
            className="btndanger"
          >
            Delete
                </button>
        </td>
      </tr>

    ));
    return (
      <React.Fragment>
        <form onSubmit={e => e.preventDefault()}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Catégorie, services & prestations</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div class="form-style-6">
                <select require="true" value={this.state.categorie} onChange={this.handleCategoryChange}>
                  <option>Choisissez une catégorie</option>
                  {this.state.categoriesBack.map(i => {
                    return <option value={i._id} key={i._id}>{i.label}</option>
                  })}
                </select>
                {servicesShow != '' &&
                  <select require="true" value={this.state.service} onChange={this.handleServiceChange}>
                    <option>Choisissez un service</option>
                    {this.state.servicesBack.map(i => {
                      return <option value={i._id} key={i._id}>{i.label}</option>
                    })}
                  </select>
                }
                {filterShow != '' &&
                  <React.Fragment>
                    <select require="true" value={this.state.filter} onChange={this.handleFilterChange}>
                      <option>Choisissez un filtre</option>
                      {this.state.prestationsFiltersBack.map(i => {
                        return <option value={i.filter_presentation._id} key={i.filter_presentation._id}>{i.filter_presentation.label}</option>
                      })}
                    </select>
                    <br />
                    <label>
                      Périmètre d'activitée
                      <input
                        type="text"
                        defaultValue=''
                        placeholder="Entrez un périmètre"
                        onChange={this.handlePerimeter}
                      />
                    </label>
                    <br />
                    <label>
                      Ville d'activité
                      <input
                        type="text"
                        defaultValue=''
                        placeholder="Entrez un lieu d'activité"
                        onChange={this.handleCity}
                      />
                    </label>
                    <br />
                    <label>
                      Minimum d'achat
                      <input
                        type="text"
                        defaultValue=''
                        placeholder="Entrez un minimum d'achat pour le panier"
                        onChange={this.handleMinimumBasket}
                      />
                    </label>
                    <br />
                    <label>
                      Délais de prévenance avant réservation
                      <input
                        type="text"
                        defaultValue=''
                        placeholder="Entrez un minimum d'achat pour le panier"
                        onChange={this.handleDeadlineBeforeBooking}
                      />
                    </label>
                  </React.Fragment>
                }
                {equipementShow != '' &&
                  <div>
                    <div>
                      {this.state.equipementsBack.map(i => {
                        return (
                          <label class="checkbox" key={i._id}>
                            {i.label}
                            <input
                              name={i._id}
                              type="checkbox"
                              value={i._id}
                              onChange={this.handleEquipmentChange}
                            />
                            <span class="checkbox__icon"></span>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                }
                {prestationsShow != 0 &&
                  <div>
                    {this.state.prestationsBack.map(i => {
                      return (
                        <React.Fragment key={i._id}>
                          <select require="true" defaultValue='' onChange={this.handlePrestationSelectChange}>
                            <option>Choisissez une prestation</option>
                            <option value={i._id}>{i.label}</option>
                          </select>
                          <input type="text" placeholder="Choisissez un prix" defaultValue='' onChange={this.handlePrestationPriceChange} />
                          <p>Prix moyen pour cette prestation: {i.price}€</p>
                        </React.Fragment>
                      )
                    })}
                  </div>
                }
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Calendrier</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container className={classes.cardContainer}>
                <Card className={classes.card}>
                  <Grid container>
                    <Grid item xs={12}>
                      <BigCalendar
                        selectable
                        events={cal_events}
                        scrollToTime={new Date(1970, 1, 1, 6)}
                        defaultView={'week'}
                        views={['month', 'week', 'day']}
                        onSelectEvent={event => alert(event.title)}
                        onSelectSlot={this.handleSelect}
                        defaultDate={new Date()}
                        localizer={localizer}
                        className={classes.calendar}
                      />
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                      <tbody className="listdelete">
                        <tbody>
                          {events}
                        </tbody>
                      </tbody>
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid container className={classes.checkboxesMonth}>
                      {/*Grandes checkboxes*/}
                      <Grid item xs={6}>
                        <label className="checkbox">
                          <input
                            name="extendedTwelveMonths"
                            type="checkbox"
                            checked={this.state.extendedTwelveMonths}
                            onChange={this.handleInputChange}
                          />
                          <span className="checkbox__icon bigcheck"></span>
                          <span className="contenulabel">je souhaite étendre ces disponibilités aux 12 prochains mois</span>
                        </label>
                      </Grid>
                      <Grid item xs={6}>
                        <label className="checkbox">
                          <input
                            name="daysOff"
                            type="checkbox"
                            checked={this.state.daysOff}
                            onChange={this.handleInputChange}
                          />
                          <span className="checkbox__icon bigcheck"></span>
                          <span className="contenulabel">Je souhaite étendre ces disponibilités aux jours fériés</span>
                        </label>
                      </Grid>

                      {/*Petites checkboxes*/}
                      <Grid item xs={2}>
                        <label className="checkbox">
                          <input
                            name="january"
                            type="checkbox"
                            checked={this.state.january}
                            onChange={this.handleInputChange}
                          />
                          <span className="checkbox__icon littlecheck"></span>
                          <span className="contenulabel">Janvier</span>
                        </label>
                      </Grid>
                      <Grid item xs={2}>
                        <label className="checkbox">
                          <input
                            name="february"
                            type="checkbox"
                            checked={this.state.february}
                            onChange={this.handleInputChange}
                          />
                          <span className="checkbox__icon littlecheck"></span>
                          <span className="contenulabel">Février</span>
                        </label>
                      </Grid>
                      <Grid item xs={2}>
                        <label className="checkbox">
                          <input
                            name="march"
                            type="checkbox"
                            checked={this.state.march}
                            onChange={this.handleInputChange}
                          />
                          <span className="checkbox__icon littlecheck"></span>
                          <span className="contenulabel">Mars</span>
                        </label>
                      </Grid>
                      <Grid item xs={2}>
                        <label className="checkbox">
                          <input
                            name="april"
                            type="checkbox"
                            checked={this.state.april}
                            onChange={this.handleInputChange}
                          />
                          <span className="checkbox__icon littlecheck"></span>
                          <span className="contenulabel">Avril</span>
                        </label>
                      </Grid>
                      <Grid item xs={2}>
                        <label className="checkbox">
                          <input
                            name="may"
                            type="checkbox"
                            checked={this.state.may}
                            onChange={this.handleInputChange}
                          />
                          <span className="checkbox__icon littlecheck"></span>
                          <span className="contenulabel">Mai</span>
                        </label>
                      </Grid>
                      <Grid item xs={2}>
                        <label className="checkbox">
                          <input
                            name="june"
                            type="checkbox"
                            checked={this.state.june}
                            onChange={this.handleInputChange}
                          />
                          <span className="checkbox__icon littlecheck"></span>
                          <span className="contenulabel">Juin</span>
                        </label>
                      </Grid>
                      <Grid item xs={2}>
                        <label className="checkbox">
                          <input
                            name="july"
                            type="checkbox"
                            checked={this.state.july}
                            onChange={this.handleInputChange}
                          />
                          <span className="checkbox__icon littlecheck"></span>
                          <span className="contenulabel">Juillet</span>
                        </label>
                      </Grid>
                      <Grid item xs={2}>
                        <label className="checkbox">
                          <input
                            name="august"
                            type="checkbox"
                            checked={this.state.august}
                            onChange={this.handleInputChange}
                          />
                          <span className="checkbox__icon littlecheck"></span>
                          <span className="contenulabel">Août</span>
                        </label>
                      </Grid>
                      <Grid item xs={2}>
                        <label className="checkbox">
                          <input
                            name="september"
                            type="checkbox"
                            checked={this.state.september}
                            onChange={this.handleInputChange}
                          />
                          <span className="checkbox__icon littlecheck"></span>
                          <span className="contenulabel">Septembre</span>
                        </label>
                      </Grid>
                      <Grid item xs={2}>
                        <label className="checkbox">
                          <input
                            name="october"
                            type="checkbox"
                            checked={this.state.october}
                            onChange={this.handleInputChange}
                          />
                          <span className="checkbox__icon littlecheck"></span>
                          <span className="contenulabel">Octobre</span>
                        </label>
                      </Grid>
                      <Grid item xs={2}>
                        <label className="checkbox">
                          <input
                            name="november"
                            type="checkbox"
                            checked={this.state.november}
                            onChange={this.handleInputChange}
                          />
                          <span className="checkbox__icon littlecheck"></span>
                          <span className="contenulabel">Novembre</span>
                        </label>
                      </Grid>
                      <Grid item xs={2}>
                        <label className="checkbox">
                          <input
                            name="december"
                            type="checkbox"
                            checked={this.state.december}
                            onChange={this.handleInputChange}
                          />
                          <span className="checkbox__icon littlecheck"></span>
                          <span className="contenulabel">Décembre</span>
                        </label>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Présentation</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container className={classes.cardContainer}>
                <Card className={classes.card}>
                  <Grid container>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}>
                      <div>
                        <div>
                          <input accept="image/*" name="myImage" className="input" style={{ display: 'none' }} onChange={this.handleFileChange} id="icon-button-file" type="file" />
                          <label htmlFor="icon-button-file">
                            <IconButton color="primary" className={classes.button} style={{ width: 70, height: 70, backgroundColor: 'lightgrey' }} component="span">
                              <PhotoCamera />
                            </IconButton>
                          </label>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={7}>
                      <Typography>
                        Décrivez brievement vos services et votre expertise
          Rédigez un résumé rapide de vos services. Mettez en évidence vos savoir faire, vos expériences et ce qui vous démarque des autres Alfred !
            </Typography>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} className={classes.textinput}>
                      <label>
                        Coiffure
              <textarea cols="90" name="serviceDescription" value={this.serviceDescription} rows="8" placeholder="Description" onChange={this.handleInputChange} />
                      </label>
                    </Grid>
                    <Grid item xs={2}></Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} className={classes.vridentite}>
                      <Typography>Vérifiez votre identité</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>Elles ne seront pas visibles par les utilisateurs</Typography>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={4}>
                      <label>
                        Numéro de téléphone
            <input type="text" name="phone" value={this.phone} onChange={this.handleInputChange} />
                      </label>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={5}>
                      <Grid container>
                        <Grid item xs={12}>
                          <input accept="image/*" name="myCardR" className="input" ref={this.fileInput} style={{ display: 'none' }} id="icon-button-file" type="file" onChange={this.handleRecto} />
                          <label htmlFor="icon-button-file">
                            <Typography className={classes.dlidentite1}>Téléchargez votre pièce d'identité(recto)</Typography>
                          </label>
                        </Grid>
                        <Grid item xs={12}>
                          <input accept="image/*" name="myCardV" className="input" style={{ display: 'none' }} id="icon-button-file" type="file" onChange={this.handleVerso} />
                          <label htmlFor="icon-button-file">
                            <Typography className={classes.dlidentite2}>Téléchargez votre pièce d'identité(verso)</Typography>
                          </label>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={2}></Grid>
                  </Grid>

                  <Grid container className={classes.checkboxespart}>

                    <Grid container>
                      <Grid item xs={1}/*className={classes.checkbox1}*/>
                        <input
                          name="isParticular"
                          type="checkbox"
                          checked={this.state.isParticular}
                          onChange={this.handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <Typography className={classes.titre1}>
                          Je suis un Particulier
            </Typography>
                        <Typography>
                          En tant que particulier, vous pouvez rendre des services occasionnels sur My-Alfred. Si votre activité devient régulière, un statut professionnel (mi-cro-entrepreuneur,...) s’impose. Il est également requis pour certains sec-teurs d’activité réglementés (travaux de plomberie, peinture, électricité...)
            </Typography>
                      </Grid>
                    </Grid>

                    {/* <Grid container>
        <Grid item xs={1}>
          <input type="checkbox" />
        </Grid>
        <Grid item xs={11}>
            <Typography className={classes.petit1} >
              <p>J'ai compris</p>
            </Typography>
          </Grid>
       </Grid> */}

                    <Grid container>
                      <Grid item xs={1}>
                        <input
                          name="isProfessional"
                          type="checkbox"
                          checked={this.state.isProfessional}
                          onChange={this.handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <Typography className={classes.titre2}>
                          Je suis un Professionnel
                        </Typography>
                        <Typography>
                          Un statut professionnel est nécessaire pour les métiers réglementés et permet une activité régulière sur My-Alfred. Seuls les professionnels peuvent proposer leurs services aux entreprises qui ont besoin d’une facture.Un statut professionnel est requis dès que votre activité devient régulière
                        </Typography>
                      </Grid>
                    </Grid>

                    {/* <Grid container>
          <Grid item xs={1}>
            <input type="checkbox" />
          </Grid>
          <Grid item xs={11}>
            <Typography className={classes.petit1} >
              <p>J'ai compris</p>
            </Typography>
          </Grid>
        </Grid> */}

                    <Grid container>
                      <Grid item xs={1}>
                        <input
                          name="isMicro_company"
                          type="checkbox"
                          checked={this.state.isMicro_company}
                          onChange={this.handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <Typography className={classes.titre3}>
                          <p>Micro-entreprise, auto-entrepreuneur</p>
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={1}>
                        <input
                          name="isIndividualCompany"
                          type="checkbox"
                          checked={this.state.isIndividualCompany}
                          onChange={this.handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <Typography className={classes.titre4}>
                          <p>Entreprise individuelle, EIRL, MDA, professions libérales...</p>
                        </Typography>
                      </Grid>
                    </Grid>

                  </Grid>

                  <Grid item xs={2}></Grid>


                  <Grid container className={classes.finpres}>
                    <Grid item xs={6}>
                      <Grid container>
                        <label>
                          Numéro Siret
                <input name="siret" value={this.state.siret} onChange={this.handleInputChange} type="text" />
                        </label>
                        <label>
                          Date de création
                <input name="creationDate" value={this.state.creationDate} onChange={this.handleInputChange} type="date" />
                        </label>
                        <label>
                          Dénomination
                <input name="denomination" value={this.state.denomination} onChange={this.handleInputChange} type="text" />
                        </label>
                        <label>
                          Code NAF/APE
                <input name="nafape" value={this.state.nafape} onChange={this.handleInputChange} type="text" />
                        </label>
                      </Grid>
                    </Grid>

                    <Grid item xs={6} className={classes.obligations}>
                      <Grid item xs={12}>
                        <Typography className={classes.titre2}>
                          Vos obligations légales
              </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>
                          Dans le cadre des prestations effectuées via My-Alfred, vous devez respecter toutes les obligations légales et réglementaires (fiascales, sociales, comptables, administratives etc... correspondant à votre statut.Numéro de téléphoneCode à 4 chiffresTerminer
              </Typography>
                      </Grid>
                      <Grid container>
                        <Grid item xs={2}>
                          <input
                            name="isEngaged"
                            type="checkbox"
                            checked={this.state.isEngaged}
                            onChange={this.handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography className={classes.petit2}>
                            <p>je m’engage à respecter toutes les obligations légales correspondant à mon statut.</p>
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={2}>
                          <input
                            name="isCertified"
                            type="checkbox"
                            checked={this.state.isCertified}
                            onChange={this.handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography className={classes.petit2}>
                            <p>Je certifie sur l’honneur qu’il s’agit bien de mon entreprise</p>
                          </Typography>
                        </Grid>
                      </Grid>
                      <button type="button" onClick={this.handleForm}>Valider form</button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </form>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(BecomeAlfred);
