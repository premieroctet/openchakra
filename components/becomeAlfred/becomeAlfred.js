import React from 'react';
import axios from 'axios';

class BecomeAlfred extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorie: '',
      service: '',
      filter: '',
      prices:[],
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

  handlePrestationChange(e) {
    const { prestations } = this.state;
    const item = e.target.value;
    const arr = prestations;

    this.setState({
      prestations: [...arr, item],
    })
    console.log(prestations);
  }

  async handleEquipmentChange(e) {
    const { equipments } = this.state;
    const item = e.target.value;
    const arr = equipments;

    await this.setState({
      equipments: [...arr, item],
    })
    console.log(equipments);
  }

  async handlePrestationPriceChange(e) {
    await this.setState({
      price: e.target.value,
    })
    console.log(this.state.price);
    console.log(this.state);
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
            <option>Choisissez une catégorie</option>
            {this.state.servicesBack.map(i => {
              return <option value={i._id} key={i._id}>{i.label}</option>
            })}
          </select>
        }
        {filterShow != '' &&
          <select require="true" value={this.state.filter} onChange={this.handleFilterChange}>
            <option>Choisissez un filtre</option>
            {this.state.prestationsFiltersBack.map(i => {
              return <option value={i.filter_presentation._id} key={i.filter_presentation._id}>{i.filter_presentation.label}</option>
            })}
          </select>
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
                  <label>
                    {i.label}
                    <input
                      name={i._id}
                      type="checkbox"
                      value={i.label}
                      onChange={this.handlePrestationChange}
                    />
                  </label>
                  <input type="text" placeholder="Choisissez un prix" value={this.state.prices[0]} onChange={this.handlePrestationPriceChange} />
                  <p>Prix moyen pour cette prestation: {i.price}€</p>
                </React.Fragment>
              )
            })}
          </div>
        }
      </form>
    );
  }
}

export default BecomeAlfred;
