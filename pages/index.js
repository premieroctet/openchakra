import React from "react";

import { withStyles } from '@material-ui/core/styles';
import Router from "next/router";
const styles = theme => ({
    view: {
        position: 'absolute',
        zIndex: '3',
        top: 75,

        [theme.breakpoints.down('sm')]: { // medium: 960px or larger
            marginTop: 50,
        },


    },
    headerhomevid: {

        [theme.breakpoints.down('md')]: { // medium: 960px or larger
            backgroundAttachment: "fixed",
            display: 'none',
        },
        marginTop: -70,
        /* Full height */
        width: '100%!important',
        position: 'relative',


    },
    footerVideo: {
        position: 'relative',

    },
    video: {
        [theme.breakpoints.down('md')]: { // medium: 960px or larger
            backgroundAttachment: "fixed",
            display: 'none',
        },
        objectFit: 'fill',
    },
    headerImg: {
        [theme.breakpoints.up('lg')]: { // medium: 960px or larger
            display: 'none',
        },
        backgroundImage: 'url(../static/assets/img/bg.jpg)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100%!important',
        minHeight: '136vh',
    },
    footerImg: {
        [theme.breakpoints.up('lg')]: { // medium: 960px or larger
            display: 'none',
        },
        backgroundImage: 'url(../static/assets/img/bg.jpg)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100%!important',
        height: '110vh',
    }





});

