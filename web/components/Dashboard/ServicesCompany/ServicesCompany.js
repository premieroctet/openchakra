import React from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "../../Box/Box";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import styles from '../../../static/css/components/Dashboard/ServicesCompany/ServicesCompany';
import withStyles from "@material-ui/core/styles/withStyles";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
const {setAxiosAuthentication}=require('../../../utils/authentication');
const {snackBarSuccess, snackBarError} = require('../../../utils/notifications');
import CloseIcon from '@material-ui/icons/Close';
const {MICROSERVICE_MODE, CARETAKER_MODE, PRO, PART, BUDGET_PERIOD}=require('../../../utils/consts')



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  getContentAnchorEl: () => null,
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      marginTop: 70 + ITEM_PADDING_TOP
    },
  },
};

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, onClick, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="closeButton" className={classes.closeButton} onClick={onClose}>
          <CloseIcon  />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


class ServicesCompany extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      dialogConfigService: false,
      dialogRemove: false,
      selectedService: '',
      availableService: [],
      valueInvoice: '',
      rib: '',
      takeInCharge: false,
      priceInCharge: '',
      timeTakeInCharge: '',
      groups: [],
      services:[],
      dialogAddService: false,
      servicesToAdd:[],
      selectedGroup: [],
      supportedPercent: 0,
    }
  }

  componentDidMount() {
    const {mode}=this.props

    setAxiosAuthentication();
    axios.get(`/myAlfred/api/groups/type/${this.props.mode}`).then(res => {
      let data = res.data;
      this.setState({groups: data})
    }).catch(err => {
      console.error(err)
    });

    axios.get(`/myAlfred/api/service/${mode==MICROSERVICE_MODE? PRO : PART}`)
      .then (response => {
        this.setState({services: response.data})
      })
      .catch (err => console.error(err))
  }

  handleClickOpen = (name, selected, groupe) =>{
    this.setState({[name]: true, selectedService: selected ? selected: '', selectedGroup: groupe ? groupe : ''})
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

  getStyles = (name, personName) => {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? 'regular'
          : 'bold',
    };
  };

  addService = () =>{
    const{selectedService, servicesToAdd, supportedPercent} = this.state;

    let convertSupportedPercent = parseFloat(supportedPercent) / 100;
    console.log(`convertSupportedPercent:${convertSupportedPercent}`)

    if(servicesToAdd.length > 0){
      servicesToAdd.map(res => {
        const data = CARETAKER_MODE ? {service_id: res._id, supported_percent: convertSupportedPercent}: {service_id: res._id}
        axios.put(`/myAlfred/api/groups/${selectedService._id}/allowedServices`, data)
          .then(res =>{
            this.setState({dialogAddService : false, servicesToAdd: []}, () => this.componentDidMount())
          })
          .catch( err => {
            snackBarError(err.response.data)
            console.error(err)
          })
      })
    }
  };

  removeService = () => {
    const{selectedService, selectedGroup} = this.state;
    axios.delete(`/myAlfred/api/groups/${selectedGroup._id}/allowedServices/${selectedService._id}`).then( res =>{
      snackBarSuccess('Service retiré');
      this.setState({dialogRemove: false}, () => this.componentDidMount())
    }).catch( err =>{
      console.error(err)
    })
  };

  handleChange = (event) =>{
    const{name, value} = event.target
    if(name === 'supportedPercent'){
      if(value.match(/^[0-9^.,]*$/) && Number(value) <= 100){
        this.setState({[name]: value})
      }
    }else{
      this.setState({[name]: value})
    }
  };

  dialogConfigService = (classes) => {
    const{dialogConfigService, selectedService, priceInCharge, timeTakeInCharge} = this.state;
    return(
      <Dialog open={dialogConfigService} onClose={() => this.setState({dialogConfigService: false})} aria-labelledby="form-dialog-title" classes={{paper: classes.configService}}>
        <DialogTitle id="form-dialog-title" onClose={() => this.setState({dialogConfigService: false})}>{selectedService}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{margin:0,width: '100%'}}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <h3>Prise en charge</h3>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Grid container>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <FormControl variant={"outlined"} className={classes.formControl}>
                    <TextField
                      id="outlined-adornment-€"
                      value={priceInCharge}
                      name={'priceInCharge'}
                      variant={"outlined"}
                      onChange={this.handleOnchange}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">€</InputAdornment>,
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <FormControl variant={"outlined"} className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Mois/An</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={timeTakeInCharge}
                      name={'timeTakeInCharge'}
                      onChange={this.handleOnchange}
                      label="Mois/An"
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
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  dialogAddService = (classes) =>{
    const {mode} = this.props;
    const{dialogAddService, selectedService, services, servicesToAdd, selectedGroup, supportedPercent} = this.state;

    let allowedServicesByGroup = selectedGroup.allowed_services;
    let idAllowedServicesByGroup = allowedServicesByGroup ? allowedServicesByGroup.map(res => res._id) : '';
    let servicesNotAllowed =  services.filter(service => !idAllowedServicesByGroup.includes(service._id ));

    return(
      <Dialog open={dialogAddService} onClose={() => this.setState({dialogAddService: false, servicesToAdd: []})} aria-labelledby="form-dialog-title" classes={{paper: classes.configService}}>
        <DialogTitle id="form-dialog-title" onClose={() => this.setState({dialogAddService: false, servicesToAdd: []})}>{mode === CARETAKER_MODE ? 'Classification' : 'Département'} {selectedService.name}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{width: '100%', margin: 0}}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <h3>Sélectionnez les services autorisés pour {mode === CARETAKER_MODE ? 'cette classification' :  'ce département'}</h3>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <FormControl variant="outlined" className={classes.formControl} style={{width: '100%'}}>
                <InputLabel id="demo-mutiple-chip-label">Services</InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  onChange={(e) => this.handleOnchange(e)}
                  name={'servicesToAdd'}
                  value={servicesToAdd}
                  input={<OutlinedInput label={'Services'}  id="select-multiple-chip"/>}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((service) => (
                        <Chip key={service._id} label={service.label} className={classes.chip} />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {!servicesNotAllowed ? null :
                    servicesNotAllowed.map((service) => (
                      <MenuItem key={service._id} value={service} style={this.getStyles(service.label, servicesToAdd)}>
                        {service.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            {
              mode === CARETAKER_MODE ?
                <Grid item container xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <h3>Niveau de prise en charge</h3>
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      value={supportedPercent}
                      name={'supportedPercent'}
                      classes={{root: classes.textField}}
                      onChange={this.handleChange}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        inputProps: { min: 0, max: 100 }
                      }}
                    />
                  </Grid>
                </Grid> : null
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({dialogAddService: false, servicesToAdd: []})} color="secondary">
            Annuler
          </Button>
          <Button onClick={this.addService} color="primary">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
      )
  };

  dialogRemove = (classes) =>{
    const {dialogRemove, selectedService, selectedGroup} = this.state;
    return(
      <Dialog
        open={dialogRemove}
        onClose={() => this.setState({dialogRemove: false})}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{paper: classes.dialogPaper}}
      >
        <DialogTitle id="alert-dialog-title" onClose={() => this.setState({dialogRemove: false})}>{"Supprimer"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voulez vous supprimer {selectedService.label} de {selectedGroup.name} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({dialogRemove: false})} color="primary">
            Annuler
          </Button>
          <Button onClick={this.removeService} color="primary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  render() {
    const{groups, dialogRemove, dialogAddService, dialogConfigService} = this.state;
    const{classes, mode,coucou} = this.props;

    return(
      <Grid container spacing={3} style={{marginTop: '3vh', width: '100%' , margin : 0}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Grid>
            <h3>Mes services</h3>
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Box>
            {groups ?
              groups.map( (groupe, index) =>(
                <Grid key={index} container spacing={3} style={{margin: 0, width: '100%'}}>
                  <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
                    <Accordion key={index} classes={{root: classes.accordionStyle}}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id={index}
                      >
                        <Typography className={classes.heading}>Services disponibles pour {mode === CARETAKER_MODE ? 'la classification' : 'le département'} <strong>{groupe.name}</strong></Typography>
                      </AccordionSummary>
                      {
                        groupe.allowed_services.length > 0 ?
                          <AccordionDetails>
                            <Grid style={{width: '100%'}}>
                              <List>
                                {
                                  groupe.allowed_services.map( (service,j) => (
                                    <ListItem key={j}>
                                      <ListItemText
                                        primary={service.service.label}
                                        secondary={groupe.budget ? `${groupe.budget}€ / ${BUDGET_PERIOD[groupe.budget_period]}` : 'Pas de budget défini'}
                                      />
                                      <ListItemSecondaryAction>
                                          <IconButton edge="end" aria-label="SettingsIcon" onClick={() => this.handleClickOpen('dialogConfigService', service.service.label)}>
                                            <SettingsIcon />
                                          </IconButton>
                                        <IconButton edge="end" aria-label="delete" onClick={() => this.handleClickOpen('dialogRemove', service, groupe)}>
                                          <DeleteIcon />
                                        </IconButton>
                                      </ListItemSecondaryAction>
                                    </ListItem>
                                  ))
                                }
                              </List>
                            </Grid>
                          </AccordionDetails> : null
                      }
                    </Accordion>
                  </Grid>
                  <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                    <IconButton edge="end" aria-label="AddCircleOutlineOutlinedIcon" onClick={() => this.handleClickOpen('dialogAddService',groupe, groupe)}>
                      <AddCircleOutlineOutlinedIcon />
                    </IconButton>
                  </Grid>
                </Grid>
            )): null
            }
          </Box>
        </Grid>
        {dialogConfigService ? this.dialogConfigService(classes) : null}
        {dialogAddService ? this.dialogAddService(classes) : null}
        {dialogRemove ? this.dialogRemove(classes) : null}
        </Grid>
    );
  }
}

export default withStyles (styles) (ServicesCompany);
