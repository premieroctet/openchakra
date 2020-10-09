import React, {Fragment} from 'react';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {children, user, selectedAddress, logged, style} = this.props;

    return (
      <Fragment>
        <NavBar style={style} user={user} selectedAddress={selectedAddress} logged={logged} />
        {children}
        <Footer/>
      </Fragment>
    );
  }
}

export default Layout;
