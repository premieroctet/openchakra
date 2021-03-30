import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import styles from '../../static/css/components/ShowDiploma/ShowDiploma';
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import {SHOP} from "../../utils/i18n";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import _ from "lodash";
const {setAxiosAuthentication}=require('../../utils/authentication');
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CreateIcon from "@material-ui/icons/Create";
import {isEditableUser} from "../../utils/functions";


const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <h4>{children}</h4>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


class ShowDiploma extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      services: [],
      dialogConfigDiploma: '',
      dates:[],
      diplomaSkills: []
    }
  }

  componentDidMount() {
    setAxiosAuthentication();

    axios.get(`/myAlfred/api/shop/alfred/${this.props.user}`)
      .then(response => {
        let shop = response.data;
        this.setState({
          shop: shop,
          services: shop.services
        })
      }).catch(err => console.error(err))

    let dates = [null];
    const currentDate = new Date().getFullYear();
    for (let i = currentDate; i >= 1950; i--) {
      dates.push(i);
    }
    this.setState({dates: dates});
  }

  handleChange = (event) =>{
    const {value,name} = event.target;
    this.setState({[name]: value})
  }

  addSkill = (skillsAttribute, newSkillAttribute) => {
    var newSkill = this.state[newSkillAttribute]
    newSkill = newSkill.trim().replace(/^#*/, '')
    var skills = this.state[skillsAttribute]
    if (newSkill){
      skills.push(newSkill)
      skills = _.uniqBy(skills, s => s.trim().toLowerCase())
      this.setState({[skillsAttribute]:skills, [newSkillAttribute]:''})
    }
  }

  onSkillDelete = (skillsAttribute, skillName) => {
    var skills=this.state[skillsAttribute]
    skills=skills.filter(s => s!=skillName)
    this.setState({[skillsAttribute]: skills})
  }

  handlePicture = event => {
    const {name, files} = event.target
    this.setState({[name]: files[0]});
  }

  dialogConfigDiploma = (classes) =>{
    const{diplomaYear, diplomaName, newDiplomaSkill, diplomaSkills, diplomaPicture, dates, dialogConfigDiploma} = this.state;

    return(
      <Dialog
        open={dialogConfigDiploma}
        onClose={() => this.setState({dialogConfigDiploma: false})}
        aria-labelledby="customized-dialog-title"
      >
        <DialogContent>
          <DialogTitle id="customized-dialog-title" onClose={() => this.setState({dialogConfigDiploma: false})}>
            {SHOP.assets.diploma_title}
          </DialogTitle>
          <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={3} style={{margin: 0, width: '100%'}}>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              <FormControl variant={'outlined'} style={{width: '100%'}}>
                <InputLabel id="demo-simple-select-outlined-label">{SHOP.assets.year_obtain}</InputLabel>
                <Select
                  value={diplomaYear}
                  label={SHOP.assets.year_obtain}
                  name='diplomaYear'
                  onChange={this.handleChange}
                  style={{width: '100%'}}
                  variant="outlined"
                >
                  {dates.map(date => {
                    return (
                      <MenuItem
                        key={date}
                        value={date}>
                        {date}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              <TextField
                value={diplomaName}
                label="Titre"
                variant="outlined"
                style={{width: '100%'}}
                name='diplomaName'
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              <TextField
                id="outlined-basic"
                style={{width: '100%'}}
                label={SHOP.assets.obtain_competence}
                variant="outlined"
                value={newDiplomaSkill}
                name='newDiplomaSkill'
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              <IconButton aria-label="AddCircleOutlineIcon">
                <AddCircleOutlineIcon onClick={() => this.addSkill('diplomaSkills', 'newDiplomaSkill')}/>
              </IconButton>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.chipsContainer}>
              {diplomaSkills.map( s => (
                <Chip
                  label={`#${s}`}
                  onDelete={() => this.onSkillDelete('diplomaSkills', s)}
                />
              ))}
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Grid className={classes.inputFileContainer}>
                <input
                  key={'diploma'}
                  accept="image/*,.pdf"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  name="diplomaPicture"
                  onChange={this.handlePicture}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span" classes={{root: classes.buttonUpload}}>
                    {SHOP.assets.button_joinDiploma}
                  </Button>
                </label>
              </Grid>
            </Grid>
            {diplomaPicture ?
              <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={3} style={{margin: 0, width: '100%'}}>
                <Grid item>
                  <Typography>Diplôme joint</Typography>
                </Grid>
                <Grid item>
                  <CheckCircleIcon color={'primary'}/>
                </Grid>
              </Grid>
              : null
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  render() {
    const {classes, user} = this.props;
    const {shop, services} = this.state;

    const editable = isEditableUser(user);


    return(
      <Grid container spacing={2} style={{margin: 0, width:'100%'}}>
        {editable ?
          <Grid className={classes.containerIcon}>
            <IconButton aria-label="edit" onClick={() => this.setState({dialogConfigDiploma: true})}>
              <CreateIcon/>
            </IconButton>
          </Grid>
          :
          null
        }
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h3>Diplômes</h3>
        </Grid>
        <Grid container spacing={2} item xl={12} lg={12} md={12} sm={12} xs={12} style={{margin: 0, width: '100%'}}>
          {
            shop ?
              services.map( res => {
                return(
                  <>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <h4>{res.experience_title}</h4>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Typography>{res.experience_description}</Typography>
                    </Grid>
                    {
                      res.experience_skills && res.experience_skills.length > 0 ?
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.chipsContainer}>
                          {
                            res.experience_skills.map( s => {
                              return(
                                <Chip
                                  label={`#${s}`}
                                />
                              )
                            })
                          }
                        </Grid> : null
                    }

                  </>
                )
              }) : null
          }
        </Grid>
        {this.dialogConfigDiploma(classes)}
      </Grid>
    )
  }
}

export default withStyles(styles)(ShowDiploma);
