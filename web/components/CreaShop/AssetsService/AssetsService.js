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

class AssetsService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      description: props.data.description,
      diplomaYear: props.data.diplomaYear,
      diplomaName: props.data.diplomaName,
      diplomaPicture: props.data.diplomaPicture,
      certificationYear: props.data.certificationYear,
      certificationName: props.data.certificationName,
      certificationPicture: props.data.certificationPicture,
      level: props.data.level,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let dates = [null];
    const currentDate = new Date().getFullYear();
    for (let i = currentDate; i >= 1950; i--) {
      dates.push(i);
    }
    this.setState({dates: dates});
  }

  handleChange(key, value) {
    var stat = {[key]: value};
    if (key == 'diplomaName' && isEmpty(value)) {
      stat['diplomaYear'] = null;
    }
    if (key == 'certificationName' && isEmpty(value)) {
      stat['certificationYear'] = null;
    }
    this.setState(stat, () => this.props.onChange(this.state));
  }

  handleDelete = () =>{

  };

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
            onChange={e => this.handleChange('description', e.target.value)}
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
                onChange={e => this.handleChange('level', e.target.value)}
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
              value={''}
              variant={'outlined'}
              label={'Titre'}
              style={{width: '100%'}}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              style={{width: '100%'}}
              label={SHOP.assets.experience_label_dresciprtion}
              variant="outlined"
              value={''}
              multiline
              rows="4"
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
            <TextField
              id="outlined-basic"
              style={{width: '100%'}}
              label={SHOP.assets.obtain_competence}
              variant="outlined"
              value={''}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={6} style={{display: 'flex'}}>
            <IconButton aria-label="AddCircleOutlineIcon">
              <AddCircleOutlineIcon />
            </IconButton>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.chipsContainer}>
            <Chip
              label="#Ponctuel"
              onDelete={this.handleDelete}
            />
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
                onChange={e => this.handleChange('diplomaYear', e.target.value)}
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
              onChange={e => this.handleChange('diplomaName', e.target.value)}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
            <TextField
              id="outlined-basic"
              style={{width: '100%'}}
              label={SHOP.assets.obtain_competence}
              variant="outlined"
              value={''}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={6} style={{display: 'flex'}}>
            <IconButton aria-label="AddCircleOutlineIcon">
              <AddCircleOutlineIcon />
            </IconButton>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.chipsContainer}>
            <Chip
              label="#Ponctuel"
              onDelete={this.handleDelete}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid className={classes.inputFileContainer}>
              <input
                accept="image/*,.pdf"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                name="diploma"
                onChange={e => this.handleChange('diplomaPicture', e.target.files[0])}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span" classes={{root: classes.buttonUpload}}>
                  {SHOP.assets.button_joinFile}
                </Button>
              </label>
            </Grid>
          </Grid>
          {this.state.diplomaPicture !== null ?
            <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={3} style={{margin: 0, width: '100%'}}>
              <Grid item>
                <Typography>{typeof (this.state.diplomaPicture) == 'string' ? 'Diplôme déjà joint' : this.state.diplomaPicture.name}</Typography>
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
                onChange={e => this.handleChange('certificationYear', e.target.value)}
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
              onChange={e => this.handleChange('certificationName', e.target.value)}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
            <TextField
              id="outlined-basic"
              style={{width: '100%'}}
              label={SHOP.assets.obtain_competence}
              variant="outlined"
              value={''}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={6} style={{display: 'flex'}}>
            <IconButton aria-label="AddCircleOutlineIcon">
              <AddCircleOutlineIcon />
            </IconButton>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.chipsContainer}>
            <Chip
              label="#Ponctuel"
              onDelete={this.handleDelete}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid className={classes.inputFileContainer}>
              <input
                accept="image/*,.pdf"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                name="diploma"
                onChange={e => this.handleChange('certificationPicture', e.target.files[0])}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span" classes={{root: classes.buttonUpload}}>
                  {SHOP.assets.button_joinFile}
                </Button>
              </label>
            </Grid>
          </Grid>
          {this.state.diplomaPicture !== null ?
            <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={3} style={{margin: 0, width: '100%'}}>
              <Grid item>
                <Typography>{typeof (this.state.certificationPicture) == 'string' ? 'Certification déjà jointe' : this.state.certificationPicture.name}</Typography>
              </Grid>
              <Grid item>
                <CheckCircleIcon color={'primary'}/>
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
