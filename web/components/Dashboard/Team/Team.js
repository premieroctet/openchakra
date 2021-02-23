import React from 'react'
import Grid from "@material-ui/core/Grid";
import Box from "../../Box/Box";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import IconButton from '@material-ui/core/IconButton';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Button from '@material-ui/core/Button';
import withStyles from "@material-ui/core/styles/withStyles";
import styles from '../../../static/css/components/Dashboard/Team/Team'
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";

class Team extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      filters: 10
    }
  }

  handleChange = (event) =>{
    const {value, name} = event.target;
    this.setState({[name]: value})
  };

  render() {
    const{classes} = this.props;
    const{filters} = this.state;

    return(
      <Grid>
        <Grid>
          <Grid>
            <h3>Administrateurs</h3>
          </Grid>
          <Grid container spacing={3} style={{marginTop: '3vh'}}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Box/>
            </Grid>
          </Grid>
        </Grid>
        <Grid style={{marginTop: '5vh'}}>
          <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
            <Grid style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Grid>
                <h3>Collaborateurs</h3>
              </Grid>
              <Grid container style={{marginLeft: '1vh'}}>
                <Grid>
                  <IconButton aria-label="AddCircleOutlineOutlinedIcon">
                    <AddCircleOutlineOutlinedIcon />
                  </IconButton>
                </Grid>
                <Grid>
                  <IconButton aria-label="GetAppOutlinedIcon">
                    <GetAppOutlinedIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.searchFilterRightContainer}>
              <Grid className={classes.searchFilterRightLabel}>
                <Typography>Trier par</Typography>
              </Grid>
              <Grid>
                <FormControl>
                  <Select
                    labelId="simple-select-placeholder-label-label"
                    id="simple-select-placeholder-label"
                    value={filters}
                    name={'filters'}
                    onChange={this.handleChange}
                    displayEmpty
                    disableUnderline
                    classes={{select: classes.searchSelectPadding}}
                  >
                    <MenuItem value={10}><strong>Ordre alphabétique</strong></MenuItem>
                    <MenuItem value={20}><strong>Test</strong></MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{marginTop: '3vh'}}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Box>
                <Grid style={{display: 'flex', flexDirection: 'row-reverse'}}>
                  <Button variant={'contained'} style={{textTransform: 'initial', color: 'white', fontWeight: 'bold'}} color={'primary'}>
                    Enregistrer
                  </Button>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles) (Team);
