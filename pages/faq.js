import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../hoc/Layout/Layout';
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Card from "@material-ui/core/Card";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DatePicker from "react-datepicker";
import FormControl from "@material-ui/core/FormControl";
import Select2 from "react-select";
import Button from "@material-ui/core/Button";



const { config } = require('../config/config');
const url = config.apiUrl;
const styles = theme => ({

});

class faq extends React.Component {
    constructor(props) {
        super(props);

    }



    render() {
        const { classes } = this.props;


        return (
            <Layout>
                <Grid container style={{marginTop:80}}>
                    <Grid item xs={8}>
                        <Grid container>
                        <h3>Devenir Alfred</h3>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "70%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{fontSize:18}}
                                        >
                                            Qui peut devenir Alfred ?
                                        </Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <p>
                                                Nous sommes tous des Alfred ! Dès l’âge de 16 ans,  vous pouvez devenir Alfred en créant votre propre
                                                boutique de service(s) sur My-Alfred.

                                                Votre inscription et la mise en ligne de votre boutique sont entièrement gratuites et ne demandent aucun
                                                frais au préalable ou abonnement vous engageant sur la durée.

                                                Vous pouvez proposer immédiatement vos talents, vos compétences sur My-Alfred en choisissant la liste
                                                des services que vous souhaitez proposer.  Nous avons répertorié pour vous plus de 2000 prestations
                                                classées dans des services et des catégories.

                                                Alors, prêt à rejoindre l’aventure ? Je deviens alfred maintenant !

                                            </p>
                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "70%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{fontSize:18}}
                                        >
                                            Comment creér sa boutique de service ?
                                        </Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <p>
                                                My-Alfred vous permet de créer votre propre boutique de service(s) et de définir les services et prestations que vous souhaitez réaliser tout en vous offrant pleine liberté sur vos conditions !
                                                Nos Alfred fixent leur(s) prix ainsi que leur(s) méthode(s) de facturation librement, et peuvent ajuster leur(s) prix à tout moment. Afin de proposer une visibilité et une confiance accrue entre les utilisateurs et les Alfred, la boutique de service(s) offre un niveau de personnalisation élevé permettant à tout à chacun de décrire son expertise, ses diplômes et certifications, des options liées à ses services, le matériel fourni dans le cadre de son service ou encore ses disponibilités.
                                                Les Alfred sont également libres de choisir leurs propres conditions de réservation et d’annulation !
                                            </p>
                                            <p>
                                                Prêt à vous lancer ?
                                                Pour démarrer la création de votre boutique, l’inscription est obligatoire. Une fois identifé(e) sur My-Alfred, il suffit de cliquer sur le bouton “Devenir Alfred’’.

                                            </p>
                                            <p>
                                                Simple et rapide, la création de votre boutique se déroule en 3 étapes et ne vous prendra quelques minutes :
                                            </p>
                                            <p>
                                                Etape 1 : Sélection des services<br/>
                                                A travers cette étape, vous pouvez sélectionner les services que vous souhaitez réaliser.  Nous avons classé ces services dans des catégories pour vous permettre de trouver plus rapidement les services concernés. Un service n'apparaît pas ?
                                                Contacter l’équipe My-Alfred à l’adresse <a href={"mailto:unservicedeplus@my-alfred.io"}>unservicedeplus@my-alfred.io</a> !

                                            </p>
                                            <p>
                                                Etape 2 : Indiquez vos prix, vos disponibilités et conditions<br/>
                                                Pour chaque service sélectionné, vous devez renseigner un prix par prestation, vos disponibilités et vos conditions de réservation pour permettre à vos clients de réserver vos services avec un maximum d’informations.

                                            </p>
                                            <p>
                                                Etape 3 : Indiquez vos prix, vos disponibilités et conditions<br/>
                                                Cette dernière étape vous permet d’ajouter une photo de profil, de vérifier votre téléphone portable, votre identité et d’indiquer si vous souhaitez réaliser vos services en tant que particulier ou auto-entrepreneur.

                                            </p>
                                            <p>
                                                C’est fini ! Vous avez maintenant votre propre boutique de services sur My-Alfred. A tout moment, vous pouvez ajouter, modifier, supprimer un ou plusieurs services dans la rubrique ma boutique !

                                                Pensez à maintenir votre calendrier à jour afin d'apparaître dans les résultats de recherche des utilisateurs :) !

                                            </p>
                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "70%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{fontSize:18}}
                                        >
                                            Que dois-je déclarer dans mes revenus ?
                                        </Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <p>
                                                My-Alfred est une plateforme appartenant à l’économie collaborative permettant à tout un chacun de
                                                consommer et/ou de proposer des services contre une rémunération.
                                                L’économie collaborative est tout à fait légale à condition de déclarer ses revenus et d’adopter
                                                le statut correspondant en fonction de la nature occasionnelle ou non de vos services.
                                                En tant que particulier, vous devez vous devez déclarer le montant de vos prestations dans vos
                                                revenus dès lors que vous avez perçu plus de 3 000 € ou effectué plus de 20 transactions au cours
                                                de l’année précédente, mais vous n’avez pas de déclaration sociale ou de TVA à réaliser.
                                                Si votre activité n’est pas occasionnelle mais régulière, vous devez déclarer vos revenus et
                                                payer des cotisations sociales.  Dans ce cas, le statut d’auto-entrepreneur est alors
                                                parfaitement adapté pour vous.


                                            </p>
                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <h3>Créer votre boutique de service</h3>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "70%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{fontSize:18}}
                                        >
                                            Comment ajouter un nouveau service dans ma boutique ?
                                        </Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <p>
                                                Vous pouvez à tout moment ajouter de nouveaux services dans votre boutique.
                                                Pour cela, rendez-vous dans votre boutique et cliquez sur <span style={{color:'#2FBCD3'}}>ajouter un nouveau service.</span><br/>
                                                Vous devez ensuite suivre les différentes étapes d’ajout d’un nouveau service comme lors de
                                                la création de votre boutique.



                                            </p>
                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "70%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{fontSize:18}}
                                        >
                                            Comment fixer le prix de mes prestations ?
                                        </Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <p>
                                                Pour chaque service sélectionné, il vous est proposé une ou plusieurs prestations.
                                                Vous devez selectionner les prestations que vous souhaitez effectuer et pour lesquelles un prix doit
                                                être renseigné.  Le prix de votre prestation doit être indiqué en tenant compte du mode de facturation.
                                                Un mode de facturation vous est proposé par défaut mais vous pouvez le modifier si ce dernier ne
                                                vous convient pas.
                                            </p>
                                            <p>
                                                Vous pouvez à tout moment visualiser ou modifier le prix et le mode de facturation de vos services dans
                                                votre boutique.
                                            </p>
                                            <p style={{width:'100%'}}>
                                                Pour modifier le prix de vos prestations :
                                            </p>
                                            <br/>
                                            <ol style={{fontFamily:'helveticaNeue',fontSize:'0.9rem'}}>
                                                <li>Consultez votre Boutique sur my-alfred.io </li>
                                                <li>Cliquez sur l’onglet <strong>Mes services</strong> </li>
                                                <li>Cliquez sur <strong>Modifier</strong> dans un service </li>
                                                <li>Modifier les prix de vos prestations puis cliquez sur <strong>Enregistrer</strong> </li>
                                            </ol>
                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "70%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{fontSize:18}}
                                        >
                                            A quoi servent les options dans ma boutique de service ?
                                        </Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <p>
                                                Pour chaque service, vous avez la possibilité d’ajouter une option de facturation.
                                                Cette option vous permet de compléter le prix de votre prestation en ajoutant un supplément de
                                                prix que le client pourra sélectionner.  Par exemple, vous pouvez ajouter une option
                                                “retrait et livraison” et indiquer le prix de cette option.
                                            </p>
                                            <p>
                                                Vous pouvez à tout moment visualiser ou modifier les options de vos services dans votre boutique.
                                            </p>
                                            <p style={{width:'100%'}}>
                                                Pour modifier les options d'un service :
                                            </p>
                                            <br/>
                                            <ol style={{fontFamily:'helveticaNeue',fontSize:'0.9rem'}}>
                                                <li>Consultez <strong>votre Boutique</strong> sur my-alfred.io </li>
                                                <li>Cliquez sur l’onglet <strong>Mes services</strong> </li>
                                                <li>Cliquez sur <strong>Modifier</strong> dans un service </li>
                                                <li>Modifier les options de vos prestations puis cliquez sur <strong>Enregistrer</strong> </li>
                                            </ol>
                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "70%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{fontSize:18}}
                                        >
                                            A quoi correspond le matériel fourni dans ma boutique de service ?
                                        </Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <p>
                                                Pour chaque service, vous pouvez sélectionner le matériel et les consommables qui seront utilisés lors
                                                de votre prestation. Lorsqu’un client parcourra votre boutique ou selectionnera vos services,
                                                il pourra alors connaître les équipements dont vous disposez pour la prestation et les consommables
                                                que vous fournissez.  Certains services nécessitent du matériel spécifique.
                                                Indiquez que vous disposez de ce matériel offre à vos clients un gage de qualité et de
                                                professionnalisme au regard des services que vous pouvez réaliser !
                                            </p>
                                            <p>
                                                Vous pouvez à tout moment visualiser ou modifier le matériel et consommables fournis dans vos
                                                services dans votre boutique.
                                            </p>
                                            <p style={{width:'100%'}}>
                                                Pour modifier le matériel fourni dans votre service  :
                                            </p>
                                            <br/>
                                            <ol style={{fontFamily:'helveticaNeue',fontSize:'0.9rem'}}>
                                                <li>Consultez <strong>votre Boutique</strong> sur my-alfred.io </li>
                                                <li>Cliquez sur l’onglet <strong>Mes services</strong> </li>
                                                <li>Cliquez sur <strong>Modifier</strong> dans un service </li>
                                                <li>Sélectionnez le matériel et consommables puis cliquez sur <strong>Enregistrer</strong> </li>
                                            </ol>
                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "70%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{fontSize:18}}
                                        >
                                            Comment définir un montant minimum pour mon service ?
                                        </Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <p>
                                                Le montant minimum de réservation correspond au panier minimum requis pour réserver ce service.
                                                Si vous indiquez un montant de 10€, les clients ne pourront pas réserver vos services si la somme des
                                                prestations n’atteint pas ce montant.
                                            </p>
                                            <p>
                                                Vous pouvez à tout moment visualiser ou modifier le montant minimum de vos services dans votre boutique.
                                            </p>
                                            <p style={{width:'100%'}}>
                                                Pour modifier le montant minimum d'un service  :
                                            </p>
                                            <br/>
                                            <ol style={{fontFamily:'helveticaNeue',fontSize:'0.9rem'}}>
                                                <li>Consultez <strong>votre Boutique</strong> sur my-alfred.io </li>
                                                <li>Cliquez sur l’onglet <strong>Mes services</strong> </li>
                                                <li>Cliquez sur <strong>Modifier</strong> dans un service </li>
                                                <li>Modifiez le montant minimum puis cliquez sur <strong>Enregistrer</strong> </li>
                                            </ol>
                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "70%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{fontSize:18}}
                                        >
                                            Comment définir mon périmètre d'intervention ?
                                        </Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <p>
                                                Votre périmètre d’intervention correspond à la zone dans laquelle vous souhaitez réaliser votre service.
                                                Par défaut, nous utiliserons la ville de l’adresse renseignée dans votre profil comme base de référence.
                                                Cette adresse ne vous convient pas ? Vous pouvez changer votre ville de référence à tout moment !
                                                Le périmètre que vous indiquez va permettre à la plateforme My-Alfred de proposer votre service si le
                                                périmètre d’intervention correspond à l’adresse du client.  Si le client se trouve à 5km de votre
                                                adresse et que vous avez indiquez un périmètre de 10km votre service sera proposé !

                                            </p>
                                            <p>
                                                Vous pouvez à tout moment visualiser ou modifier le périmètre d’intervention de vos services dans
                                                votre boutique.
                                            </p>
                                            <p style={{width:'100%'}}>
                                                Pour modifier le périmètre d'intervention d'un service  :
                                            </p>
                                            <br/>
                                            <ol style={{fontFamily:'helveticaNeue',fontSize:'0.9rem'}}>
                                                <li>Consultez <strong>votre Boutique</strong> sur my-alfred.io </li>
                                                <li>Cliquez sur l’onglet <strong>Mes services</strong> </li>
                                                <li>Cliquez sur <strong>Modifier</strong> dans un service </li>
                                                <li>Modifiez le périmètre d'intervention puis cliquez sur <strong>Enregistrer</strong> </li>
                                            </ol>
                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "70%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{fontSize:18}}
                                        >
                                            A quoi correspond le délai de prévenance ?
                                        </Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <p>
                                                Le délai de prévenance correspond au délai nécessaire entre la réservation et la réalisation du service.
                                                Par exemple, si vous indiquez un délai de 24 heures, un client devra réserver votre service au moins 24
                                                heures avant votre intervention.
                                                Le délai de prévenance peut se définir en heure, jour ou mois en indiquant le chiffre correspondant
                                                avec les boutons + et - dans votre boutique.


                                            </p>
                                            <p>
                                                Vous pouvez à tout moment visualiser ou modifier le délai de prévenance de vos services dans votre boutique.
                                            </p>
                                            <p style={{width:'100%'}}>
                                                Pour modifier le délai de prévenance d'un service  :
                                            </p>
                                            <br/>
                                            <ol style={{fontFamily:'helveticaNeue',fontSize:'0.9rem'}}>
                                                <li>Consultez <strong>votre Boutique</strong> sur my-alfred.io </li>
                                                <li>Cliquez sur l’onglet <strong>Mes services</strong> </li>
                                                <li>Cliquez sur <strong>Modifier</strong> dans un service </li>
                                                <li>Modifiez le délai de prévenance puis cliquez sur <strong>Enregistrer</strong> </li>
                                            </ol>
                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "70%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{fontSize:18}}
                                        >
                                            Pourquoi décrire brièvement mon expertise ?
                                        </Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <p>
                                                Pour chaque service sélectionné, vous pouvez brièvement décrire votre expertise.
                                                N’hésitez pas à mettre en évidence vos compétences et votre expertise pour un service.
                                                Les utilisateurs auront accès à ces informations, n’hésitez pas à valoriser vos réalisations
                                                et vos atouts pour ce service !



                                            </p>
                                            <p>
                                                Vous pouvez à tout moment visualiser ou modifier le contenu de votre expertise de vos services
                                                dans votre boutique.
                                            </p>
                                            <p style={{width:'100%'}}>
                                                Pour modifier la description de votre expertise d'un service  :
                                            </p>
                                            <br/>
                                            <ol style={{fontFamily:'helveticaNeue',fontSize:'0.9rem'}}>
                                                <li>Consultez <strong>votre Boutique</strong> sur my-alfred.io </li>
                                                <li>Cliquez sur l’onglet <strong>Mes services</strong> </li>
                                                <li>Cliquez sur <strong>Modifier</strong> dans un service </li>
                                                <li>Modifiez le contenu de votre expertise puis cliquez sur <strong>Enregistrer</strong> </li>
                                            </ol>
                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "70%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{fontSize:18}}
                                        >
                                            Pourquoi dois-je ajouter mes années d’expérience, mes diplômes et certifications ?
                                        </Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <p>
                                                Pour chaque service sélectionné, vous pouvez indiquer une nombre d’année d’expérience pour ce
                                                service et télécharger un diplôme et/ou une certification reçu pour ce service. Concernant le diplôme,
                                                vous pouvez indiquez le nom de votre diplôme et son année d’obtention. En téléchargeant votre diplôme,
                                                votre diplôme aura le statut de diplôme vérifié auprès des utilisateurs mais il ne sera jamais visible
                                                par ses derniers! C’est exactement le même principe pour votre certification.



                                            </p>
                                            <p>
                                                Vous pouvez à tout moment visualiser ou modifier le nombre d’années d’expérience et les diplômes
                                                et certifications téléchargés de vos services dans votre boutique.
                                            </p>
                                            <p style={{width:'100%'}}>
                                                Pour modifier vos années d’expérience, vos diplômes et certifications d'un service  :
                                            </p>
                                            <br/>
                                            <ol style={{fontFamily:'helveticaNeue',fontSize:'0.9rem'}}>
                                                <li>Consultez <strong>votre Boutique</strong> sur my-alfred.io </li>
                                                <li>Cliquez sur l’onglet <strong>Mes services</strong> </li>
                                                <li>Cliquez sur <strong>Modifier</strong> dans un service </li>
                                                <li>Modifiez votre nombre d’années d’expérience, supprimer ou ajouter un diplôme ou une certification
                                                    puis cliquez sur <strong>Enregistrer</strong> </li>
                                            </ol>
                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "70%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{fontSize:18}}
                                        >
                                            Comment indiquer mes disponibilités dans mon calendrier ?
                                        </Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <p>
                                                Il est indispensable d’indiquer vos disponibilités lors de la création de votre boutique afin
                                                d'apparaître dans les résultats de recherche des utilisateurs.
                                                Lorsqu’un client recherchera un service sur la plateforme, il indiquera le service recherché, et
                                                très souvent indiquera une date et/ou un heure à laquelle il souhaite obtenir ce service.
                                                Si vos disponibilités indiquées dans votre calendrier correspondent à la demande du client, vos services
                                                seront proposés dans les résultats de la recherche !
                                                Afin de renseigner convenablement votre calendrier, My-Alfred vous permet d’indiquer, jour par jour vos
                                                périodes de disponibilité.  Plusieurs périodes peuvent être indiquées pour un même jour ou pour une
                                                période récurrente.  Par exemple, vous pouvez être disponible le mercredi de 10h00 à 12h00 puis de 14h00 à 18h00.
                                                Vous pouvez ensuite étendre vos heures de disponibilités de vos journées sur une période de dates.
                                                Par exemple, les périodes horaires renseignées s’appliquent pour la période du 1er octobre 2019 au
                                                20 décembre 2019.
                                                Si vous proposez plusieurs services, les disponibilités indiquées peuvent être définies par service
                                                ou pour l’ensemble de vos services.




                                            </p>
                                            <p>
                                                Vous pouvez à tout moment visualiser ou modifier le calendrier de vos disponibilités
                                                de vos service dans votre boutique.
                                            </p>
                                            <p style={{width:'100%'}}>
                                                Pour modifier votre calendrier de disponibilités   :
                                            </p>
                                            <br/>
                                            <ol style={{fontFamily:'helveticaNeue',fontSize:'0.9rem'}}>
                                                <li>Consultez <strong>votre Boutique</strong> sur my-alfred.io </li>
                                                <li>Cliquez sur l’onglet <strong>Mon calendrier</strong> </li>
                                                <li>Cliquez sur <strong>Ajouter ou modifier dans la page calendrier</strong> </li>
                                                <li>Modifiez les jours, heures et périodes de vos disponibilités
                                                    puis cliquez sur <strong>Enregistrer</strong> </li>
                                            </ol>
                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "70%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{fontSize:18}}
                                        >
                                            Comment les utilisateurs peuvent réserver ?
                                        </Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <p>
                                                Pour l’ensemble de vos services, vous devez préciser la façon dont vous souhaitez que vos clients
                                                réservent vos services. Soit vous permettez à vos clients de réserver vos services automatiquement,
                                                soit vous souhaitez recevoir une notification pour laquelle vous avez 24H00 pour répondre.  Lors d’une
                                                réservation automatique, le service est réservé et payé par le client.
                                                Si vous avez opté pour une validation de la réservation, le service sera réservé et payé qu’après votre
                                                acceptation.
                                            </p>
                                            <p>
                                                Vous pouvez à tout moment visualiser ou modifier la façon dont vous souhaitez que vos clients
                                                réservent vos services dans votre boutique.
                                            </p>
                                            <p style={{width:'100%'}}>
                                                Pour modifier la façon dont vos clients peuvent réserver vos services :
                                            </p>
                                            <br/>
                                            <ol style={{fontFamily:'helveticaNeue',fontSize:'0.9rem'}}>
                                                <li>Consultez <strong>votre Boutique</strong> sur my-alfred.io </li>
                                                <li>Cliquez sur l’onglet <strong>Mes paramètres de réservation</strong> </li>
                                                <li>Cliquez sur <strong>Modifier</strong>dans un service </li>
                                                <li>Sélectionnez la façon dont vous souhaitez que vos clients réservent vos services
                                                    puis cliquez sur <strong>Enregistrer</strong> </li>
                                            </ol>
                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "70%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{fontSize:18}}
                                        >
                                            A quoi correspondent mes conditions de réservation ?
                                        </Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <p>
                                                Les conditions de réservation définissent les éléments que vous souhaitez vérifier à propos de vos
                                                clients.  Vous pouvez exiger différentes options.  Ces options sont cumulatives.
                                            </p>
                                            <p>
                                                Conditions My-Alfred<br/>
                                                Numéro de téléphone confirmé, adresse e-mail confirmée, informations de paiement et acceptation du règlement intérieur.

                                            </p>
                                            <p>
                                                Photo de profil<br/>
                                                Si vous activez cette condition, vous ne pourrez voir les photos de profil des utilisateurs qu'une fois la réservation confirmée.

                                            </p>
                                            <p>
                                                Pièce d'identité officielle<br/>
                                                Ces utilisateurs ont vérifié leur identité.

                                            </p>
                                            <p>
                                                Recommandations d'autres Alfred<br/>
                                                Ces utilisateurs ont déjà utilisé des services avec My-Alfred, sont recommandés par d'autres Alfred et n'ont pas reçu de commentaires négatifs.

                                            </p>
                                            <p>
                                                Il se peut que vous ayez moins de réservation si vous ajoutez des conditions. Les personnes qui
                                                ne répondent pas à vos critères peuvent quand même vous envoyer une demande.
                                            </p>
                                            <p>
                                                Vous pouvez à tout moment visualiser ou modifier les conditions de réservation de vos services
                                                dans votre boutique.
                                            </p>
                                            <p style={{width:'100%'}}>
                                                Pour modifier vos conditions de réservation de vos services :
                                            </p>
                                            <br/>
                                            <ol style={{fontFamily:'helveticaNeue',fontSize:'0.9rem'}}>
                                                <li>Consultez <strong>votre Boutique</strong> sur my-alfred.io </li>
                                                <li>Cliquez sur l’onglet <strong>Mes paramètres de réservation</strong> </li>
                                                <li>Cliquez sur <strong>Modifier</strong>dans un service </li>
                                                <li>Sélectionnez ou désélectionnez les options de vos conditions de réservation
                                                    puis cliquez sur <strong>Enregistrer</strong> </li>
                                            </ol>
                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "70%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{fontSize:18}}
                                        >
                                            Comment gérer ma photo de profil ?
                                        </Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <p>
                                                La photo de votre profil sera visible des utilisateurs du site et leur permettra de déjà vous connaître
                                                ! Téléchargez une photo claire et lumineuse, de bonne qualité. Pour un rendu optimal, la photo doit
                                                être cadrée, sans lunette de soleil, en regardant l’objectif, avec seulement vous sur la photo.
                                            </p>
                                            <p>
                                                Vous pouvez à tout moment visualiser, ajouter ou supprimer votre photo dans votre boutique.
                                            </p>
                                            <p style={{width:'100%'}}>
                                                Pour ajouter ou supprimer votre photo de profil  :
                                            </p>
                                            <br/>
                                            <ol style={{fontFamily:'helveticaNeue',fontSize:'0.9rem'}}>
                                                <li>Consultez <strong>votre Profil</strong> sur my-alfred.io </li>
                                                <li>Cliquez sur l’onglet <strong>Ma photo</strong> </li>
                                                <li>Cliquez sur <strong>Télécharger une photo depuis votre ordinateur </strong></li>
                                                <li>Cliquez sur <strong>Valider</strong> </li>
                                            </ol>
                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "70%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{fontSize:18}}
                                        >
                                            Comment définir mes conditions d'annulations ?
                                        </Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <p>
                                                Les conditions d’annulation définissent sous quelle condition vous acceptez l’annulation d’une
                                                réservation par un client.  Nous avons définis 3 niveaux de conditions d’annulation :
                                            </p>
                                            <p>
                                                Flexibles<br/>
                                                Remboursement intégral lorsque l’annulation d’un client intervient jusqu'à 1 jour avant la prestation.

                                            </p>
                                            <p>
                                                Modérées<br/>
                                                Remboursement intégral lorsque l’annulation d’un client intervient jusqu'à 5 jours avant la prestation.

                                            </p>
                                            <p>
                                                Strictes<br/>
                                                Remboursement intégral lorsque l’annulation d’un client intervient jusqu'à 10 jours avant la prestation.

                                            </p>
                                            <p>
                                                Vous pouvez à tout moment visualiser ou modifier vos conditions d’annulation de vos services dans votre boutique.
                                            </p>
                                            <p style={{width:'100%'}}>
                                                Pour modifier vos conditions d’annulation de vos services dans votre boutique :
                                            </p>
                                            <br/>
                                            <ol style={{fontFamily:'helveticaNeue',fontSize:'0.9rem'}}>
                                                <li>Consultez <strong>votre Boutique</strong> sur my-alfred.io </li>
                                                <li>Cliquez sur l’onglet <strong>Mes paramètres de réservation</strong> </li>
                                                <li>Sélectionnez le type de condition d’annulation de réservation de vos services puis cliquez sur
                                                     <strong> Enregistrer</strong></li>

                                            </ol>
                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "70%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{fontSize:18}}
                                        >
                                            Comment gérer ma photo de couverture ?
                                        </Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <p>
                                                Votre photo de couverture est la photo positionnée en en-tête de votre boutique. Elle sera visible
                                                des utilisateurs du site.
                                                La photo de couverture peut refléter vos goûts, vous permettre de mettre votre travail en avant etc.
                                                Par défaut, My-Alfred attribue une photo de couverture à votre boutique.

                                            </p>
                                            <p>
                                                Vous pouvez à tout moment visualiser, ajouter ou supprimer votre photo dans votre boutique.
                                            </p>
                                            <p style={{width:'100%'}}>
                                                Pour ajouter ou supprimer votre photo de couverture  :
                                            </p>
                                            <br/>
                                            <ol style={{fontFamily:'helveticaNeue',fontSize:'0.9rem'}}>
                                                <li>Consultez <strong>votre Boutique</strong> sur my-alfred.io </li>
                                                <li>Cliquez sur le crayon pour modifier, en haut à droite de votre photo de couverture </li>
                                                <li>Sélectionnez votre photo de couverture </li>
                                                <li>Cliquez sur <strong>Valider</strong> </li>

                                            </ol>
                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>

                        </Grid>
                        <Grid container>
                            <h3>Identification et vérification</h3>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "70%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{fontSize:18}}
                                        >
                                            Fonctionnement ?
                                        </Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <p>
                                                Chez My-Alfred nous souhaitons que les membres puissent proposer et consommer des services en toute
                                                sécurité.  C’est la raison pour laquelle , nous vous laissons la possibilité de nous fournir une pièce
                                                d’identité officielle lorsque vous êtes utilisateur et souhaitez simplement consommer des services.
                                                Lorsque vous souhaitez proposer vos services et devenir Alfred, nous vous demanderons une pièce
                                                d’identité.  Certains clients seront sensibles à cette vérification d’identité et feront plus
                                                facilement le choix de votre boutique.  Cependant, votre pièce d’identité ne sera jamais partagée et
                                                visible par un autre utilisateur de My-Alfred.

                                            </p>
                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            <Grid item xs={12}>
                            <ExpansionPanel
                                style={{ border: "none", boxShadow: "none", width: "70%" }}
                            >
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                >
                                    <Typography
                                        style={{fontSize:18}}
                                    >
                                        A quel moment dois-je fournir une pièce d'identité ?
                                    </Typography>

                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container>
                                        <p>
                                            Pour devenir Alfred, vous devez fournir une pièce d’identité en règle qui peut être soit une carte
                                            nationale d’identité soit un passeport.  Vous pouvez fournir cette pièce d’identité lors de la création
                                            de votre boutique ou plus tard dans le menu Votre profil.  La vérification de votre pièce d’identité
                                            est indispensable pour Devenir Alfred et pour que votre boutique soit visible des autres autres membres
                                            My-Alfred.

                                        </p>
                                        <p>
                                            Vous pouvez à tout moment insérer votre pièce d'identité .
                                        </p>
                                        <p style={{width:'100%'}}>
                                            Pour insérer une pièce d’identité :
                                        </p>
                                        <br/>
                                        <ol style={{fontFamily:'helveticaNeue',fontSize:'0.9rem'}}>
                                            <li>Consultez <strong>votre Profil</strong> sur my-alfred.io </li>
                                            <li>Cliquez sur l’onglet <strong>Confiance & vérification</strong> de votre compte </li>
                                            <li>Sélectionnez le type de pièce Passeport ou Carte nationale d’identité</li>
                                            <li>Cliquez sur Recto pour télécharger votre photo de pièce d’identité </li>
                                            <li>Cliquez sur Verso pour ajouter le verso de votre pièce d’identité.</li>

                                        </ol>
                                    </Grid>

                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "70%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{fontSize:18}}
                                        >
                                            Quel type de pièce d'identité puis-je fournir ?
                                        </Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <p style={{width:'100%'}}>
                                                Vous pouvez ajouter une des pièces d’identité officielle suivante sur la plateforme My-Alfred :
                                            </p>
                                            <br/>
                                            <ul style={{fontFamily:'helveticaNeue',fontSize:'0.9rem'}}>
                                                <li>Passeport </li>
                                                <li>Carte Nationale d’Identité </li>


                                            </ul>
                                            <p>
                                                Si vous ajoutez votre carte Nationale d’identité, vous devrez télécharger 2 photos à savoir,
                                                le recto et le verso de votre document.  Si vous ajoutez votre passeport, 1 seule photo à télécharger
                                                est nécessaire mais assurez vous que que les numéros situés en bas de la page du passeport où figure
                                                votre photo soient bien visibles.

                                            </p>
                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            <Grid item xs={12}>
                                <ExpansionPanel
                                    style={{ border: "none", boxShadow: "none", width: "70%" }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon style={{ fontSize: 25 }} />}
                                    >
                                        <Typography
                                            style={{fontSize:18}}
                                        >
                                            Quelles sont les données partagées avec votre pièce d’identité ?
                                        </Typography>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <p style={{width:'100%'}}>
                                                Si vous acceptez de fournir une pièce d'identité officielle, les informations suivantes peuvent
                                                être visibles par les autres utilisateurs de la plateforme My-Alfred :
                                            </p>
                                            <br/>
                                            <ul style={{fontFamily:'helveticaNeue',fontSize:'0.9rem'}}>
                                                <li>La confirmation que votre pièce d'identité a bien été ajoutée </li>
                                                <li>Votre photo de profil et le prénom et le nom figurant sur votre profil </li>


                                            </ul>
                                            <p>
                                                La photo de votre carte d’identité ainsi que les informations (à l’exception de votre nom et prénom)
                                                ne seront jamais visibles par les autres utilisateurs de la plateforme My-Alfred.

                                            </p>
                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Layout>
        );
    };
}


export default withStyles(styles)(faq);
