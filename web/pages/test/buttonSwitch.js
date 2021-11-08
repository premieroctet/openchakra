import ButtonSwitch from '../../components/ButtonSwitch/ButtonSwitch'
import React from 'react'

class ButtonSwitchTest extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <ButtonSwitch isPrice={false} checked={true} />
    )
  }
}
export default ButtonSwitchTest
