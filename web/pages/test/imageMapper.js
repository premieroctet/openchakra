import {snackBarSuccess} from '../../utils/notifications'
import React from 'react'
import ImageMapper from 'react-img-mapper'
import maps from '../../static/custom/map.json'

class Mapper extends React.Component {

  constructor(props) {
    super(props)
    this.URL = '/static/custom/1633532130687_e39a1c1774_fond%20all%20e4-04.svg'
    this.MAP = {
      name: 'my-map',
      // GET JSON FROM BELOW URL AS AN EXAMPLE
      areas: maps,
    }
  }

  onMouseEnter = (area, index, event) => {
    snackBarSuccess(area.title)
  }

  render() {
    return <ImageMapper src={this.URL} map={this.MAP} onMouseEnter={this.onMouseEnter}
      fillColor={'#00000000'} strokeColor={'#00000000'}
    />
  }
}

export default Mapper
