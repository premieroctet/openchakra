import {withTranslation} from 'react-i18next'
import React from 'react'
import Asset from '../../components/Asset/Asset'

class AssetImg extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <Asset src={'bannerProfile.svg'}/>
      </div>
    )
  }
}

export default withTranslation('custom', {withRef: true})(AssetImg)
