import axios from 'axios'
import {setAxiosAuthentication} from '../../utils/authentication'

import React from 'react'

class CustomIcon extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      displayMaterial: null,
    }
  }

  componentDidMount = () => {
    const {className}=this.props
    setAxiosAuthentication()
    axios.get('/static/assets/css/custom.css')
      .then(res => {
        this.setState({displayMaterial: !res.data.includes(`.${className} {`)})
      })
      .catch(err => console.error(err))
  }

  render = () => {
    const {displayMaterial} = this.state
    const {className, materialIcon, style} = this.props

    return (
      <>
        {
          displayMaterial ? materialIcon : <div style={style} className={className}/>
        }
      </>
    )
  }
}
export default CustomIcon
