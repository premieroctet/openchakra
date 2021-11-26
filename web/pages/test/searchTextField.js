import React from 'react'
import axios from 'axios';

import SearchTextField from '../../components/Search/SearchTextField2';

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
    if (options.length==0) {
      return null
    }
    return (
      <SearchTextField
        options={options}
        loading={loading}
        value=""
      />
    )
  }
}

export default TestSearchTextField
