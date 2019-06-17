import React, { Component } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/Menu';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SelectUniversel from './SelectUniversel';
import Checkboxes from '../Checkboxes/checkboxes';
import MyCalendar from '../Calendar.1/calendar';
import Universaltext from '../Textfields/Textfieluniversal';
import '../../static/style2.css';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 350,
    marginTop: 30,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  lesinputs: {
    display: 'block',
    margin: 'auto',
    textAlign: 'center!important',
  },
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
    maxHeight: 500,
    overflow: 'auto',
    width: '70%',
    textAlign: 'center',
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
  items: {
    textAlign: 'left',
    lineHeight: '3.5!important',
  },
  dispos: {
    marginTop: 40,
  },
  lescheckboxes: {
    marginTop: 30,
  },
});


class Designuniform extends Component {

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
  }

  componentDidMount() {
    axios.get('http://localhost:5000/myAlfred/api/category/all')
      .then(response => {
        const categoriesBack = response.data;
        this.setState({ categoriesBack: categoriesBack });
        console.log(this.state);
      })
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
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    const servicesShow = this.state.categorie;
    const filterShow = this.state.service;
    const prestationsShow = this.state.filter;
    const equipementShow = this.state.service;

    return (
      <form onSubmit={e => e.preventDefault()}>
        <Grid container className={classes.cardContainer}>
          <Card className={classes.card}>
            <Grid container>
              <Grid xs={12}>
                <Typography><h1>Devenir un Alfred</h1></Typography>
              </Grid>
              <Grid xs={12}>
                <Typography><h2>Créez votre boutique de service</h2></Typography>
              </Grid>
              <Grid xs={12}>
                <div className={classes.lesinputs}>
                  <FormControl className={classes.formControl}>
                    <InputLabel className={classes.formControl2} shrink htmlFor="service-label-placeholder">
                      Catégorie
                    </InputLabel>
                    <Select
                      require="true"
                      value={this.state.categorie}
                      onChange={this.handleCategoryChange}
                      input={<Input name="service" id="service-label-placeholder" />}
                      displayEmpty
                      name="service"
                      className={classes.selectEmpty}
                    >
                      <MenuItem value="">
                        <em>Choisissez votre catégorie</em>
                      </MenuItem>
                      {this.state.categoriesBack.map(i => {
                        return <MenuItem value={i._id} key={i._id}>{i.label}</MenuItem>
                      })}
                    </Select>
                  </FormControl>
                </div>
              </Grid>
              <Grid xs={12}>
                <SelectUniversel />
              </Grid>
              <Grid container className={classes.lescheckboxes}>
                <Grid xs={2}>
                </Grid>
                <Grid xs={2}>
                  <Grid container>
                    <Grid xs={2}>
                      <Checkboxes />
                    </Grid>
                    <Grid xs={10}>
                      <Typography className={classes.items}>item</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={2}>
                  <Grid container>
                    <Grid xs={2}>
                      <Checkboxes />
                    </Grid>
                    <Grid xs={10}>
                      <Typography className={classes.items}>item</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={2}>
                  <Grid container>
                    <Grid xs={2}>
                      <Checkboxes />
                    </Grid>
                    <Grid xs={10}>
                      <Typography className={classes.items}>item</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={2}>
                  <Grid container>
                    <Grid xs={2}>
                      <Checkboxes />
                    </Grid>
                    <Grid xs={10}>
                      <Typography className={classes.items}>item</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={4}>
                <Universaltext />
              </Grid>
              <Grid xs={4}>
                <Universaltext />
              </Grid>
              <Grid xs={4}>
                <Universaltext />
              </Grid>
              <Grid xs={12} className={classes.dispos}>
                <Typography><h2>Vos Disponibilités</h2></Typography>
              </Grid>
              <Grid xs={12}>
                <MyCalendar />
              </Grid>

            </Grid>
          </Card>
        </Grid>
      </form>
    );
  }
}

export default withStyles(styles)(Designuniform);
