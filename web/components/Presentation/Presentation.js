import React from 'react';
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/components/Presentation/Presentation';
import cookie from 'react-cookies';
import Topic from "../../hoc/Topic/Topic"
import Box from '../Box/Box'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {CMP_PRESENTATION} from '../../utils/i18n'
import {MAX_TEXT_SIZE} from '../../utils/consts'
import {isEditableUser} from '../../utils/functions'
const {frenchFormat} = require('../../utils/text');
import CreateIcon from '@material-ui/icons/Create'


class Presentation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      newDescription: null,
      showEdition: false,
    }
  }

  componentDidMount = () => {
    this.loadUser()
  }

  loadUser = () => {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get(`/myAlfred/api/users/users/${this.props.user}`)
      .then( res => {
        this.setState( { user: res.data})
      })
      .catch (err => console.error(err))
  };

  save = () => {
    const {newDescription}=this.state
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.put('/myAlfred/api/users/profile/description', {description: newDescription})
      .then( res => {
        this.loadUser()
        this.setState({ showEdition: false})
      })
  }

  onTextChanged = event => {
    var text=event.target.value
    text=text.slice(0, MAX_TEXT_SIZE)
    this.setState({newDescription: text})
  }

  closeEditDialog = () => {
    this.setState({showEdition: false, newDescription: null})
  }
  modalEditDialog = (classes) =>{
    const {user, showEdition, newDescription}=this.state;
    const enabled = newDescription
    const placeholder = newDescription || CMP_PRESENTATION.placeholder

    return(
      <Dialog
        open={showEdition}
        onClose={() => this.closeEditDialog()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
        <Box>
          <Topic titleTopic={'Modifiez votre description'} titleSummary={'Ajoutez ou modifiez votre "À propos" '} underline={true} />
          <Grid style={{display: 'flex', flexDirection: 'column'}}>
          </Grid>
          <Grid container>
            <Grid item xs={12} lg={12}  style={{marginTop: '2vh'}}>
              <Box>
                <TextField multiline rowsMax={4} rows={4} value={newDescription} placeholder={placeholder} onChange={this.onTextChanged}/>
              </Box>
            </Grid>
            <Grid style={{marginTop: '2vh'}}>
            <div>{`${MAX_TEXT_SIZE} caractères max`}</div>
            <Button
              onClick={() => {
                this.save();
                }}
              variant="contained"
              disabled={!enabled}
            >
              Modifier
            </Button>
            </Grid>
          </Grid>
          </Box>
        </DialogContent>
      </Dialog>
  )
  };

  openEdition = () => {
    this.setState({ showEdition: true, newDescription: this.state.user.description})
  }

  render() {
    const {classes}=this.props;
    const {user} = this.state;
    const editable = isEditableUser(user)
    console.log(`Classes:${Object.keys(classes)}`);

    const title=frenchFormat(`À propos de ${user ? user.firstname : ''}`);

    return (
      <>
        { editable ?
          <Grid>
            <Button classes={{root : classes.buttonAddService}} onClick={this.openEdition} startIcon={<CreateIcon />} />
          </Grid>
          :
          null
        }
        <Topic titleTopic={title} titleSummary={user ? user.description : ''} />
        <Grid>
          {this.modalEditDialog(classes)}
        </Grid>
      </>
    )
  }


}

export default withStyles(styles, {withTheme: true})(Presentation)
