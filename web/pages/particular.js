import React, {Fragment} from 'react';
import Router from 'next/router';


class Particular extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    localStorage.removeItem('b2b');
    window.location = '/'
  }

  render = () => {
    return null
  }

}

export default Particular
