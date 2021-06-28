import React from 'react'
import Assets from '../../components/Assets/Assets'

export default class assetImg extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <Assets src={'/assets/img/bannr/bannerProfile.svg'}/>
      </div>
    )
  }
}
