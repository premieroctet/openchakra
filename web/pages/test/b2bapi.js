import React from 'react';
const {setAxiosAuthentication}=require('../../utils/authentication')
import axios from 'axios';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Select from "@material-ui/core/Select";
const {snackBarSuccess, snackBarError} = require('../../utils/notifications');
import MenuItem from '@material-ui/core/MenuItem'
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
const {ADMIN} = require('../../utils/consts')
class B2BApiTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      employees : [],
      groups : [],
      group_name : '',
      group_action : 'add',
    }
  }

  componentDidMount() {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/companies/users')
      .then (response => {
        this.setState({employees: response.data})
      })
      .catch (err => console.error(err))
    axios.get('/myAlfred/api/companies/groups')
      .then (response => {
        this.setState({groups: response.data})
      })
      .catch (err => console.error(err))
  }

  onChange = event => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  createAdmin = () => {
    setAxiosAuthentication()
    const {firstname, name, email} = this.state
    axios.post('/myAlfred/api/companies/admin', { firstname, name, email})
      .then ( response => {
        console.log(`Received ${JSON.stringify(response)}`)
        snackBarSuccess(`Création ok, password à changer : ${response.data.password}`)
        this.componentDidMount()
      })
      .catch ( err => {
        console.error(err)
        snackBarError(err.response.data.error)
      })
  }

  setAdmin = () => {
    setAxiosAuthentication()
    const {admin_id} = this.state
    axios.put('/myAlfred/api/companies/admin', { user_id: admin_id})
      .then ( () => {
        snackBarSuccess('Statut admin ok')
        this.componentDidMount()
      })
      .catch ( err => snackBarError(err.response.data.error))
  }

  createGroup = () => {
    setAxiosAuthentication()
    const {group_name} = this.state
    axios.post('/myAlfred/api/companies/groups', { name: group_name})
      .then ( () => {
        snackBarSuccess(`Groupe ${group_name} créé`)
        this.componentDidMount()
      })
      .catch ( err => snackBarError(err.response.data.error))
  }

  deleteGroup = group_id => {
    setAxiosAuthentication()
    axios.delete(`/myAlfred/api/companies/groups/${group_id}`)
      .then ( () => {
        snackBarSuccess(`Groupe ${group_id} supprimé`)
        this.componentDidMount()
      })
      .catch ( err => {
        console.error(err)
        snackBarError(err.response.data.error)
      })
  }

  updateMember = () => {
    const {group_action} = this.state
    if (group_action == 'add') {
      this.addMember()
    }
    else {
      this.deleteMember()
    }
  }

  addMember = () => {
    const {member_id, group_id} = this.state
    axios.put(`/myAlfred/api/companies/groups/${group_id}/member`, { member_id: member_id})
      .then ( () => {
        snackBarSuccess(`Membre ajouté au groupe`)
        this.componentDidMount()
      })
      .catch ( err => {
        console.error(err)
        snackBarError(err.response.data.error)
      })

  }

  deleteMember = () => {
    const {member_id, group_id} = this.state
    setAxiosAuthentication()
    axios.delete(`/myAlfred/api/companies/groups/${group_id}/member/${member_id}`)
      .then ( () => {
        snackBarSuccess(`Membre supprimé du groupe`)
        this.componentDidMount()
      })
      .catch ( err => {
        console.error(err)
        snackBarError(err.response.data.error)
      })
  }

 render() {
   const {firstname, name, email, employees, groups}=this.state

   const admins = employees.filter( e => e.roles.includes(ADMIN))

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
      { admins.length>0 ?
          admins.map( a => a.email).join(',')
        :
          'Aucun administrateur'
      }
      <br/>
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

     <div>
      <h2>Groupes</h2>
      <ul>
      { groups.length >0 ?
        groups.map ( g => {
          return (
            <li>
              {g.name} <DeleteForeverIcon onClick={()=>this.deleteGroup(g._id)} />
              <ul>
              {g.members.map( m => {
                return (
                  <li>
                    {m.full_name} ({m.email})
                  </li>
                )
              })}
              </ul>
            </li>)
        })
        :
        'Aucun groupe pour cette enterprise'
      }
      </ul>
     </div>
     <div>
      <Button onClick={this.createGroup}>Créer le groupe</Button>
      <TextField placeholder={'nom du groupe'} name="group_name" onChange={this.onChange}/>
     </div>
     <div>
       Groupe
       <Select
         name="group_id"
         onChange={this.onChange}
         multi={false}
       >
        { groups.map( e => <MenuItem value={e._id}>{e.name}</MenuItem>)}
       </Select>
       :
       <Select
         name="group_action"
         onChange={this.onChange}
         multi={false}
         value={this.state.group_action}
       >
        <MenuItem value={'add'}>ajouter</MenuItem>
        <MenuItem value={'remove'}>supprimer</MenuItem>
       </Select>
       <Select
         name="member_id"
         onChange={this.onChange}
         multi={false}
       >
         { employees.map( e => <MenuItem value={e._id}>{e.email}</MenuItem>)}
       </Select>
       <Button onClick={this.updateMember}>GO !</Button>
     </div>
     </>
   );
 }
}

export default B2BApiTest
