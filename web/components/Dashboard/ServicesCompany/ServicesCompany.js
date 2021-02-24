import React from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "../../Box/Box";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider';
import styles from '../../../static/css/components/dashboard/ServicesCompany/ServicesCompany';
import withStyles from "@material-ui/core/styles/withStyles";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class ServicesCompany extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      items:[
        'Paramètrez les services des administrateurs',
        'Paramètrez les services des collaborateurs niv.1',
        'Paramètrez les services des collaborateurs niv.2',
        'Paramètrez les services des cadres supérieurs',
        'Paramètrez les services des alternants'
      ],
      serviceNames:[
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
      ],
      dialogState: false,
      dialogConfigService: false,
      nameService: '',
      serviceSelected: '',
      availableService: [],
      valueInvoice: '',
      rib: '',
      takeInCharge: false,
      priceInCharge: '',
      timeTakeInCharge: ''
    }
  }

  handleClickOpen = (name, selected) =>{
    this.setState({[name]: true, serviceSelected: selected ? selected: ''})
  };

  handleOnchange = (event) =>{
    const {name, value} = event.target;
    if(name === 'valueInvoice'){
      if(value.match(/^[0-9]*$/) && Number(value) <= 100){
        this.setState({[name]: value})
      }
    }else if(name === 'priceInCharge') {
      if(value.match(/^[0-9]*$/)){
        this.setState({[name]: value})
      }
    }else if (name === 'takeInCharge'){
      this.setState({[name]: !this.state.takeInCharge})
    }else{
      this.setState({[name]: value})
    }
  };

  addService = () => {
    const{nameService, items} = this.state;
    this.setState({ items: [...items, nameService],  dialogState: false});
  };

  dialogAddService = () => {
    const{dialogState, nameService} = this.state;

    return(
      <Dialog open={dialogState} onClose={() => this.setState({dialogState: false})} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajouter une catégorie de collaborateurs</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Mettre un descriptif.
          </DialogContentText>
          <TextField
            autoFocus
            id="nameService"
            label="catégorie de collaborateurs"
            name={'nameService'}
            fullWidth
            onChange={this.handleOnchange}
            value={nameService}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({dialogState: false})} color="secondary">
            Annuler
          </Button>
          <Button onClick={this.addService} color="primary">
            Confirmé
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  dialogConfigService = (classes) => {
    const{dialogConfigService, serviceSelected, availableService, serviceNames, valueInvoice, rib, takeInCharge, priceInCharge, timeTakeInCharge} = this.state;
    return(
      <Dialog open={dialogConfigService} onClose={() => this.setState({dialogConfigService: false})} aria-labelledby="form-dialog-title" classes={{paper: classes.configService}}>
        <DialogTitle id="form-dialog-title">{serviceSelected}</DialogTitle>
        <DialogContent>
          <Grid>
            <Grid>
              <Grid>
                <h3>Services à disposition des administrateurs</h3>
              </Grid>
              <Grid>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-chip-label">Selectioner</InputLabel>
                  <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={availableService}
                    name={'availableService'}
                    onChange={this.handleOnchange}
                    classes={{root: classes.selectedMenu}}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                      <Grid className={classes.chips}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            className={classes.chip}
                          />
                        ))}
                      </Grid>
                    )}
                  >
                    {serviceNames.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid style={{marginTop: '5vh'}}>
              <Grid>
                <h3>Facturation</h3>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xl={3} lg={3}>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      id="outlined-adornment-%"
                      value={valueInvoice}
                      name={'valueInvoice'}
                      onChange={this.handleOnchange}
                      endAdornment={<InputAdornment position="end">%</InputAdornment>}
                      inputProps={{
                        'aria-label': '%',
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xl={9} lg={9}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">RIB</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={rib}
                      name={'rib'}
                      onChange={this.handleOnchange}
                      label="Selectionner un RIB"
                    >
                      <MenuItem value={10}>RIB 1</MenuItem>
                      <MenuItem value={20}>RIB 2</MenuItem>
                      <MenuItem value={30}>RIB 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid style={{marginTop: '5vh'}}>
              <Grid>
                <FormControlLabel
                  control={<Checkbox checked={takeInCharge} onChange={this.handleOnchange} name="takeInCharge" color={'primary'} />}
                  label="Prise en charge maximum par collaborateur"
                />
              </Grid>
            </Grid>
            <Grid style={{marginTop: '5vh'}}>
              <Grid container spacing={3}>
                <Grid item xl={3} lg={3}>
                  <FormControl variant={takeInCharge ? "outlined" : 'filled'} className={classes.formControl}>
                    <TextField
                      id="outlined-adornment-€"
                      value={priceInCharge}
                      name={'priceInCharge'}
                      variant={takeInCharge ? "outlined" : 'filled'}
                      onChange={this.handleOnchange}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">€</InputAdornment>,
                      }}
                      disabled={!takeInCharge}
                    />
                  </FormControl>
                </Grid>
                <Grid item xl={9} lg={9}>
                  <FormControl variant={takeInCharge ? "outlined" : 'filled'} className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Mois/An</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={timeTakeInCharge}
                      name={'timeTakeInCharge'}
                      onChange={this.handleOnchange}
                      label="Mois/An"
                      disabled={!takeInCharge}
                    >
                      <MenuItem value={10}>Mois</MenuItem>
                      <MenuItem value={20}>An</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({dialogConfigService: false})} color="secondary">
            Annuler
          </Button>
          <Button onClick={this.addService} color="primary">
            Confirmé
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  render() {
    const{items} = this.state;
    const{classes} = this.props;
    return(
      <Grid container spacing={3} style={{marginTop: '3vh', width: '100%' , margin : 0}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Grid>
            <h3>Mes services</h3>
          </Grid>
          <Grid style={{marginLeft: '1vh'}}>
            <Grid>
              <IconButton aria-label="AddCircleOutlineOutlinedIcon" onClick={() => this.handleClickOpen('dialogState')}>
                <AddCircleOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Box>
            {items.map( (res, index) =>(
              <Grid container spacing={3} style={{margin: 0, width: '100%'}}>
                <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
                  <Accordion key={index} classes={{root: classes.accordionStyle}}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id={index}
                    >
                      <Typography className={classes.heading}>{res}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <em> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                          sit amet blandit leo lobortis eget.
                        </em>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                  <IconButton edge="end" aria-label="SettingsIcon" onClick={() => this.handleClickOpen('dialogConfigService', res)}>
                    <SettingsIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Box>
        </Grid>
        {this.dialogAddService(classes)}
        {this.dialogConfigService(classes)}
        </Grid>
    );
  }
}

export default withStyles (styles) (ServicesCompany);
