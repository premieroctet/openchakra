import React from 'react';
const {setAxiosAuthentication}=require('../../utils/authentication')
import axios from 'axios';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Select from "@material-ui/core/Select";
const {snackBarSuccess, snackBarError} = require('../../utils/notifications');
import MenuItem from '@material-ui/core/MenuItem'

class B2BApiTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      employees : [],
    }
  }

  componentDidMount() {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/companies/users')
      .then (response => {
        this.setState({employees: response.data})
      })
      .catch (err => console.error(err))
  }

  onChange = event => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  createAdmin = () => {
    console.log(this.state)
    setAxiosAuthentication()
    const {firstname, name, email} = this.state
    axios.post('/myAlfred/api/companies/admin', { firstname, name, email})
      .then ( response => snackBarSuccess(`Création ok, password à changer : ${response.user.password}`))
      .catch ( err => {
        snackBarError(err.response.data.error)
      })
  }

  setAdmin = () => {
    console.log(this.state)
    setAxiosAuthentication()
    const {admin_id} = this.state
    axios.put('/myAlfred/api/companies/admin', { user_id: admin_id})
      .then ( () => snackBarSuccess('Statut admin ok'))
      .catch ( err => snackBarError(err.response.data.error))
  }

 render() {
   const {firstname, name, email, employees}=this.state
   console.log(JSON.stringify(employees))
   return (
     <>
     <div>
      <h2>Création d'administrateur</h2>
      Prénom
      <TextField name="firstname" onChange={this.onChange}/>
      Nom
      <TextField name="name" onChange={this.onChange}/>
      Email
      <TextField name="email" onChange={this.onChange}/>
      <Button onClick={this.createAdmin}>Créer</Button>
     </div>

     <div>
      <h2>Rôle d'administrateur</h2>
      <Select
        name="admin_id"
        onChange={this.onChange}
        options={employees.map ( e => { return { value: e._id, label: e.name}})}
        multi={false}
      >
        { employees.map( e => <MenuItem value={e._id}>{e.email}</MenuItem>)}

      </Select>
      <Button onClick={this.setAdmin}>Rendre administrateur</Button>
     </div>
     </>
   );
 }
}

export default B2BApiTest
