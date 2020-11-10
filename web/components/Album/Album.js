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
      alfred:{}
    };
    this.closeAddDialog = this.closeAddDialog.bind(this)
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
    axios.get(`/myAlfred/api/users/profile/albums/${this.props.user}`)
      .then( res => {
        this.setState({ albums: res.data})
      })
      .catch (err => console.error(err))
  };

  loadPictures = () => {
    axios.get(`/myAlfred/api/users/profile/albums/pictures/${this.state.selectedAlbum}`)
      .then( res => {
        this.setState({ pictures: res.data})
      })
      .catch (err => console.error(err))
  };

  getAlbumTitle(id) {
    const album=this.state.albums.find( a => a._id===id);
    return album ? album.label : null
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
            <Grid>
              <h4>{addAlbum ? 'Ajouter un album' : 'Ajouter une image'}</h4>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid style={{display: 'flex', flexDirection: 'column'}}>
            {addAlbum ?
            <Grid style={{margin: '3vh'}}>
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
            <Grid item xs={12} lg={12} style={{textAlign: 'center'}}>
              <Button color={'primary'}>Téléchargez une photo</Button>
              <input id="file" style={{display: 'none'}} name="myImage" type="file"
                     onChange={this.onChange}
                     className="form-control" accept={'image/*'}
              />
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
        this.state.showAddPicture ? this.loadPictures() : this.loadAlbums();
        // TODO: boite de dialogue ne se ferme pas à l'ajout d'une photo
        this.closeAddDialog()
      })
      .catch( err => console.error(err));

  };

  selectAlbum = (id) => {
    this.setState({selectedAlbum: id}, () => this.loadPictures())
  };

  render() {
    const {albums, showAddAlbum, showAddPicture, selectedAlbum, pictures, alfred } = this.state;
    const {user, classes} = this.props;

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
              <ImageSlide model={new SlideGridDataModel(albums, 4, 1, true)} style={classes} onClick={ id => this.selectAlbum(id)}/>
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
                {pictures.length===0 ? null :
                  <ImageSlide model={new SlideGridDataModel(pictures, 4, 1, true)} style={classes} onClick={ id => this.selectAlbum(id)}/>
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
