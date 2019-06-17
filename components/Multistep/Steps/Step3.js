import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Avatarsbutton from '../../avatar/avatar';
import Textcoiffure from '../../Textfields/textcoiffure';
import Textmenage from '../../Textfields/textmenage';
import Textnumtel from '../../Textfields/numerodetel';
import Textnumsiret from '../../Textfields/numerodesiret';
import Textnumnafape from '../../Textfields/codenafape';
import Textdatecrea from '../../Textfields/datecreation';
import Textdenomination from '../../Textfields/denomination';
import Checkboxes from '../../Checkboxes/checkboxes';
import Checkboxessmall from '../../Checkboxes/checkboxessmall';

const styles = theme => ({
  cardContainer: {
    height: '120vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: '1.5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    maxHeight: 700,
    overflow: 'auto',
    width: '55%',
  },
  cardHeader: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  cardProgressBar: {
    display: 'flex',
    flexGrow: 1,
  },
  cardBody: {
    display: 'flex',
    flexGrow: 8,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    backgroundColor: 'lightgrey',
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 232,
    },
  },
  chip: {
    marginRight: 5,
    marginBottom: 5,
  },
  categoryExpansion: {
    marginBottom: 5,
  },
  textinput: {
    marginTop: '35px',
  },
  dlidentite1: {
    lineHeight: 5.3,
    '&:hover': {
      cursor: 'pointer',
      color: '#000080',
    }
  },
  dlidentite2: {
    '&:hover': {
      cursor: 'pointer',
      color: '#000080',
    }
  },
  vridentite: {
    marginTop: 35,
  },
  titre1: {
    fontSize: 18,
  },
  titre2: {
    fontSize: 18,
  },
  titre3: {
    fontSize: 18,
  },
  titre4: {
    fontSize: 18,
  },
  petit1: {
    fontSize: 12,
  },
  petit2: {
    fontSize: 12,
  },
  checkboxespart: {
    marginTop: 25,
  },
  finpres: {
    marginTop: 25,
  },
  obligations: {
    marginTop: 31,
  },
  input: {
    display: 'none',
  },
});

function handleDelete() {
  alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}
