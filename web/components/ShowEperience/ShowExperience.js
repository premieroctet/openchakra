import React from 'react';
import styles from '../../static/css/components/ShowExperience/ShowExperience';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import {isEditableUser} from "../../utils/functions";
import {SHOP} from "../../utils/i18n";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
const {setAxiosAuthentication}=require('../../utils/authentication');
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from "@material-ui/core/Button";
import _ from "lodash";

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

class ShowExperience extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      services: [],
      dialogConfigExperience: false,
      level: '',
      experience_title: '',
      experience_description: '',
      newExperienceSkill: '',
      experience_skills: []
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

  dialogConfigExperience = (classes) => {
    const {dialogConfigExperience, level, experience_title, experience_description, newExperienceSkill, experience_skills} = this.state;

    return(
      <Dialog
        onClose={() => this.setState({dialogConfigExperience: false})}
        aria-labelledby="customized-dialog-title"
        open={dialogConfigExperience}
      >
        <DialogTitle id="customized-dialog-title" onClose={() => this.setState({dialogConfigExperience: false})}>
          {SHOP.assets.experience_title}
        </DialogTitle>
        <DialogContent>
          <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={3} style={{margin: 0, width: '100%'}}>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              <FormControl variant="outlined" style={{width: '100%'}}>
                <InputLabel id="demo-simple-select-outlined-label">{SHOP.assets.experience_label}</InputLabel>
                <Select
                  value={level}
                  style={{width: '100%'}}
                  variant="outlined"
                  name="level"
                  onChange={this.handleChange}
                  label={SHOP.assets.experience_label}
                >
                  <MenuItem value="1">{SHOP.assets.experience_yearRange_0}</MenuItem>
                  <MenuItem value="2">{SHOP.assets.experience_yearRange_1}</MenuItem>
                  <MenuItem value="3">{SHOP.assets.experience_yearRange_2}</MenuItem>
                  <MenuItem value="4">{SHOP.assets.experience_yearRange_3}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              <TextField
                variant={'outlined'}
                label={'Titre'}
                value={experience_title}
                name='experience_title'
                onChange={this.handleChange}
                style={{width: '100%'}}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextField
                id="outlined-basic"
                style={{width: '100%'}}
                label={SHOP.assets.experience_label_description}
                variant="outlined"
                value={experience_description}
                name='experience_description'
                multiline
                rows="4"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              <TextField
                id="outlined-basic"
                style={{width: '100%'}}
                label={SHOP.assets.obtain_competence}
                variant="outlined"
                value={newExperienceSkill}
                name='newExperienceSkill'
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              <IconButton aria-label="AddCircleOutlineIcon" disabled={!newExperienceSkill}>
                <AddCircleOutlineIcon onClick={() => this.addSkill('experience_skills', 'newExperienceSkill')}/>
              </IconButton>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.chipsContainer}>
              {experience_skills.map( s => (
                <Chip
                  label={`#${s}`}
                  onDelete={() => this.onSkillDelete('experience_skills', s)}
                />
              ))}
            </Grid>
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
      <Grid container spacing={2} style={{margin: 0, width: '100%'}}>
        {editable ?
          <Grid className={classes.containerIcon}>
            <IconButton aria-label="edit" onClick={() => this.setState({dialogConfigExperience: true})}>
              <CreateIcon/>
            </IconButton>
          </Grid>
          :
          null
        }
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h3>Experience</h3>
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
        {this.dialogConfigExperience(classes)}
      </Grid>
    )
  }

}

export default withStyles(styles) (ShowExperience);
