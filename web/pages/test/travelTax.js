import React from 'react'
import TravelTax from '../../components/TravelTax/TravelTax'

class TravelTaxTest extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      tax: {rate: 10, from: 0},
    }
  }
  render() {
    const {tax}=this.state

    return (
      <TravelTax tax={tax} />
    )
  }
}

export default TravelTaxTest
