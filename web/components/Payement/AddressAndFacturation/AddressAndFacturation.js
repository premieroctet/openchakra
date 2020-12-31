import React from "react";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import DrawerBookingRecap from "../../Drawer/DrawerBookingRecap/DrawerBookingRecap";
import PaymentPics from "../../PaymentPics/PaymentPics";
import Topic from "../../../hoc/Topic/Topic";
import AddressService from "../../AddressService/AddressService";
import Profile from "../../Profile/Profile";
import ListAlfredConditions from "../../ListAlfredConditions/ListAlfredConditions";
import styles from '../../../static/css/components/AddressAndFacturation/AddressAndFacturation';
import withStyles from "@material-ui/core/styles/withStyles";

class AddressAndFacturation extends React.Component{

  constructor(props) {
    super(props);
  }

  callHandleStep = () =>{
    this.props.handleStep()
  };

  render() {
    const{equipments, pricedPrestations, countPrestations, user, classes} = this.props;

    return(
      <Grid container className={classes.addressAndFactContainer}>
        <Grid item xl={6} lg={6} md={6} xs={12} sm={12} >
          <Grid className={classes.addressAndFactuMainContainer}>
            <Grid style={{backgroundColor: 'white', borderRadius: 27, border: '1px solid rgba(210, 210, 210, 0.5)', paddingLeft: '10%', paddingTop: '5%', paddingBottom: '5%'}}>
              <Topic
                titleTopic={'Adresse du service'}
                titleSummary={false}
                underline={false}
              >
              <AddressService
                {...this.props}
              />
              </Topic>
            </Grid>
            <Grid style={{backgroundColor: 'white', borderRadius: 27, border: '1px solid rgba(210, 210, 210, 0.5)',paddingLeft: '10%', paddingTop: '5%', paddingBottom: '5%', marginTop: '2vh'}}>
              <Topic
                titleTopic={`A propos de ${user.firstname}`}
                titleSummary={false}
                underline={false}
              >
              <Profile
                  {...this.props}
              />
              </Topic>
              <Grid style={{marginTop: 30, marginBottom: 30}}>
                <Divider style={{height: 2, borderRadius: 10, width: '50%', backgroundColor: 'rgba(210, 210, 210, 0.5)'}}/>
              </Grid>
              <Topic
                titleTopic={'Material fourni'}
                titleSummary={equipments.length === 0 ? 'Aucun matériel fourni' : false}
                underline={false}
              >
                <ListAlfredConditions
                  wrapperComponentProps={equipments}
                  columnsXl={6}
                  columnsLG={6}
                  columnsMD={6}
                  columnsSM={6}
                  columnsXS={6}
                />
              </Topic>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={6} lg={6} md={6} xs={12} sm={12} className={classes.mainContainerAdressFactu}>
          <Grid style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid rgba(210, 210, 210, 0.5)',
            borderRadius: 30,
            justifyContent: 'center',
            backgroundColor: 'white'
          }}>
            <Grid style={{paddingLeft: '10%', paddingTop: '5%', paddingBottom: '5%', paddingRight: '10%'}}>
              <DrawerBookingRecap
                {...this.props}
                pricedPrestations={pricedPrestations}
                countPrestations={countPrestations}
                handleStep={this.callHandleStep}
              />
            </Grid>
          </Grid>
          <Grid style={{display: 'flex', justifyContent: 'center', marginTop: '3vh'}}>
            <PaymentPics/>
          </Grid>
        </Grid>
      </Grid>
    );
  }

}

export default withStyles(styles) (AddressAndFacturation);
