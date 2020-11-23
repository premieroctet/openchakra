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
        <Grid style={{width: '100%', display: 'flex', justifyContent: 'center', position: 'absolute', bottom: 0, backgroundColor: 'white'}}>
          <Grid style={{width: '90%'}}>
            <TrustAndSecurity/>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default LayoutPayment;
