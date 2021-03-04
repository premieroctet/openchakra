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
import Router from 'next/router';
const {setAxiosAuthentication}=require('../../../utils/authentication');
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Input from '@material-ui/core/Input';
import { makeStyles, useTheme } from '@material-ui/core/styles';
const {snackBarSuccess, snackBarError} = require('../../../utils/notifications');
const {ADMIN} = require('../../../utils/consts');



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
      roles: '',
      listOfRoles:[],
      listOfNewAdmin:[{
        nameAdmin: '',
        firstNameAdmin: '',
        emailAdmin: ''
      }],
      listOfNewGroupes:[{
        nameGroupe: '',
        plafondGroupe: '',
        modeTarif: '',
        roleOfGroupe: ''
      }],
      listOfAdmin:[],
      dialogState: false,
      dialogGroupe: false,
      firstname: '',
      name: '',
      newChipField: '',
      ribNames:[
        'ribNames A',
        'ribNames B',
        'ribNames C',
        'ribNames D',
        'ribNames E',
      ],
      email: '',
      nbNewUser: 1,
      nbAdmin:1,
      chipRibs: [],
      dialogAdmin:false,
      dialogRemoveAdmin: false,
      dialogUpdateAdmin: false,
      adminSelected: '',
      canUpgrade:[],
      listOfCollab: [{name: 'Solene', email: 'solene@email.fr'},{name: 'Edwin', email: 'edwin@email.fr'},{name: 'wilfrid', email: 'wilfrid@email.fr'}, {name: 'armand', email:'armand@email.fr'},{name: 'sebastien', email: 'sebastien@email.fr'}]
    }
  }

  componentDidMount(){
    setAxiosAuthentication();
    axios.get('/myAlfred/api/companies/users').then(res =>{
      let data = res.data;
      const admins = data.filter( e => e.roles.includes(ADMIN));
      this.setState({user: data, listOfAdmin:admins})
    }).catch(err =>{
      console.error(err)
    });

    axios.get('/myAlfred/api/companies/groups').then(res =>{
      let data = res.data;
      this.setState({listOfRoles: data})
    }).catch(err =>{
      console.error(err)
    })
  };


  addGroupe = () => {
    const{nameService, items} = this.state;
    this.setState({ items: [...items, nameService],  dialogState: false});
  };

  handleDeleteChip = (chip) =>{
    const{listOfRoles} = this.state;
    let newArray = listOfRoles.filter(word => word !== chip);
    this.setState({listOfRoles : newArray})
  };

  handleChange = (event, index) =>{
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
  };

  removeLine = (name, index, event) =>{
    if(name === 'nbAdmin'){
      let array = [...this.state.listOfNewAdmin];
      array.splice(index, 1);
      this.setState({listOfNewAdmin: array})
    }
  };

  removeUser = () =>{
    this.setState({nbNewUser: this.state.nbNewUser - 1})

  };

  handleOnchangeListOfRoles = (event) =>{

    this.setState({ listOfRoles: [...listOfRoles, value]});

  };


  handleClickOpen = (name, user) =>{
    if(name === 'dialogRemoveAdmin' || name === 'dialogUpdateAdmin'){
      this.setState({adminSelected: user})
    }
    this.setState({[name]: true})
  };


  addAdmin = () =>{
    const{listOfNewAdmin, canUpgrade} = this.state;
    setAxiosAuthentication();

    if(canUpgrade.length > 0){
      canUpgrade.map( res =>{
        axios.put('/myAlfred/api/companies/admin', { user_id: res}).catch ( err => snackBarError(err.response.data.error))
      })
    }


    listOfNewAdmin.map((res) =>{
      if(res && res.firstNameAdmin !== '' && res.nameAdmin !== '' && res.emailAdmin !== ''){
        const data = {
          firstname: res.firstNameAdmin,
          name: res.nameAdmin,
          email: res.emailAdmin
        };
        axios.post('/myAlfred/api/companies/admin', data).catch(err =>{
          snackBarError(err.response.data.error)
        })
      }
    });

    this.setState({dialogAdmin: false}, () =>  this.componentDidMount());

  };

  removeAdmin = () =>{
    const{adminSelected} = this.state;
    setAxiosAuthentication();

    axios.delete(`/myAlfred/api/companies/admin/${adminSelected._id}`).then( res =>{
      snackBarSuccess('admin delete');
      this.setState({ dialogRemoveAdmin: false}, this.componentDidMount)
    }).catch(err =>{
      snackBarError(err.response.data.error);
    })

  };

  dialogAdmin = (classes)=>{
    const{dialogAdmin, listOfNewAdmin, user,canUpgrade} = this.state;

    let userNotAdmin = user ? user.filter( e => !e.roles.includes(ADMIN)) : '';

    return(
      <Dialog open={dialogAdmin} onClose={() => this.setState({dialogAdmin: false})} aria-labelledby="form-dialog-title" classes={{paper: classes.dialogPaper}}>
        <DialogTitle id="customized-dialog-title" onClose={() => this.setState({dialogAdmin: false})}>Ajouter un Administrateurs</DialogTitle>
        <DialogContent dividers>
          {
            userNotAdmin.length === 0 ? null :
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
                        {!userNotAdmin ? null :
                          userNotAdmin.map((user) => (
                            <MenuItem key={user._id} value={user} style={this.getStyles(user.email, canUpgrade)}>
                              {user.email}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
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
                  <IconButton onClick={() => this.addNewLine('nbAdmin')}>
                    <AddCircleOutlineOutlinedIcon/>
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {
            listOfNewAdmin.map((res, index) => (
              <Grid container spacing={2} style={{width: '100%', margin: 0}} key={index} id={index}>
                <Grid item xl={3} lg={3} sm={3} md={3} xs={3}>
                  <TextField
                    label="Nom"
                    name={'nameAdmin'}
                    value={res.nameAdmin || ''}
                    onChange={(e) => this.handleChange(e, index)}
                    variant={'outlined'}
                    classes={{root: classes.textField}}
                  />
                </Grid>
                <Grid item xl={3} lg={3} sm={3} md={3} xs={3}>
                  <TextField
                    label="Prénom"
                    value={res.firstNameAdmin || ''}
                    name={'firstNameAdmin'}
                    onChange={(e) => this.handleChange(e, index)}
                    variant={'outlined'}
                    classes={{root: classes.textField}}
                  />
                </Grid>
                <Grid item xl={3} lg={3} sm={3} md={3} xs={3}>
                  <TextField
                    label="Email"
                    name={'emailAdmin'}
                    value={res.emailAdmin || ''}
                    onChange={(e) => this.handleChange(e, index)}
                    variant={'outlined'}
                    classes={{root: classes.textField}}
                  />
                </Grid>
                <Grid item xl={3} lg={3} sm={3} md={3} xs={3} style={{display: 'flex', justifyContent: 'center'}}>
                  <IconButton edge="end" aria-label="delete" onClick={(e) => this.removeLine('nbAdmin',index, e)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({dialogAdmin: false})} color="secondary">
            Annuler
          </Button>
          <Button onClick={this.addAdmin} color="primary">
            Confirmé
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  dialogRemoveAdmin = (classes) => {
    const{dialogRemoveAdmin, adminSelected} = this.state;

    return(
      <Dialog
        open={dialogRemoveAdmin}
        onClose={() => this.setState({dialogRemoveAdmin: false})}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{paper: classes.dialogPaper}}
      >
        <MuiDialogTitle id="alert-dialog-title">{"Supprimer"}</MuiDialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voulez vous supprimer {adminSelected.email} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({dialogRemoveAdmin: false})} color="primary">
            Annuler
          </Button>
          <Button onClick={this.removeAdmin} color="primary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  dialogUpdateAdmin = (classes) => {
    const{dialogUpdateAdmin, adminSelected, listOfAdmin} = this.state;
    let res = listOfAdmin.find(obj => (obj.emailAdmin === adminSelected)) || '';

    return(
      <Dialog
        open={dialogUpdateAdmin}
        onClose={() => this.setState({dialogUpdateAdmin: false})}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{paper: classes.dialogPaper}}
      >
        <MuiDialogTitle id="alert-dialog-title">{"Update admin"}</MuiDialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{width: '100%', margin: 0}}>
            <Grid item xl={3} lg={3} sm={3} md={3} xs={3}>
              <TextField
                label="Nom"
                name={'nameAdmin'}
                value={res.nameAdmin || ''}
                onChange={(e) => this.handleChange(e)}
                variant={'outlined'}
                classes={{root: classes.textField}}
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={3} md={3} xs={3}>
              <TextField
                label="Prénom"
                value={res.firstNameAdmin || ''}
                name={'firstNameAdmin'}
                onChange={(e) => this.handleChange(e)}
                variant={'outlined'}
                classes={{root: classes.textField}}
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={3} md={3} xs={3}>
              <TextField
                label="Email"
                name={'emailAdmin'}
                value={res.emailAdmin || ''}
                onChange={(e) => this.handleChange(e)}
                variant={'outlined'}
                classes={{root: classes.textField}}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({dialogUpdateAdmin: false})} color="primary">
            Annuler
          </Button>
          <Button onClick={() => this.setState({dialogUpdateAdmin: false})} color="primary">
            Mettre à jour
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  dialogGroupe = (classes)=>{
    const{dialogGroupe, newChipField, listOfNewGroupes, chipRibs, ribNames} = this.state;

    return(
      <Dialog open={dialogGroupe} onClose={() => this.setState({dialogGroupe: false})} aria-labelledby="form-dialog-title" classes={{paper: classes.dialogPaper}}>
        <DialogTitle id="customized-dialog-title" onClose={() => this.setState({dialogGroupe: false})} >Ajouter un groupe</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} style={{width: '100%', margin: 0}}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <h3>Configuration groupe</h3>
            </Grid>
            {
              listOfNewGroupes.map((res, index) => (
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} container spacing={2} style={{width: '100%', margin: 0}}>
                  <Grid item xl={6} lg={6} sm={6} md={6} xs={6}>
                    <TextField
                      label="Nom"
                      name={'nameGroup'}
                      value={newChipField[index]}
                      variant={'outlined'}
                      classes={{root: classes.textField}}
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} sm={6} md={6} xs={6}>
                    <TextField
                      label="Plafond"
                      name={'plafondGroupe'}
                      value={newChipField[index]}
                      variant={'outlined'}
                      classes={{root: classes.textField}}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">€</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} sm={6} md={6} xs={6}>
                    <FormControl variant="outlined" className={classes.formControl} style={{width: '100%'}}>
                      <InputLabel id="demo-simple-select-outlined-label">Mode</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={newChipField[index]}
                        name={'modeTarif'}
                        label={'Mode'}
                      >
                        <MenuItem value={10}>Month</MenuItem>
                        <MenuItem value={20}>Year</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xl={6} lg={6} sm={6} md={6} xs={6}>
                    <FormControl variant="outlined" className={classes.formControl} style={{width: '100%'}}>
                      <InputLabel id="demo-simple-select-outlined-label">Equipe/Manager</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={newChipField[index]}
                        name={'roleOfGroupe'}
                        label={'Equipe/Manager'}
                      >
                        <MenuItem value={10}>Equipe</MenuItem>
                        <MenuItem value={20}>Manager</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              ))
            }
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
                      name={'chipRibs'}
                      value={chipRibs}
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
                      {ribNames.map((name) => (
                        <MenuItem key={name} value={name} style={this.getStyles(name, chipRibs)}>
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
          <Button onClick={this.addGroupe} color="primary">
            Confirmé
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  dialogAddService = (classes) => {
    const{dialogState, email, name, firstname, roles, nbNewUser} = this.state;

    return(
      <Dialog open={dialogState} onClose={() => this.setState({dialogState: false})} aria-labelledby="form-dialog-title" classes={{paper: classes.dialogPaper}}>
        <DialogTitle id="customized-dialog-title" onClick={this.addNewLine} onClose={() => this.setState({dialogState: false})}>Ajouter un collaborateur</DialogTitle>
        <DialogContent dividers>
          {
            [...Array(nbNewUser)].map((res, index) => (
              <Grid style={{display:'flex', alignItems: 'center'}}>
                <Grid container spacing={2} style={{margin: 0, width: '100%'}}>
                  <Grid item xl={3} lg={3} md={6} sm={6} xs={6}>
                    <TextField
                      label="Nom"
                      name={'name'}
                      onChange={this.handleOnchange}
                      value={name}
                      variant={'outlined'}
                      classes={{root: classes.textField}}
                    />
                  </Grid>
                  <Grid item xl={3} lg={3} md={6} sm={6} xs={6}>
                    <TextField
                      label="Prénom"
                      name={'firstname'}
                      onChange={this.handleOnchange}
                      value={firstname}
                      variant={'outlined'}
                      classes={{root: classes.textField}}

                    />
                  </Grid>
                  <Grid item xl={3} lg={3} md={6} sm={6} xs={6}>
                    <TextField
                      label="email"
                      name={'email'}
                      onChange={this.handleOnchange}
                      value={email}
                      variant={'outlined'}
                      classes={{root: classes.textField}}
                    />
                  </Grid>
                  <Grid item xl={3} lg={3} md={6} sm={6} xs={6}>
                    <FormControl variant="outlined" style={{width: '100%'}}>
                      <InputLabel id="demo-simple-select-outlined-label">Roles</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={roles}
                        onChange={this.handleChange}
                        label="Roles"
                        name={"roles"}
                        classes={{root: classes.textField}}

                      >
                        <MenuItem value={10}>Admin</MenuItem>
                        <MenuItem value={20}>Alternant</MenuItem>
                        <MenuItem value={30}>Collaborateur de niv 1</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item>
                  <IconButton edge="end" aria-label="delete" onClick={this.removeUser}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))
          }
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

  render() {
    const{classes} = this.props;
    const{filters, listOfCollab, roles, listOfRoles, isMicroService, listOfAdmin} = this.state;

    return(
      <Grid container spacing={3} style={{marginTop: '3vh', width: '100%' , margin : 0}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Grid style={{display: 'flex', alignItems: 'center'}}>
            <Grid>
              <h3>Administrateurs</h3>
            </Grid>
            <Grid>
              <IconButton aria-label="AddCircleOutlineOutlinedIcon" onClick={() => this.handleClickOpen('dialogAdmin')}>
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
                      <ListItem key={index}>
                        <ListItemText
                          primary={`${res.name},${res.firstname} - ${res.email}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="update" onClick={() => this.handleClickOpen('dialogUpdateAdmin', res)}>
                            <SettingsIcon />
                          </IconButton>
                          <IconButton edge="end" aria-label="delete" onClick={() => this.handleClickOpen('dialogRemoveAdmin', res)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
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
              <h3>Classification</h3>
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
              {
                listOfRoles.map((res,index) =>(
                  <>
                    <ListItem key={index}>
                      <ListItemText
                        primary={res.name}
                        secondary={res.email}
                      />
                      <ListItemSecondaryAction>
                        <Grid>

                        </Grid>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider/>
                  </>
                ))
              }
            </Grid>
          </Box>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Grid style={{display: 'flex', alignItems: 'center'}}>
            <Grid>
              <h3>{isMicroService ? 'Managers' : 'Collaborateurs'}</h3>
            </Grid>
            <Grid container style={{marginLeft: '1vh'}}>
              <Grid>
                <IconButton aria-label="AddCircleOutlineOutlinedIcon" onClick={() => this.handleClickOpen('dialogState')}>
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
                    {listOfCollab.map( (res,index) =>(
                      <Grid key={index}>
                        <ListItem key={index}>
                          <ListItemText
                            primary={res.name}
                            secondary={res.email}
                          />
                          <ListItemSecondaryAction>
                            <FormControl className={classes.formControl}>
                              <InputLabel id="demo-simple-select-label">Roles</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={roles}
                                onChange={this.handleChange}
                                name={'roles'}
                              >
                                <MenuItem value={10}>Admin</MenuItem>
                                <MenuItem value={20}>Alternant</MenuItem>
                                <MenuItem value={30}>Collaborateur de niv 1</MenuItem>
                              </Select>
                            </FormControl>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider/>
                      </Grid>
                      )
                    )}
                  </List>
                </Grid>
                <Grid style={{display: 'flex', flexDirection: 'row-reverse', marginTop: '3vh'}}>
                  <Button variant={'contained'} style={{textTransform: 'initial', color: 'white', fontWeight: 'bold'}} color={'primary'}>
                    Enregistrer
                  </Button>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {this.dialogAddService(classes)}
        {this.dialogGroupe(classes)}
        {this.dialogAdmin(classes)}
        {this.dialogRemoveAdmin(classes)}
        {this.dialogUpdateAdmin(classes)}
      </Grid>
    );
  }
}

export default withStyles(styles) (Team);
