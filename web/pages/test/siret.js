import React from 'react'
import axios from 'axios'

import Siret from '../../components/Siret/Siret';

class SiretTest extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      company: {}
    }
  }

  componentDidMount() {
  }

  onSiretChanged = st => {
    var siret = st.siret
    siret=siret.replace(/ /g, '')
    st.siret=siret
    this.setState({company: st});
  };

  render() {
    const{classes} = this.props;

    return(
      <Siret company={this.state.company} onChange={this.onSiretChanged}/>
    );
  }

}

export default SiretTest
