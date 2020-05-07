import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import Footer from '../../hoc/Layout/Footer/Footer';
import { withStyles } from '@material-ui/core/styles';
import Switch from "@material-ui/core/Switch";
import { toast } from 'react-toastify';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Helmet} from 'react-helmet';
import styles from './parameters/parametersStyle'
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


class parameters extends React.Component {
    constructor(props) {
        super(props);
      this.child = React.createRef();
        this.state = {
            user: {},
            index_google: false,
            alfred: false,
            open : false,
            open2: false,
        };
        this.handleClose = this.handleClose.bind(this);
      this.callDrawer = this.callDrawer.bind(this)

    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get('/myAlfred/api/users/current')
            .then(res => {
                this.setState({user: res.data, index_google: res.data.index_google,alfred:res.data.is_alfred});

            })
            .catch(err => {
                    if(err.response.status === 401 || err.response.status === 403) {
                        localStorage.removeItem('token');
                        Router.push({pathname: '/login'})
                    }
                }
            );
    }

     handleClickOpen() {
        this.setState({open:true});
    }

     handleClose() {
        this.setState({open:false});
    }

    handleClickOpen2() {
        this.setState({open2:true});
    }

    handleClose2() {
        this.setState({open2:false});
    }

     handleChange = name => event => {
         this.setState({[name]: event.target.checked });
         const data = {index_google:!this.state.index_google};
         axios.put('/myAlfred/api/users/account/indexGoogle', data)
            .then(() => {
                toast.info('Compte mis à jour');
            })
            .catch();
    };

    deleteShop = () => {
        axios.delete('/myAlfred/api/serviceUser/current/allServices')
            .then(() => {
                axios.delete('/myAlfred/api/shop/current/delete')
                    .then(() => {
                        axios.put('/myAlfred/api/users/users/deleteAlfred')
                            .then(() => {
                                this.setState({open:false});
                                toast.error('Boutique supprimée');
                                localStorage.removeItem('token');
                                Router.push('/login');

                            })
                            .catch();

                    })
                    .catch();


            })
            .catch();
        axios.delete('/myAlfred/api/availability/currentAlfred')
            .then()
            .catch();
    };

    deleteAccount = () => {
        if(this.state.alfred === true) {
            axios.delete('/myAlfred/api/serviceUser/current/allServices')
                .then(() => {
                    axios.delete('/myAlfred/api/shop/current/delete')
                        .then(() => {
                            axios.put('/myAlfred/api/users/current/delete')
                                .then(() => {
                                    this.setState({open2:false});
                                    toast.error('Compte désactivé');
                                    localStorage.removeItem('token');
                                    Router.push('/');
                                })
                                .catch();
                        })
                        .catch();


                })
                .catch();
            axios.delete('/myAlfred/api/availability/currentAlfred')
                .then()
                .catch();
        } else {
            axios.put('/myAlfred/api/users/current/delete')
                .then(() => {
                    this.setState({open2:false});
                    toast.error('Compte désactivé');
                    localStorage.removeItem('token');
                    Router.push('/');
                })
                .catch();
        }
    };

  callDrawer(){
    this.child.current.handleDrawerToggle();
  }

    render() {
        const {classes} = this.props;
        const {user} = this.state;

        return (
            <Fragment>
              <Helmet>
                  <title>compte - Paramètres - My Alfred </title>
                  <meta property="description" content="Configurez votre compte My Alfred, votre boutique et l'ensemble des paramètres de votre compte." />
                </Helmet>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                      <Grid style={{zIndex: 0}}>
                        <ResponsiveDrawer ref={this.child} isActiveIndex={5} itemsDrawers={'account'}/>
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
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                      </Grid>
                        <Grid item xs={9}  className={classes.containerLeft}>
                            <Grid container>
                                <h1 style={{color: 'dimgray',fontWeight: '100'}}>Paramètres</h1>
                            </Grid>
                            <Grid container>
                                <Grid item xs={8}>
                                    <p>J'accepte que mon profil et ma boutique soient indexés par les moteurs de recherche</p>
                                </Grid>
                                <Grid item xs={4}>
                                    <Switch
                                        checked={this.state.index_google}
                                        onChange={this.handleChange('index_google')}
                                        value={'index_google'}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </Grid>

                            </Grid>
                            <Grid item xs={8} style={{marginTop:30}}>
                                <hr/>
                            </Grid>

                            {user.is_alfred ?
                                <React.Fragment><Grid container style={{alignItems: "center"}}>
                                    <Grid item xs={12} md={8}>
                                        <p>Je souhaite supprimer ma boutique de services.</p>
                                        <p>
                                            Attention, cette action est irréversible. Si vous souhaitez garder votre boutique sans que les
                                            utilisateurs puissent réserver vos services, vous pouvez supprimer vos disponibilités sur votre calendrier.

                                        </p>
                                    </Grid>
                                    <Grid item xs={12} md={4} style={{paddingLeft: 40}}>
                                        <Button size={'large'} type={'button'} onClick={()=>this.handleClickOpen()} variant="contained" color="secondary"
                                                style={{color: 'white'}}>
                                            Supprimer
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item xs={8} style={{marginTop:30}}>
                                <hr/>
                                </Grid></React.Fragment>


                                : null}

                            <Grid container style={{alignItems: "center"}}>
                                <Grid item xs={12} md={8}>
                                    <p>Je souhaite désactiver mon compte.</p>
                                    <p>
                                        Attention, cette action est irréversible. Si vous souhaitez ne plus être référencé par les
                                        moteurs de recherche, vous pouvez désactiver l’indexation par les moteurs de recherche.



                                    </p>
                                </Grid>
                                <Grid item xs={12} md={4} style={{paddingLeft: 40}}>
                                    <Button size={'large'} type={'button'} onClick={()=>this.handleClickOpen2()} variant="contained" color="secondary"
                                            style={{color: 'white'}}>
                                        Désactiver
                                    </Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </Layout>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Supprimer votre boutique ?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Attention, cette action est irréversible. Si vous souhaitez garder votre boutique sans que les
                            utilisateurs puissent réserver vos services, vous pouvez supprimer vos disponibilités sur votre calendrier.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>this.handleClose()} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={()=>this.deleteShop()} color="secondary" autoFocus>
                            Supprimer
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.open2}
                    onClose={()=>this.handleClose2()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Désactiver votre compte ?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Attention, cette action est irréversible. Si vous souhaitez ne plus être référencé par les
                            moteurs de recherche, vous pouvez désactiver l’indexation par les moteurs de recherche.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>this.handleClose2()} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={()=>this.deleteAccount()} color="secondary" autoFocus>
                            Désactiver
                        </Button>
                    </DialogActions>
                </Dialog>
              <Grid style={{position: 'absolute', bottom: 0, width: '100%'}}>
                {/* <Footer/>*/}

              </Grid>
            </Fragment>


        );
    };
}



export default withStyles(styles)(parameters);
