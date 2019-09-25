import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
const { config } = require('../../config/config');
const url = config.apiUrl;


const styles = theme => ({
    container: {
        paddingRight: 15,
        paddingLeft: 15,
        marginRight: 'auto',
        marginLeft: 'auto',

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
    container1: {
        paddingRight: 15,
        paddingLeft: 15,
        marginRight: 'auto',
        marginLeft: 'auto',

        // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
        [theme.breakpoints.up('xs')]: {
            width: 350,
        },
        [theme.breakpoints.up('sm')]: {
            width: 500,
        },
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
    media: {
        height: 400,
        borderRadius: '20px',
        paddingTop: '30.25%', // 16:9
    },
    mediaLittleCard: {
        height: 0,
        borderRadius: '20px',
        paddingTop: '32.25%', // 16:9
    },
    textBox: {
        paddingRight: 15,
        paddingLeft: 15,
        marginBottom: 30,
        marginTop: 35,

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
    card1: {
        marginTop: '10%',
        display: 'flex',
        height: 'auto',
        boxShadow: '1px 3px 1px transparent',

        [theme.breakpoints.up('xs')]: { // medium: 960px or larger
            display: 'none',
        },
        [theme.breakpoints.up('sm')]: { // medium: 960px or larger
            display: 'none',
        },
        [theme.breakpoints.up('md')]: { // medium: 960px or larger
            display: 'flex',
        },
        [theme.breakpoints.up('lg')]: { // medium: 960px or larger
            display: 'flex',
        },
        [theme.breakpoints.up('xl')]: { // medium: 960px or larger
            display: 'flex',
        },
    },
    card22: {
        marginTop: '10%',
        display: 'flex',
        height: 'auto',
        boxShadow: '1px 3px 1px transparent',

        [theme.breakpoints.up('xs')]: { // medium: 960px or larger
            display: 'flex',
            width: '100%',
        },
        [theme.breakpoints.up('sm')]: { // medium: 960px or larger
            display: 'flex',
            width: '100%'
        },
        [theme.breakpoints.up('md')]: { // medium: 960px or larger
            display: 'none',
        },
        [theme.breakpoints.up('lg')]: { // medium: 960px or larger
            display: 'none',
        },
        [theme.breakpoints.up('xl')]: { // medium: 960px or larger
            display: 'none',
        },
    },
    details: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: '50%',
        height: 'auto',
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
    padding2: {
        padding: '0.7rem',
        fontFamily: 'Helvetica',
        textAlign: 'left',
        fontSize: 15,
    },
    margin: {
        margin: '0.7rem',
    },
    margin2: {
        margin: '0.7rem',
    },

    card: {
        display: 'flex',
        margin: '5px!important',
        minWidth: '300px!important',
        marginRight: '10px!important',
        marginLeft: '10px!important',
        boxShadow: '1px 3px 1px transparent'

    },
    personName: {
        alignSelf: 'center',
        fontWeight: 'bold',
        padding: '.5rem',
        textAlign: 'right!important',
        color: '#33558B',
    },
    personName2: {
        alignSelf: 'center',
        padding: '.5rem',
        textAlign: 'right!important',
        fontSize: '0.8rem',
        color: '#33558B',
    },
    card11: {
        display: 'flex',
        margin: '5px!important',
        minWidth: '300px!important',
        marginRight: '10px!important',
        marginLeft: '10px!important',
        marginTop: '30px!important',
        marginBottom: '40px!important',
        boxShadow: '1px 3px 1px transparent',
    },
    imgavat: {
        marginTop: '60%',
    },
    petitpaddingpers: {
        marginLeft: '-20%',
    },
    textBox1: {
        color: 'rgba(84,89,95,0.95)',
        letterSpacing: -2,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingRight: 15,
        paddingLeft: 15,
        marginBottom: 15,
        marginTop: 80,
    },
    textBox2: {
        color: 'rgba(84,89,95,0.95)',
        paddingRight: 15,
        paddingLeft: 15,
        marginBottom: 15,
        fontSize: 28,
        fontWeight: 570,
        marginTop: 10,
    },
    grosHR: {
        height: '10px',
        backgroundColor: '#2FBCD3',
    },
    textdesc: {
        [theme.breakpoints.down('sm')]: {
            marginTop: '10%!important',
        },
        marginTop: '2%',
    },
});

class section8 extends React.Component{

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
                {/*Comment utiliser myAlfred*/}
                <Grid container>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        <div>
                            <Typography variant="h4" className={classes.textBox1}>
                                Comment utiliser My-Alfred ?
                            </Typography>
                            <Grid container>
                                <Grid item xs={5}></Grid>
                                <Grid item xs={2}><hr className={classes.grosHR}/></Grid>
                                <Grid item xs={5}></Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={3}></Grid>

                    <Grid item xs={2}></Grid>
                    <Grid item md={4} xs={12} className={classes.textdesc}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={classes.textBox2}>
                                    Pourquoi devenir Alfred ?
                                </Typography>
                            </Grid>
                            <Grid item xs={12} style={{paddingRight: 15, paddingLeft: 16}}>
                                <Typography style={{paddingLeft:15,lineHeight: 2, fontSize: 18}}>
                                    My-Alfred vous permet de manière simple et sécurisée, de mettre vos services à disposition de tout à chacun.
                                    Un talent pour la décoration ? Une passion pour la cuisine ? Ou tout simplement du temps :
                                    proposez vos services et complétez vos revenus.
                                    Vous avez un contrôle total sur vos disponibilités, vos prix et sur le détail de vos prestations.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={4} xs={12} className={classes.textdesc} style={{marginRight: 15}}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={classes.textBox2}>
                                    Qui peut devenir Alfred ?
                                </Typography>
                            </Grid>
                            <Grid item xs={12} style={{paddingRight: 15, paddingLeft: 16}}>
                                <Typography style={{paddingLeft:15,lineHeight: 2, fontSize: 18}}>
                                    Nous sommes tous des Alfred dès l'âge de 16 ans. Chacun d'entre nous doit pouvoir partager ses savoir faire,
                                    ses compétences, ses passions...
                                    Tantôt consommateur d'Alfred, tantôt Alfred, rejoignez la communauté Alfred en quelques clics !
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}></Grid>

                </Grid>
            </Fragment>
        );
    }
}



export default withStyles(styles)(section8);
