import React, { Component } from 'react';
import Layout from '../hoc/Layout/Layout';
import BecomeAlfredForm from '../components/becomeAlfred/becomeAlfred';

class BecomeAlfred extends Component {
  render() {
    return (
      <Layout>
        <BecomeAlfredForm />
      </Layout>
    );
  }
}

export default BecomeAlfred;
