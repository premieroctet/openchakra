import React from 'react'
import axios from 'axios';

import SearchTextField from '../../components/Search/SearchTextField';

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
        const options=keywords.map(k => { return {label: k}})
        this.setState({options:options})
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
        //key={options}
        options={options}
        loading={loading}
      />
    )
  }
}

export default TestSearchTextField
