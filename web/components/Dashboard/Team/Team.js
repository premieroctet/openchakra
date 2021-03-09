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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle  from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import SettingsIcon from '@material-ui/icons/Settings';
import axios from 'axios';
const {setAxiosAuthentication}=require('../../../utils/authentication');
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from "@material-ui/core/OutlinedInput";
const {snackBarSuccess, snackBarError} = require('../../../utils/notifications');
const {ADMIN, BUDGET_PERIOD, MANAGER} = require('../../../utils/consts');

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, onClick, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Grid style={{display: 'flex', alignItems:'center'}}>
        <Grid>
          <Typography variant="h6">{children}</Typography>
        </Grid>
        {
          onClick ? (
            <Grid>
              <IconButton aria-label="AddCircleOutlineOutlinedIcon" onClick={onClick}>
                <AddCircleOutlineOutlinedIcon/>
              </IconButton>
            </Grid>
          ) : null
        }
      </Grid>
      {onClose ? (
        <IconButton aria-label="closeButton" className={classes.closeButton} onClick={onClose}>
          <CloseIcon  />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

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

class Team extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      isMicroService: true,
      filters: 10,
      listOfNewAdmin:[{
        nameAdmin: '',
        firstNameAdmin: '',
        emailAdmin: ''
      }],
      listOfAdmin:[],
      dialogGroupe: false,
      firstname: '',
      name: '',
      email: '',
      haveAccount: false,
      paymentMethod: [],
      dialogAdd:false,
      dialogRemove: false,
      selected: '',
      plafondGroupe: '',
      nameGroupe: '',
      budget_periode: '',
      canUpgrade:[],
      listOfGroups:[],
      listOfManagers:[],
      departementsName:'',
      modeDialog: '',
      departementSelected: '',
      listOfNewManagers: [{
        nameManager: '',
        firstNameManager: '',
        emailManager: '',
        groupSelected: ''
      }],
      accounts: []
    }
  }

  componentDidMount() {
    setAxiosAuthentication();

    axios.get('/myAlfred/api/companies/members').then(res => {
      let data = res.data;
      const admins = data.filter(e => e.roles.includes(ADMIN));
      const managers = data.filter(e => e.roles.includes(MANAGER));
      this.setState({user: data, listOfAdmin: admins, listOfManagers: managers})
    }).catch(err => {
      console.error(err)
    });

    axios.get('/myAlfred/api/groups').then(res => {
      let data = res.data;
      this.setState({listOfGroups: data})
    }).catch(err => {
      console.error(err)
    });

    axios.get('/myAlfred/api/payment/activeAccount')
      .then(response => {
        let accounts = response.data;
        if (accounts.length) {
          this.setState({haveAccount: true, accounts: accounts});
        }
      });
  }

  handleChange = (event, index, user) =>{
    const {value, name} = event.target;
    if(name === 'nameAdmin' || name === 'firstNameAdmin' || name === 'emailAdmin'){
      let updatedObj = Object.assign({}, this.state.listOfNewAdmin[index],{[name]: value});
      this.setState({
        listOfNewAdmin: [
          ...this.state.listOfNewAdmin.slice(0, index),
          updatedObj,
          ...this.state.listOfNewAdmin.slice(index + 1)
        ]
      })
    }else if(name === 'nameManager' || name === 'firstNameManager' || name === 'emailManager' || name === 'groupSelected'){
      let updatedObj = Object.assign({}, this.state.listOfNewManagers[index],{[name]: value});
      this.setState({
        listOfNewManagers: [
          ...this.state.listOfNewManagers.slice(0, index),
          updatedObj,
          ...this.state.listOfNewManagers.slice(index + 1)
        ]
      })
    }
    else if(name === 'departementsName'){
      const data ={
        member_id: user._id
      };
      axios.put(`/myAlfred/api/groups/${value}/managers`,data).then(res => {
        snackBarSuccess(`Membre ajouté au groupe`);
        this.componentDidMount()
      }).catch( err => {
        snackBarError(err.response.error)
      })
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

  addNewLine = (name) =>{
    if(name === 'nbAdmin'){
      let updatedObj = {nameAdmin: '',firstNameAdmin: '', emailAdmin: ''};
      this.setState({
        listOfNewAdmin: [
          ...this.state.listOfNewAdmin, updatedObj
        ]
      })
    }
    if(name === 'nbManager'){
      let updatedObj = {nameManager: '',firstNameManager: '', emailManager: '', groupSelected: ''};
      this.setState({
        listOfNewManagers: [
          ...this.state.listOfNewManagers, updatedObj
        ]
      })
    }
  };

  removeLine = (name, index, event) =>{
    if(name === 'nbAdmin'){
      let array = [...this.state.listOfNewAdmin];
      array.splice(index, 1);
      this.setState({listOfNewAdmin: array})
    }
    if(name === 'nbManager'){
      let array = [...this.state.listOfNewManagers];
      array.splice(index, 1);
      this.setState({listOfNewManagers: array})
    }
  };

  handleClickOpen = (name, user, mode, groupeId) =>{
    if(user){
      this.setState({selected: user})
    }else{
      this.setState({selected: ''})
    }

    if(groupeId){
      this.setState({groupeIdSelected: groupeId})
    }else{
      this.setState({groupeIdSelected: ''})
    }

    if(mode === 'manager'){
      this.setState({modeDialog: mode})
    }else{
      this.setState({modeDialog: 'admin'})
    }

    if(name === 'dialogGroupe' && user){
      this.setState({selected: user, nameGroupe: user.name, plafondGroupe: user.budget, budget_periode: user.budget_period})
    }else{
      this.setState({nameGroupe: '', plafondGroupe: '', budget_periode: ''})
    }

    this.setState({[name]: true})
  };

  addAdmin = () =>{
    const{listOfNewAdmin, canUpgrade} = this.state;
    setAxiosAuthentication();

    if(canUpgrade.length > 0){
      canUpgrade.map( res =>{
        axios.put('/myAlfred/api/companies/admin', { admin_id: res}).then(res=>{
          this.setState({dialogAdd: false}, () =>  this.componentDidMount());
        }).catch ( err => snackBarError(err.response.data.error))
      })
    }

    listOfNewAdmin.map((res) =>{
      if(res && res.firstNameAdmin !== '' && res.nameAdmin !== '' && res.emailAdmin !== ''){
        const data = {
          firstname: res.firstNameAdmin,
          name: res.nameAdmin,
          email: res.emailAdmin,
        };

        axios.post('/myAlfred/api/companies/members', data)
          .then ( response => {
            let data = response.data;
            const data_id ={
              admin_id: data._id
            };
            axios.put('/myAlfred/api/companies/admin', data_id).then(res=>{
              this.setState({dialogAdd: false}, () =>  this.componentDidMount());
            }).catch ( err => snackBarError(err.response.data.error))
          })
          .catch ( err => {
            console.error(err);
            snackBarError(err.response.data.error)
          })
      }
    });
  };

  addManager = () =>{
    const{canUpgrade, departementSelected, listOfNewManagers} = this.state;
    setAxiosAuthentication();

    if(canUpgrade.length > 0){
      canUpgrade.map( res =>{
        axios.put(`/myAlfred/api/groups/${departementSelected}/managers`, { member_id: res._id}).then(res=>{
          this.setState({dialogAdd: false}, () =>  this.componentDidMount());
        }).catch ( err => snackBarError(err.response.data.error))
      })
    }

    listOfNewManagers.map((res) =>{
      if(res && res.firstNameManager !== '' && res.nameManager !== '' && res.emailManager !== '' && res.groupSelected !== ''){
        const data = {
          firstname: res.firstNameManager,
          name: res.nameManager,
          email: res.emailManager,
        };

        axios.post('/myAlfred/api/companies/members', data)
          .then ( response => {
            let data = response.data;
            const member_id ={
              member_id: data._id
            };
            axios.put(`/myAlfred/api/groups/${res.groupSelected}/managers`, member_id).then(res=>{
              this.setState({dialogAdd: false}, () =>  this.componentDidMount());
            }).catch ( err => snackBarError(err.response.data.error))
          })
          .catch ( err => {
            console.error(err);
            snackBarError(err.response.data.error)
          })
      }
    });

  };

  removeAdmin = () =>{
    const{selected} = this.state;
    setAxiosAuthentication();

    axios.delete(`/myAlfred/api/companies/admin/${selected._id}`).then( res =>{
      snackBarSuccess(`${selected.name} à été supprimé des administrateurs`);
      this.setState({ dialogRemove: false}, () => this.componentDidMount())
    }).catch(err =>{
      snackBarError(err.response.data.error)
    })
  };

  removeManager = () =>{
    const{selected, groupeIdSelected} = this.state;
    setAxiosAuthentication();
    axios.delete(`/myAlfred/api/groups/${groupeIdSelected}/managers/${selected._id}`).then(res =>{
      snackBarSuccess('Manager supprimé');
      this.setState({dialogRemove:false}, () => this.componentDidMount())
    }).catch(err =>{
      console.error(err)
    })
  };

  addGroupe = () => {
    const{plafondGroupe, nameGroupe, budget_periode} = this.state;

    const data = {
      name: nameGroupe,
      budget: plafondGroupe,
      budget_period: budget_periode,
    };

    axios.post('/myAlfred/api/companies/groups', data).then(res =>{
      snackBarSuccess(`Groupe ${nameGroupe} créé`);
      this.setState({dialogGroupe: false}, () => this.componentDidMount());
    }).catch( err => {snackBarError(err.response.data.error)});
  };

  updateGroupe = () =>{
    const{selected, plafondGroupe, nameGroupe, budget_periode} = this.state;

    const data = {
      name: nameGroupe,
      budget: plafondGroupe,
      budget_period: budget_periode,
    };

    axios.put(`/myAlfred/api/companies/groups/${selected._id}`, data).then(res =>{
      snackBarSuccess(`${selected.name} modifé`);
      this.setState({dialogGroupe: false},() => this.componentDidMount())
    }).catch(err =>{
      snackBarError(err.response.data.error)
    })
  };

  removeGroupe = () =>{
    const{selected} = this.state;
    axios.delete(`/myAlfred/api/companies/groups/${selected._id}`).then( res => {
      snackBarSuccess(`Groupe ${selected.name} supprimé`);
      this.setState({dialogRemoveGroupe: false},() => this.componentDidMount())
    }).catch(err =>{
      snackBarError(err.response.data.error)
    })
  };

  dialogAdd = (classes)=>{
    const{dialogAdd, listOfNewAdmin, user,canUpgrade, modeDialog, listOfGroups, departementSelected, listOfNewManagers} = this.state;

    let userEmploye = modeDialog === 'admin' ? user ? user.filter( e => !e.roles.includes(ADMIN)) : '' :  user ? user.filter( e => !e.roles.includes(MANAGER)) : '';

    let objectToMap = modeDialog === 'admin' ? listOfNewAdmin : listOfNewManagers;


    return(
      <Dialog open={dialogAdd} onClose={() => this.setState({dialogAdd: false})} aria-labelledby="form-dialog-title" classes={{paper: classes.dialogPaper}}>
        <DialogTitle id="customized-dialog-title" onClose={() => this.setState({dialogAdd: false})}>{modeDialog === 'manager' ? 'Ajouter un Manager' : 'Ajouter un Administrateurs'}</DialogTitle>
        <DialogContent dividers>
          {
            userEmploye.length === 0 ? null :
              <Grid style={{paddingBottom: 20 }}>
                <Grid container spacing={2} style={{width: '100%', margin: 0, paddingBottom: 40}}>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <h3>Utilisateur existants</h3>
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <FormControl variant="outlined" className={classes.formControl} style={{width: '100%'}}>
                      <InputLabel id="demo-mutiple-chip-label">Users</InputLabel>
                      <Select
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        multiple
                        onChange={(e) => this.handleChange(e)}
                        name={'canUpgrade'}
                        value={canUpgrade}
                        input={<OutlinedInput label={'RIB'}  id="select-multiple-chip" />}
                        renderValue={(selected) => (
                          <div className={classes.chips}>
                            {selected.map((user) => (
                              <Chip key={user._id} label={user.email} className={classes.chip} />
                            ))}
                          </div>
                        )}
                        MenuProps={MenuProps}
                      >
                        {!userEmploye ? null :
                          userEmploye.map((user) => (
                            <MenuItem key={user._id} value={user} style={this.getStyles(user.email, canUpgrade)}>
                              {user.email}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  { canUpgrade.length > 0 ?
                    <>
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <h3>Affecter un département aux managers selectionner</h3>
                      </Grid>
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <FormControl variant="outlined" className={classes.formControl} style={{width: '100%'}}>
                          <InputLabel id="demo-simple-select-outlined-label">Departements</InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            name={'departementSelected'}
                            onChange={this.handleChange}
                            label="Departements"
                            value={departementSelected}
                          >
                            {
                              listOfGroups.map((res, index) => (
                                <MenuItem key={index} value={res._id}>{res.name}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </Grid>
                    </> : null
                  }
                </Grid>
                <Divider/>
              </Grid>
          }
          <Grid container spacing={2} style={{width: '100%', margin: 0}}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Grid style={{display: 'flex', alignItems: 'center'}}>
                <Grid>
                  <h3>Créer user</h3>
                </Grid>
                <Grid>
                  <IconButton onClick={() => this.addNewLine(modeDialog === 'admin' ? 'nbAdmin' : 'nbManager')}>
                    <AddCircleOutlineOutlinedIcon/>
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {
            objectToMap.map((res, index) => (
              <>
              <Grid container spacing={2} style={{width: '100%', margin: 0}} key={index} id={index}>
                <Grid item xl={11} lg={11} sm={11} md={11} xs={11} container spacing={2} style={{width: '100%', margin: 0}}>
                  <Grid item xl={6} lg={6} sm={6} md={6} xs={6}>
                    <TextField
                      label="Nom"
                      name={modeDialog === 'admin' ? 'nameAdmin' : 'nameManager'}
                      value={modeDialog === 'admin' ? res.nameAdmin || '' : res.nameManager || ''}
                      onChange={(e) => this.handleChange(e, index)}
                      variant={'outlined'}
                      classes={{root: classes.textField}}
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} sm={6} md={6} xs={6}>
                    <TextField
                      label="Prénom"
                      value={modeDialog === 'admin' ? res.firstNameAdmin || '' : res.firstNameManager || ''}
                      name={modeDialog === 'admin' ?  'firstNameAdmin' : 'firstNameManager'}
                      onChange={(e) => this.handleChange(e, index)}
                      variant={'outlined'}
                      classes={{root: classes.textField}}
                    />
                  </Grid>
                  <Grid item xl={modeDialog === 'manager' ? 6 : 12} lg={modeDialog === 'manager' ? 6 : 12} sm={modeDialog === 'manager' ? 6 : 12} md={modeDialog === 'manager' ? 6 : 12} xs={modeDialog === 'manager' ? 6 : 12}>
                    <TextField
                      label="Email"
                      name={modeDialog === 'admin' ? 'emailAdmin' : 'emailManager'}
                      value={modeDialog === 'admin' ? res.emailAdmin || '' : res.emailManager || ''}
                      onChange={(e) => this.handleChange(e, index)}
                      variant={'outlined'}
                      classes={{root: classes.textField}}
                    />
                  </Grid>
                  { modeDialog === 'manager' ?
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                      <FormControl variant="outlined" className={classes.formControl} style={{width: '100%'}}>
                        <InputLabel id="demo-simple-select-outlined-label">Departements</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          name={'groupSelected'}
                          onChange={(e) => this.handleChange(e, index)}
                          label="Departements"
                          value={res.groupSelected || ''}
                        >
                          {
                            listOfGroups.map((res, index) => (
                              <MenuItem key={index} value={res._id}>{res.name}</MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Grid> : null
                  }
                </Grid>
                <Grid item xl={1} lg={1} sm={1} md={1} xs={1} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                  <IconButton edge="end" aria-label="delete" onClick={(e) => this.removeLine(modeDialog === 'admin' ? 'nbAdmin' : 'nbManager',index, e)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
                <Divider/>
              </>
            ))
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({dialogAdd: false})} color="secondary">
            Annuler
          </Button>
          <Button onClick={modeDialog === 'admin' ? this.addAdmin : this.addManager} color="primary">
            Confirmé
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  dialogRemove = (classes) => {
    const{dialogRemove, selected, modeDialog} = this.state;

    return(
      <Dialog
        open={dialogRemove}
        onClose={() => this.setState({dialogRemove: false})}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{paper: classes.dialogPaper}}
      >
        <MuiDialogTitle id="alert-dialog-title">{"Supprimer"}</MuiDialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voulez vous supprimer {selected.email} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({dialogRemove: false})} color="primary">
            Annuler
          </Button>
          <Button onClick={modeDialog === 'admin' ? this.removeAdmin : this.removeManager} color="primary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  dialogGroupe = (classes)=>{
    const{dialogGroupe, selected, paymentMethod, accounts, nameGroupe, plafondGroupe, budget_periode} = this.state;

    return(
      <Dialog open={dialogGroupe} onClose={() => this.setState({dialogGroupe: false})} aria-labelledby="form-dialog-title" classes={{paper: classes.dialogPaper}}>
        <DialogTitle id="customized-dialog-title" onClose={() => this.setState({dialogGroupe: false})} >Ajouter un groupe</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} style={{width: '100%', margin: 0}}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <h3>Configuration groupe</h3>
            </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} container spacing={2} style={{width: '100%', margin: 0}}>
                <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
                  <TextField
                    label="Nom"
                    name={'nameGroupe'}
                    value={nameGroupe}
                    variant={'outlined'}
                    classes={{root: classes.textField}}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xl={6} lg={6} sm={6} md={6} xs={6}>
                  <TextField
                    label="Plafond"
                    name={'plafondGroupe'}
                    value={plafondGroupe}
                    variant={'outlined'}
                    classes={{root: classes.textField}}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">€</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xl={6} lg={6} sm={6} md={6} xs={6}>
                  <FormControl variant="outlined" className={classes.formControl} style={{width: '100%'}}>
                    <InputLabel id="demo-simple-select-outlined-label">Période</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={budget_periode}
                      name={'budget_periode'}
                      label={'Période'}
                      onChange={this.handleChange}
                    >
                      {
                        Object.keys(BUDGET_PERIOD).map( (res, index) =>(
                          <MenuItem key={index} value={res}>{BUDGET_PERIOD[res]}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            <Grid item spacing={2} style={{width: '100%', margin: 0}}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <h3>Facturation</h3>
              </Grid>
              <Grid item container spacing={3} style={{width: '100%', margin: 0}}>
                <Grid item xl={12} lg={12}>
                  <FormControl variant="outlined" className={classes.formControl} style={{width: '100%'}}>
                    <InputLabel id="demo-mutiple-chip-label">RIB</InputLabel>
                    <Select
                      labelId="demo-mutiple-chip-label"
                      id="demo-mutiple-chip"
                      multiple
                      onChange={(e) => this.handleChange(e)}
                      name={'paymentMethod'}
                      value={paymentMethod}
                      input={<OutlinedInput label={'RIB'}  id="select-multiple-chip" />}
                      renderValue={(selected) => (
                        <div className={classes.chips}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} className={classes.chip} />
                          ))}
                        </div>
                      )}
                      MenuProps={MenuProps}
                    >
                      {accounts.map((name) => (
                        <MenuItem key={name} value={name} style={this.getStyles(name, paymentMethod)}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({dialogGroupe: false})} color="secondary">
            Annuler
          </Button>
          <Button onClick={selected === '' ? this.addGroupe : this.updateGroupe} color="primary">
            {selected === '' ? 'Confirmer' : 'Modifier'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  dialogRemoveGroupe = (classes) =>{
    const{dialogRemoveGroupe, selected} = this.state;

    return(
      <Dialog
        open={dialogRemoveGroupe}
        onClose={() => this.setState({dialogRemoveGroupe: false})}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{paper: classes.dialogPaper}}
      >
        <MuiDialogTitle id="alert-dialog-title">{"Supprimer"}</MuiDialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voulez vous supprimer {selected.name} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({dialogRemoveGroupe: false})} color="primary">
            Annuler
          </Button>
          <Button onClick={this.removeGroupe} color="primary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  render() {
    const{classes} = this.props;
    const{filters, listOfGroups, isMicroService, listOfAdmin, listOfManagers} = this.state;

    return(
      <Grid container spacing={3} style={{marginTop: '3vh', width: '100%' , margin : 0}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Grid style={{display: 'flex', alignItems: 'center'}}>
            <Grid>
              <h3>Administrateurs</h3>
            </Grid>
            <Grid>
              <IconButton aria-label="AddCircleOutlineOutlinedIcon" onClick={() => this.handleClickOpen('dialogAdd', null, 'admin')}>
                <AddCircleOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Box>
            {
              listOfAdmin.length > 0 ?
                <Grid>
                  <List>
                    {listOfAdmin.map((res, index) =>(
                      <>
                        <ListItem key={index}>
                          <ListItemText
                            primary={`${res.name},${res.firstname} - ${res.email}`}
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => this.handleClickOpen('dialogRemove', res, 'admin')}>
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider/>
                      </>
                    ))}
                  </List>
                </Grid> :
                <Grid>
                  <Typography>Pas d'admin</Typography>
                </Grid>
            }
          </Box>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Grid  style={{display: 'flex', alignItems: 'center'}}>
            <Grid>
              <h3>Départements</h3>
            </Grid>
            <Grid>
              <IconButton aria-label="AddCircleOutlineOutlinedIcon" onClick={() => this.handleClickOpen('dialogGroupe')}>
                <AddCircleOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Box>
            <Grid className={classes.listChipContainer}>
              {listOfGroups.length > 0 ?
                <List>
                  {
                  listOfGroups.map((res,index) =>(
                    <>
                      <ListItem key={index}>
                        <ListItemText
                          primary={res.name}
                          secondary={`${res.budget}€ / ${BUDGET_PERIOD[res.budget_period]}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="update" onClick={() => this.handleClickOpen('dialogGroupe', res)}>
                            <SettingsIcon />
                          </IconButton>
                          <IconButton edge="end" aria-label="delete" onClick={() => this.handleClickOpen('dialogRemoveGroupe', res)}>
                            <DeleteIcon/>
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider/>
                    </>
                  ))}
                </List>
                  :
                <Grid>
                  <Typography>Pas de groupe</Typography>
                </Grid>
              }
            </Grid>
          </Box>
        </Grid>
        {
          listOfGroups.length > 0 ?
            <>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Grid style={{display: 'flex', alignItems: 'center'}}>
                  <Grid>
                    <h3>{isMicroService ? 'Managers' : 'Collaborateurs'}</h3>
                  </Grid>
                  <Grid container style={{marginLeft: '1vh'}}>
                    <Grid>
                      <IconButton aria-label="AddCircleOutlineOutlinedIcon" onClick={() => this.handleClickOpen('dialogAdd', null, 'manager')}>
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
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={3}>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Box>
                      <Grid>
                        <List>
                          {!listOfManagers ? null :
                            listOfManagers.map( (res,index) => {
                              let groupe = listOfGroups.find( group => group.members.map( m => m._id).includes(res._id));
                              let groupeId = groupe ? groupe._id : '';
                              return(
                                <Grid key={index}>
                                  <ListItem key={index}>
                                    <ListItemText
                                      primary={res.name}
                                      secondary={res.email}
                                    />
                                    <ListItemSecondaryAction>
                                      {
                                        !listOfGroups.length > 0 ? null :
                                          <FormControl className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-label">Départements</InputLabel>
                                            <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              value={groupeId}
                                              onChange={(e) => this.handleChange(e, null, res)}
                                              name={'departementsName'}
                                            >
                                              {
                                                listOfGroups.map((res, index) => (
                                                  <MenuItem key={index} value={res._id}>{res.name}</MenuItem>
                                                ))
                                              }
                                            </Select>
                                          </FormControl>
                                      }
                                      <IconButton edge="end" aria-label="delete" onClick={() => this.handleClickOpen('dialogRemove', res, 'manager', groupeId)}>
                                        <DeleteIcon/>
                                      </IconButton>
                                    </ListItemSecondaryAction>
                                  </ListItem>
                                  <Divider/>
                                </Grid>
                              )}
                            )}
                        </List>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </> : null
        }
        {this.dialogGroupe(classes)}
        {this.dialogAdd(classes)}
        {this.dialogRemove(classes)}
        {this.dialogRemoveGroupe(classes)}
      </Grid>
    );
  }
}

export default withStyles(styles) (Team);
