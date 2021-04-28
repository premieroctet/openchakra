import React from 'react'
import DateField from '../../components/DateField/DateField'
import moment from 'moment'

class DateTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dt: moment()
    }
  }

  onChange = event => {
    const {value}=event.target
    console.log(`Value:${value}, type:${typeof value}`)
    this.setState({dt: value})
  }

  render = () =>  {
    return (
      <DateField
        defaultValue={this.state.dt}
        onChange={this.onChange}
      />
    )
  }
}

export default DateTest
