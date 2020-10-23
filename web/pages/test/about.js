import React from 'react'
import axios from 'axios'
import cookie from 'react-cookies';



import Select from 'react-dropdown-select';
import About from '../../components/About/About'
import Layout from '../../hoc/Layout/Layout'
import Input from '@material-ui/core/Input';

class AboutTest extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      users:[],
      //user: '5ec3df2a701b6d48c05b46bd', // Sabrina
      user: '5e2f30effc91743a94411e83', // PLusieurs adresses
    }
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get(`/myAlfred/api/admin/users/all_light`)
      .then(response => {
        let users = response.data;
        users = users.map(u => {
          return {
            label: `${u.name} ${u.firstname} ${u.email}`,
            value: u.email,
            key: u.id,
          };
        });
        this.setState({users: users});

      })
      .catch(err => {
        console.error(err);
      });
  }

  onUserChanged = e => {
    this.setState({user: e[0].key});
    console.log(e[0].key)
  };

  render() {
    const{classes} = this.props;
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
      <About key={this.state.user} user={this.state.user} />
      </>
    );
  }

}

export default AboutTest
