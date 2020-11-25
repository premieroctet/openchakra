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
                <Header>
                </Header>
                <Grid className={layoutStyle.navbarTopContainer}>
                    <Grid style={{display: 'flex', flexDirection: 'column', margin: '0 auto', width: '60%'}}>
                        <Grid>
                            <h2>Fondé en 2019</h2>
                            <p>My Alfred est né de l’envie de nous simplifier la vie. Nous voulions répondre à une
                                question simple : Comment gagner du temps ? Aujourd’hui, nous sommes heureux de répondre
                                à une multitude de problématiques. En créant une plateforme d’économie collaborative,
                                nous voulons simplifiez votre quotidien mais nous espérons aussi rapprocher les
                                générations, développer l’entrepreunariat, contribuer au développement des compétences
                                de chacun et créer une communauté où il fait bon vivre.</p>
                        </Grid>
                        <Grid>
                            <h2>Nous sommes My Alfred</h2>
                            <p>Nous sommes persuadés que l’économie collaborative favorise le développement de nouvelles
                                formes d’emploi pour des entrepreneurs qui ont soif de liberté, de créativité et
                                d’activité multiples.
                            </p>
                            <p>

                                Nous mettons en relation des particuliers, des entrepreneurs pour que chacun puisse
                                proposer ou disposer de tous les services. Nous apportons de la visibilité, de l’équité,
                                de la transparence, un espace communautaire où chacun participe au développement d’une
                                économie responsable.
                            </p>
                            <p>
                                Nous avons à cœur de faire prendre conscience à chacun d’entre nous que seul on sait
                                faire peu de choses, ensemble on peut tout faire.
                            </p>
                        </Grid>
                        <Grid>
                            <h2>My Alfred, qu'est-ce que c'est ?</h2>
                            <p>My Alfred crée des liens entre les personnes en leur donnant la possibilité de réserver
                                des services partout en France. Les Alfred constituent le moteur de la communauté et
                                fournissent à notre communauté des services de qualités, comme s’ils le faisaient pour
                                eux même. Plus de 20 000 prestations sont recensées sur My Alfred, portées par plusieurs
                                milliers d’Alfred compétents, talentueux et bienveillants.
                            </p>
                        </Grid>
                        <Grid>
                            <h2>Qu'est-ce que les services d’Alfred ? </h2>
                            <p>Si vous disposez d’un talent, d’une passion ou tout simplement de temps, vous pouvez
                                gagner de l'argent en les mettant à la disposition de notre communauté. En quelques
                                minutes, vous proposez vos services, fixez vos conditions et créez votre profil
                                d’Alfred, vous permettant de bénéficier d’une grande visibilité, une interface
                                personnalisée propre à vos services, à votre personnalité.
                            </p>
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
