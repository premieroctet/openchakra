import {snackBarError, snackBarSuccess} from "../../utils/notifications";
const {setAxiosAuthentication} = require('../../utils/authentication')
import React from 'react';
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/components/Presentation/Presentation';
import Topic from "../../hoc/Topic/Topic"
import Box from '../Box/Box'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {CMP_PRESENTATION} from '../../utils/i18n'
import {MAX_DESCRIPTION_LENGTH} from '../../utils/consts'
import {isEditableUser} from '../../utils/context'
const {frenchFormat} = require('../../utils/text');
import CreateIcon from '@material-ui/icons/Create'
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
const CompanyComponent = require('../../hoc/b2b/CompanyComponent')

const moment = require('moment');
moment.locale('fr');

const DialogTitle = withStyles(styles)((props) => {
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography {...other} className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon/>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


class Presentation extends CompanyComponent {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      company: null,
      newDescription: null,
      showEdition: false,
    }
  }

  componentDidMount = () => {
    this.loadUser()
  }

  loadUser = () => {
    setAxiosAuthentication()

    axios.get(`/myAlfred/api/users/users/${this.props.user}`)
      .then(res => {
        const user = res.data
        this.setState({user: user})
        if (user.company) {
          axios.get(`/myAlfred/api/companies/companies/${user.company}`)
            .then( res =>{
              const company = res.data;
              this.setState({
                company: company,
                website: company.website,
                activityArea: company.activity,
                sizeCompany: company.size,
                billing_address: company.billing_address,
                companyName: company.name,
                description: company.description,
                siret: company.siret,
                vat_number: company.vat_number,
                vat_subject: company.vat_subject
              })
            })
          .catch(err => console.error(err))
        }
      })
      .catch(err => console.error(err))
  };

  save = () => {
    const {newDescription} = this.state
    setAxiosAuthentication()

    if(this.isModeCompany()){
      axios.put('/myAlfred/api/companies/profile/editProfile', {
          activity: this.state.activityArea,
          size: this.state.sizeCompany,
          website: this.state.website,
          name: this.state.companyName,
          billing_address: this.state.billing_address,
          description: newDescription !== '' && newDescription !== null ? newDescription : this.state.description,
          siret: this.state.siret,
          vat_number: this.state.vat_number,
          vat_subject: this.state.vat_subject
        }
      ).then( res =>{
        snackBarSuccess("Profil modifié avec succès");
        this.setState({showEdition: false}, () => this.componentDidMount())
      }).catch( err => {
        snackBarError(err.response.data);
      })
    }else{
      axios.put('/myAlfred/api/users/profile/description', {description: newDescription})
        .then(res => {
          this.loadUser()
          this.setState({showEdition: false})
        })
    }
  }

  onTextChanged = event => {
    var text = event.target.value
    text = text.slice(0, MAX_DESCRIPTION_LENGTH)
    this.setState({newDescription: text})
  }

  closeEditDialog = () => {
    this.setState({showEdition: false, newDescription: null})
  };

  modalEditDialog = (classes) => {
    const {user, showEdition, newDescription} = this.state;
    const enabled = newDescription;
    const placeholder = newDescription || CMP_PRESENTATION.placeholder;

    return (
      <Dialog
        open={showEdition}
        onClose={() => this.closeEditDialog()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{paper: classes.dialogPaper}}
      >
        <DialogTitle id="customized-dialog-title" onClose={this.closeEditDialog}
                     style={{position: 'absolute', right: 0}}/>
        <DialogContent>
          <Topic titleTopic={'Modifiez votre description'}
                 titleSummary={'Ajoutez ou modifiez votre "À propos" '} underline={true}/>
          <Grid container>
            <Grid item xs={12} lg={12} style={{marginTop: '2vh',}}>
              <TextField multiline classes={{root: classes.textField}} rowsMax={15} rows={2}
                         value={newDescription} placeholder={placeholder} onChange={this.onTextChanged}/>
            </Grid>
            <Grid style={{
              marginTop: '2vh',
              display: 'flex',
              alignItems: 'flex-end',
              width: '100%',
              flexDirection: 'column'
            }}>
              <Grid>
                <Typography>{`${MAX_DESCRIPTION_LENGTH} caractères max`}</Typography>
              </Grid>
              <Grid style={{width: '100%'}}>
                <Button
                  onClick={() => {
                    this.save();
                  }}
                  variant="contained"
                  disabled={!enabled}
                  classes={{root: classes.button}}
                  color={'primary'}
                >
                  Modifier
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  };

  openEdition = () => {
    this.setState({showEdition: true, newDescription: this.state.user.description})
  };

  render() {
    const {classes} = this.props;
    const {user, company} = this.state;
    const editable = isEditableUser(user);
    const title = this.isModeCompany() ? company ? `À propos de ${company.name}` : null : frenchFormat(`À propos de ${user ? user.firstname : ''}`);

    return (
      <>
        {editable ?
          <Grid className={classes.containerIcon}>
            <IconButton aria-label="edit" onClick={this.openEdition}>
              <CreateIcon/>
            </IconButton>
          </Grid>
          :
          null
        }
        <Grid style={{display: 'flex', flexDirection: 'column', position: 'relative'}}>
          <Topic titleTopic={title}
                 titleSummary={user ? `membre depuis ${moment(user.creation_date).format("MMMM YYYY")}` : ''}>
            {user && !this.isModeCompany()?
              <Typography style={{wordWrap: 'break-word'}}>{user.description}</Typography>
              :
              this.isModeCompany() && company ?
                <Typography style={{wordWrap: 'break-word'}}>{company.description}</Typography>
                : null
            }
          </Topic>
          <Grid>
            {this.modalEditDialog(classes)}
          </Grid>
        </Grid>
      </>

    )
  }
}

export default withStyles(styles, {withTheme: true})(Presentation)
