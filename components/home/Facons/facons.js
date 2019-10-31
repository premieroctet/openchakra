import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    container: {
        margin: 'auto',
        textAlign:'center',
        // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
        [theme.breakpoints.up('md')]: { // medium: 960px or larger
            width: 920,
        },
        [theme.breakpoints.up('lg')]: { // large: 1280px or larger
            width: 1170,
        },
        [theme.breakpoints.up('xl')]: { // extra-large: 1920px or larger
            width: 1366,
        },
    },
    padding: {
        padding: '0.7rem',
        color: 'rgba(84,89,95,0.95)',
        fontWeight: 'bold',
        textAlign: 'left',
        letterSpacing: 2,
        fontSize: 40,
        lineHeight: 1.5,

    },
    margin: {
        margin: '0.7rem',
    },
    textBox1: {
        color: 'rgba(84,89,95,0.95)',
        letterSpacing: -2,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '3%',
        marginTop: '10%',
    },
    textBox2: {
        color: 'rgba(84,89,95,0.95)',
        marginBottom: '5%',
        fontSize: 28,
        fontWeight: 570,
        marginTop: '3%',
    },
    textdesc: {
        [theme.breakpoints.down('sm')]: {
            marginTop: '10%!important',
        },
        marginTop: '2%',
    },
    separatorBlue:{
        width: '50px'
    }

});

class facon extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            alfred: []
        }
    }

    componentDidMount() {

    }

    render() {
        const {classes} = this.props;

        return (
            <Fragment>

                {/*Créez votre boutique*/}
                <Grid container className={classes.container}>
                    <Grid item xs={3}/>
                    <Grid item xs={6}>
                        <div>
                            <Typography variant="h4" className={classes.textBox1}>
                                Créez votre boutique à votre façon
                            </Typography>
                            <Grid container>
                                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}/>
                                <Grid item xs={2} sm={4} md={4}  lg={4} xl={4} style={{margin:'auto'}}>
                                    <img alt={"séparateur"} src={'../../../static/separateur-bleu.svg'} className={classes.separatorBlue}/>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}/>
                                <Grid item xs={5}/>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={3}/>

                    <Grid item xs={2}/>
                    <Grid item md={4} xs={12} className={classes.textdesc}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={classes.textBox2}>
                                    Vous proposez vos services
                                </Typography>
                            </Grid>
                            <Grid item xs={12} style={{paddingRight: 15, paddingLeft: 16}}>
                                <Typography style={{paddingLeft:15,lineHeight: 2, fontSize: 18}}>
                                    A travers la création de votre boutique vous proposez vos services en
                                    décrivant l'ensemble de vos prestations. Vous pouvez à tout moment
                                    revenir sur votre boutique, ajouter ou supprimer des services. Les
                                    différentes étapes de création de votre boutique sont extrêmement
                                    simple. À vous de jouer !
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={4} xs={12} className={classes.textdesc} style={{marginRight: 15}}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={classes.textBox2}>
                                    Vous affichez vos disponibilités
                                </Typography>
                            </Grid>
                            <Grid item xs={12} style={{paddingRight: 15, paddingLeft: 16}}>
                                <Typography style={{paddingLeft:15,lineHeight: 2, fontSize: 18}}>
                                    Vous indiquez vos disponibilités (jours, heures...) ainsi que vos tarifs et
                                    tous les critères pour définir votre prestations. Vous pouvez synchroniser
                                    votre calendrier My-Alfred avec vos autres calendriers et éviter de manquer
                                    un rendez-vous. Tous vos calendriers sont mis à jour automatiquement
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}/>


                    <Grid item md={4} xs={12} className={classes.textdesc}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={classes.textBox2}>
                                    Vous fixez vos prix
                                </Typography>
                            </Grid>
                            <Grid item xs={12} style={{paddingRight: 15, paddingLeft: 16}}>
                                <Typography style={{paddingLeft:15,lineHeight: 2, fontSize: 18}}>
                                    C'est à vous de fixer les prix de vos services et nos outils de tarifications
                                    sont la  pour vous aider à proposer le meilleur prix pour être sélectionné.
                                    Vous pouvez facilement ajouter des éléments personnalisés, notamment : - des tarifs de week end - des tarifs de nuit -
                                    des packages de services...
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={4} xs={12} className={classes.textdesc} style={{marginRight: 15}}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={classes.textBox2}>
                                    Vous déterminez vos règles
                                </Typography>
                            </Grid>
                            <Grid item xs={12} style={{paddingRight: 15, paddingLeft: 16}}>
                                <Typography style={{paddingLeft:15,lineHeight: 2, fontSize: 18}}>
                                    Pour que les utilisateurs  de My-Alfred puissent facilement comprendre
                                    vos services, vous définissez vos règles avant qu'ils puissent réserver.
                                    Si ils enfreignent les règles après avoir réserver, vous pourrez annuler
                                    leur réservation sans aucune pénalités.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}/>

                </Grid>
            </Fragment>
        );
    }
}

facon.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(facon);
