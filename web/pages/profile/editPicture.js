import React, {Fragment} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Layout from '../../hoc/Layout/Layout';
import axios from 'axios';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import {toast} from 'react-toastify';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Helmet} from 'react-helmet';
import {generate_avatar} from '../../utils/generateAvatar';
import styles from './editPicture/editPictureStyle';
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import cookie from 'react-cookies';

moment.locale('fr');


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
                 height={150}
                 style={{borderRadius: '50%', objectFit: 'cover'}}/>);
  }
}

class editPicture extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      user: {},
      haveapicture: '',
      open: false,

    };
    this.callDrawer = this.callDrawer.bind(this);

  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data;
        this.setState({user: user});

        if (typeof user.picture != 'undefined' || user.picture != null) {
          this.setState({picture: true});
        } else {
          this.setState({picture: false});
        }
      })
      .catch(err => {
          if (err.response.status === 401 || err.response.status === 403) {
            cookie.remove('token', {path: '/'});
            Router.push({pathname: '/login'});
          }
        },
      );
  }

  handleClickOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  onChange = e => {
    this.setState({haveapicture: e.target.files[0]});
  };

  onSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('myImage', this.state.haveapicture);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post('/myAlfred/api/users/profile/picture', formData, config)
      .then((response) => {
        toast.info('Photo modifiée');
        Router.push({pathname: '/profile/editProfile'});
      }).catch();
  };

  deletePicture = () => {
    axios.delete('/myAlfred/api/users/profile/picture/delete')
      .then(() => {
        toast.error('Photo supprimée');
        this.setState({open: false});
        this.componentDidMount();
      })
      .catch();
  };

  callDrawer() {
    this.child.current.handleDrawerToggle();
  }

  render() {
    const {classes} = this.props;
    const user = this.state.user;
    return (
      <Fragment>
        <Helmet>
          <title>Profil - Photos - My Alfred </title>
          <meta property="description"
                content="Votre photo de profil sur My Alfred, plateforme web et mobile de services entre particuliers et auto entrepreneurs. Trouvez des services près de chez vous ! Paiement sécurisé - Inscription 100% gratuite."/>
        </Helmet>
        <Layout>
          <Grid container className={classes.bigContainer}>
            <Grid style={{zIndex: 0}}>
              <ResponsiveDrawer ref={this.child} isActiveIndex={2} itemsDrawers={'profil'}/>
            </Grid>
            <Grid>
              <Grid>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={this.callDrawer}
                  className={classes.menuButton}
                >
                  <MenuIcon/>
                </IconButton>
              </Grid>
            </Grid>

            <Grid item xs={9} className={classes.containerLeft}>
              <Grid container>
                <h1 style={{color: 'dimgray', fontWeight: '100'}}>Photo</h1>
              </Grid>
              <Grid container style={{marginTop: 20}}>
                <Grid item>
                  <DeleteIcon onClick={() => this.handleClickOpen()} className={classes.deleteicon} style={{
                    marginLeft: '90%',
                    padding: '2%',
                    marginBottom: '-10%',
                    color: '#616060',
                    cursor: 'pointer',
                  }}/>
                  <Thumb file={this.state.haveapicture}/>
                  {
                    this.state.haveapicture ?
                      null :
                      user.picture ?
                        <img width={150} height={150} style={{borderRadius: '50%', objectFit: 'cover'}}
                             src={`../${user.picture}`} alt={'picture'}/> :
                        <Avatar alt="photo de profil" className={classes.avatarLetter}>{generate_avatar(user)}</Avatar>
                  }
                </Grid>
                <Grid item xs={12} md={6} style={{marginLeft: '5%'}}>
                  <form onSubmit={this.onSubmit}>
                    <Grid container>
                      <Grid item xs={12} lg={12}>
                        <p style={{display: 'inline-block', marginTop: 15, color: 'black'}}>La photo de votre profil
                          sera
                          visible des utilisateurs du site et leur permettra de déjà vous connaitre !
                          Téléchargez une photo de vous claire et lumineuse, de bonne qualité. Pour un rendu optimal,
                          la photo doit être cadrée, sans lunette de soleil, en regardant l’objectif,
                          avec seulement vous sur la photo. </p><br/>
                        <label style={{display: 'inline-block', marginTop: 15, color: '#2FBCD3'}}
                               className="forminputs">
                          <p style={{cursor: 'pointer', fontSize: '0.8rem'}}>Téléchargez une photo depuis votre
                            ordinateur</p>
                          <input id="file" style={{display: 'none'}} name="myImage" type="file"
                                 onChange={this.onChange}
                                 className="form-control" accept={'image/*'}
                          />
                        </label>
                      </Grid>
                    </Grid>
                    <Grid item style={{display: 'flex', justifyContent: 'left', marginTop: 30}}>
                      <Button type="submit" variant="contained" color="secondary" style={{color: 'white'}}>
                        Enregistrer
                      </Button>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Layout>
        {/* <Footer/>*/}

        <Dialog
          open={this.state.open}
          onClose={() => this.handleClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Supprimer votre photo ?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Voulez-vous vraiment supprimer votre photo de profil ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary">
              Annuler
            </Button>
            <Button onClick={() => this.deletePicture()} color="secondary" autoFocus>
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  };
}

export default withStyles(styles)(editPicture);
