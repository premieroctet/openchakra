import React from 'react'
import axios from 'axios'
import cookie from 'react-cookies';

import Select from 'react-dropdown-select';
import About from '../../components/About/About'
import Layout from '../../hoc/Layout/Layout'
import Input from '@material-ui/core/Input';

import Commentary from '../../components/Commentary/Commentary'
import SummaryCommentary from '../../components/SummaryCommentary/SummaryCommentary'

class AboutTest extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      users:[],
      user: '5ec3df2a701b6d48c05b46bd',
      customerReviews: [],
      alfredReviews: [],
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
    this.loadReviews()
  }

  loadReviews = () => {
    axios.get(`/myAlfred/api/reviews/profile/customerReviewsCurrent/${this.state.user}`)
      .then( res => {
        this.setState( { customerReviews: res.data})
      })
    axios.get(`/myAlfred/api/reviews/profile/alfredReviewsCurrent/${this.state.user}`)
      .then( res => {
        this.setState( { alfredReviews: res.data})
      })
  }

  onUserChanged = e => {
    console.log(e[0].key)
    this.setState({user: e[0].key}, () => this.loadReviews());
  };

  render() {
    const{classes} = this.props;
    const {users, user, customerReviews, alfredReviews} = this.state

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

      <div>SummaryCommentary</div>
      <SummaryCommentary key={user} user={user}/>
      <div>Commentary</div>
      <Commentary />
      <div>Customer Reviews <pre>{JSON.stringify(customerReviews, null, 2)}</pre></div>
      <div>Alfred Reviews <pre>{JSON.stringify(alfredReviews, null, 2)}</pre></div>
      </>
    );
  }

}

export default AboutTest
