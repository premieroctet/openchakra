import React from 'react'
import './cssOverride.module.css'

class CssOverrideTest extends React.Component {

  render = () => {
    return Array(50).fill(0).map(() => (
      <>
        <div className={'basic'}>Test basique</div>
        <div className={'override basic'}>Test surcharge</div>
        <div className={'superoverride basic'}>Test supersurcharge</div>
      </>
    ))
  }


}


module.exports = CssOverrideTest
