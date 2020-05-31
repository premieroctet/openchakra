import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../../hoc/Layout/Layout';
import Grid from "@material-ui/core/Grid";
import Link from 'next/link';
import Footer from '../../hoc/Layout/Footer/Footer';

const styles = theme => ({
    hideed:{
        padding: '0 300px',
        marginTop:80,
        textAlign: 'justify',
        [theme.breakpoints.down('sm')]: {
            padding: '0 20px',
        },
    },
    a:{
        textDecoration: 'none',
        color: '#2FBCD3',
    }
});

class cguPage extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { classes } = this.props;


        return (
            <Layout>
                <Grid container className={classes.hideed}>
                    <Grid item xs={12} style={{textAlign:'center', marginBottom: 50}}>
                        <h2>Conditions générales d'utilisation et de service de My-Alfred</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{color: '#2FBCD3'}}>1 – Préambule</h3>
                        <p>Merci d’utiliser la place de marché dénommée My-Alfred (ci-après désignée la « Place de marché My-Alfred »), spécialisée dans la mise en relation de particuliers et de professionnels, propriété́ de la société́ My-Alfred, société́ par actions simplifiée au capital de 40.000 euros, immatriculée au Registre du commerce et des sociétés de Rouen sous le numéro SIREN 850 148 867, ayant son siège social 42 Rampe Bouvreuil – 76000 Rouen (ci-après « My-Alfred »).</p>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{color: '#2FBCD3'}}>2 – Définitions</h3>
                        <p>2.1 Les termes « My-Alfred », « nous », « nos » utilisés dans les présentes Conditions générales d'utilisation et de service de My-Alfred, renvoient à la société par actions simplifiées My-Alfred. </p>
                        <p>2.2 La Place de marché My-Alfred est une place de marché en ligne permettant à des utilisateurs inscrits, ci-après désignés les « Membres Utilisateurs », de consommer des services proposés par des utilisateurs inscrits ayant constitué une boutique de services, la « Boutique de services », ci-après désignés les « Membres Alfred ». L’ensemble des Membres Alfred et des Membres Utilisateurs seront collectivement désignés les « Membres ».</p>
                        <p>2.3 Chaque « Boutique de services » est constituée d’une ou plusieurs annonces de services, ci-après désignées les « Services de la boutique ». 
                            Chaque Service de la boutique peut être paramétré selon plusieurs critères :
                            <div style={{paddingLeft: '15px'}}>
                                <br/>• Chaque Service est constitué d’une ou plusieurs prestations proposées dans le cadre du service, ci-après désignées les « Prestations de service ». La typologie des Prestations de services est proposée par la Place de marché My-Alfred Un Membre Alfred peut demander un ajout de prestation de service à tout moment qui donnera lieu à une modération des équipes My-Alfred. Le Membre Alfred fixe seul les caractéristiques de ses Prestations de service, ses tarifs, son mode de rémunération ainsi que des éventuelles options liées à ses Prestations de service. Par exemple, une Boutique de services pourra comprendre des Services de manucure et de coiffure. Le Service de coiffure pourra être décomposé en Prestations de service telles que la couleur, la coupe, etc.
                                <br/>• Pour chaque Prestation de service, le Membre Alfred pourra choisir le matériel qu’il souhaite mettre à disposition dans le cadre de la réalisation de sa Prestation de service. L’ensemble des fournitures et du matériel est ci-après désigné le « Matériel ». 
                                <br/>• Pour chaque Prestation de service, le Membre Alfred pourra personnaliser ses conditions de réservation, à savoir son minimum de réservation, son délai de prévenance, son périmètre d’intervention etc. L’ensemble de ces conditions seront désignées les « Conditions de réservation ».
                            </div>
                        </p>
                        <p>2.4 La Place de marché My-Alfred se décline autour d’un site web et d’applications mobiles, ci-après collectivement désignés les « Interfaces en ligne ». Elle est constituée de différents services offerts par la Place de marché My-Alfred, ci-après désignés les « Services My-Alfred ». </p>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{color: '#2FBCD3'}}>3 – Inscription & acceptation des CGUS</h3>
                        <p>3.1 Pour devenir Membre de la Place de marché My-Alfred, les particuliers doivent être des personnes physiques âgées d’au minimum 18 ans ou, s’ils sont âgés entre 16 et 18 ans, autorisés par leurs représentants légaux. Il peut également s’agir d’une personne morale dûment constituée et en règle selon les lois du pays dans lequel la personne morale est établie, ayant la pleine capacité de contracter et de s’engager aux termes des présentes. 
                        Vous devez, par ailleurs, accepter les présentes Conditions générales d'utilisation et de service. </p>
                        <p>3.2 Les Conditions générales d'utilisation et de service de la Place de marché My-Alfred (ci-après désignées « CGUS ») présentent l’ensemble des droits, obligations et engagements des Membres et de My-Alfred (ci-après désignés collectivement les « Parties »). En vous inscrivant via les Interfaces en ligne de My-Alfred, vous acceptez irrévocablement l’intégralité de nos CGUS et vous devez vous y conformer. Ainsi, les CGUS vous lient juridiquement à My-Alfred. Toute notre équipe se tient à votre disposition pour répondre à vos questions concernant les CGUS.</p>
                        <p>3.3 L’utilisation ou le téléchargement de l’application My-Alfred à partir de l’Apple Store d’Apple nécessite d’accepter le contrat de licence utilisateur final de l’Application sous licence d’Apple.</p>
                        <p>3.4 Les CGUS sont applicables dès l’inscription d’un Membre jusqu’à sa résiliation. Pour résilier ce contrat, les Membres pourront, à tout moment, nous envoyer un email qui entraînera la suppression du compte du Membre. Les Membres sont également en mesure de supprimer leur compte My-Alfred depuis le menu « paramètres du compte ».</p>
                        <p>3.5 Le Membre qui a la qualité de consommateur dispose, en application des articles L. 222-7 et suivants du Code de la consommation, d’un délai de rétractation de quatorze (14) jours calendaires révolus à compter de la date de conclusion des CGUS ou de souscription aux Services My-Alfred.
                        Le Membre peut exercer son droit de rétractation en utilisant le formulaire en ligne accessible depuis le bas de page, en cliquant sur nous contacter ou sur simple email adressé à <a className={classes.a} href="mailto:hello@my-alfred.io">hello@my-alfred.io</a> ou par toute autre déclaration de son choix. Dans ce dernier cas, sa déclaration doit être dénuée d’ambiguïté et exprimer clairement sa volonté de se rétracter. L’exercice du droit de rétractation dans le délai visé ci-dessus, emporte résolution des CGUS et/ou de la souscription aux Services My-Alfred de plein droit. L’espace personnel et toutes les informations afférentes au Membre sont alors anonymisés, sous réserve des stipulations de la politique de protection des données à caractère personnel accessible <a className={classes.a} href="#">ici</a>.
                        Au titre des présentes, le Membre Utilisateur donne son accord exprès à ce que My-Alfred lui fournisse les Services My-Alfred (à savoir notamment la mise en relation avec un ou des Membre(s) Alfred) avant le terme du délai de rétractation. Il en résulte que s’il exerce ensuite son droit de rétraction, il sera tenu au paiement proportionnel des services effectivement fournis, conformément aux dispositions de l’article L. 222-13 du Code de la consommation.</p>
                        <p>3.6 My-Alfred se réserve le droit de résilier sans préavis les présentes CGUS et de priver un Membre de l’accès à la Place de marché My-Alfred en cas de non-respect de ses stipulations ou de non-respect des règles, lois, obligations fiscales et sociales applicables au Membre.</p>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{color: '#2FBCD3'}}>4 – Étendue des Services My-Alfred</h3>
                        <p>4.1 La Place de marché My-Alfred permet à des Membres Utilisateurs de consommer des services proposés par des particuliers ou des professionnels et à des Membres Alfred de proposer leurs services au travers de la création de leur propre Boutique de services.
                        Les Prestations de services proposées par les Membres Alfred doivent être licites. Les Membres sont seuls décisionnaires de la concrétisation des réservations de Services. My-Alfred n’est ni mandataire ni prestataire de services et agit seulement en qualité de plateforme de mise en relation.</p>
                        <p>4.2 Un Membre Alfred peut publier au sein de sa Boutique de services dédiée : 
                            <div style={{paddingLeft: '15px'}}>
                                <br/>- les Services proposés et les types de Prestations réalisées dans ce Service, les tarifs associés à chacune des Prestations, un panier minimum de réservation, un périmètre d’intervention géographique associé à chaque Service ;
                                <br/>- ses disponibilités, sur lesquelles il exerce seul un contrôle absolu ;
                                <br/>- une présentation de ses Services, de lui-même ainsi que de ses diplômes, son expérience ou ses certifications. 
                            </div>
                        <br/>Le Membre Alfred est seul responsable de sa Boutique de services et de son contenu. 
                        </p>
                        <p>4.3 La Place de marché My-Alfred propose aux Membres Utilisateurs un moteur de recherche leur permettant de trouver des Membres Alfred capables de répondre à leurs besoins de services. La Place de marché My-Alfred simplifie la mise en relation en indiquant les disponibilités des Membres Alfred, les Prestations couvertes dans les Services demandés, le Matériel mis à disposition par le Membre Alfred ainsi que l’ensemble de ses Conditions de réservation. Les Membres disposent également d’un profil sur lequel ils exercent un contrôle exclusif. La Place de marché My-Alfred met ainsi à disposition de ses Membres un outil numérique afin de simplifier la réservation et le paiement des Prestations de service des Membres Alfred.</p>
                        <p>4.4 Pour ce faire, la Place de marché My-Alfred s’appuie sur le tiers de confiance MangoPay pour le paiement des Prestations de service. En utilisant ce système de paiement, les Membres acceptent les conditions de MangoPay disponibles <a className={classes.a} target="_blank" href="/static/assets/PSP_MANGOPAY_FR.pdf">ici</a>. Pour toutes questions et conditions relatives au paiement des Prestations de services, les Membres devront se référer aux conditions d’utilisation du tiers de confiance MangoPay.
                           <br/>S’agissant de la rémunération des Membres Alfred, les Membres Utilisateurs confient un mandat d’encaissement de la rémunération convenue avec le Membre Alfred au profit de la Place de marché My-Alfred, qui a en confié l’exécution technique à MangoPay. MangoPay dépose les fonds reçus du Membre Utilisateur sur un compte dédié avant de virer la somme sur le compte bancaire du Membre Alfred, après déduction des Frais de services revenant à My-Alfred, conformément à l’article 9 ci-dessous.
                           <br/>Les Membres Utilisateurs reconnaissent et acceptent qu’aucune des sommes ainsi perçues au nom et pour le compte des Membres Alfred n’emporte droit à intérêts. Les Membres acceptent de répondre avec diligence à toute demande de My-Alfred et, plus particulièrement, de toute autorité administrative ou judiciaire compétente en particulier en matière de prévention ou de lutte contre le blanchiment. Notamment, les Membres acceptent de fournir, sur simple demande, tous justificatifs d’adresse ou d’identité utile. En l’absence de réponse du Membre à ces demandes, My-Alfred pourra prendre toute mesure qui lui semblera appropriée notamment le gel des sommes versées, la suspension du compte du Membre ou la résiliation des CGU.
                           <br/>My Alfred garantit aux Membres que :
                           <div style={{paddingLeft: '15px'}}>
                                <br/>- les fonds destinés aux Membres Alfred ne sont détenus à aucun moment par My-Alfred,
                                <br/>- My Alfred n’a pas accès aux données bancaires des Membres, lesquels restent entièrement sécurisées chez MangoPay qui n’y a accès que pour les besoins de la demande de règlement concernée,
                                <br/>- aucune donnée autre que celles nécessaires à l’exécution de la demande de règlement n’est demandée aux Membres,
                                <br/>- les données ne sont ni utilisées ni consultées ni stockées à des fins autres que l’opération demandée par le Membre Utilisateur.
                            </div>
                        </p>
                        <p>4.5 Critères de classement des Alfred :
                            Les 20 premiers Alfred sont présentés au Membre Utilisateur, ce nombre pouvant être supérieur si plusieurs Alfred proposent le même Service et inférieur si moins de 20 Alfred proposent une prestation en rapport avec les critères de recherche renseignés.
                            Parmi les Alfred, sont présentés en priorité les Alfred répondant aux critères de la recherche en termes de mot(s) clé, disponibilité(s) et périmètre d’intervention. Parmi les Afred répondant à ces critères de recherche, seront présentés en priorité, les Alfred les mieux notés, suivis des Alfred ayant le plus de réservations, puis les Alfred qui acceptent la réservation instantanée, puis les Alfred avec le plus d'expérience, puis ceux ayant le plus de certifications, puis les Alfred ayant le délai de réponse le plus rapide et enfin, les Alfred les plus récemment inscrits.</p>
                        <p>4.6 My-Alfred n’exerce aucun contrôle sur les Boutiques, Services et Prestations dont seuls les Membres Alfred sont responsables ; My-Alfred n’en garantit donc pas la qualité, la sécurité et la légalité.</p>
                        <p>4.7 Dans le cadre de la promotion de la Place de marché My-Alfred et afin de donner plus de visibilité aux Boutiques et aux Services des Membres Alfred, les Services ainsi que les Boutiques, leur contenu et tout autre contenu de Membre, rendu public sur la Place de marché My-Alfred, sont susceptibles d’être publiés sur d’autres sites, d’autres applications, partagés par email ou encore utilisés dans le cadre de campagnes publicitaires médias ou hors médias.</p>
                        <p>4.8 My-Alfred peut procéder à la vérification de l’identité de ses Membres, notamment pour se conformer à la réglementation fiscale. Vérifier l’identité des Membres sur internet est complexe, c’est pourquoi My-Alfred décline toute responsabilité au regard de la confirmation de l’identité des Membres de la Place de marché My-Alfred.</p>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{color: '#2FBCD3'}}>5 - Obligations, responsabilité et engagements de My-Alfred</h3>
                        <p>5.1 My-Alfred met à disposition la Place de marché My-Alfred. A ce titre, My-Alfred ne vend, revend, fournit ou contrôle ni les Boutiques de services, ni les Services proposés sur la Place de marché My-Alfred. Les Alfred sont seuls responsables de leur Boutique, des contenus, des Services et Prestations associés et de leur exécution. Les Membres Alfred s’engagent à réaliser les Services en personne, n’étant en aucun cas autorisés à sous-traiter la réalisation de leurs Services.
                        Ainsi, lorsqu’un Membre Utilisateur et un Membre Alfred procèdent à une réservation, un contrat les lie sans que My-Alfred n’y soit lié de quelconque manière.</p>
                        <p>5.2 Obligation d’information des Membres Alfred professionnels envers les Membres Utilisateurs :
                        Le Membre Alfred sera tenu de fournir au Membre Utilisateur, à première demande, tout élément permettant de justifier de sa qualité de professionnel (extrait Kbis, numéro d’immatriculation au Registre du Commerce et des Sociétés, fiche INSEE, etc.), que le Membre Utilisateur vérifiera.
                        Le Membre Alfred garantit en outre être qualifié, compétent et disposer de tous les diplômes et/ou titres éventuellement requis pour proposer ses Services.
                        Le Membre Alfred agissant à titre professionnel doit respecter l'ensemble des règles et obligations lui incombant à ce titre et plus particulièrement le droit de la consommation (clarté de l'offre faite au consommateur, information du consommateur, conditions d’annulation, disponibilité des Services, droit de rétractation du consommateur, facturation et vente à distance, garanties, etc.), du droit des sociétés, du droit social, du droit fiscal, de la législation relative aux pratiques commerciales déloyales, trompeuses ou agressives, qu'il affirme parfaitement connaître.</p>
                        <p>
                        5.3 Obligations d’information des Membres Alfred consommateurs et non professionnels envers les Membres Utilisateurs :
                        Le Membre devra fournir les informations suivantes :
                            <div style={{paddingLeft: '15px'}}>
                                <br/>-	le prix total du Service proposé, y compris le cas échéant, tous les frais supplémentaires exigibles, sur la base du prix proposé pour les Services dans sa Boutique ;
                                <br/>-	la possibilité pour le Membre Utilisateur de se rétracter ou non ;
                                <br/>-	les dispositions du code civil relatives au droit des obligations et de la responsabilité civile applicables à la relation contractuelle, par l'affichage d'un lien hypertexte.
                            </div>
                        </p>
                        <p>5.4 My-Alfred n’est en aucun cas responsable des contenus, de leur véracité, leur légalité ou encore de la qualité des Boutiques (et de leurs contenus) proposées par les Membres Alfred. My-Alfred décline toute responsabilité au regard de l’exactitude de la description des Services, des Membres, des notations, des commentaires ou, plus largement, au regard de tout contenu publié par les Membres. My-Alfred n’approuve aucun membre, la mention “Membre vérifé” indiquant que My-Alfred a procédé à une simple vérification des documents déposés par le Membre et ne constituant en aucun cas une garantie de l’identité des Membres ou de leur capacité à contracter.</p>
                        <p>5.5 My-Alfred n’est aucunement responsable des pannes (internet, télécommunication) dont il n’a pas le contrôle, conduisant à une accessibilité nulle ou limitée à la Place de marché My-Alfred. Dans le cadre de la maintenance de ses serveurs ou en cas de capacité limitée de ses serveurs, My-Alfred se réserve le droit de restreindre l’accessibilité à la Plateforme de façon temporaire afin de garantir la sécurité et la continuité de ses serveurs ou d’améliorer le fonctionnement de la Place de marché.</p>
                        <p>5.6 My-Alfred informera ses Membres des modifications majeures intervenues sur la Place de marché.</p>
                        <p>5.7 My-Alfred ne pourra être considérée comme dirigeant ou contrôlant aucun Membre Alfred, les Alfred agissant pour leur propre compte et leur propre profit. En acceptant les présentes CGUS, les Membres reconnaissent leur totale liberté et capacité de se livrer à d’autres activités et d’exercer d’autres emplois en dehors de la Place de marché.</p>
                        <p>5.8 My-Alfred n’entretient aucune relation contractuelle ni aucun lien capitalistique avec aucun des Membres et ne perçoit aucune rémunération autre que celles stipulées aux présentes à raison de la mise en relation entre les Membres.</p>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{color: '#2FBCD3'}}>6 – Obligation, responsabilité et engagements communs à tous les Membres</h3>
                        <p>6.1 Les Membres ont le devoir de se conformer à l’ensemble des lois, règlements, obligations fiscales et sociales et règles en vigueur dans le pays où ils résident ainsi qu’aux présentes CGUS. Ainsi, les Membres s’interdisent formellement : 
                            <div style={{paddingLeft: '15px'}}>
                                <br/>- de reproduire, utiliser ou stocker les informations et contenus présents sur la Place de marché, y compris l’ensemble des informations nominatives qui concernent les Membres ou en portant atteinte à la vie privée des Membres,
                                <br/>- d’adopter un comportement discriminant envers un Membre, au regard de son origine, son âge, son sexe, son état physique ou mental, son orientation sexuelle, etc. 
                                <br/>- d’utiliser la Place de marché My-Alfred afin de trouver un prestataire sans utiliser la Place de marché My-Alfred pour procéder à la réservation du service et ce dans le but d’éviter de payer les Frais de services dus My-Alfred ou pour toute autre raison.
                                <br/>- de ternir la réputation de la marque My-Alfred ou de nuire à My-Alfred de quelque façon que ce soit.
                                <br/>- d’utiliser des processus informatiques permettant de récupérer, d’aspirer, de collecter, d’utiliser et de stocker des informations (y compris l’ensemble des contenus des Membres, de My-Alfred, les données personnelles, etc.). 
                                <br/>- d’utiliser les contenus publiés sur My-Alfred à des fins commerciales ou de diffuser des messages à caractère commercial en dehors de l’objet de la Place de marché My-Alfred. Les Membres s’interdisent également d’utiliser la Place de marché My-Alfred afin de recruter ou solliciter des Membres Alfred dans un but autre que la réservation de ses Services au travers de la Place de marché y-Alfred (services tiers, recrutement, partenariat, etc.)
                                <br/>- de détourner, copier, endommager, décoder ou contourner par quelque moyen que ce soit la Place de marché My-Alfred ou de tenter de nuire à la Place de marché My-Alfred, d’en perturber les performances et le bon fonctionnement.
                                <br/>- de tenter de déchiffrer, décompiler, désassembler la Place de marché My-Alfred ainsi que toute rétro-ingénierie .
                                <br/>- plus généralement, de violer ou porter atteinte aux droits de My-Alfred et à ceux des tiers .
                            </div>
                            <br/>Tout manquement à ces règles est susceptible d'entraîner la fermeture provisoire ou définitive du compte et de l’accès à tout ou partie de la Place de marché My-Alfred. De plus, dans l’objectif de se conformer aux lois, règlements, décisions des autorités judiciaires ou administratives ou si un Membre renseigne son compte, son profil, sa Boutique, ses Services avec des informations erronées, frauduleuses, inexactes lors de la création de son compte ou ultérieurement, My-Alfred se réserve le droit de ne pas afficher, de supprimer ou de signaler à un tiers les contenus émanant du Membre concerné, y compris ses notations, commentaires, recommandations, d’annuler ses prochaines réservations confirmées, de supprimer temporairement ou définitivement le compte du Membre concerné et, en cas d’infraction grave ou répétée, de supprimer définitivement son accès à la Place de marché et aux Services My-Alfred.
                        </p>
                        <p>6.2 My-Alfred n’exerce aucun contrôle et n’est pas partie prenante aux contrats passés sur la Place de marché My-Alfred. Les Membres s’engagent à respecter les obligations fiscales liées à leur statut et sont seuls redevables des impôts et taxes liés à leur activité sur la Place de marché My-Alfred.
                        Conformément aux dispositions de l’article 242 bis du Code général des impôts, les Membres reçoivent lors de chacune de leurs transactions sur la Place de marché My-Alfred, une information claire et loyale sur les obligations sociales et fiscales auxquelles ils doivent se conformer.
                        Les Membres sont d’ores et déjà invités à se référer aux informations figurant :
                            <div style={{paddingLeft: '15px'}}>
                                <br/>- sur <a className={classes.a} target="_blank" href="https://www.impots.gouv.fr">www.impots.gouv.fr</a> concernant leurs obligations fiscales et plus particulièrement la page <a className={classes.a} target="_blank" href="https://www.impots.gouv.fr/portail/node/10841">https://www.impots.gouv.fr/portail/node/10841</a>.
                                <br/>- sur <a className={classes.a} target="_blank" href="https://www.urssaf.fr">www.urssaf.fr</a> concernant leurs obligations sociales et plus particulièrement la page <a className={classes.a} target="_blank" href="https://www.urssaf.fr/portail/home/espaces-dedies/activites-relevant-de-leconomie.htm">https://www.urssaf.fr/portail/home/espaces-dedies/activites-relevant-de-leconomie.htm</a>.
                            </div>
                            <br/>My-Alfred attire l’attention des Membres sur le fait que se présenter comme un consommateur ou un non-professionnel alors qu’ils agiraient dans le cadre d’une activité professionnelle habituelle ou régulière est susceptible de constituer une pratique commerciale trompeuse, punissable par un emprisonnement de 2 ans et une amende de 300.000 euros, le montant de l’amende pouvant être porté, de manière proportionnée aux avantages tirés du délit, à 10 % du chiffre d’affaires moyen annuel ou à 50 % des dépenses engagées pour la réalisation de la publicité ou de la pratique constituant ce délit, en application de l’article L.132-2 du Code de la consommation.
                            <br/>Les Membres Alfred pourront retrouver dans la rubrique « performances » les sommes perçues à l’occasion des activités réalisées au travers de la Place de marché My-Alfred. Les Membres s’engagent à déclarer loyalement aux services des impôts et aux organismes sociaux les sommes perçues au titre des activités réalisées sur la Place de marché My-Alfred.
                            <br/>Les Membres dégagent en conséquence My-Alfred de toute responsabilité et garantissent My-Alfred de toutes les conséquences découlant directement ou indirectement du non-respect de leurs obligations fiscales et sociales.
                            <br/>En cas de doute, il est recommandé aux Membres de prendre conseil auprès d’un tiers sur les obligations sociales et fiscales découlant de leur statut.
                        </p>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{color: '#2FBCD3'}}>7 – Obligation, responsabilité et engagements particuliers des Membres Alfred</h3>
                        <p>
                        7.1 La Boutique et les Services
                        Chaque Membre Alfred qui décide de créer une Boutique de services et des Services associés doit fournir des informations exactes sur les Services proposés et les conditions de réalisation de ces derniers. My-Alfred met à la disposition de ses Membres Alfred de nombreuses options de paramétrage que le Membre Alfred doit compléter pour fournir des informations au plus juste. La description du Service, des Prestations réalisées au sein de ce service, le Matériel fourni, le panier minimum de réservation, le délai de prévenance, le périmètre d’intervention, les conditions d’annulation ainsi que les disponibilités du Membre Alfred sont autant de paramètres de réservation qui permettent aux Membres Utilisateurs de réserver avec un maximum de transparence. Il appartient aux Membres Alfred de maintenir à jour leur Boutique, les Services ainsi que leur contenu et leurs disponibilités.
                        Dès lors qu’un Service est publié dans la Boutique de services du Membre Alfred, ce dernier s’engage à concéder de manière non exclusive mais à titre gratuit, au profit de My-Alfred, les droits de propriété intellectuelle permettant la publication des Services et de la Boutique de l’Alfred. 
                        Plus précisément, les droits de propriété intellectuelle concernés sont les suivants :
                            <div style={{paddingLeft: '15px'}}>
                                <br/>• droit de reproduire, faire reproduire ou d’autoriser un tiers à reproduire tout ou partie des contenus / contributions des Membres Alfred ;
                                <br/>• droit de diffuser, représenter, faire représenter ou diffuser ou encore autoriser un tiers à diffuser ou représenter les contenus et contributions des Membres Alfred ;
                                <br/>• droit de diffuser à des fins publicitaires et commerciales les contenus et contributions des Membres Alfred.
                            </div>
                            <br/>Ces droits concernent notamment l’ensemble des moyens de communication sur tout support (en ligne, hors ligne) sous toutes formes.
                        </p>
                        <p>7.2 Les Membres Alfred fixent le prix de leurs Prestations de services et sont seuls responsables des tarifs appliqués. Une fois la réservation validée par le Membre Alfred, ce dernier ne pourra réclamer un prix différent au Membre Utilisateur qui a choisi de réserver son Service.</p>
                        <p>7.3 Les Membres Alfred ont la possibilité de publier des photos afin de renforcer l’attractivité de leur Boutique ou de leurs Services. Les photos publiées par les Membres Alfred doivent refléter fidèlement la réalité et ne pas avoir pour objectif de duper les Membres Utilisateurs. My-Alfred pourra à tout moment imposer le nombre d’images, les images, le format, la résolution, etc.</p>
                        <p>7.4 Lorsqu’un Membre Alfred décide d’accepter une demande de réservation de l’un ou de plusieurs de ses Services par un Membre Utilisateur, ces Membres concluent un accord juridiquement contraignant. De ce fait, le Membre Alfred est tenu d’honorer le(s) Service(s) réservé(s) conformément aux conditions et caractéristiques du Service tel que décrit dans sa Boutique. 
                        En acceptant la demande de réservation, les Membres Alfred acceptent de payer les Frais de services réclamés par My-Alfred ainsi que les éventuelles taxes applicables. 
                        Les Membres Alfred ont la possibilité d’opter pour l’acceptation automatique des réservations des Membres Utilisateurs. Dans cette hypothèse, le contrat entre le Membre Alfred et le Membre Utilisateur sera formé définitivement dès l’étape réservation. »</p>
                        <p>7.5 My-Alfred recommande aux Membres Alfred de souscrire une assurance dédiée ou incluant leur activité résultant de l’utilisation de la Place de marché My-Alfred. En aucun cas, My-Alfred ne pourra l’imposer aux Membres dans la mesure où My-Alfred ne dirige ni ne contrôle en aucune manière l’activité des Membres de la Place de marché My-Alfred.</p>
                        <p>
                        7.6 Les Membres Alfred ont le devoir de se conformer à l’ensemble des lois, règlements, obligations fiscales et sociales en vigueur dans le pays où ils résident ainsi qu’aux présentes CGUS. Ainsi, les Membres Alfred s’interdisent formellement :
                            <div style={{paddingLeft: '15px'}}>
                                <br/>• d’enfreindre l’ensemble de la réglementation, des lois et obligations fiscales et sociales en vigueur dans leur pays de résidence,
                                <br/>• de proposer des services illégaux, contraires aux normes, aux règles, aux bonnes mœurs, 
                                <br/>• d’orienter des contenus de sorte à entraîner la confusion des Membres Utilisateurs tant sur le contenu de la Prestation que sur la Boutique de services.
                            </div>
                        </p>
                        <p>7.7 Si un Membre Alfred constate qu’un Membre adopte un comportement inapproprié, en ligne ou hors ligne, ce Membre doit en avertir les autorités compétentes ainsi que My-Alfred afin que les mesures appropriées puissent être prises.</p>
                        <p>7.8 Tout manquement à ces règles est susceptible d'entraîner la suppression de la Boutique, la fermeture provisoire ou définitive du compte et de l’accès à tout ou partie de la Place de marché My-Alfred. 
                        Outre les manquements aux obligations rappelées à l’article 6.1 ci-dessus, si un Membre Alfred ne remplit pas les critères de qualité - en étant sujet à des plaintes de la part des Membres Utilisateurs au regard de ses Prestations ou de son comportement, en recevant des notations et commentaires médiocres ou des réclamations suite à des annulations de réservations confirmées des Membres Utilisateurs ou en ne répondant pas aux demandes de réservation, My-Alfred se réserve le droit de ne pas afficher, de supprimer ou de signaler à un tiers les contenus du Membre concerné, y compris ses notations, commentaires, recommandations, d’annuler ses prochaines réservations confirmées, de supprimer temporairement ou définitivement le compte du Membre concerné et, en cas d’infraction  grave ou répétée, de supprimer définitivement son accès à la Place de marché et aux Services My-Alfred. Si My-Alfred considère qu’une action de blocage temporaire ou définitif à la Place de marché My-Alfred pour l’un de ses Membres est nécessaire pour assurer la sécurité, la propriété de My-Alfred et de ses Membres ou pour prévenir une fraude ou une activité illégale, My-Alfred pourra, sans préavis, prendre les mesures nécessaires contre ce Membre.
                        <br/>En cas de suppression définitive du compte de l’un des Membres pour les raisons ci-dessus exposées, le Membre s’interdit de créer un autre compte ou d’utiliser le compte d’un tiers pour accéder à la Place de marché.
                        </p>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{color: '#2FBCD3'}}>8 – Création d’un compte My-Alfred : accès, usage & sécurité</h3>
                        <p>8.1 Pour avoir pleine jouissance des fonctionnalités My-Alfred, les visiteurs doivent créer un compte sur la Place de marché My-Alfred pour devenir Membre. En devenant Membre, les visiteurs peuvent consulter les Boutiques de services, réserver des Services, gérer leur réservation, leur compte et leur profil. Si vous créez un compte Membre pour le compte d’une entité, vous devez certifier que vous être en capacité d’engager juridiquement ladite entité et d’accepter les CGUS au nom de cette personne morale.</p>
                        <p>8.2 La création du compte My-Alfred nécessite un email, un prénom, un nom, une adresse postale, l’indication d’un statut (professionnel ou particulier), un numéro de téléphone et un mot de passe. L’utilisation de réseaux sociaux tiers est possible pour procéder à l’inscription. Vous pouvez dissocier votre compte My-Alfred de vos réseaux sociaux à tout moment dans la rubrique « applications connectées » de votre compte.</p>
                        <p>8.3 Les informations saisies lors de la création d’un compte My-Alfred doivent être exactes. Elles doivent être maintenues à jour par les Membres dans les rubriques « Mon Compte » et « Mon profil » de la Place de marché My-Alfred.</p>
                        <p>8.4 Les Membres sont en mesure de s’assurer de la confidentialité et la sécurité de leur compte et des identifiants d’accès à ce dernier. Les Membres s’engagent à ne pas divulguer leurs informations de connexion à des tiers, à s’assurer qu’ils se déconnectent de leur session à chaque utilisation de la Place de marché My-Alfred et à ne pas créer plusieurs comptes sauf si le Membre y est expressément autorisé par My-Alfred. Si un Membre apprend que ses identifiants sont perdus, volés ou détournés, il doit prévenir My-Alfred qui prendra toutes les mesures nécessaires pour sécuriser son compte, étant entendu que My-Alfred ne pourra être tenu responsable des négligences de ses Membres à l’égard de la sécurité de leur compte.
                        Il est rappelé que les Membres sont seuls responsables de l’activité de leur compte.</p>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{color: '#2FBCD3'}}>9 – Conditions financières des transactions My-Alfred</h3>
                        <p>9.1 My-Alfred facture des Frais de service aux Membres Utilisateurs (appelés « Frais d’Utilisateur ») à hauteur de 18% du panier total de la transaction chacun, en contrepartie de l’utilisation de la Place de marché My-Alfred. Les Frais de service applicables (y compris les éventuelles taxes applicables) sont communiqués au Membre Utilisateur avant qu’il ne réserve un Service. My-Alfred se réserve le droit de modifier à tout moment les Frais de service et en informera les Membres dans un délai raisonnable avant l’entrée en vigueur des nouveaux tarifs. Ces modifications de frais n'auront pas d'effet sur les réservations effectuées avant leur date d’entrée en vigueur.</p>
                        <p>9.2 Dès lors qu’une réservation est confirmée, l’intégralité du prix doit être payée par le Membre Utilisateur au travers de la Place de marché My-Alfred et de son tiers de confiance MangoPay. Le prix payé est ensuite retenu sur un compte tiers, et ce jusqu’à la bonne exécution de la ou des Prestation(s) de service réservée (s) par le Membre Utilisateur. Le paiement est libéré dès lors que le Membre Utilisateur a confirmé la bonne exécution de la Prestation, conformément à la description du Service. Dès lors que le Service est réalisé et conforme à la description faite par le Membre Alfred dans sa Boutique, le Membre Utilisateur communiquera un code au Membre Alfred, déclenchant la libération du paiement sur son compte bancaire dans un délai de 72 heures. 
                        Les Membres renoncent expressément et irrévocablement à prétendre à un quelconque bénéfice lié à l’immobilisation des paiements reçus à l’occasion des transactions.</p>
                        <p>9.3 Dans le but de protéger les transactions effectuées sur la Place de marché My-Alfred, My-Alfred a mis en place un système de paiement sécurisé fiable au travers des protocoles SSL et SET. Les données bancaires sont protégées par cryptage et sont gérées par un tiers de confiance, MangoPay.</p>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{color: '#2FBCD3'}}>10 – Notations et commentaires</h3>
                        <p>10.1 Chaque Service réalisé par un Membre Alfred au profit d’un Membre Utilisateur pourra donner lieu à une notation réciproque publique et un commentaire public. Les Membres sont libres d’effectuer une notation ou non. La notation (à l’aide d’étoiles) reflète l’opinion des Membres Utilisateurs par rapport au Service réalisé par le Membre Alfred, son comportement, la qualité de son travail et le rapport qualité/prix, de même qu’elle reflète l’opinion des Membres Alfred sur le comportement et l’accueil du Membre Utilisateur. En aucun cas, les notations ne proviendront de My-Alfred et ne reflètent en rien l’opinion de My-Alfred au sujet de ses Membres. 
                        Les Membres s’engagent à rédiger des commentaires fondés et justes, reflétant la réalité. En aucun cas, les commentaires laissés ne peuvent être injurieux, discriminants ou diffamatoires. 
                        Les commentaires n’étant pas soumis à une vérification, ces derniers peuvent s’avérer infondés, injustes ou faux. Les Membres peuvent faire une demande de modération auprès de l’équipe My-Alfred s’ils ont la preuve du caractère infondé de la notation ou du commentaire. La responsabilité de My-Alfred ne peut être recherchée que dans l’hypothèse où nous avons connaissance du caractère illicite d’un commentaire et n’avons pas promptement réagi.</p>
                        <p>10.2 Les commentaires et notations sont publics sur la Place de marché My-Alfred. Ces commentaires et notations permettent aux Membres Utilisateurs et aux Membres Alfred d'accroître la confiance dans l’accord qu’ils concrétisent par une réservation.</p>
                        <p>10.3 La note associée au profil d’un Membre correspond à la moyenne de l’ensemble des évaluations du Membre concerné depuis son inscription sur la Place de marché.</p>
                        <p>10.4 Les commentaires sont classés par ordre chronologique du plus récent au plus ancien. Le délai de publication d’un commentaire est immédiat, il sera accessible tant que le Membre aura un compte ouvert sur la Place de marché. S’il se désinscrit ou si son compte est résilié, ses commentaires seront supprimés.</p>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{color: '#2FBCD3'}}>11 – Gestion des réservations, annulation et remboursement</h3>
                        <p>11.1 Les Membres sont seuls responsables des modifications qui sont susceptibles d’intervenir dans la réservation en cours ou confirmée sur la Place de marché My-Alfred. 
                        Les Membres peuvent s’accorder sur un nouveau prix et modifier leur réservation sur la Prestation à venir à la seule condition que les deux parties - Membre Alfred et Membre Utilisateur - soient d’accord sur ces modifications de la réservation.</p>
                        <p>11.2 Les Membres Utilisateurs sont susceptibles de procéder à l’annulation de leur réservation à tout moment en prenant garde aux conditions d’annulation définies par le Membre Alfred auprès de qui ils ont effectué leur réservation. My-Alfred n’offre aucune garantie de quelque nature que ce soit en cas d’annulation pour quelque raison que ce soit.</p>
                        <p>11.3 Dans l’hypothèse où, un Membre Alfred serait amené à annuler une réservation confirmée auprès d’un Membre Utilisateur, ce dernier serait remboursé de la totalité des frais engagés sur la Place de marché My-Alfred dans le cadre de la réservation concernée, en ce compris les Frais de services. Si le Membre Utilisateur le souhaite, My-Alfred pourra créditer la somme des frais engagés sur son compte afin de pouvoir procéder à une nouvelle réservation. 
                        Le Membre Alfred n’ayant pas choisi la réservation automatique, qui annule une réservation plus de 7 jours avant la date d’exécution convenue avec le Membre Utilisateur supportera une pénalité forfaitaire de 10€, portée à 20€ si l’annulation intervient 7 jours ou moins avant la date d’exécution du Service convenue dans la réservation. 
                        Dans cette hypothèse, le Membre Utilisateur sera en mesure de publier un commentaire sur la Boutique du Membre Alfred indiquant que ce dernier a annulé sa réservation.</p>
                        <p>11.4 My-Alfred se réserve le droit d’annuler une réservation confirmée pour le compte d’un Membre et d’effectuer les remboursements adéquats en cas de force majeure d’un des Membres. My-Alfred informera les Membres de l’annulation de la réservation et des raisons de l’annulation sauf si elles doivent rester confidentielles.</p>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{color: '#2FBCD3'}}>12 – Dommages</h3>
                        <p>12.1 Dans le cadre de la réalisation d’un Service auprès d’un Membre Utilisateur, le Membre Alfred est tenu de ne pas causer de dommages à la personne du Membre Utilisateur ni à l’ensemble de ses effets et biens personnels. Les Membres Alfred sont responsables de l’ensemble de leurs actions et omissions dans le cadre de l’exécution du Service.</p>
                        <p>12.2 Si un Membre Utilisateur apporte la preuve que l’intervention d’un Membre Alfred a causé des dommages à sa personne, à ses effets ou biens personnels, le Membre Utilisateur pourra demander la réparation du préjudice subi auprès du Membre Alfred. 
                        My-Alfred peut agir en tant que médiateur mais ne pourra en aucun cas être tenu responsable de quelconques dommages causés à un Membre dans le cadre d’une Prestation. 
                        My-Alfred se réserve le droit de rembourser le Membre Utilisateur en cas de dommages subis ou de mauvaise exécution du Service.
                        En cas de dommages, le Membre Utilisateur s’engage à contacter le service client My-Alfred afin d’exposer la situation.</p>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{color: '#2FBCD3'}}>13 – Obligations fiscales</h3>
                        <p>13.1 Les Membres sont tenus de remplir leurs obligations en termes de déclaration, de collecte, de versement ou d’inclusion de toute TVA ou autre taxe applicable.</p>
                        <p>13.2 Des réglementations fiscales peuvent imposer à My-Alfred un recueil des données complémentaires ou une vérification des données concernant ses Membres ou appliquer un certain nombre de taxes sur les versements opérés par la Place de marché My-Alfred ou son tiers de confiance.
                            <br/>C’est notamment le cas pour les Membres Alfred lorsque certains seuils sont dépassés cf. <a className={classes.a} target="_blank" href="https://bofip.impots.gouv.fr/bofip/11791-PGP.html?identifiant=BOI-BIC-DECLA-30-70-40-20-20190315">https://bofip.impots.gouv.fr/bofip/11791-PGP.html?identifiant=BOI-BIC-DECLA-30-70-40-20-20190315</a>
                            <br/>Les Membres Alfred s’engagent à nous communiquer à première demande et sans délai les éléments demandées.
                            <br/>Si un Membre refuse de fournir ses informations / documents fiscaux visant à nous acquitter de nos obligations, My-Alfred se réserve le droit de suspendre ou de clôturer le compte du Membre concerné et/ ou retenir les versements conformément à la législation jusqu’à résolution du litige.
                        </p>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{color: '#2FBCD3'}}>14. Limitation de responsabilité – Absence de garantie de My-Alfred</h3>
                        <p>
                        My-Alfred s’engage à mettre en œuvre tous les moyens nécessaires afin d’assurer au mieux l’accès aux Services My-Alfred et plus particulièrement à la Place de marché.
                            <br/>De manière générale, le Membre accepte et reconnaît que son utilisation de la Place de Marché, y compris les informations qu’il diffuse, est faite sous son unique et entière responsabilité.
                            <br/>En utilisant la Place de marché, le Membre s’engage à ne pas agir de manière dommageable ou ayant pour effet de causer un préjudice à l’image, aux intérêts ou aux droits de My-Alfred, d’endommager ou de rendre inopérante la Place de marché.
                            <br/>My-Alfred ne saurait être tenue pour responsable et ne saurait être tenue d’indemniser un Membre du préjudice direct ou indirect qui résulterait de l’indisponibilité de la Place de marché. My-Alfred ne saurait à cet égard être tenue pour responsable de tout dommage résultant de la perte, de l’altération ou de toute utilisation frauduleuse de données, de la transmission accidentelle de virus ou autres éléments nuisibles, de l’attitude ou comportement d’un tiers. Elle n’encourt aucune responsabilité du fait (i) de l’impossibilité d’accéder à la Place de marché, (ii) d’un mauvais usage de la Place de marché (iii) de la saturation du réseau internet, (iv) d’éventuels dysfonctionnements sur les terminaux mobiles utilisés par les Membres, (v) en cas de force majeure ou de fait indépendant de sa volonté.
                            <br/>My-Alfred est responsable de la fourniture des Services My-Alfred, laquelle constitue une obligation de moyens. La responsabilité de My-Alfred se limite en ce sens aux seuls dommages directs subis par le Membre à raison de l’utilisation des Services My-Alfred, à l’exclusion de tout autre. My-Alfred ne peut en aucun cas être tenue responsable des dommages indirects causés à un Membre et notamment de toute perte de clientèle, perte de profit, manque à gagner, atteinte à l’image.
                            <br/>La charge de la preuve du dommage revient au Membre et toute demande de dommage-intérêts du Membre doit être initiée auprès de My-Alfred dans un délai de douze (12) mois à compter du fait générateur à l’origine du dommage, sous réserve des dispositions d’ordre public édictées par le Code de la consommation.
                            <br/>Le Membre est informé qu’en cas de panne, de maintenance, ou de mise à jour des systèmes, l’accès à son compte personnel pourra être suspendu temporairement. My-Alfred s’efforce de prévenir les Membres et fait ses meilleurs efforts en vue de rétablir l’accès aux Services My-Alfred dès que possible.
                            <br/>La responsabilisé de My-Alfred n’est pas engagée lorsque l’impossibilité de fournir correctement les Services My-Alfred est due à un cas de force majeure (telle que définie par l’article 1218 du Code civil). My-Alfred décline toute responsabilité dans le cas où les Services My-Alfred ne répondraient pas aux exigences et besoins spécifiques des Membres.
                            <br/>Ni My-Alfred, ni, le cas échéant, ses hébergeurs et fournisseurs de technologies, ne pourront être tenus responsables en cas de dommage subi par le Membre et résultant de :
                            <div style={{paddingLeft: '15px'}}>
                                – une faute du Membre ;
                                – un non-respect par le Membre des CGUS ;
                                – l’accès par un tiers à ses données d’identification, sur autorisation du Membre ;
                                – l’usage frauduleux ou abusif des Services My-Alfred par le Membre ;
                                – une compromission par le Membre de la confidentialité de ses données d’identification ;
                                – l’interruption ou la défaillance des Services My-Alfred suite à des dysfonctionnements du réseau Internet, du réseau des télécommunications ou du réseau informatique ;
                                – toute inexactitude ou non-conformité des informations, produits, et autres contenus, incluant notamment les propres données renseignées par le Membre, concernant son profil, ses Services, n’incombant pas à My-Alfred ; et/ou
                                – tout usage que le Membre ferait des informations mises à sa disposition par My-Alfred relatives aux Services, le Membre restant seul responsable de ses décisions et de ses obligations sociales et fiscales (notamment les dispositions du Code de travail, du Code de la sécurité sociale, du Code général des impôts et des conventions collectives applicables).
                            </div>
                            <br/>L’assurance de responsabilité civile professionnelle de My-Alfred est souscrite auprès de Générali, 2 Rue Pillet-Will, 75009 Paris.
                        </p>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{color: '#2FBCD3'}}>15 – Suppression du compte</h3>
                        <p>Les Membres sont libres à tout moment de demander la suppression de leur compte depuis leur espace Mon compte. 
                        La suppression du compte est définitive. 
                        Si le Membre est un Membre Alfred, la suppression du compte implique l’annulation de l’ensemble des réservations acceptées à venir et un remboursement sur le compte du Membre Utilisateur. 
                        Si le Membre est un Membre Utilisateur, la suppression du compte implique l’annulation de l’ensemble des réservations acceptées à venir, moyennant - en fonction des conditions d’annulation du ou des Membres Alfred impacté(s) par cette annulation - des frais d’annulation. </p>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{color: '#2FBCD3'}}>16 – Données personnelles et respect de la vie privée</h3>
                        <p>16.1 Tous les Membres peuvent choisir ce qu’ils souhaitent rendre public sur la Place de marché My-Alfred, à l’exception du mot de passe qui restera confidentiel en toutes circonstances et de son prénom qui sera public en toutes circonstances. En revanche, dès lors qu’une réservation a été confirmée par un Membre Alfred et un Membre Utilisateur, les coordonnées des Membres sont réciproquement communiquées à l’un et à l’autre (nom, prénom, adresse postale, adresse email et numéro de téléphone).</p>
                        <p>16.2 Les mentions légales ainsi que la <Link href="/footer/privacypolicy"><a className={classes.a}>“Politique de Respect de la Vie Privée”</a></Link> font partie intégrante des obligations et conditions répertoriées dans les présentes CGUS. La Place de marché My-Alfred ayant recours à l’utilisation des cookies, vous pouvez à tout moment consulter la « Politique de Gestion des Cookies » et vous y opposer. Attention, l’opposition à l’utilisation des cookies est susceptible d’entraîner le dysfonctionnement de certaines fonctionnalités de la Place de marché My-Alfred.</p>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{color: '#2FBCD3'}}>17 – Indépendance des parties</h3>
                        <p>My-Alfred et ses Membres sont des parties totalement indépendantes, agissant chacun en leur nom et pour leur propre compte. Ni l’utilisation de la Place de marché My-Alfred, ni les présentes CGUS ne peuvent impliquer un quelconque lien de subordination, de mandat, de représentation, d’entreprise commune ou de relation employeur/salarié ou franchiseur/franchisé.</p>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{color: '#2FBCD3'}}>18 – Convention de preuve</h3>
                        <p>
                        Les données enregistrées numériquement sur les systèmes d’information que My-Alfred met en œuvre dans le cadre de la Place de marché feront foi entre les Parties, notamment quant à l’existence, au contenu, à l’imputabilité ou à la date d’un téléversement ou d’un téléchargement.
                            <br/>Ces mêmes données enregistrées numériquement l’emporteront également sur toutes autres données numériques ou tirages papier du Membre ou de ses propres systèmes d’information ainsi que sur tout autre mode de preuve indirecte, tel que le témoignage.
                            <br/>En conséquence, et sauf à pouvoir rapporter en justice la preuve que les systèmes d’information et les données enregistrées numériquement concernées ont pu être altérées ou faussées de sorte à retirer toute foi aux éléments de preuve fournis, le Membre ne peut pas contester les éléments de preuve numérique communiqués par My-Alfred.
                        </p>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{color: '#2FBCD3'}}>19 – Droit applicable et juridiction compétente</h3>
                        <p>19.1 Les présentes CGUS sont soumises au droit français. En fonction de leur lieu de résidence, des règlementations, normes, lois peuvent s’imposer aux Membres. Les Membres sont tenus de respecter la législation en vigueur dans leur pays de résidence.</p>
                        <p>
                        19.2 Sous réserve du paragraphe ci-dessous, toutes contestations qui pourraient s’élever entre les Membres et My-Alfred dans le cadre de l’exécution ou l'interprétation des présentes CGUS seront soumises au tribunal dans le ressort duquel le siège social de My-Alfred est établi.
                            <br/>S’agissant des Membres ayant la qualité de consommateurs, ceux-ci doivent s’adresser en priorité au service clientèle de My-Alfred par courrier électronique hello@my-alfred.io ou postal à MY ALFRED 42 Rampe Bouvreuil – 76000 Rouen.
                            <br/>Afin de faciliter le traitement rapide et efficace de votre réclamation écrite, nous vous recommandons d’intituler votre courriel ou courrier postal « Réclamation préalable à toute saisine du médiateur » et de communiquer à notre service clientèle les informations suivantes :
                            <div style={{paddingLeft: '15px'}}>
                                <br/>- vos coordonnées : civilité, prénom, nom, n° et nom de rue, code postal, ville, département, adresse électronique, le numéro de téléphone auquel vous êtes joignable et vos horaires de disponibilité,
                                <br/>- le motif de la réclamation,
                                <br/>- accompagné de tous les documents utiles à la compréhension de votre réclamation.
                            </div>
                            <br/>En cas d’échec de la demande de réclamation auprès du service clientèle ou en l’absence de réponse de ce service dans un délai de 30 jours, le client peut soumettre gratuitement le différend l’opposant à My-Alfred à un médiateur.
                            <br/>Il contactera alors l’Association Nationale des Médiateurs (ANM) soit par courrier en écrivant au 62 rue Tiquetonne 75002 PARIS soit par e-mail en remplissant le formulaire de saisine en ligne à l’adresse suivante www.anm-conso.com.
                            <br/>Les parties au litige restent libres d’accepter ou de refuser le recours à la médiation ainsi que, en cas de recours à la médiation, d’accepter ou de refuser la solution proposée par le médiateur.
                            <br/>My-Alfred informe également le client consommateur de l’existence d’une plateforme de Règlement en Ligne des Litiges (« RLL ») à laquelle il peut recourir ; elle est accessible depuis le lien suivant <a className={classes.a} target="_blank" href="http://ec.europa.eu/consumers/odr/">http://ec.europa.eu/consumers/odr/</a>. Le site internet suivant <a className={classes.a} target="_blank" href="www.economie.gouv.fr/mediation-conso">www.economie.gouv.fr/mediation-conso</a> comporte également toutes informations utiles en cas de litige transfrontalier.
                        </p>
                        <p>19.3 Toute contestation entre Membres à l’occasion de l’exécution ou l’interprétation des CGUS ou dans le cadre de l’exécution d’une réservation confirmée sera soumise à la compétence exclusive des juridictions selon la loi applicable. </p>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{color: '#2FBCD3'}}>20 – Stipulations générales</h3>
                        <p>20.1 Dans l’hypothèse où une ou plusieurs des stipulations des présentes serai(en)t invalidée(s) ou déclarée(s) inapplicable(s) ou nulle(s), seule(s) la ou lesdites condition(s) serai(en)t annulée(s) sans que cette annulation ne puisse affecter la validité et l’applicabilité des conditions restantes. Les Parties s’efforceront de remédier aux clauses inapplicables dans le même esprit que celui qui a présidé à la conclusion de leurs accords.</p>
                        <p>20.4 Les présentes CGUS, les droits et obligations des Membres ne pourront être cédés, délégués ou transférés sans l’accord préalable de My-Alfred.</p>
                        <p>20.5 L’ensemble des notifications et communications autorisées ou requises dans les présentes CGUS à destination des Membres de la Place de marché My-Alfred, seront effectuées électroniquement au travers d’emails, de notifications ou de services de messagerie. </p>
                    </Grid>
                </Grid>
                {/* <Footer/>*/}

            </Layout>
        );

    };
}


export default withStyles(styles)(cguPage);
