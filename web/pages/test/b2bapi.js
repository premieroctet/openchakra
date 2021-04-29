import React from 'react';
const {setAxiosAuthentication}=require('../../utils/authentication')
import axios from 'axios';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Select from "@material-ui/core/Select";
const {snackBarSuccess, snackBarError} = require('../../utils/notifications');
import MenuItem from '@material-ui/core/MenuItem'
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
const {ADMIN, ROLES, MANAGER, DASHBOARD_MODE} = require('../../utils/consts')
class B2BApiTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user : null,
      employees : [],
      groups : [],
      services : [],
      group_name : '',
      group_action : 'add',
      group_service_action : 'add',
      firstname : '',
      name : '',
      email : '',
      group_id:null,
    }
  }

  componentDidMount() {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/users/current')
      .then (response => {
        this.setState({user: response.data})
      })
      .catch (err => console.error(err))
    axios.get('/myAlfred/api/companies/members')
      .then (response => {
        this.setState({employees: response.data})
      })
      .catch (err => console.error(err))
    Promise.all(Object.keys(DASHBOARD_MODE).map(mode => axios.get(`/myAlfred/api/groups/type/${mode}`)))
      .then (responses => {
        var groups=[]
        responses.forEach(r => {
          groups=groups.concat(r.data)
        })
        console.log(JSON.stringify(groups))
        this.setState({groups: groups})
      })
      .catch (err => console.error(err))
    axios.get('/myAlfred/api/service/pro')
      .then (response => {
        this.setState({services: response.data})
      })
      .catch (err => console.error(err))
  }

  onChange = event => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  createMember = () => {
    setAxiosAuthentication()
    const {firstname, name, email, group_id} = this.state
    axios.post('/myAlfred/api/companies/members', { firstname, name, email, group_id})
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
    axios.put('/myAlfred/api/companies/admin', { admin_id: admin_id})
      .then ( () => {
        snackBarSuccess('Statut admin ok')
        this.componentDidMount()
      })
      .catch ( err => snackBarError(err.response.data.error))
  }

  removeAdmin = () => {
    setAxiosAuthentication()
    const {admin_id} = this.state
    axios.delete(`/myAlfred/api/companies/admin/${admin_id}`)
      .then ( () => {
        snackBarSuccess('Statut admin retiré')
        this.componentDidMount()
      })
      .catch ( err => snackBarError(err.response.data.error))
  }

  createGroup = () => {
    setAxiosAuthentication()
    const {group_name} = this.state
    axios.post('/myAlfred/api/groups', { name: group_name})
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
    const {group_action, member_id, group_id} = this.state
    if (group_action == 'add') {
      var action=axios.put(`/myAlfred/api/groups/${group_id}/members`, { member_id: member_id})
    }
    else {
      var action=axios.delete(`/myAlfred/api/groups/${group_id}/members/${member_id}`)
    }
    action
      .then ( () => {
        snackBarSuccess(`Membre ajouté au groupe`)
        this.componentDidMount()
      })
  }

  updateManager = () => {
    const {group_action, member_id, group_id} = this.state
    if (group_action == 'add') {
      var action=axios.put(`/myAlfred/api/groups/${group_id}/managers`, { member_id: member_id})
    }
    else {
      var action=axios.delete(`/myAlfred/api/groups/${group_id}/managers/${member_id}`)
    }
    action
      .then ( () => {
        snackBarSuccess(`Membre ajouté au groupe`)
        this.componentDidMount()
      })
  }

  updateService = () => {
    const {service_id, group_service_id, group_service_action} = this.state

    var query;
    if (group_service_action == 'add') {
      query = axios.put(`/myAlfred/api/groups/${group_service_id}/allowedServices`, { service_id : service_id})
    }
    else {
      query = axios.delete(`/myAlfred/api/groups/${group_service_id}/allowedServices/${service_id}`)
    }
    query
      .then( res => {
        snackBarSuccess('Autorisation modifiée')
        this.componentDidMount()
      })
      .catch( err => {
        snackBarError(err.response.data)
      })
  }

 render() {
   const {firstname, name, email, employees, groups, services, user}=this.state

   const admins = employees.filter( e => e.roles.includes(ADMIN))

   if (!user){
     return null
   }

   return (
     <>
     <div>
     <h2>Utilisateur courant</h2>
     { user.full_name}, rôles {user.roles.join(',')}
     </div>
     <div>
      <h2>Création de membre</h2>
      Prénom
      <TextField name="firstname" onChange={this.onChange}/>
      Nom
      <TextField name="name" onChange={this.onChange}/>
      Email
      <TextField name="email" onChange={this.onChange}/>
      <Select name="group_id" onChange={this.onChange} multi={false} >
        { groups.map(group => <MenuItem value={group._id}>{`${group.name} (type ${DASHBOARD_MODE[group.type]})`}</MenuItem>)}
      </Select>
      <Button onClick={this.createMember}>Créer</Button>
     </div>
     <div>
      <h2>Membres</h2>
      <ul>{ employees.map( e => ( <li>{e.full_name} {e.email}</li> )) }
      </ul>
     </div>
     <div>
     <h2>Administrateurs</h2>
     <ul>{ admins.map( e => ( <li>{e.full_name} {e.email}</li> )) }</ul>
    </div>
     <div>
      <Select
        name="admin_id"
        onChange={this.onChange}
        options={employees.map ( e => { return { value: e._id, label: e.name}})}
        multi={false}
      >
        { employees.map( e => <MenuItem value={e._id}>{e.email}</MenuItem>)}

      </Select>
      <Button onClick={this.setAdmin}>Rendre administrateur</Button>
      <Button onClick={this.removeAdmin}>Supprimer administrateur</Button>
     </div>

     <div>
      <h2>Groupes</h2>
      <ul>
      { groups.map ( group => {
          return (
            <li>
              {`${group.name} (type ${DASHBOARD_MODE[group.type]})`}<DeleteForeverIcon onClick={()=>this.deleteGroup(group._id)} />
              <div>Managers
              <ul>
              {group.members.filter(m => m.roles.includes(MANAGER)).map( m => {
                return ( <li> {m.full_name} ({m.email}) </li> )
              })}
              </ul>
              </div>
              <div>Membres
              <ul>
              {group.members.map( m => {
                return ( <li> {m.full_name} ({m.email}) </li> )
              })}
              </ul>
              </div>
              <div>Services autorisés
              <ul>
              {group.allowed_services.map( s => {
                return ( <li> {s.label} </li> )
              })}
              </ul>
              </div>
            </li>)
        })
      }
      </ul>
     </div>
     <div>
      <Button onClick={this.createGroup}>Créer le groupe</Button>
      <TextField placeholder={'nom du groupe'} name="group_name" onChange={this.onChange}/>
     </div>
     <div>
       <h2>Membres des groupes</h2>
       <Select
         name="group_action"
         onChange={this.onChange}
         multi={false}
         value={this.state.group_action}
       >
        <MenuItem value={'add'}>Ajouter</MenuItem>
        <MenuItem value={'remove'}>Supprimer</MenuItem>
       </Select>
       le membre
       <Select
         name="member_id"
         onChange={this.onChange}
         multi={false}
       >
         { employees.map( e => <MenuItem value={e._id}>{e.email}</MenuItem>)}
       </Select>
       dans le groupe
       <Select
         name="group_id"
         onChange={this.onChange}
         multi={false}
       >
        { groups.map( e => <MenuItem value={e._id}>{e.name}</MenuItem>)}
       </Select>
       <Button onClick={this.updateMember}>GO !</Button>
     </div>
     <div>
       <h2>Managers des groupes</h2>
       <Select
         name="group_action"
         onChange={this.onChange}
         multi={false}
         value={this.state.group_action}
       >
        <MenuItem value={'add'}>Ajouter</MenuItem>
        <MenuItem value={'remove'}>Supprimer</MenuItem>
       </Select>
       le membre
       <Select
         name="member_id"
         onChange={this.onChange}
         multi={false}
       >
         { employees.map( e => <MenuItem value={e._id}>{e.email}</MenuItem>)}
       </Select>
       aux administrateurs du groupe
       <Select
         name="group_id"
         onChange={this.onChange}
         multi={false}
       >
        { groups.map( e => <MenuItem value={e._id}>{e.name}</MenuItem>)}
       </Select>
       <Button onClick={this.updateManager}>GO !</Button>
     </div>
     <div>
       <h2>Services autorisés par groupes</h2>
       <Select
         name="group_service_action"
         onChange={this.onChange}
         multi={false}
         value={this.state.group_action}
       >
        <MenuItem value={'add'}>Ajouter</MenuItem>
        <MenuItem value={'remove'}>Supprimer</MenuItem>
       </Select>
       le service
       <Select
         name="service_id"
         onChange={this.onChange}
         multi={false}
       >
         { services.map( e => <MenuItem value={e._id}>{e.label}</MenuItem>)}
       </Select>
       dans le groupe
       <Select
         name="group_service_id"
         onChange={this.onChange}
         multi={false}
       >
        { groups.map( e => <MenuItem value={e._id}>{e.name}</MenuItem>)}
       </Select>
       <Button onClick={this.updateService}>GO !</Button>
     </div>

     </>
   );
 }
}

export default B2BApiTest
