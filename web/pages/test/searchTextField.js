import { TextField } from '@material-ui/core';
import React from 'react'
import axios from 'axios';

import SearchTextField4 from '../../components/Search/AutoCompleteTextField';

import _ from 'lodash'

class TestSearchTextField extends React.Component {

  constructor(props) {
    super(props)
    this.state= {
      options: [],
      loading: true,
    }
  }

  componentDidMount = () => {
    axios.get('/myAlfred/api/serviceUser/keywords/particular')
      .then( res => {
        const keywords=res.data
        this.setState({options:keywords})
      })
      .finally(()=> {
        this.setState({loading:false})
      })
  }

  render() {
    const {options, loading}=this.state

    return (
      <SearchTextField4 options={options} Component={TextField}/>
    )
  }
}

export default TestSearchTextField
