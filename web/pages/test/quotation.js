const Quotation = require('../../components/Feurst/Quotation')
const {setAxiosAuthentication}=require('../../utils/authentication')
import React from 'react'
import axios from 'axios'


class QuotationTest extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      precos: null,
      type: 'EXCAVATRICE',
      mark: 'CATERPILLAR',
      model: '336E L',
      power: '236',
      weight: 36.7,
      teeth_count: 5,
      bladeShape: 'DROITE',
      bladeThickness: 50,
      bucketWidth: 2340,
      ground: 'CHARBON',
      teethShieldFixType: 'PIN',
      borderShieldFixType: 'PIN',
      firstname: 'Sébastien',
      name: 'Auvray',
      company: 'My Alfred',
      phone: '+33675774324',
    }
  }

  componentDidMount() {
    setAxiosAuthentication()
    axios.post('/feurst/api/quotation', this.state)
      .then(res => {
        this.setState({precos: res.data})
      })
  }

  render() {
    if (!this.state.precos) {
      return null
    }
    return(
      <Quotation data={{...this.state, ...this.state.precos}}/>
    )
  }

}

module.exports=QuotationTest
