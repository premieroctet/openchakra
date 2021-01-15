import React from 'react';
import HeaderColor from "./HeaderColor/HeaderColor";
import TrustAndSecurityBar from "./TrustAndSecurityBar/TrustAndSecurityBar";
import Grid from "@material-ui/core/Grid";
import TrustAndSecurity from "./TrustAndSecurity/TrustAndSecurity";

class LayoutPayment extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const{children} = this.props;
    return (
      <Grid>
        <HeaderColor/>
        <TrustAndSecurityBar/>
        {children}
      </Grid>
    );
  }
}

export default LayoutPayment;
