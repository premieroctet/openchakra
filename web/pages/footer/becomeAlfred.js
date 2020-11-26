import React, {Fragment} from "react";
import Grid from "@material-ui/core/Grid";
import Header from "../../hoc/Layout/About/Header";
import LayoutFaq from "../../hoc/Layout/Faq/LayoutFaq";
import Footer from "../../hoc/Layout/About/Footer";
import ResaService from '../../components/HomePage/ResaService/ResaService';
import {withStyles} from "@material-ui/core/styles";
import styles from '../../static/css/pages/homePage/index';


class BecomeAlfred extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <Header/>
                <Grid style={{display: 'flex', flexDirection: 'column', paddingTop: '30px'}}>
                    <Grid style={{
                        display: 'flex', justifyContent: 'center',
                        width: '450px', margin: '0 auto',
                        paddingBottom: '15px'
                    }}>
                        <h1 style={{marginRight: '25px', color: '#F8CF61'}}>1
                        </h1>
                        <Grid style={{display: 'flex', flexDirection: 'column'}}>
                            <p style={{fontWeight: 'bold'}}>Proposez vos services</p>
                            <p style={{marginTop: '5px'}}>Vous n'avez aucun frais à payer pour proposer vos services.
                                Indiquez simplement vos prestations en vous appuyant sur une liste de plus de 2000
                                services proposées sur My-Alfred. Un service n'apparaît pas ? Soumettez-le à nos équipes
                                !</p>
                        </Grid>
                    </Grid>
                    <Grid style={{
                        display: 'flex', justifyContent: 'center',
                        width: '450px', margin: '0 auto',
                        paddingBottom: '15px'
                    }}>
                        <h1 style={{marginRight: '25px', color: '#84A5E0'}}>2
                        </h1>
                        <Grid style={{display: 'flex', flexDirection: 'column'}}>
                            <p style={{fontWeight: 'bold'}}>Fixez vos conditions</p>
                            <p style={{marginTop: '5px'}}>Indiquez vos disponibilités (jours, heures...) ainsi que vos
                                tarifs et tous les critères pour définir votre prestation. Si vous avez besoin d'aide,
                                nous sommes là pour vous accompagner dans la création de votre boutique de compétences
                                ! </p>
                        </Grid>
                    </Grid>
                    <Grid style={{
                        display: 'flex', justifyContent: 'center', width: '450px',
                        paddingBottom: '15px', margin: '0 auto'
                    }}>
                        <h1 style={{marginRight: '25px', color: '#F36B7F'}}>3
                        </h1>
                        <Grid style={{display: 'flex', flexDirection: 'column'}}>
                            <p style={{fontWeight: 'bold'}}>Choisissez votre Alfred et réservez !</p>
                            <p style={{marginTop: '5px'}}>Choisissez le profil et la prestation qui vous intéresse puis
                                sélectionnez vos dates et
                                vos options.
                                Cliquez sur le bouton réservez et suivez la procédure de paiement</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container className={classes.howItWorksComponent}>
                    <Grid className={classes.generalWidthContainer}>
                        <ResaService style={classes}/>
                    </Grid>
                </Grid>
                <Grid style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Grid style={{
                        width: '35%',
                        margin: '30px 25px 20px 10px'
                    }}>
                        <h3 style={{textAlign: 'center'}}>Pourquoi devenir Alfred ?</h3>
                        <p>My-Alfred vous permet, de manière simple et sécurisée, de mettre vos services à disposition
                            de tout un chacun. Un talent pour la décoration ? Une passion pour la cuisine ? Ou tout
                            simplement du temps : proposez vos services et complétez vos revenus. Vous avez un contrôle
                            total sur vos disponibilités, vos prix et le détail de vos prestations.</p>
                    </Grid>

                    <Grid
                        style={{
                            width: '35%',
                            margin: '30px 10px 20px 25px'
                        }}>
                        <h3 style={{textAlign: 'center'}}>Qui peut devenir Alfred ?</h3>
                        <p>Nous sommes tous des Alfred dès l'âge de 16 ans. Chacun d'entre nous doit pouvoir partager
                            ses savoir faire, ses compétences, ses passions... Tantôt consommateur d'Alfred, tantôt
                            Alfred, rejoignez la communauté Alfred en quelques clics !</p>
                    </Grid>
                </Grid>
                <Grid>
                    <h1 style={{textAlign: 'center', marginTop: '80px'}}>Créez votre boutique à votre façon</h1>
                    <Grid style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Grid style={{
                            width: '35%',
                            margin: '30px 25px 20px 10px'
                        }}>
                            <h2 style={{textAlign: 'center'}}>Vous proposez vos services</h2>
                            <p>A travers la création de votre boutique, vous proposez vos services en décrivant
                                l'ensemble de vos prestations. Vous pouvez à tout moment revenir sur votre boutique,
                                ajouter ou supprimer des services. Les différentes étapes de création de votre boutique
                                sont extrêmement simples. À vous de jouer !</p>
                        </Grid>
                        <Grid style={{
                            width: '35%',
                            margin: '30px 10px 20px 25px'
                        }}>
                            <h2 style={{textAlign: 'center'}}>Vous affichez vos disponibilités</h2>
                            <p>Vous indiquez vos disponibilités (jours, heures...) ainsi que vos tarifs et tous les
                                critères pour définir votre prestations. Vous pouvez synchroniser votre calendrier
                                My-Alfred avec vos autres calendriers et éviter de manquer un rendez-vous. Tous vos
                                calendriers sont mis à jour automatiquement</p>
                        </Grid>
                    </Grid>
                    <Grid style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Grid style={{
                            width: '35%',
                            margin: '30px 25px 20px 10px'
                        }}>
                            <h2 style={{textAlign: 'center'}}>Vous fixez vos prix</h2>
                            <p>C'est à vous de fixer les prix de vos services : nos outils de tarifications sont là pour
                                vous aider à proposer le meilleur prix. Vous pouvez facilement ajouter des éléments
                                personnalisés, notamment des tarifs de week-end, de nuit, des packages de
                                services...</p>
                        </Grid>
                        <Grid style={{
                            width: '35%',
                            margin: '30px 10px 20px 25px'
                        }}>
                            <h2 style={{textAlign: 'center'}}>Vous déterminez vos règles</h2>
                            <p>Pour que les utilisateurs de My-Alfred puissent facilement comprendre vos services, vous
                                définissez vos règles avant qu'ils puissent réserver. S'ils enfreignent les règles après
                                avoir réservé, vous pourrez annuler leur réservation sans aucune pénalité.</p>
                        </Grid>
                    </Grid>
                </Grid>
                <LayoutFaq/>
                <Footer/>
            </Fragment>
        );
    }

}

export default withStyles(styles)(BecomeAlfred)
