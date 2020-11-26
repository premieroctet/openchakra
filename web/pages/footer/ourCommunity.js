import React, {Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import layoutStyle from "../../static/css/pages/layout/layoutStyle"
import Header from "../../hoc/Layout/About/Header";
import Footer from "../../hoc/Layout/About/Footer";
import {withStyles} from "@material-ui/core/styles";
import styles from '../../static/css/pages/homePage/index';

class OurCommunity extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {style} = this.props;
        return (
            <Fragment>
                <Header/>
                <Grid className={layoutStyle.navbarTopContainer}>
                    <Grid style={{display: 'flex', flexDirection: 'column', margin: '0 auto', width: '60%'}}>
                        <h2>Un monde où il fait bon vivre</h2>
                        <p>Chez My Alfred, notre communauté est au coeur de nos préoccupations. Notre priorité est de
                            créer un espace où il fait bon vivre dans lequel chacun puisse trouver sa place. Ici, le
                            racisme, l’homophobie, le sexisme ou toute autre forme de discrimination n’est pas toléré.
                        </p>
                        <p>Nous croyons que le silence n’est pas une option et que nous devons faire front. Ensemble,
                            nous pouvons nous éduquer et apprendre. Nous pouvons amplifier les voix de ceux qui
                            subissent ces injustices et provoquer un vrai changement.
                        </p>
                        <p>My Alfred soutient les femmes, les personnes de couleur et la communauté LGBTQ+.</p>
                    </Grid>
                </Grid>
                <Footer/>
            </Fragment>)
    }
}

export default withStyles(styles)(OurCommunity)
