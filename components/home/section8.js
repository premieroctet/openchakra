import React, {Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
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
        letterSpacing: 2,
        fontSize: 40,
        lineHeight: 1.5,
    },
    margin: {
        margin: '0.7rem',
    },
    textBox1: {
        fontFamily: 'Helvetica',
        color: 'rgba(84,89,95,0.95)',
        letterSpacing: -2,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '3%',
        marginTop: '3%',
    },
    textBox2: {
        color: 'rgba(84,89,95,0.95)',
        fontSize: 28,
        fontWeight: 570,
        marginTop: '5%',
        [theme.breakpoints.down('lg')]: {
            padding: '5%'
        },
        [theme.breakpoints.down('xl')]: {
            padding: '5%'
        },
    },
    separatorBlue:{
        width: '50px'
    },
    contentTextbox:{
        textAlign: 'justify',
        fontFamily: 'Helvetica',
        lineHeight: 2,
        fontSize: 18,
        [theme.breakpoints.down('xs')]: {
            padding: '3%'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '1%'
        },
        [theme.breakpoints.down('lg')]: {
            padding: '5%'
        },
        [theme.breakpoints.down('xl')]: {
            padding: '5%'
        },
    }
});

class section8 extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            alfred: []
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <Fragment>
                {/*Comment utiliser myAlfred*/}
                <Grid container className={classes.container}>
                    <Grid item xs={3}/>
                    <Grid item xs={6}>
                        <div>
                            <Typography variant="h4" className={classes.textBox1}>
                                Comment utiliser My-Alfred ?
                            </Typography>
                            <Grid container>
                                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}/>
                                <Grid item xs={2} sm={4} md={4}  lg={4} xl={4} style={{margin:'auto'}}>
                                    <img alt={"séparateur"} src={'../../../static/separateur-bleu.svg'} className={classes.separatorBlue}/>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}/>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={3}/>
                    <Grid item xs={2}/>
                    <Grid item md={4} xs={12} className={classes.textdesc}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={classes.textBox2}>
                                    Pourquoi devenir Alfred ?
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={classes.contentTextbox}>
                                    My-Alfred vous permet, de manière simple et sécurisée, de mettre vos services à disposition de tout un chacun.
                                    Un talent pour la décoration ? Une passion pour la cuisine ? Ou tout simplement du temps :
                                    proposez vos services et complétez vos revenus.
                                    Vous avez un contrôle total sur vos disponibilités, vos prix et le détail de vos prestations.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={4} xs={12} className={classes.textdesc}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={classes.textBox2}>
                                    Qui peut devenir Alfred ?
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={classes.contentTextbox}>
                                    Nous sommes tous des Alfred dès l'âge de 16 ans. Chacun d'entre nous doit pouvoir partager ses savoir faire,
                                    ses compétences, ses passions...
                                    Tantôt consommateur d'Alfred, tantôt Alfred, rejoignez la communauté Alfred en quelques clics !
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

export default withStyles(styles)(section8);
