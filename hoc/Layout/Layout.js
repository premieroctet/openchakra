import React, { Fragment } from 'react';
import NavBar from './NavBar/NavBar';
import Loader from '../../components/Loader';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      research : ''
    };
    this.getDataForSearch = this.getDataForSearch.bind(this)
  }

  getDataForSearch = data =>{
    this.setState({research: data}, () => this.props.search(this.state.research))
  }

  render() {
    const { children } = this.props;

    return(
      <Fragment>
        <Loader />
        <NavBar search={this.getDataForSearch}/>
        {children}
      </Fragment>
    );
  }
}

export default Layout;
