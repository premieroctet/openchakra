import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SecurityIcon from '@material-ui/icons/Security';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/pages/paymentMethod/paymentMethod';
import moment from 'moment'
import axios from 'axios'

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

class EmployeeImportDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      errors: null,
      comments: null,
    }
    this.fileRef=React.createRef()
  }

  onFileSelected = event => {
    this.setState({selectedFile: event.target.files[0]})
  }

  onImport =  () => {
    this.setState({comments: null, errors:null})
    const data = new FormData()
    data.append('employees', this.state.selectedFile)
    axios.post('/myAlfred/api/companies/employees', data)
      .then( response => {
        this.setState({comments: response.data})
      })
      .catch( err => {
        this.setState({errors: err.response.data})
      })
      .finally( () => {
        // Clear input file to avoid ERR_UPLOAD_FILE_CHANGED
        this.fileRef.current.value=''
        this.setState({selectedFile:null})
      })
  }

  render() {
    const {classes} = this.props;
    const {errors, comments, selectedFile}=this.state
    return (
      <Dialog
        open={true}
        onClose={() => this.handleCloseModalAddRib()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleCloseModalAddRib}>
          <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Grid>
              <h4>Import de collaborateurs</h4>
            </Grid>
            <Grid>
              <Typography style={{color: 'rgba(39,37,37,35%)'}}>
              Importez la liste des collaborateurs à partir d'un fichier csv séparé par des points-virgules.<br/>
              Les colonnes nom, prénom et email sont requises.
              </Typography>
              {comments}
              <pre style={{color: 'red', fontSize:'small'}}>{errors}</pre>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            <input ref={this.fileRef} type="file" name="file" id="file" onChange={this.onFileSelected}/>
          </Grid>
          <Grid style={{textAlign: 'center', marginLeft: 15, marginRight: 15, marginTop: '3vh', marginBottom: '3vh'}}>
            <Button
              onClick={this.onImport}
              variant="contained"
              classes={{root: classes.buttonSave}}
              disabled={!selectedFile}
            >
              Importer
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  }

}

export default withStyles(styles)(EmployeeImportDialog)