class Step3 extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();

    this.state = {
      serviceDescription: '',
      phone: '',
      isParticular: false,
      isProfessional: false,
      isMicro_company: false,
      isIndividualCompany: false,
      siret: '',
      creationDate: '',
      denomination: '',
      nafape: '',
      isEngaged: false,
      isCertified: false,
    }
    
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });

    console.log(this.state);
  }

  render() {
    const { classes } = this.props;
    if (this.props.currentStep !== 3) {
      return null;
    }

    return (
      <Grid container className={classes.cardContainer}>
        <Card className={classes.card}>
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <Avatarsbutton />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={7}>
              <Typography>
                Décrivez brievement vos services et votre expertise
Rédigez un résumé rapide de vos services. Mettez en évidence vos savoir faire, vos expériences et ce qui vous démarque des autres Alfred !
              </Typography>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={8} className={classes.textinput}>
              <label>
                Coiffure
                <textarea cols="90" name="serviceDescription" value={this.serviceDescription} rows="8" placeholder="Description" onChange={this.handleInputChange} />
              </label>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
          <Grid container>
          <Grid item xs={12} className={classes.vridentite}>
            <Typography>Vérifiez votre identité</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Elles ne seront pas visibles par les utilisateurs</Typography>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <label>
              Numéro de téléphone
              <input type="text" name="phone" value={this.phone} onChange={this.handleInputChange} />
            </label>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <Grid container>
              <Grid item xs={12}>
                <input accept="image/*" className="input" ref={this.fileInput} style={{display:'none'}} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                  <Typography className={classes.dlidentite1}>Téléchargez votre pièce d'identité(recto)</Typography>
                </label>
              </Grid>
              <Grid item xs={12}>
                <input accept="image/*" className="input" style={{display:'none'}} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                  <Typography className={classes.dlidentite2}>Téléchargez votre pièce d'identité(verso)</Typography>
                </label>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>

        <Grid container className={classes.checkboxespart}>

          <Grid container>
            <Grid item xs={1}/*className={classes.checkbox1}*/>
              <input
                name="isParticular"
                type="checkbox"
                checked={this.state.isParticular}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={11}>
            <Typography className={classes.titre1}>
                Je suis un Particulier
              </Typography>
              <Typography>
              En tant que particulier, vous pouvez rendre des services occasionnels sur My-Alfred. Si votre activité devient régulière, un statut professionnel (mi-cro-entrepreuneur,...) s’impose. Il est également requis pour certains sec-teurs d’activité réglementés (travaux de plomberie, peinture, électricité...)
              </Typography>
            </Grid>
          </Grid>

         {/* <Grid container>
          <Grid item xs={1}>
            <input type="checkbox" />
          </Grid>
          <Grid item xs={11}>
              <Typography className={classes.petit1} >
                <p>J'ai compris</p>
              </Typography>
            </Grid>
         </Grid> */}

          <Grid container>
            <Grid item xs={1}>
              <input
                name="isProfessional"
                type="checkbox"
                checked={this.state.isProfessional}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={11}>
              <Typography className={classes.titre2}>
                Je suis un Professionnel
              </Typography>
              <Typography>
              Un statut professionnel est nécessaire pour les métiers réglementés et permet une activité régulière sur My-Alfred. Seuls les professionnels peuvent proposer leurs services aux entreprises qui ont besoin d’une facture.Un statut professionnel est requis dès que votre activité devient régulière
              </Typography>
            </Grid>
          </Grid>

          {/* <Grid container>
            <Grid item xs={1}>
              <input type="checkbox" />
            </Grid>
            <Grid item xs={11}>
              <Typography className={classes.petit1} >
                <p>J'ai compris</p>
              </Typography>
            </Grid>
          </Grid> */}

          <Grid container>
            <Grid item xs={1}>
              <input
                name="isMicro_company"
                type="checkbox"
                checked={this.state.isMicro_company}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={11}>
              <Typography className={classes.titre3}>
                <p>Micro-entreprise, auto-entrepreuneur</p>
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={1}>
              <input
                name="isIndividualCompany"
                type="checkbox"
                checked={this.state.isIndividualCompany}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={11}>
              <Typography className={classes.titre4}>
                <p>Entreprise individuelle, EIRL, MDA, professions libérales...</p>
              </Typography>
            </Grid>
          </Grid>

        </Grid>

            <Grid item xs={2}></Grid>


          <Grid container className={classes.finpres}>
            <Grid item xs={6}>
              <Grid container>
                <label>
                  Numéro Siret
                  <input name="siret" value={this.state.siret} onChange={this.handleInputChange} type="text" />
                </label>
                <label>
                  Date de création
                  <input name="creationDate" value={this.state.creationDate} onChange={this.handleInputChange} type="text" />
                </label>
                <label>
                  Dénomination
                  <input name="denomination" value={this.state.denomination} onChange={this.handleInputChange} type="text" />
                </label>
                <label>
                  Code NAF/APE
                  <input name="nafape" value={this.state.nafape} onChange={this.handleInputChange} type="text" />
                </label>
              </Grid>
            </Grid>

            <Grid item xs={6} className={classes.obligations}>
              <Grid item xs={12}>
                <Typography className={classes.titre2}>
                Vos obligations légales
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                Dans le cadre des prestations effectuées via My-Alfred, vous devez res-pecter toutes les obligations légales et réglementaires (fiascales, sociales, comptables, administratives etc... correspondant à votre statut.Numéro de téléphoneCode à 4 chiffresTerminer
                </Typography>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                  <input
                    name="isengaged"
                    type="checkbox"
                    checked={this.state.isEngaged}
                    onChange={this.handleInputChange}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Typography className={classes.petit2}>
                    <p>je m’engage à respecter toutes les obligations légales correspondant à mon statut.</p>
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                  <input
                    name="isCertified"
                    type="checkbox"
                    checked={this.state.isCertified}
                    onChange={this.handleInputChange}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Typography className={classes.petit2}>
                    <p>Je certifie sur l’honneur qu’il s’agit bien de mon entreprise</p>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(Step3);
