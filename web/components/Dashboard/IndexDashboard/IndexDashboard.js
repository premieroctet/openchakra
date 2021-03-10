import React from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "../../Box/Box";
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem";
import axios from 'axios'
const {setAxiosAuthentication}=require('../../../utils/authentication')
const {ADMIN}=require('../../../utils/consts')
const {snackBarSuccess, snackBarError}=require('../../../utils/notifications')

class IndexDashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      admins: [],
      representative:null,
    }
  }

  componentDidMount()  {
    setAxiosAuthentication();
    axios.get('/myAlfred/api/companies/members')
      .then(res => {
        const admins=res.data.filter( m => m.roles && m.roles.includes(ADMIN))
        this.setState({admins:admins})
      })
      .catch (err => console.error(err))
    axios.get('/myAlfred/api/companies/current')
      .then(res => {
        this.setState({representative:res.data.representative})
      })
      .catch (err => console.error(err))
  }

  onChange = event => {
    const {value}=event.target
    setAxiosAuthentication();
    axios.put('/myAlfred/api/companies/representative', { representative_id: value})
      .then(res => {
        snackBarSuccess('Représentant légal mis à jour')
        this.componentDidMount()
      })
      .catch (err => {
        console.error(err)
        snackBarError(err)
      })
  }

  render() {
    const {representative, admins}=this.state

    return(
      <Grid container spacing={3} style={{marginTop: '3vh', width: '100%', margin: 0}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h3>Tableau de bord</h3>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Box>
           <h3>Représentant légal (doit être un administrateur)</h3>
           <Select
             labelId="demo-mutiple-chip-label"
             id="demo-mutiple-chip"
             onChange={this.onChange}
             name={'representative'}
             value={representative}
           >
             { admins.map( admin => (
                 <MenuItem key={admin._id} value={admin._id}>{admin.full_name} ({admin.email})</MenuItem>
               ))}
           </Select>
          </Box>
        </Grid>
      </Grid>
    );
  }

}

export default IndexDashboard;
