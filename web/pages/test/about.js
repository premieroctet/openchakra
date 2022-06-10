import {withTranslation} from 'react-i18next'
import Input from '@material-ui/core/Input'
import React from 'react'
import Select from 'react-dropdown-select'
import axios from 'axios'

import About from '../../components/About/About'


const {setAxiosAuthentication}=require('../../utils/authentication')

class AboutTest extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      users: [],
      user: null,
    }
  }

  componentDidMount() {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/admin/users/all_light')
      .then(response => {
        let users = response.data
        users = users.map(u => {
          return {
            label: `${u.name} ${u.firstname} ${u.email}`,
            value: u.email,
            key: u.id,
          }
        })
        this.setState({users: users})

      })
      .catch(err => {
        console.error(err)
      })
  }

  onUserChanged = e => {
    this.setState({user: e[0].key})
    console.log(e[0].key)
  }

  render() {
    const {users, user} = this.state

    console.log(`User:${user}`)
    return(
      <>
        <Select
          input={<Input name="user" id="genre-label-placeholder"/>}
          displayEmpty
          name="user"
          onChange={this.onUserChanged}
          options={users}
          multi={false}
        >
        </Select>
        { user &&
          <>
            <div>Sans titre ni photo</div>
            <About key={user} user={user} />
            <div>Avec titre et photo</div>
            <About key={user} user={user} displayTitlePicture={true}/>
          </>
        }
      </>
    )
  }

}

export default withTranslation('custom', {withRef: true})(AboutTest)