class index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isTop: true,
            navCollapsed: true
        };
        this.onScroll = this.onScroll.bind(this);
        this._onToggleNav = this._onToggleNav.bind(this);
    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        document.addEventListener('scroll', () => {
            const isTop = window.scrollY < 100;
            if (isTop !== this.state.isTop) {
                this.onScroll(isTop);
            }
        });
    }

    onScroll(isTop) {
        this.setState({ isTop });
    }

    _onToggleNav = () => {
        this.setState({ navCollapsed: !this.state.navCollapsed })
    }


    render() {
        const {classes} = this.props;
        const {navCollapsed} = this.state;



        return (
            <React.Fragment>

                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
                <title>My Alfred</title>
                {/* Font Awesome */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"/>
                {/* Bootstrap core CSS */}
                <link href="../static/assets/css/bootstrap.min.css" rel="stylesheet"/>
                {/* Material Design Bootstrap */}
                <link href="../static/assets/css/mdb.min.css" rel="stylesheet"/>
                {/* Your custom styles (optional) */}
                <link href="../static/assets/css/style.min.css" rel="stylesheet"/>
                <style type="text/css"
                       dangerouslySetInnerHTML={{__html: "\n    html,\n    body,\n    header\n {\n      height: 100%;\n    }\n\n " +
                               "   hr { \n      display: block;\n      margin-top: 0.5em;\n      margin-bottom: 0.5em;\n      margin-left: auto;\n" +
                               "      margin-right: auto;\n  \n      border-width: 3px;\n      border-color:#2FBCD3;\n      width: 10%;\n " +
                               "   }\n    em{font-size: 11px;\n    color:#333}\n    @media (max-width: 740px) {\n      html,\n      body,\n" +
                               "      header,\n      .view {\n        height: 1000px;\n      }\n    }\n\n " +
                               "   @media (min-width: 800px) and (max-width: 850px) {\n      html,\n      body,\n      header,\n  " +
                               "    .view {\n        height: 650px;\n      }\n    }\n    @media (min-width: 800px) and (max-width: 850px) {\n " +
                               "             .navbar:not(.top-nav-collapse) {\n                  background: #1C2331!important;\n              }\n          }\n\n          body{overflow-x: hidden}\n  "}}/>
                {/* Navbar */}


                <nav className="navbar fixed-top navbar-dark navbar-expand-lg scrolling-navbar" style={{backgroundColor: this.state.isTop ? 'rgba(0,0,0,.5)' : 'rgb(47, 188, 211)'}}>
                    <div className="container">
                        {/* Brand */}
                        <a className="navbar-brand" href={'/'}>
                            <img src="../static/assets/img/logo.png" width={100} height="auto" alt={'logo'}/>
                        </a>
                        {/* Collapse */}
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation" onClick={this._onToggleNav}>
                            <span className="navbar-toggler-icon"/>
                        </button>
                        {/* Links */}
                        <div className={(navCollapsed ? 'collapse' : '') + ' navbar-collapse'} id="navbarSupportedContent">
                            {/* Left */}
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                </li>
                            </ul>
                            {/* Right */}
                            <ul className="navbar-nav nav-flex-icons">
                                <li className="nav-item">
                                    <a href={"/signup"} className="nav-link   rounded" target="_blank"
                                       style={{backgroundColor: 'transparent'}}>
                                        Inscription
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href={"/login"} className="nav-link   rounded" target="_blank"
                                       style={{backgroundColor: 'transparent'}}>
                                        Connexion
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href={"/signup"} className="nav-link   rounded" target="_blank"
                                       style={{backgroundColor: '#2FBCD3', border: 'snow thin solid'}}>
                                        Devenir Alfred
                                    </a>
                                </li>
                                {/*<li className="nav-item">
                                    <a href="#" className="nav-link" target="_blank">
                                        <i className="fab fa-facebook-f"/>
                                    </a>
                                </li>*/}
                                <li className="nav-item">
                                    <a href="https://www.instagram.com/my_alfred_/" className="nav-link"
                                       target="_blank">
                                        <i className="fab fa-instagram"/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* Navbar */}
                {/* Full Page Intro */}
                <div className={classes.headerImg}/>
                <div className={classes.headerhomevid}>
                <video id="background-video" loop autoPlay style={{width: '100%'}}>
                    <source src="../static/assets/img/bgdark.webm" type="video/webm" />
                    <source src="../static/assets/img/bgdark.webm" type="video/ogg" />
                    Your browser does not support the video tag.
                </video>
                </div>

                <div className={classes.view} style={{width: '100%'}}>


                    {/* Mask & flexbox options*/}
                    <div className="mask  d-flex justify-content-center align-items-center" style={{height: '90vh'}}>
                        {/* Content */}
                        <div className="container" style={{marginTop: '50px'}}>
                            {/*Grid row*/}
                            <div className="row wow fadeIn">
                                {/*Grid column*/}
                                <div className="col-md-6 mb-4 white-text text-center text-md-left">
                                    <br/>
                                    <h2 className=" font-weight-bold">Vous connaissez Airbnb pour les logements ?
                                        Découvrez My-Alfred pour les services ! </h2>
                                    <hr className="hr-light hr-left d-none d-md-block" style={{float: 'left'}}/>
                                    <br/><br/>
                                    <h4 className=" font-weight-bold">
                                        We are coming soon !
                                    </h4>
                                    <br/>
                                    <p className=" display-5 mb-4 d-none d-md-block" style={{fontSize: '1.2em'}}>
                                        Créez votre boutique maintenant en quelques minutes, répertoriez vos services,
                                        indiquez vos disponibilités, vos tarifs et profitez d’un complément de revenu !
                                    </p>
                                    <br/>
                                    <a target="_blank" href={'/signup'} className="btn  btn-lg text-capitalize "
                                       style={{backgroundColor: '#2FBCD3'}}>Devenir Alfred
                                    </a>
                                </div>
                                {/*Grid column*/}
                                {/*Grid column*/}
                                <div className="col-md-6 col-xl-5 mb-4 float-right" style={{float: 'right'}}>
                                    <h5 className="card-header  white-text text-center py-4 "
                                        style={{backgroundColor: 'rgb(240, 77, 94)'}}>
                                        <a href="#" style={{textDecoration: 'none', color: 'white'}}><strong>Créez votre
                                            boutique de services</strong></a>
                                    </h5>
                                    {/*Card*/}
                                    <div className="card">
                                        {/*Card content*/}
                                        <div className="card-body">
                                            <p><em>Vivez avec nous l’aventure My-Alfred. Restez informé et recevez
                                                toutes nos actualités !!!</em></p>
                                            {/* Form */}
                                            <form name>
                                                {/* Heading */}
                                                <div className="md-form">
                                                    <i className="fas fa-user prefix grey-text"/>
                                                    <input type="text" id="form3" className="form-control"/>
                                                    <label htmlFor="form3">Prénom </label>
                                                </div>
                                                <div className="md-form">
                                                    <i className="fas fa-envelope prefix grey-text"/>
                                                    <input type="text" id="form2" className="form-control"/>
                                                    <label htmlFor="form2">Email </label>
                                                </div>
                                                <fieldset className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="checkbox1"/>
                                                    <label htmlFor="checkbox1"
                                                           className="form-check-label dark-grey-text">Je m'abonne à la
                                                        newsletter !</label>
                                                </fieldset>
                                                <br/><br/>
                                                <div className="text-right">
                                                    <button className="btn  btn-block my-4" type="submit"
                                                            style={{backgroundColor: '#2FBCD3', color: 'white'}}><a style={{color: 'white'}} href={'/signup'}> Envoyer</a>
                                                    </button>
                                                </div>
                                            </form>
                                            {/* Form */}
                                        </div>
                                    </div>
                                    {/*/.Card*/}
                                </div>
                                {/*Grid column*/}
                            </div>
                            {/*Grid row*/}
                        </div>
                        {/* Content */}
                    </div>
                    {/* Mask & flexbox options*/}
                </div>
                {/* Full Page Intro */}
                {/*Main layout*/}
                <main style={{marginTop: 200}}>
                    <div className="container">
                        <section className="mt-5 wow fadeIn">
                            {/*Grid row*/}
                            <div className="row bg-white card-body " data-jarallax-element={-140}
                                 style={{marginTop: '-50px'}}>
                                {/*Grid column*/}
                                <div className="col-md-12 mb-12 card-body padding-20 ">
                                    {/* Main heading */}
                                    <h3 className="h1 mb-3 text-center">Devenez Alfred !</h3>
                                    <hr item-width="50%"/>
                                    <p className="text-center">My-Alfred vous permet de mettre à disposition votre
                                        boutique de services et vous offre une visibilité rapide sans avoir à engager le
                                        moindre coût initial ! My-Alfred gère pour vous le traitement des paiements,
                                        l’assistance aux utilisateurs et vous offre une assurance responsabilité
                                        civile.</p>
                                </div>
                                {/*Grid column*/}
                                {/*Grid column*/}
                                {/*Grid column*/}
                                <br/>
                                <br/>
                                <div className="col-md-5 card-body ">
                                    <img src="../static/assets/img/1.svg" width={40} height="auto"/>
                                    <br/><br/>
                                    <h3 className="font-weight-bold">Proposez vos services</h3>
                                    <p>Vous n'avez aucun frais à payer pour proposer vos services. Indiquez simplement
                                        les prestations que vous souhaitez réaliser en vous appuyant sur une liste de
                                        plus de 1500 services proposées sur My-Alfred. Un service n'apparait pas ?
                                        Proposez-le à nos équipes !</p>
                                </div>
                                <div className="col-md-5 d-none d-md-block  mask rgba-black-light  jarallax" style={{
                                    backgroundColor: '#fff',
                                    height: '40vh',
                                    float: 'right !important',
                                    marginLeft: '150px'
                                }}>
                                    <video width="100%" height="100%" autoPlay="autoplay" loop>
                                        <source src="http://pluslite.fr/media/myalfred/Phone1.mp4" type="video/mp4"/>
                                    </video>
                                </div>
                                <div
                                    className="col-md-5 d-none d-md-block  justify-content-center align-items-center jarallax  "
                                    data-jarallax-element={-140} style={{padding: '50px', marginTop: '-50px'}}>
                                    <video width="100%" height="100%" autoPlay="autoplay" loop>
                                        <source src="http://pluslite.fr/media/myalfred/Phone2.mp4" type="video/mp4"/>
                                    </video>
                                </div>
                                <div className="col-md-6 card-body pull-right">
                                    <img src="../static/assets/img/2.svg" width={40} height="auto"/>
                                    <br/><br/>
                                    <h3 className="font-weight-bold">Fixer vos conditions</h3>
                                    <p>Indiquez vos disponibilités (jours, heures...) ainsi que vos tarifs et tous les
                                        critères pour définir votre prestation. Et si vous avez besoin d'aide, nous
                                        sommes là pour vous accompagner dans la création de votre boutique de services
                                        !</p>
                                </div>
                                <div className="col-md-5 card-body">
                                    <img src="../static/assets/img/3.svg" width={40} height="auto"/>
                                    <br/><br/>
                                    <h3 className="font-weight-bold">Réalisez vos premiers services</h3>
                                    <p>Une fois votre boutique en ligne, les personnes intéressées par vos prestations
                                        pourront réserver en ligne vos services. Si vous avez des questions avant la
                                        prestation, vous pourrez les contacter !</p>
                                </div>
                                <div className="col-md-5 d-none d-md-block  jarallax" data-jarallax-element={-100}
                                     style={{
                                         height: '60vh',
                                         float: 'right !important',
                                         marginLeft: '170px',
                                         marginTop: '-50px'
                                     }}>
                                    <video width="100%" height="100%" autoPlay="autoplay" loop>
                                        <source src="http://pluslite.fr/media/myalfred/Phone3.mp4" type="video/mp4"/>
                                    </video>
                                </div>
                            </div>
                            {/*Grid row*/}
                        </section>
                    </div>
                    <section>
                        <div style={{marginTop: 20}}>

                        <div style={{height: '112.5vh'}} className={classes.footerVideo}>
                            <div className={classes.footerImg}/>
                        <video id="background-video" loop autoPlay style={{width: '100%',marginTop: 23}} className={classes.video}>
                            <source src="../static/assets/img/bgdark.webm" type="video/webm" />
                            <source src="../static/assets/img/bgdark.webm" type="video/ogg" />
                            Your browser does not support the video tag.
                        </video>
                        </div>
                        <div className="card card-image">
                            {/* Content */}
                            <div
                                className="text-white text-center d-flex align-items-center py-5 px-4 "
                                style={{minHeight: '112.5vh', position: 'absolute', bottom: -22, width: '100%'}}>
                                <div className="container">
                                    <h2 className="card-title pt-2"><strong>Proposez vos services sans faire face à des
                                        coûts initiaux</strong></h2>
                                    <p>Nous sommes tous des Alfred. Chacun d'entre nous doit pouvoir partager ses savoir
                                        faire, ses compétences, ses passions... tantôt Alfred, tantôt consommateur de
                                        services d'Alfred, rejoignez la communauté Alfred en quelques clics !</p>
                                    <a className="btn" style={{backgroundColor: '#2FBCD3'}}><i
                                        className="fas fa-heart left"/> Devenir Alfred</a>
                                </div>
                            </div>
                        </div>
                        </div>
                            <footer className="page-footer text-center font-small mt-4"
                                    style={{backgroundColor: 'rgb(70, 70, 80)'}}>
                                {/*Copyright*/}
                                <div className=" py-3">
                                    © 2019 Copyright:
                                    <a href="http://my-alfred.io" target="_blank">my-alfred.io </a>
                                </div>
                                {/*/.Copyright*/}
                            </footer>


                    </section>

                </main>




            </React.Fragment>
        );
    }
}


export default withStyles(styles)(index);
