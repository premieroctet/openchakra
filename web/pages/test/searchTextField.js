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
        this.setState({options:options, loading:false})
      })
  }

  onChange = (event, newValue) => {
    console.log(event)
    console.log(newValue)
  }

  render() {
    const {options, loading}=this.state
    return (
      <SearchTextField
        options={options}
        onChange={this.onChange}
        loading={loading}
      />
    )
  }
}

export default TestSearchTextField
