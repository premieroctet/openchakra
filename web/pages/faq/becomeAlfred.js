import React, {Fragment} from "react";
import Grid from "@material-ui/core/Grid";
import HeaderFaq from "../../hoc/Layout/Faq/HeaderFaq";
import LayoutFaq from "../../hoc/Layout/Faq/LayoutFaq";
import {withStyles} from "@material-ui/core/styles";
import Link from 'next/link';

const styles = theme => ({
    titleRub: {
        fontWeight: 'bold',
    }

});

class BecomeAlfred extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <HeaderFaq/>
                <Grid style={{display: 'flex', flexDirection: 'column', paddingTop: '30px'}}>
                    <Grid style={{
                        display: 'flex', justifyContent: 'center',
                        width: '450px', margin: '0 auto',
                        paddingBottom: '15px'
                    }}>
                        <h1 style={{marginRight: '25px', color: '#F8CF61'}}>1
                        </h1>
                        <Grid style={{display: 'flex', flexDirection: 'column'}}>
                            <p className={classes.titleRub}>Inscrivez-vous & détaillez vos informations</p>
                            <p style={{marginTop: '5px'}}>Commencez par vous inscrire en précisant votre adresse et
                                votre numéro de téléphone</p>
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
                            <p className={classes.titleRub}>Commencez votre recherche</p>
                            <p style={{marginTop: '5px'}}>Indiquez le type de service que vous recherchez dans de
                                recherche
                                et parcourez les différentes catégorie de service</p>
                        </Grid>
                    </Grid>
                    <Grid style={{
                        display: 'flex', justifyContent: 'center', width: '450px',
                        paddingBottom: '15px', margin: '0 auto'
                    }}>
                        <h1 style={{marginRight: '25px', color: '#F36B7F'}}>3
                        </h1>
                        <Grid style={{display: 'flex', flexDirection: 'column'}}>
                            <p className={classes.titleRub}>Choisissez votre Alfred et réservez !</p>
                            <p style={{marginTop: '5px'}}>Choisissez le profil et la prestation qui vous intéresse puis
                                sélectionnez vos dates et
                                vos options.
                                Cliquez sur le bouton réservez et suivez la procédure de paiement</p>
                        </Grid>
                    </Grid>
                </Grid>
                <LayoutFaq/>
            </Fragment>
        );
    }

}

export default withStyles(styles)(BecomeAlfred)
