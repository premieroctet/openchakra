import React from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
const {isEditableUser}=require('../../utils/functions');
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import styles from '../../static/css/components/Album/Album';
import cookie from 'react-cookies';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import CardAlbum from '../Card/CardAlbum/CardAlbum'
import withSlide from '../../hoc/Slide/SlideShow'
import withGrid from '../../hoc/Grid/GridCard'
const {SlideGridDataModel}=require('../../utils/models/SlideGridDataModel');
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Hidden from "@material-ui/core/Hidden";
import EditIcon from "@material-ui/icons/Edit";
import Thumb from "../Thumb/Thumb";


const ImageSlide=withSlide(withGrid(CardAlbum));

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

class Album extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      showAddAlbum : false,
      showAddPicture : false,
      newLabel: '',
      newPicture: null,
      selectedAlbum: null,
      pictures:[],
      alfred:{}
    };
    this.closeAddDialog = this.closeAddDialog.bind(this);
    this.loadAlbums=this.loadAlbums.bind(this);
    this.addAlbum = this.addAlbum.bind(this);
  }

  componentDidMount = () => {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get(`/myAlfred/api/shop/alfred/${this.props.user}`)
      .then(response => {
        let shop = response.data;
        this.setState({
          alfred: shop.alfred,
        })
      }).catch(err => console.error(err));
    this.loadAlbums()
  };

  loadAlbums = () => {
    console.log(`Chargement des albums`)
    axios.get(`/myAlfred/api/users/profile/albums/${this.props.user}`)
      .then( res => {
        this.setState({ albums: res.data})
      })
      .catch (err => console.error(err))
  }

  getAlbum(id) {
    return this.state.albums.find( a => a._id===id)
  }

  getAlbumTitle(id) {
    const album=this.getAlbum(id);
    return album ? album.label : null
  }

  getAlbumPictures() {
    const album=this.getAlbum(this.state.selectedAlbum);
    return album ? album.pictures : []
  }

  onChange = e => {
    e.preventDefault();
    const {name}=e.target;
    if (name==='newLabel') {
      this.setState({newLabel: e.target.value})
    }
    if (name==='myImage') {
      this.setState({newPicture: e.target.files[0]})
    }
  };



  modalAddDialog = (classes, addAlbum) =>{
    const {newLabel, newPicture}=this.state;
    const enabled = (!addAlbum ||newLabel) && newPicture;
    return(
      <Dialog
        open={this.state.showAddAlbum || this.state.showAddPicture}
        onClose={() => this.closeAddDialog()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="customized-dialog-title" onClose={this.closeAddDialog}>
          <Grid style={{display: 'flex', flexDirection: 'column', alignItems : 'center'}}>
            <h4>{addAlbum ? 'Ajouter un album' : 'Ajouter une image'}</h4>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid style={{display: 'flex', flexDirection: 'column'}}>
            {addAlbum ?
            <Grid style={{margin: '3vh'}}>
              <TextField
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
  };

  openAddPicture = () => {
    this.setState({showAddPicture: true})
  };

  closeAddDialog = () => {
    this.setState({newPicture:null, newLabel:null, showAddAlbum: false, showAddPicture: false})
  };

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

    const url=this.state.showAddPicture ? '/myAlfred/api/users/profile/album/picture/add' : '/myAlfred/api/users/profile/album/add';
    axios.post(url, formData, config)
      .then(response => {
        this.state.showAddPicture ? this.loadAlbums() : this.loadAlbums();
        // TODO: boite de dialogue ne se ferme pas à l'ajout d'une photo
        this.closeAddDialog()
      })
      .catch( err => console.error(err));

  };

  selectAlbum = (id) => {
    this.setState({selectedAlbum: id});
    const album=this.getAlbum(id);
    if (album) {
      this.setState({pictures: album.pictures})
    }
  };

  render() {
    const {albums, showAddAlbum, showAddPicture, selectedAlbum, alfred } = this.state;
    const {user, classes} = this.props;

    const pictures = this.getAlbumPictures();

    return (
     <Grid>
        <Grid style={{display :'flex',flexDirection: 'column'}}>
          <Grid className={classes.albumContainerHeader}>
            <Grid className={classes.albumTitleContainer}>
              <h2>{`Les albums de ${alfred.firstname}` + " " + `(${albums.length})`}</h2>
            </Grid>
            {isEditableUser(user) ?
              <Grid style={{display :'flex', alignItems: 'center', flexDirection: 'column'}}>
                <Button
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => this.openAddAlbum()}
                >
                  <Typography style={{fontWeight: 'bold', textTransform: 'initial'}}>Créez un album</Typography>
                </Button>
                <Hidden only={['lg', 'xl', 'md']}>
                  <Typography style={{color: 'rgba(39,37,37,35%)', textAlign: 'center'}}>Les photos, c’est plus sympas quand on les partage !</Typography>
                </Hidden>
              </Grid> : null
            }
          </Grid>
          <Grid>
            {albums.length===0 ? null :
              <ImageSlide
                model={new SlideGridDataModel(albums, 4, 1, true)}
                style={classes}
                onClick={ id => this.selectAlbum(id)}/>
            }
          </Grid>
            {isEditableUser(user) && selectedAlbum ?
              <Grid>
                <Grid style={{display :'flex', alignItems: 'center', flexDirection: 'row'}}>
                  <IconButton aria-label="add" onClick={() => this.openAddPicture()}>
                    <AddCircleIcon />
                  </IconButton>
                  <Typography>{`Ajouter une image à l'album ${this.getAlbumTitle(selectedAlbum)}`}</Typography>
                </Grid>
              <Grid>
                {pictures.length === 0 ? null :
                  <ImageSlide
                    model={new SlideGridDataModel(pictures, 4, 1, true)}
                    style={classes}
                  />
                }
              </Grid>
            </Grid>
            :
            null
          }
        </Grid>
      {showAddAlbum ? this.modalAddDialog(classes, true) : null }
      {showAddPicture ? this.modalAddDialog(classes, false) : null }
     </Grid>
    )
  }


}

export default withStyles(styles)(Album)
