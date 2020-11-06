import React, {Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles';
//import styles from './AlbumStyle';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';
import Badge from '@material-ui/core/Badge';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import ListAlfredConditions from "../ListAlfredConditions/ListAlfredConditions";
import RoomIcon from '@material-ui/icons/Room';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import PersonIcon from '@material-ui/icons/Person';
import UserAvatar from '../Avatar/UserAvatar'
import Box from '../Box/Box'
const {frenchFormat} = require('../../utils/text')
const {isEditableUser}=require('../../utils/functions')
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import Layout from '../../hoc/Layout/Layout';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import {formatCreditCardNumber, formatCVC, formatExpirationDate} from '../../components/utils';
import {Helmet} from 'react-helmet';
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import styles from '../../static/css/pages/paymentMethod/paymentMethod';
import cookie from 'react-cookies';
import LayoutAccount from "../../hoc/Layout/LayoutAccount";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import SecurityIcon from '@material-ui/icons/Security';
import CardAlbum from '../Card/CardAlbum/CardAlbum'
import withSlide from '../../hoc/Slide/SlideShow'
import withGrid from '../../hoc/Grid/GridCard'
const {SlideGridDataModel}=require('../../utils/models/SlideGridDataModel')


const ImageSlide=withSlide(withGrid(CardAlbum))

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography {...other} className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

class Thumb extends React.Component {
  state = {
    loading: false,
    thumb: undefined,
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return;
    }

    this.setState({loading: true}, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({loading: false, thumb: reader.result});
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  render() {
    const {file} = this.props;
    const {loading, thumb} = this.state;

    if (!file) {
      return null;
    }

    if (loading) {
      return <p>loading...</p>;
    }

    return (<img src={thumb}
                 alt={file.name}
                 width={150}
            />);
  }
}

class Album extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      showAddAlbum : false,
      showAddPicture : false,
      newLabel: null,
      newPicture: null,
      selectedAlbum: null,
      pictures:[],
    }
    this.closeAddDialog = this.closeAddDialog.bind(this)
  }

  componentDidMount = () => {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    this.loadAlbums()
  }

  loadAlbums = () => {
    axios.get(`/myAlfred/api/users/profile/albums/${this.props.user}`)
      .then( res => {
        this.setState({ albums: res.data})
      })
      .catch (err => console.error(err))
  }

  loadPictures = () => {
    axios.get(`/myAlfred/api/users/profile/albums/pictures/${this.state.selectedAlbum}`)
      .then( res => {
        this.setState({ pictures: res.data})
      })
      .catch (err => console.error(err))
  }

  getAlbumTitle(id) {
    const album=this.state.albums.find( a => a._id==id)
    return album ? album.label : null
  }

  onChange = e => {
    e.preventDefault()
    const {name}=e.target
    if (name=='newLabel') {
      this.setState({newLabel: e.target.value})
    }
    if (name=='myImage') {
      this.setState({newPicture: e.target.files[0]})
    }
  };


  modalAddDialog = (classes, addAlbum) =>{
    const {newLabel, newPicture}=this.state
    const enabled = (!addAlbum ||newLabel) && newPicture
    return(
      <Dialog
        open={this.state.showAddAlbum || this.state.showAddPicture}
        onClose={() => this.closeAddDialog()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="customized-dialog-title" onClose={this.closeAddDialog}>
          <Grid style={{display: 'flex', flexDirection: 'column', alignItems : 'center'}}>
            <Grid>
              <h4>{addAlbum ? 'Ajouter un album' : 'Ajouter une image'}</h4>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid style={{display: 'flex', flexDirection: 'column'}}>
            { addAlbum ?
            <Grid style={{margin: '15px'}}>
              <TextField
                customInput={TextField}
                variant={'outlined'}
                label="Nom de l'album"
                name={'newLabel'}
                onChange={this.onChange}
                value={this.state.newLabel}
                placeholder="Nom du nouvel album"
                style={{width:'100%'}}
              />
            </Grid>
            :
            null
          }
          </Grid>
            <Grid container>
              <Thumb file={this.state.newPicture}/>
              <Grid item xs={12} lg={12}>
                <label style={{display: 'inline-block', marginTop: 15, color: '#2FBCD3'}}
                       className="forminputs">
                  <p style={{cursor: 'pointer', fontSize: '0.8rem'}}>Téléchargez une photo</p>
                  <input id="file" style={{display: 'none'}} name="myImage" type="file"
                         onChange={this.onChange}
                         className="form-control" accept={'image/*'}
                  />
                </label>
              </Grid>
            </Grid>
          <Grid style={{textAlign: 'center', marginLeft: 15, marginRight: 15, marginTop: '3vh', marginBottom: '3vh'}}>
            <Button
              onClick={() => {
                this.addAlbum();
                }}
              variant="contained"
              classes={{root: classes.buttonSave}}
              disabled={!enabled}
            >
              {addAlbum ? "Ajouter l'album" : "Ajouter l'image"}
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  };

  openAddAlbum = () => {
    this.setState({showAddAlbum: true})
  }

  openAddPicture = () => {
    this.setState({showAddPicture: true})
  }

  closeAddDialog = () => {
    this.setState({newPicture:null, newLabel:null, showAddAlbum: false, showAddPicture: false})
  }

  addAlbum = () => {
    const formData = new FormData();
    formData.append('myImage', this.state.newPicture);
    if (this.state.showAddAlbum){
      formData.append('label', this.state.newLabel);
    }
    else {
      formData.append('album', this.state.selectedAlbum);
    }
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    const url=this.state.showAddPicture ? '/myAlfred/api/users/profile/album/picture/add' : '/myAlfred/api/users/profile/album/add'
    axios.post(url, formData, config)
      .then(response => {
        this.state.showAddPicture ? this.loadPictures() : this.loadAlbums()
        // TODO: boite de dialogue ne se ferme pas à l'ajout d'une photo
        this.closeAddDialog()
      })
      .catch( err => console.error(err));

  }

  selectAlbum = (id) => {
    this.setState({selectedAlbum: id}, () => this.loadPictures())
  }

  render() {
    const {albums, showAddAlbum, showAddPicture, selectedAlbum, pictures } = this.state
    const {user, classes} = this.props

    return (
      <Box>
          <Grid style={{display :'flex', alignItems: 'center', flexDirection: 'column'}}>
            {isEditableUser(user) ?
              <Grid style={{display :'flex', alignItems: 'center', flexDirection: 'row'}}>
                <IconButton aria-label="add" onClick={() => this.openAddAlbum()}>
                  <AddCircleIcon />
                </IconButton>
                <Typography>Ajouter un album</Typography>
              </Grid>
              :
              null
            }
            <Grid>
              {albums.length==0 ? null :
                <ImageSlide model={new SlideGridDataModel(albums, 4, 1, true)} style={classes} onClick={ id => this.selectAlbum(id)}/>
              }
            </Grid>
            {isEditableUser(user) && selectedAlbum ?
              <>
              <Grid style={{display :'flex', alignItems: 'center', flexDirection: 'row'}}>
                <IconButton aria-label="add" onClick={() => this.openAddPicture()}>
                  <AddCircleIcon />
                </IconButton>
                <Typography>{`Ajouter une image à l'album ${this.getAlbumTitle(selectedAlbum)}`}</Typography>
              </Grid>
              <Grid>
                {pictures.length==0 ? null :
                  <ImageSlide model={new SlideGridDataModel(pictures, 4, 1, true)} style={classes} onClick={ id => this.selectAlbum(id)}/>
                }
              </Grid>
              </>
              :
              null
            }
        </Grid>
        {showAddAlbum ? this.modalAddDialog(classes, true) : null }
        {showAddPicture ? this.modalAddDialog(classes, false) : null }
      </Box>
    )
  }


}

export default withStyles(styles, {withTheme: true})(Album)
