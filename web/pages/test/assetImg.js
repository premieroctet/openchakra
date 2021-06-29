import React from 'react'
import Asset from '../../components/Asset/Asset'

export default class assetImg extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <Asset src={'/assets/img/banner/bannerProfile.svg'}/>
      </div>
    )
  }
}
