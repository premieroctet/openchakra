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
import MuiDialogTitle from '@material-ui/core/DialogTitle';
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
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
const {setAxiosAuthentication}=require('../../../utils/authentication');
const {snackBarSuccess, snackBarError} = require('../../../utils/notifications');
import CloseIcon from '@material-ui/icons/Close';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
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
      isMicroService: true,
      dialogConfigService: false,
      dialogRemove: false,
      serviceSelected: '',
      availableService: [],
      valueInvoice: '',
      rib: '',
      takeInCharge: false,
      priceInCharge: '',
      timeTakeInCharge: '',
      listOfGroups: [],
      services:[],
      dialogAddService: false,
      servicesToAdd:[],
      serviceNames:[
        'Service A',
        'Service B',
        'Service C',
        'Service D',
        'Service E',
      ],
      groupeSelected: []
    }
  }

  componentDidMount() {
    setAxiosAuthentication();

    axios.get('/myAlfred/api/groups').then(res => {
      let data = res.data;
      this.setState({listOfGroups: data})
    }).catch(err => {
      console.error(err)
    });

    axios.get('/myAlfred/api/service/pro')
      .then (response => {
        this.setState({services: response.data})
      })
      .catch (err => console.error(err))
  }

  handleClickOpen = (name, selected, groupe) =>{
    this.setState({[name]: true, serviceSelected: selected ? selected: '', groupeSelected: groupe ? groupe : ''})
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
    const{serviceSelected, servicesToAdd} = this.state;

    if(servicesToAdd.length > 0){
      servicesToAdd.map(res => {
        axios.put(`/myAlfred/api/groups/${serviceSelected._id}/allowedServices`, { service_id : res._id}).then(res =>{
           this.setState({dialogAddService : false}, () => this.componentDidMount())
          }
        ).catch( err => {
          console.error(err)
        })
      })
    }
  };

  removeService = () => {
    const{serviceSelected, groupeSelected} = this.state;
    axios.delete(`/myAlfred/api/groups/${groupeSelected._id}/allowedServices/${serviceSelected._id}`).then( res =>{
      snackBarSuccess('Service retiré');
      this.setState({dialogRemove: false}, () => this.componentDidMount())
    }).catch( err =>{
      console.error(err)
    })
  };

  dialogConfigService = (classes) => {
    const{dialogConfigService, serviceSelected, availableService, serviceNames, valueInvoice, rib, takeInCharge, priceInCharge, timeTakeInCharge} = this.state;
    return(
      <Dialog open={dialogConfigService} onClose={() => this.setState({dialogConfigService: false})} aria-labelledby="form-dialog-title" classes={{paper: classes.configService}}>
        <DialogTitle id="form-dialog-title" onClose={() => this.setState({dialogConfigService: false})}>{serviceSelected}</DialogTitle>
        <DialogContent>
          <Grid>
            <Grid>
              <Grid>
                <h3>Services à disposition des administrateurs</h3>
              </Grid>
              <Grid>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-chip-label">Selectioner ou retirer</InputLabel>
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
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  dialogAddService = (classes) =>{
    const{dialogAddService, serviceSelected, services, servicesToAdd, groupeSelected} = this.state;

    let allowedServicesByGroup = groupeSelected.allowed_services;
    let idAllowedServicesByGroup = allowedServicesByGroup ? allowedServicesByGroup.map(res => res._id) : '';
    let servicesNotAllowed =  services.filter(service => !idAllowedServicesByGroup.includes(service._id ));

    return(
      <Dialog open={dialogAddService} onClose={() => this.setState({dialogAddService: false})} aria-labelledby="form-dialog-title" classes={{paper: classes.configService}}>
        <DialogTitle id="form-dialog-title" onClose={() => this.setState({dialogAddService: false})}>Département {serviceSelected.name}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{width: '100%', margin: 0}}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <h3>Sélectionnez les services autorisés pour ce départemment</h3>
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
                  input={<OutlinedInput label={'Services'}  id="select-multiple-chip" />}
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({dialogAddService: false})} color="secondary">
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
    const {dialogRemove, serviceSelected, groupeSelected} = this.state;
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
            Voulez vous supprimer {serviceSelected.label} de {groupeSelected.name} ?
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
    const{listOfGroups, isMicroservice} = this.state;
    const{classes} = this.props;

    return(
      <Grid container spacing={3} style={{marginTop: '3vh', width: '100%' , margin : 0}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Grid>
            <h3>Mes services</h3>
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Box>
            {listOfGroups ?
              listOfGroups.map( (groupe, index) =>(
                <Grid container spacing={3} style={{margin: 0, width: '100%'}}>
                  <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
                    <Accordion key={index} classes={{root: classes.accordionStyle}}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id={index}
                      >
                        <Typography className={classes.heading}>Services disponibles pour le département <strong>{groupe.name}</strong></Typography>
                      </AccordionSummary>
                      {
                        groupe.allowed_services.length > 0 ?
                          <AccordionDetails>
                            <Grid style={{width: '100%'}}>
                              <List>
                                {
                                  groupe.allowed_services.map( (service) => (
                                    <ListItem key={index}>
                                      <ListItemText
                                        primary={service.label}
                                      />
                                      <ListItemSecondaryAction>
                                        {
                                          isMicroservice ?
                                            <IconButton edge="end" aria-label="SettingsIcon" onClick={() => this.handleClickOpen('dialogConfigService', service.label)}>
                                              <SettingsIcon />
                                            </IconButton> : null
                                        }
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
        {this.dialogConfigService(classes)}
        {this.dialogAddService(classes)}
        {this.dialogRemove(classes)}
        </Grid>
    );
  }
}

export default withStyles (styles) (ServicesCompany);
