import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../../../static/css/components/AssetsService/AssetsService';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import isEmpty from '../../../server/validation/is-empty';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import {SHOP} from "../../../utils/i18n";
import Select from "@material-ui/core/Select";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import util from 'util'
import _ from 'lodash'

// TODO: gérer les images des diplômes et crtifications en cas de modification de service
class AssetsService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      description: props.description || '',
      diplomaYear: props.diplomaYear || '',
      diplomaName: props.diplomaName || '',
      diplomaPicture: props.diplomaPicture || '',
      certificationYear: props.certificationYear || '',
      certificationName: props.certificationName || '',
      certificationPicture: props.certificationPicture || '',
      level: props.level,
      diplomaSkills: props.diplomaSkills || [],
      certificationSkills: props.certificationSkills || [],
      experience_skills: props.experience_skills || [],
      experience_title: props.experience_title || [],
      experience_description: props.experience_description || [],
      newExperienceSkill: '',
      newDiplomaSkill: '',
      newCertificationSkill: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePicture=this.handlePicture.bind(this)
  }

  componentDidMount() {
    let dates = [null];
    const currentDate = new Date().getFullYear();
    for (let i = currentDate; i >= 1950; i--) {
      dates.push(i);
    }
    this.setState({dates: dates});
  }

  handleChange = event => {
    var attributes={[event.target.name]: event.target.value}
    if (name == 'diplomaName' && isEmpty(value)) {
      attributes['diplomaYear'] = null;
    }
    if (name == 'certificationName' && isEmpty(value)) {
      attributes['certificationYear'] = null;
    }
    if (name.toLowerCase().includes('skill')) {
      attributes[name]=value.trim()
    }
    this.setState(attributes, () => this.props.onChange(this.state));
  }

  handlePicture = event => {
    const {name, files} = event.target
    this.setState({[name]: files[0]}, () => this.props.onChange(this.state));
  }

  addSkill = (skillsAttribute, newSkillAttribute) => {
    var newSkill = this.state[newSkillAttribute]
    newSkill = newSkill.trim().replace(/^#*/, '')
    var skills = this.state[skillsAttribute]
    if (newSkill){
      skills.push(newSkill)
      skills = _.uniqBy(skills, s => s.trim().toLowerCase())
      this.setState({[skillsAttribute]:skills, [newSkillAttribute]:''}, () => this.props.onChange(this.state))
    }
  }

  onSkillDelete = (skillsAttribute, skillName) => {
    var skills=this.state[skillsAttribute]
    skills=skills.filter(s => s!=skillName)
    this.setState({[skillsAttribute]: skills}, () => this.props.onChange(this.state))
  }

  render() {
    const {classes} = this.props;
    const {dates} = this.state;

    return (
      <Grid container spacing={3} style={{margin: 0, width: '100%'}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', justifyContent: 'center'}}>
          <h2 className={classes.policySizeTitle}>{SHOP.assets.title}</h2>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h3 className={classes.policySizeSubtitle}>{SHOP.assets.subtitle}</h3>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h4 className={classes.policySizeSubtitle}>{SHOP.assets.expertise_title}</h4>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <TextField
            id="outlined-basic"
            style={{width: '100%'}}
            label={SHOP.assets.expertise_label}
            variant="outlined"
            value={this.state.description}
            name='description'
            onChange={this.handleChange}
            multiline
            rows="4"
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Divider/>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h4 className={classes.policySizeSubtitle}>{SHOP.assets.experience_title}</h4>
        </Grid>
        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={3} style={{margin: 0, width: '100%'}}>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
            <FormControl variant="outlined" style={{width: '100%'}}>
              <InputLabel id="demo-simple-select-outlined-label">{SHOP.assets.experience_label}</InputLabel>
              <Select
                value={this.state.level}
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
              value={this.state.experience_title}
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
              value={this.state.experience_description}
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
              value={this.state.newExperienceSkill}
              name='newExperienceSkill'
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={6} style={{display: 'flex'}}>
            <IconButton aria-label="AddCircleOutlineIcon" disabled={!this.state.newExperienceSkill}>
              <AddCircleOutlineIcon onClick={() => this.addSkill('experience_skills', 'newExperienceSkill')}/>
            </IconButton>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.chipsContainer}>
            {this.state.experience_skills.map( s => (
              <Chip
                label={`#${s}`}
                onDelete={() => this.onSkillDelete('experience_skills', s)}
              />
            ))}
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Divider/>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Grid>
            <h4 className={classes.policySizeSubtitle}>{SHOP.assets.diploma_title}</h4>
          </Grid>
          <Grid>
            <Typography style={{color: '#696767'}}><em>{SHOP.assets.diploma_subtitle}</em></Typography>
          </Grid>
        </Grid>
        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={3} style={{margin: 0, width: '100%'}}>
          <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
            <FormControl variant={'outlined'} style={{width: '100%'}}>
              <InputLabel id="demo-simple-select-outlined-label">{SHOP.assets.year_obtain}</InputLabel>
              <Select
                value={this.state.diplomaYear}
                label={SHOP.assets.year_obtain}
                name='diplomaYear'
                onChange={this.handleChange}
                style={{width: '100%'}}
                variant="outlined"
              >
                {this.state.dates.map(date => {
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
          <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
            <TextField
              value={this.state.diplomaName}
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
              value={this.state.newDiplomaSkill}
              name='newDiplomaSkill'
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={6} style={{display: 'flex'}}>
            <IconButton aria-label="AddCircleOutlineIcon">
              <AddCircleOutlineIcon onClick={() => this.addSkill('diplomaSkills', 'newDiplomaSkill')}/>
            </IconButton>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.chipsContainer}>
          {this.state.diplomaSkills.map( s => (
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
          {this.state.diplomaPicture ?
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
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Divider/>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Grid>
            <h4 className={classes.policySizeSubtitle}>{SHOP.assets.certification_title}</h4>
          </Grid>
          <Grid>
            <Typography style={{color: '#696767'}}><em>{SHOP.assets.certification_subtitle}</em></Typography>
          </Grid>
        </Grid>
        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={3} style={{margin: 0, width: '100%'}}>
          <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
            <FormControl variant={'outlined'} style={{width: '100%'}}>
              <InputLabel id="demo-simple-select-outlined-label">{SHOP.assets.year_obtain}</InputLabel>
              <Select
                value={this.state.certificationYear}
                label={SHOP.assets.year_obtain}
                name={'certificationYear'}
                onChange={this.handleChange}
                style={{width: '100%'}}
                variant="outlined"
              >
                {dates.map(date => {
                  return <MenuItem key={date} value={date}>{date}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
            <TextField
              value={this.state.certificationName}
              label={SHOP.assets.certification_name}
              variant="outlined"
              style={{width: '100%'}}
              name='certificationName'
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
            <TextField
              id="outlined-basic"
              style={{width: '100%'}}
              label={SHOP.assets.obtain_competence}
              variant="outlined"
              value={this.state.newCertificationSkill}
              name='newCertificationSkill'
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={6} style={{display: 'flex'}}>
            <IconButton aria-label="AddCircleOutlineIcon">
            <AddCircleOutlineIcon onClick={() => this.addSkill('certificationSkills', 'newCertificationSkill')}/>
            </IconButton>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.chipsContainer}>
          {this.state.certificationSkills.map( s => (
            <Chip
              label={`#${s}`}
              onDelete={() => this.onSkillDelete('certificationSkills', s)}
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
                name="certificationPicture"
                onChange={e => this.handlePicture({target: { name : "certificationPicture", files: e.target.files}})}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span" classes={{root: classes.buttonUpload}}>
                  {SHOP.assets.button_joinCertification}
                </Button>
              </label>
            </Grid>
          </Grid>
          {this.state.certificationPicture ?
            <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={3} style={{margin: 0, width: '100%'}}>
              <Grid item>
                <Typography>Certification jointe}</Typography>
                <CheckCircleIcon color={'primary'}/>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
            : null
          }
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AssetsService);
