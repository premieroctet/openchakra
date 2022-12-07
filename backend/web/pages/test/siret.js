import {withTranslation} from 'react-i18next'
import React from 'react'

import Siret from '../../components/Siret/Siret'

class SiretTest extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      company: {},
    }
  }

  componentDidMount() {
  }

  onSiretChanged = st => {
    let siret = st.siret
    siret=siret.replace(/ /g, '')
    st.siret=siret
    this.setState({company: st})
  };

  render() {

    return(
      <Siret company={this.state.company} onChange={this.onSiretChanged}/>
    )
  }

}

export default withTranslation(null, {withRef: true})(SiretTest)
