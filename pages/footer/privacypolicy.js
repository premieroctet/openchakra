import React, {Fragment} from 'react';
import Layout from '../../hoc/Layout/Layout';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Footer from '../../hoc/Layout/Footer/Footer';

const styles = theme => ({
    bigContainer: {
        flexGrow: 1,
    },

    trigger1: {
        [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            top: '7.5%',
            left: '-91%',
            width: '100%',
            height:'30px',
            backgroundColor:'#2FBCD3',
            zIndex: '1000',
            borderRadius:'5px',
            '&:focus': {
                display:'none',

                   }
        }
    },
    trigger:{
    [theme.breakpoints.down('sm')]: {


    width: '400px',
    marginLeft:'0px',
    height:'25px',
    backgroundColor:'#2FBCD3',
    zIndex: '999',

    display:'block',
    transition: 'display 0.7s',
    borderRadius:'5px',
    '&:focus': {
    display:'none',
    transition: 'display 0.7s',

       }
     },
},
    responsiveContainer: {
        [theme.breakpoints.down('sm')]: {
            width:'148%!important',
            marginTop: '6%',
        }
    },

    responsiveContainer2: {
        [theme.breakpoints.down('sm')]: {
            width:'148%!important',
            marginTop: '6%',
        }
    }
    ,toggle: {
        height: '950px',
        [theme.breakpoints.down('sm')]: {  marginLeft:'-200px',
        transition: 'margin-left 0.7s',
        marginTop: '20%',

        '&:hover': {
            marginLeft:'0px',
            transition: 'margin-left 0.7s',
            boxShadow: '11px 6px 23px -24px rgba(0,0,0,1)',
            width: '300px'
             }
      }
    },
    leborder: {
        backgroundColor: 'white',
        [theme.breakpoints.up('md')]: {
            borderRight: '2px solid rgb(206, 206, 206)',

        }
    }
});


