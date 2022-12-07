import { snackBarError, snackBarSuccess } from '../../utils/notifications';
import Topic from '../../hoc/Topic/Topic'
import CustomButton from '../CustomButton/CustomButton'
import {withTranslation} from 'react-i18next'
const {setAxiosAuthentication}=require('../../utils/authentication')
import React from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
const {isEditableUser}=require('../../utils/context')
import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import styles from '../../static/css/components/Album/Album'

import MuiDialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from '@material-ui/icons/Close'
import CardAlbum from '../Card/CardAlbum/CardAlbum'
import withSlide from '../../hoc/Slide/SlideShow'
import withGrid from '../../hoc/Grid/GridCard'
const {SlideGridDataModel}=require('../../utils/models/SlideGridDataModel')
import Thumb from '../Thumb/Thumb'


const ImageSlide=withSlide(withGrid(CardAlbum))

const DialogTitle = withStyles(styles)(props => {
  const {children, classes, onClose, ...other} = props
  return (
    <MuiDialogTitle disableTypography {...other} className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

class Album extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showAddPicture: false,
      newPicture: null,
      pictures: [],
    }
    this.closeAddDialog = this.closeAddDialog.bind(this)
  }

  componentDidMount = () => {
    if (!this.props.user) {
      return
    }
    setAxiosAuthentication()
    axios.get(`/myAlfred/api/users/profile/album/${this.props.user}`)
      .then(res => {
        this.setState({pictures: res.data})
      })
      .catch(err => console.error(err))
  }

  onChange = e => {
    e.preventDefault()
    const {name}=e.target
    if (name==='myImage') {
      this.setState({newPicture: e.target.files[0]})
    }
  };


  modalAddDialog = classes => {
    const {newPicture}=this.state
    const enabled = newPicture
    return(
      <Dialog
        open={this.state.showAddPicture}
        onClose={() => this.closeAddDialog()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="customized-dialog-title" onClose={this.closeAddDialog}>
          <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h4>{'Ajouter une illustration'}</h4>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
              <Thumb file={this.state.newPicture}/>
            </Grid>
            <Grid item xs={12} lg={12} style={{textAlign: 'center'}}>
              <label
                style={{display: 'inline-block', marginTop: 15, color: '#2FBCD3'}}
                className="forminputs"
              >
                <Typography style={{cursor: 'pointer', fontSize: '0.8rem'}}>Téléchargez une photo</Typography>
                <input
                  id="file"
                  style={{display: 'none'}}
                  name="myImage"
                  type="file"
                  onChange={this.onChange}
                  className="form-control"
                  accept={'image/*'}
                />
              </label>
            </Grid>
          </Grid>
          <Grid style={{textAlign: 'center', marginLeft: 15, marginRight: 15, marginTop: '3vh', marginBottom: '3vh'}}>
            <CustomButton
              onClick={() => {
                this.addAlbum()
              }}
              variant="contained"
              classes={{root: classes.buttonSave}}
              disabled={!enabled}
            >
              {"Ajouter l'illustration"}
            </CustomButton>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  };

  openAddPicture = () => {
    this.setState({showAddPicture: true})
  };

  closeAddDialog = () => {
    this.setState({newPicture: null, showAddPicture: false})
  };

  addAlbum = () => {
    const formData = new FormData()
    formData.append('myImage', this.state.newPicture)
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    setAxiosAuthentication()
    axios.post('/myAlfred/api/users/profile/album/picture/add', formData, config)
      .then(() => {
        this.componentDidMount()
        this.closeAddDialog()
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response.data)
      })
  };

  onDelete = item => {
    setAxiosAuthentication()
    axios.delete(`/myAlfred/api/users/profile/album/picture/${item.id}`)
      .then(() => {
        this.componentDidMount()
        this.closeAddDialog()
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response.data)
      })
  }

  render() {
    const {showAddPicture, pictures} = this.state
    const {user, classes} = this.props

    return (
      <Topic titleTopic={'Album'} underline={this.props.underline}>
        <Grid style={{display: 'flex', flexDirection: 'column'}}>
          <Grid>
            {isEditableUser(user) && !this.props.readOnly &&
              <Grid style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                <IconButton aria-label="add" onClick={() => this.openAddPicture()}>
                  <AddCircleIcon />
                </IconButton>
                <Typography>{'Ajouter une illustration'}</Typography>
              </Grid>
            }
            <Grid>
              {pictures.length>0 &&
                <ImageSlide
                  model={new SlideGridDataModel(pictures.map((p, idx) => { return {id: idx, path: p} }), 4, 1, false)}
                  style={classes}
                  hidePageCount={true}
                  onDelete={!this.props.readOnly && this.onDelete}
                />
              }
            </Grid>
          </Grid>
        </Grid>
        {showAddPicture ? this.modalAddDialog(classes, false) : null }
      </Topic>
    )
  }


}

export default withTranslation(null, {withRef: true})(withStyles(styles)(Album))
