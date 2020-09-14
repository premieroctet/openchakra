import React, {Component} from 'react';
import Layout from '../hoc/Layout/Layout';
import {Helmet} from 'react-helmet';


class BecomeAlfred extends Component {
  render() {
    return (
      <Layout>
        <Helmet>
          <title>Devenez Alfred et proposez vos services sur My Alfred </title>
          <meta property="description"
                content="Rejoignez la communauté My Alfred pour proposer des services entre particuliers à proximité. Proposez vos services et bénéficiez d'une visibilité auprès de milliers d'utilisateurs à proximité ! Chaque Alfred dispose d'une boutique de services qui lui est propre, pourquoi pas vous ?"/>
        </Helmet>

      </Layout>
    );
  }
}

export default BecomeAlfred;
