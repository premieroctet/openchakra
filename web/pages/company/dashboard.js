import React, {Fragment} from 'react';
import Layout from '../../hoc/Layout/Layout';
import Select2 from 'react-select'
const {setAxiosAuthentication}=require('../../utils/authentication')
const {is_b2b_admin}=require('../../utils/context')
import axios from 'axios';

class CompanyDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      company: {},
    };
  }

  componentWillMount() {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/users/current')
      .then(response => {
        const user = response.data
        if (!is_b2b_admin(user)) {
          Router.push('/')
        }
        this.setState({user: user});
        axios.get('/myAlfred/api/companies/current')
          .then(response => {
            const company = response.data
            this.setState({company: company});
          })
          .catch(err => { console.error(err) });
        axios.get('/myAlfred/api/companies/allowedServices')
          .then(response => {
            this.setState({allowed_services: response.data});
          })
          .catch(err => { console.error(err) });

      })
      .catch(err => { console.error(err) });
    axios.get('/myAlfred/api/service/pro')
      .then(response => {
        this.setState({services: response.data});
      })
      .catch(err => { console.error(err) });
  }

  onChange = event => {
    event = event || []
    this.setState({allowed_services: event})
    let removed = this.state.allowed_services.filter(x => !event.includes(x)); // calculates diff
    let added = event.filter(x => !this.state.allowed_services.includes(x)); // calculates diff
    const method=removed.length>0 ? axios.delete : added.length>0 ? axios.put : null
    if (method) {
      const service_id = removed.length>0 ? removed[0].value : added[0].value
      setAxiosAuthentication()
      method('/myAlfred/api/companies/allowedService', { service_id : service_id})
        .then( res => console.log(res))
        .catch( err => console.error(err))
    }
  }

  render() {

    const {company, user, allowed_services, services} = this.state;

    if (!user || !services || ! allowed_services) {
      return null
    }

    const optionsServices = services.map(service => ({
      label: service.label,
      value: service._id,
      key: service._id,
    }));


    return (
      <Fragment>
        <Layout>
          <div>Compagnie {company.name}</div>
          <div>{JSON.stringify(allowed_services)}</div>
          <div>{services.length} services pro</div>
          <Select2
            value={allowed_services}
            options={optionsServices}
            onChange={this.onChange}
            isMulti
            isSearchable
            closeMenuOnSelect={false}
          />

        </Layout>
      </Fragment>

    );
  }
}


export default CompanyDashboard;
