import React from 'react'
import axios from 'axios';

import SearchTextField1 from '../../components/Search/SearchTextField';
import SearchTextField2 from '../../components/Search/SearchTextField2';
import SearchTextField3 from '../../components/Search/SearchTextField3';
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

  changeOnSelect = (trig, slug) => {
    return slug
  }

  render() {
    const {options, loading}=this.state

    return (
      <>
      <h1>SearchTextField1</h1>
      <SearchTextField1 options={options} loading={loading} value="" />
      <h1>SearchTextField2</h1>
      <SearchTextField2 options={options} loading={loading} value="" />
      <h1>SearchTextField3</h1>
      <SearchTextField3 options={options} loading={loading} value="" />
      <h1>SearchTextField4</h1>
      <SearchTextField4 options={options}/>
      </>
    )
  }
}

export default TestSearchTextField
