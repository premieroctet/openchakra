import React from 'react';
import axios from 'axios';

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
        this.setState({ equipementsBack: equipementsBack})
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
      deadline_before_booking: this.state.deadline_before_booking,
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
    const servicesShow = this.state.categorie;
    const filterShow = this.state.service;
    const prestationsShow = this.state.filter;
    const equipementShow = this.state.service;
    return (
      <form onSubmit={e => e.preventDefault()}>
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
                  <label key={i._id}>
                    {i.label}
                    <input
                      name={i._id}
                      type="checkbox"
                      value={i._id}
                      onChange={this.handleEquipmentChange}
                    />
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
                  <button type="button" onClick={this.handlePrestationChange}>Valider</button>
                  <p>Prix moyen pour cette prestation: {i.price}€</p>
                </React.Fragment>
              )
            })}
            <button type="button" onClick={this.handleForm}>Valider form</button>
          </div>
        }
      </form>
    );
  }
}

export default BecomeAlfred;
