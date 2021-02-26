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

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, onClick, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Grid style={{display: 'flex', alignItems:'center'}}>
        <Grid>
          <Typography variant="h6">{children}</Typography>
        </Grid>
        <Grid>
          <IconButton aria-label="AddCircleOutlineOutlinedIcon" onClick={onClick}>
            <AddCircleOutlineOutlinedIcon/>
          </IconButton>
        </Grid>
      </Grid>
      {onClose ? (
        <IconButton aria-label="closeButton" className={classes.closeButton} onClick={onClose}>
          <CloseIcon  />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});




class Team extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      isMicroService: true,
      filters: 10,
      roles: '',
      listOfRoles:['Admin', 'Alternant', 'Stagiaire'],
      listOfNewAdmin:[{
        nameAdmin: '',
        firstNameAdmin: '',
        emailAdmin: ''
      }],
      listOfAdmin:[],
      dialogState: false,
      dialogChip: false,
      firstname: '',
      name: '',
      newChipField: '',
      email: '',
      nbNewUser: 1,
      nbAdmin:1,
      nbChip: 1,
      dialogAdmin:false,
      listOfCollab: [{name: 'Solene', email: 'solene@email.fr'},{name: 'Edwin', email: 'edwin@email.fr'},{name: 'wilfrid', email: 'wilfrid@email.fr'}, {name: 'armand', email:'armand@email.fr'},{name: 'sebastien', email: 'sebastien@email.fr'}]
    }
  }

  handleChange = (index, event) =>{
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

  addService = () => {
    const{nameService, items} = this.state;
    this.setState({ items: [...items, nameService],  dialogState: false});
  };



  handleDeleteChip = (chip) =>{
    const{listOfRoles} = this.state;
    let newArray = listOfRoles.filter(word => word !== chip);
    this.setState({listOfRoles : newArray})
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


  handleClickOpen = (name) =>{
    this.setState({[name]: true})
  };

  addAdmin = () =>{
    this.setState({listOfAdmin: this.state.listOfNewAdmin, dialogAdmin: false})
  };

  dialogAdmin = (classes)=>{
    const{dialogAdmin, listOfNewAdmin, nbAdmin} = this.state;

    return(
      <Dialog open={dialogAdmin} onClose={() => this.setState({dialogAdmin: false})} aria-labelledby="form-dialog-title" classes={{paper: classes.dialogPaper}}>
        <DialogTitle id="customized-dialog-title" onClose={() => this.setState({dialogAdmin: false})} onClick={() => this.addNewLine('nbAdmin')} >Ajouter un Administrateurs</DialogTitle>
        <DialogContent dividers>
          {
            listOfNewAdmin.map((res, index) => (
              <Grid container spacing={2} style={{width: '100%', margin: 0}} key={index} id={index}>
                <Grid item xl={3} lg={3} sm={3} md={3} xs={3}>
                  <TextField
                    label="Nom"
                    name={'nameAdmin'}
                    value={res.nameAdmin || ''}
                    onChange={(e) => this.handleChange(index, e)}
                    variant={'outlined'}
                    classes={{root: classes.textField}}
                  />
                </Grid>
                <Grid item xl={3} lg={3} sm={3} md={3} xs={3}>
                  <TextField
                    label="Prénom"
                    value={res.firstNameAdmin || ''}
                    name={'firstNameAdmin'}
                    onChange={(e) => this.handleChange(index, e)}
                    variant={'outlined'}
                    classes={{root: classes.textField}}
                  />
                </Grid>
                <Grid item xl={3} lg={3} sm={3} md={3} xs={3}>
                  <TextField
                    label="Email"
                    name={'emailAdmin'}
                    value={res.emailAdmin || ''}
                    onChange={(e) => this.handleChange(index, e)}
                    variant={'outlined'}
                    classes={{root: classes.textField}}
                  />
                </Grid>
                <Grid item xl={3} lg={3} sm={3} md={3} xs={3}>
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

  dialogChip = (classes)=>{
    const{dialogChip, newChipField, nbChip} = this.state;

    return(
      <Dialog open={dialogChip} onClose={() => this.setState({dialogChip: false})} aria-labelledby="form-dialog-title" classes={{paper: classes.dialogPaper}}>
        <DialogTitle id="customized-dialog-title" onClick={this.addNewLine} onClose={() => this.setState({dialogChip: false})} >Ajouter un role</DialogTitle>
        <DialogContent dividers>
          {
            [...Array(nbChip)].map((res, index) => (
              <Grid container spacing={2} style={{width: '100%', margin: 0}}>
                <Grid item xl={11} lg={11} sm={11} md={11} xs={11}>
                  <TextField
                    label="Role"
                    name={'newChipField'}
                    onChange={this.handleOnchangeListOfRoles}
                    value={newChipField[index]}
                    variant={'outlined'}
                    classes={{root: classes.textField}}
                  />
                </Grid>
                <Grid item xl={1} lg={1} sm={1} md={1} xs={1}>
                  <IconButton edge="end" aria-label="delete" onClick={this.removeChip}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({dialogChip: false})} color="secondary">
            Annuler
          </Button>
          <Button onClick={this.addService} color="primary">
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
                listOfAdmin.map((res) =>(
                  <Grid>
                    <Grid>{res.nameAdmin},{res.firstNameAdmin} - {res.emailAdmin}</Grid>
                  </Grid>
                )) :
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
              <IconButton aria-label="AddCircleOutlineOutlinedIcon" onClick={() => this.handleClickOpen('dialogChip')}>
                <AddCircleOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Box>
            <Grid className={classes.listChipContainer}>
              {
                listOfRoles.map(res =>(
                  <Chip
                    label={res}
                    onDelete={() => this.handleDeleteChip(res)}
                    variant="outlined"
                  />
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
        {this.dialogChip(classes)}
        {this.dialogAdmin(classes)}
      </Grid>
    );
  }
}

export default withStyles(styles) (Team);
