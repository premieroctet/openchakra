import Insurance from '../../components/Insurance/Insurance'
import React from 'react'

class InsuranceTest extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      insurances: [],
    }
  }

  onChange = insurances => {
    console.log(`Changed to ${JSON.stringify(insurances)}`)
  }
  render() {
    return (
      <Insurance items={this.state.insurances} onChange={this.onChange}/>
    )
  }
}

export default InsuranceTest
