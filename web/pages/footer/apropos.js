import React, {Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import layoutStyle from "../../static/css/pages/layout/layoutStyle"
import Header from "../../hoc/Layout/About/Header";
import Footer from "../../hoc/Layout/About/Footer";

class Apropos extends React.Component {
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
                        <Grid>
                            <h2>Fondé en 2019</h2>
                            <p>My Alfred est né de l’envie de nous simplifier la vie. Nous voulions répondre à une
                                question simple : Comment gagnez du temps ? Aujourd’hui, nous sommes heureux de répondre
                                à une multitude de problématiques. En créant une plateforme d’économie collaborative,
                                nous voulons simplifiez votre quotidien mais nous espérons aussi rapprocher les
                                générations, développer l’entrepreunariat, contribuer au développement des compétences
                                de chacun et créer une communauté où il fait bon vivre.</p>
                        </Grid>
                        <Grid>

                            <h2>Notre mission</h2>
                            <p>Notre mission est de créer un lieu de rencontres et d’opportunités, où trouver la bonne
                                personne n’est plus un problème.</p>
                        </Grid>
                        <Grid>
                            <h2>Notre vision</h2>
                            <p>Nous aimerions que My Alfred puisse vous accompagner au quotidien. Notre communauté est
                                au coeur de ce que nous faisons et nous souhaitons créez un espace où règne la confiance
                                et la simplicité. </p>
                        </Grid>
                    </Grid>
                </Grid>
                <Footer/>
            </Fragment>)
    }
}

export default (Apropos)
