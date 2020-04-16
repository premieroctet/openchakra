import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../componentStyle'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import isEmpty from '../../../server/validation/is-empty';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';

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
    let dates = [null,];
    const currentDate = new Date().getFullYear();
    for (let i = currentDate; i >=1950; i--) {
      dates.push(i);
    }
    this.setState({dates: dates});
  }

  handleChange(key, value) {
    console.log("onChange:"+key, value);
    var stat={[key]: value};
    if (key=='diplomaName' && isEmpty(value)) stat['diplomaYear']=null;
    if (key=='certificationName' && isEmpty(value)) stat['certificationYear']=null;
    console.log("after onChange:stat:"+JSON.stringify(stat));
    this.setState(stat, () => this.props.onChange(this.state));
  }

  render() {
    const {classes} = this.props;
    const {dates} = this.state;

    console.log("AssetsService:render:state is :"+JSON.stringify(this.state, null, 2));
    return (
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <Typography className={classes.policySizeTitle} >Vos atouts pour ce service ! </Typography>
              </Grid>
              <Grid style={{width: '80%'}}>
                <Grid>
                  <Grid>
                    <h3 className={classes.policySizeSubtitle}>Décrivez votre expertise  ! (facultatif)</h3>
                  </Grid>
                  <Grid>
                    <p className={classes.policySizeContent}>
                      Mettez en évidence vos compétences et votre expertise dans ce service.
                      Vous pouvez également donner des précisions sur vos prestations.
                      Par exemple, si vous proposez un service de confection de tapis, vous pouvez indiquer les heures nécessaires pour différentes dimension de tapis.
                      Précisez tout ce qui peut aider votre client à réserver correctement votre service !
                    </p>
                  </Grid>
                  <Grid>
                    <TextField
                      id="outlined-basic"
                      className={classes.describExperience}
                      label="Votre expertise"
                      margin="normal"
                      variant="outlined"
                      value={this.state.description}
                      onChange={ e => this.handleChange('description', e.target.value) }
                      multiline
                      rows="4"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid style={{width: '80%'}}>
                <Grid>
                  <p className={classes.policySizeContent}>
                    Précisez le nombre d’années d’expérience dont vous disposez sur ce service.
                    Si vous possédez des certifications et/ou diplômes pour ce service, mettez-les en avant !
                    Après vérification par My-Alfred, vous aurez le statut d’Alfred expérimenté/certifié et/ou diplômé sur ce service.
                  </p>
                </Grid>
                <Grid style={{marginBottom: 150}}>
                  <Grid item xs={12}>
                    <h3 className={classes.policySizeSubtitle}>Nombre d'années d'expérience</h3>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      select
                      value={this.state.level}
                      className={classes.inputDiplomaCertifResp}
                      variant="outlined"
                      onChange={e => this.handleChange('level', e.target.value) }
                    >
                      <MenuItem value="0">...</MenuItem>
                      <MenuItem value="1">Entre 0 et 1 an</MenuItem>
                      <MenuItem value="2">Entre 1 et 5 ans</MenuItem>
                      <MenuItem value="3">Entre 5 et 10 ans</MenuItem>
                      <MenuItem value="4">Plus de 10 ans</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <h3 className={classes.policySizeSubtitle}>Votre diplôme</h3>
                    <ExpansionPanel defaultExpanded={true}>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                        <Typography>Ajouter / modifier votre diplôme</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Grid container>
                          <Grid item xs={12}>
                            <TextField
                              value={this.state.diplomaName}
                              className={classes.inputDiplomaCertifResp}
                              label="Nom du diplôme"
                              margin="dense"
                              variant="outlined"
                              onChange={ e => this.handleChange('diplomaName', e.target.value) }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              value={this.state.diplomaYear}
                              className={classes.inputDiplomaCertifResp}
                              label="Année d'obtention"
                              margin="dense"
                              variant="outlined"
                              select
                              InputLabelProps={""}
                              onChange={e => this.handleChange('diplomaYear', e.target.value) }
                            >
                              {this.state.dates.map(date => {
                                return <MenuItem key={date} style={{zIndex: 9999}} value={date}>{date}</MenuItem>
                              })}
                            </TextField>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid style={{display: 'flex', alignItems: 'baseline'}}>
                              <label style={{display: 'inline-block', marginTop: 10}} className="forminputs">
                                Joindre un diplôme
                                <input id="file"
                                       style={{width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden'}}
                                       name="diploma" type="file"
                                       className="form-control"
                                       onChange={e => this.handleChange('diplomaPicture', e.target.files[0])}
                                />
                              </label>
                              {this.state.diplomaPicture !== null ?
                                <Grid style={{display : 'flex', alignItems: 'center'}}>
                                  <p>{typeof(this.state.diplomaPicture)=='string' ? 'Diplôme déjà joint' : this.state.diplomaPicture.name}</p>
                                  <CheckCircleIcon color={'primary'} style={{marginLeft: 10}}/>
                                  { false ?
                                  <IconButton  style={{marginLeft: 10}}>
                                    <DeleteForeverIcon color={'secondary'} />
                                  </IconButton>:null
                                  }
                                </Grid>
                                : null
                              }
                            </Grid>
                            <p>En téléchargeant votre diplôme, votre diplôme aura le statut de diplôme vérifié auprès des utilisateurs mais il ne sera jamais visible par ces derniers</p>
                          </Grid>
                        </Grid>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </Grid>
                  <Grid item xs={12} >
                    <h3 className={classes.policySizeSubtitle}>Votre certification</h3>
                    <ExpansionPanel defaultExpanded={true}>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                        <Typography>Ajouter / modifier votre certification</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Grid container>
                          <Grid item xs={12}>
                            <TextField value={this.state.certificationName} className={classes.inputDiplomaCertifResp} label="Nom du certificat" margin="dense" variant="outlined" onChange={ e => this.handleChange('certificationName', e.target.value) }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField value={this.state.certificationYear} className={classes.inputDiplomaCertifResp} label="Année d'obtention" margin="dense" variant="outlined" select onChange={e => this.handleChange('certificationYear', e.target.value) }
                            >
                              {dates.map(date => { return <MenuItem key={date} value={date}>{date}</MenuItem> })}
                            </TextField>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid style={{display: 'flex', alignItems: 'baseline'}}>
                              <label style={{display: 'inline-block', marginTop: 15}} className="forminputs">
                                Joindre une certification
                                <input id="file" style={{width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden'}} name="certifaction" type="file" className="form-control" onChange={e => this.handleChange('certificationPicture', e.target.files[0])}
                                />
                              </label>
                              {this.state.certificationPicture !== null ?
                                <Grid style={{display : 'flex', alignItems: 'center'}}>
                                  <p>{typeof(this.state.certificationPicture)=='string' ? 'Certification déjà jointe' : this.state.certificationPicture.name}</p>
                                  <CheckCircleIcon color={'primary'} style={{marginLeft: 10}}/>
                                  { false ?
                                  <IconButton  style={{marginLeft: 10}}>
                                    <DeleteForeverIcon color={'secondary'} />
                                  </IconButton>:null
                                  }
                                </Grid>
                                : null
                              }
                            </Grid>
                            <p>En téléchargeant votre certification, votre certification aura le statut de certification vérifiée auprès des utilisateurs mais elle ne sera jamais visible par ces derniers</p>
                          </Grid>
                        </Grid>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

AssetsService.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (AssetsService);
