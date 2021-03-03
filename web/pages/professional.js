import React, {Fragment} from 'react';
import Router from 'next/router';


class Professional extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    localStorage.setItem('b2b', 'true');
    Router.push('/')
  }

  render = () => {
    return null
  }

}

export default Professional