class Privacypolicy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            click: true,
            click1: false,
            click2: false,
            click3: false,
            click4: false,
            click5: false,
            click6: false,
            click7: false,
            click8: false,
            click9: false,
        }
    }

    componentDidMount() {

    }

    handleClick = () =>{
        this.setState({click: true, click1: false, click2: false, click3: false, click4: false,
        click5: false, click6: false, click7: false, click8: false, click9: false})
    }

    handleClick1 = () =>{
        this.setState({click: false, click1: true, click2: false, click3: false, click4: false,
            click5: false, click6: false, click7: false, click8: false, click9: false})
    }

    handleClick2 = () =>{
        this.setState({click: false, click1: false, click2: true, click3: false, click4: false,
            click5: false, click6: false, click7: false, click8: false, click9: false})
    }

    handleClick3 = () =>{
        this.setState({click: false, click1: false, click2: false, click3: true, click4: false,
            click5: false, click6: false, click7: false, click8: false, click9: false})
    }

    handleClick4 = () =>{
        this.setState({click: false, click1: false, click2: false, click3: false, click4: true,
            click5: false, click6: false, click7: false, click8: false, click9: false})
    }

    handleClick5 = () =>{
        this.setState({click: false, click1: false, click2: false, click3: false, click4: false,
            click5: true, click6: false, click7: false, click8: false, click9: false})
    }

    handleClick6 = () =>{
        this.setState({click: false, click1: false, click2: false, click3: false, click4: false,
            click5: false, click6: true, click7: false, click8: false, click9: false})
    }

    handleClick7 = () =>{
        this.setState({click: false, click1: false, click2: false, click3: false, click4: false,
            click5: false, click6: false, click7: true, click8: false, click9: false})
    }

    handleClick8 = () =>{
        this.setState({click: false, click1: false, click2: false, click3: false, click4: false,
            click5: false, click6: false, click7: false, click8: true, click9: false})
    }

    handleClick9 = () =>{
        this.setState({click: false, click1: false, click2: false, click3: false, click4: false,
            click5: false, click6: false, click7: false, click8: false, click9: true})
    }


    render() {
        const {classes} = this.props;
        const {click} = this.state;
        const {click1} = this.state;
        const {click2} = this.state;
        const {click3} = this.state;
        const {click4} = this.state;
        const {click5} = this.state;
        const {click6} = this.state;
        const {click7} = this.state;
        const {click8} = this.state;
        const {click9} = this.state;

        return (
            <Fragment>
                <Layout>
                   <Grid container style={{marginTop: '4%'}}>
                       <Grid item xs={3} className={classes.leborder}>
                            <Grid container className={classes.toggle} style={{ padding:'2%'}}>
                                <div className={classes.trigger1}></div>
                                {click ?
                                <Grid onClick={this.handleClick} item xs={12} style={{padding: '20px 50px',cursor: 'pointer',zIndex: '1002', backgroundColor: 'white'}}>
                                    <a style={{ textDecoration: 'none',fontWeight:'bold', color: '#4FBDD7', fontSize: '1.1rem'}}>Préambule</a>
                                </Grid>
                                :
                                <Grid onClick={this.handleClick} item xs={12} style={{padding: '20px 50px',cursor: 'pointer',zIndex: '999', backgroundColor: 'white'}}>
                                    <a style={{ textDecoration: 'none',fontWeight:'bold', color: '#585858', fontSize: '1.1rem'}}>Préambule</a>
                                </Grid>
                                }

                                {click1 ?
                                <Grid onClick={this.handleClick1} item xs={12} style={{padding: '20px 50px',cursor: 'pointer',zIndex: '999', backgroundColor: 'white'}}>
                                    <a style={{textDecoration: 'none',fontWeight:'bold', color: '#4FBDD7', fontSize: '1.1rem'}}>Définitions</a>
                                </Grid>
                                :
                                <Grid onClick={this.handleClick1} item xs={12} style={{padding: '20px 50px',cursor: 'pointer',zIndex: '999', backgroundColor: 'white'}}>
                                    <a style={{textDecoration: 'none',fontWeight:'bold', color: '#585858', fontSize: '1.1rem'}}>Définitions</a>
                                </Grid>
                                }

                                {click2 ?
                                <Grid onClick={this.handleClick2} item xs={12} style={{padding: '20px 50px',cursor: 'pointer',zIndex: '999', backgroundColor: 'white'}}>
                                    <a style={{textDecoration: 'none',fontWeight:'bold', color: '#4FBDD7', fontSize: '1.1rem'}}>Les données & informations collectées</a>
                                </Grid>
                                :
                                <Grid onClick={this.handleClick2} item xs={12} style={{padding: '20px 50px',cursor: 'pointer',zIndex: '999', backgroundColor: 'white'}}>
                                    <a style={{textDecoration: 'none',fontWeight:'bold', color: '#585858', fontSize: '1.1rem'}}>Les données & informations collectées</a>
                                </Grid>
                                }

                                {click3 ?
                                <Grid onClick={this.handleClick3} item xs={12} style={{padding: '20px 50px',cursor: 'pointer',zIndex: '999', backgroundColor: 'white'}}>
                                    <a style={{textDecoration: 'none',fontWeight:'bold', color: '#4FBDD7', fontSize: '1.1rem'}}>Paiements & versements</a>
                                </Grid>
                                :
                                <Grid onClick={this.handleClick3} item xs={12} style={{padding: '20px 50px',cursor: 'pointer',zIndex: '999', backgroundColor: 'white'}}>
                                    <a style={{textDecoration: 'none',fontWeight:'bold', color: '#585858', fontSize: '1.1rem'}}>Paiements & versements</a>
                                </Grid>
                                }

                                {click4 ?
                                <Grid onClick={this.handleClick4} item xs={12} style={{padding: '20px 50px',cursor: 'pointer',zIndex: '999', backgroundColor: 'white'}}>
                                    <a style={{textDecoration: 'none',fontWeight:'bold', color: '#4FBDD7', fontSize: '1.1rem'}}>Utilisation des données</a>
                                </Grid>
                                :
                                <Grid onClick={this.handleClick4} item xs={12} style={{padding: '20px 50px',cursor: 'pointer',zIndex: '999', backgroundColor: 'white'}}>
                                    <a style={{textDecoration: 'none',fontWeight:'bold', color: '#585858', fontSize: '1.1rem'}}>Utilisation des données</a>
                                </Grid>
                                }

                                {click5 ?
                                <Grid onClick={this.handleClick5} item xs={12} style={{padding: '20px 50px',cursor: 'pointer',zIndex: '999', backgroundColor: 'white'}}>
                                    <a style={{textDecoration: 'none',fontWeight:'bold', color: '#4FBDD7', fontSize: '1.1rem'}}>Communication</a>
                                </Grid>
                                :
                                <Grid onClick={this.handleClick5} item xs={12} style={{padding: '20px 50px',cursor: 'pointer',zIndex: '999', backgroundColor: 'white'}}>
                                    <a style={{textDecoration: 'none',fontWeight:'bold', color: '#585858', fontSize: '1.1rem'}}>Communication</a>
                                </Grid>
                                }

                                {click6 ?
                                <Grid onClick={this.handleClick6} item xs={12} style={{padding: '20px 50px',cursor: 'pointer',zIndex: '999', backgroundColor: 'white'}}>
                                    <a style={{textDecoration: 'none',fontWeight:'bold', color: '#4FBDD7', fontSize: '1.1rem'}}>Droits relatifs aux données à caractère personnel</a>
                                </Grid>
                                :
                                <Grid onClick={this.handleClick6} item xs={12} style={{padding: '20px 50px',cursor: 'pointer',zIndex: '999', backgroundColor: 'white'}}>
                                    <a style={{textDecoration: 'none',fontWeight:'bold', color: '#585858', fontSize: '1.1rem'}}>Droits relatifs aux données à caractère personnel</a>
                                </Grid>
                                }

                                {click7 ?
                                <Grid onClick={this.handleClick7} item xs={12} style={{padding: '20px 50px',cursor: 'pointer',zIndex: '999', backgroundColor: 'white'}}>
                                    <a style={{textDecoration: 'none',fontWeight:'bold', color: '#4FBDD7', fontSize: '1.1rem'}}>Sécurité</a>
                                </Grid>
                                :
                                <Grid onClick={this.handleClick7} item xs={12} style={{padding: '20px 50px',cursor: 'pointer',zIndex: '999', backgroundColor: 'white'}}>
                                    <a style={{textDecoration: 'none',fontWeight:'bold', color: '#585858', fontSize: '1.1rem'}}>Sécurité</a>
                                </Grid>
                                }

                                {click8 ?
                                <Grid onClick={this.handleClick8} item xs={12} style={{padding: '20px 50px',cursor: 'pointer',zIndex: '999', backgroundColor: 'white'}}>
                                    <a style={{textDecoration: 'none',fontWeight:'bold', color: '#4FBDD7', fontSize: '1.1rem'}}>Modifications</a>
                                </Grid>
                                :
                                <Grid onClick={this.handleClick8} item xs={12} style={{padding: '20px 50px',cursor: 'pointer',zIndex: '999', backgroundColor: 'white'}}>
                                    <a style={{textDecoration: 'none',fontWeight:'bold', color: '#585858', fontSize: '1.1rem'}}>Modifications</a>
                                </Grid>
                                }

                                {click9 ?
                                <Grid onClick={this.handleClick9} item xs={12} style={{padding: '20px 50px',cursor: 'pointer',zIndex: '999', backgroundColor: 'white'}}>
                                    <a style={{textDecoration: 'none',fontWeight:'bold', color: '#4FBDD7', fontSize: '1.1rem'}}>Politique de gestion des cookies</a>
                                </Grid>
                                :
                                <Grid onClick={this.handleClick9} item xs={12} style={{padding: '20px 50px',cursor: 'pointer',zIndex: '999', backgroundColor: 'white'}}>
                                    <a style={{textDecoration: 'none',fontWeight:'bold', color: '#585858', fontSize: '1.1rem'}}>Politique de gestion des cookies</a>
                                </Grid>
                                }
                            </Grid>
                       </Grid>
                       <Grid item xs={9}>
                            <Grid container>
                                <Grid item xs={12} className={classes.responsiveContainer}>
                                    <p style={{fontWeight: 'bold', color: '#585858', fontSize: '1.35rem', paddingLeft: '7%'}}>Politique de confidentialité & gestion des cookies</p>
                                </Grid>
                                {click ?
                                    <Grid item xs={12} className={classes.responsiveContainer2}>
                                        <p style={{color: '#4FBDD7', fontSize: '1.3rem', paddingLeft: '7%', fontWeight: 'bold'}}>Préambule</p>
                                        <p style={{color: '#585858', fontSize: '1.1rem', paddingLeft: '7%', paddingRight: '30%', textAlign: 'justify' }}>La politique de confidentialité permet d’informer nos visiteurs et membres au regard de notre politique de respect de la vie privée. My-Alfred souhaite placer la confiance au coeur de ses relations, c’est pourquoi, nous formulons au travers de cette politique de confidentialité un engagement de sécuriser et protéger l’ensemble de vos données à caractère personnel.
                                            La politique de confidentialité décrit les processus de collecte, d’utilisation et de communication des informations qui peuvent être renseignées sur la plateforme My-Alfred.<br/>
                                            Les visiteurs et membres de la plateforme My-Alfred sont tenus de lire notre politique de confidentialité avant de l’utiliser. En effet, la navigation, l’utilisation, l’accès implique une acceptation de la présente politique de confidentialité, à l’exception de la section -- relative à la gestion des cookies, qui se fait par acceptation sur le site web.
                                        </p>
                                    </Grid>
                                : null}
                            </Grid>
                       </Grid>
                   </Grid>
                </Layout>
                {/* <Footer/>*/}


            </Fragment>
        );
    };
}



export default withStyles(styles)(Privacypolicy);
