const KycDocumentStatus = require('mangopay2-nodejs-sdk/lib/models/KycDocumentStatus');

const CESU_NOTICE = 'Quel que soit votre statut, My Alfred est tenu de déclarer aux \
finances publiques vos revenus générés <b>si les deux conditions suivantes sont \
réunies dans l\'année civile :</b><ul><li>vos revenus dépassent 3000 euros</li>\
<li>vous avez réalisé vingt prestations ou plus</li></ul>';

const OUTSIDE_PERIMETER = 'Ce service est hors de votre périmètre.';

const SCHEDULE_TITLE = 'Précisez vos disponibilités si vous le souhaitez !';

const SCHEDULE_SUBTITLE = "Votre calendrier vous permet d'ajouter vos disponibilités.\
 Lorsque vous ajoutez ou modifiez vos disponibilités, seules les plages horaires indiquées pourront être réservées.\
 Vous pouvez très facilement ajouter une période de disponibilité en indiquant les dates de début et fin, les jours correspondants et des tranches horaires.\
 Vous pouvez également sélectionner une date ou plusieurs, indiquer si vous êtes disponible et sélectionner les tranches horaires."


const SHOP_CREATION_SUCCESSFUL = 'Vos services sont maintenant disponibles dans my Alfred';

const ID_CARD_CONFIRM_DELETION = 'Supprimer votre pièce d\'identité ?';
const REGISTRATION_PROOF_CONFIRM_DELETION = 'Supprimer votre document d\'immatriculation ?';

const MANGOPAY_MESSAGES = {
    'DOCUMENT_UNREADABLE': 'Pièce d\'identité illisible',
    'DOCUMENT_NOT_ACCEPTED': 'Pièce d\'identité invalide : carte d\'identité, passeport, permis de conduire ou titre de séjour attendu',
    'DOCUMENT_HAS_EXPIRED': 'Pièce d\'identité expirée',
    'DOCUMENT_INCOMPLETE': 'Pièce d\'identité incomplète ou illisible',
    'DOCUMENT_DO_NOT_MATCH_USER_DATA': 'Pièce d\'identité ne correspond pas à l\'identité que vous avez indiquée',
    'DOCUMENT_DO_NOT_MATCH_ACCOUNT_DATA': 'Pièce d\'identité ne correspond pas à vops coordonnées bancaires',
    'DOCUMENT_FALSIFIED': 'Pièce d\'identité falsifié',
    'DOCUMENT_MISSING': 'Pièce d\'identité vide',
    'UNDERAGE_PERSON': 'Vous devez avoir au minimum 18 ans',
    [KycDocumentStatus.Created]: 'Pièce d\'identité enregistrée, en attente de validation',
    [KycDocumentStatus.ValidationAsked]: 'Pièce d\'identité en cours de validation',
    [KycDocumentStatus.Validated]: 'Pièce d\'identité valide',
    [KycDocumentStatus.Refused]: 'Pièce d\'identité refusée, merci d\'en fournir une valide',
};

const INFOBAR_MESSAGE = {
    message: 'Renseignez-vous sur les restrictions COVID 19 avant de réserver.',
    showMore: 'En savoir plus'
};

const SHOWMORE = 'En savoir plus';

const SEARCHBAR = {
    what: 'Quel service ?',
    where: 'Où ?',
    when: 'Quand ?',
    labelWhere: 'L\'adresse',
    labelWhat: 'Le service',
    labelWhen: 'Les dates'
};

const NAVBAR_MENU = {
    ourServices: 'Nos services',
    myServices: 'Mes services',
    registerServices: 'Proposer mes services',
    ourTeam: 'Notre équipe',
    contactUs: 'Nous contacter',
    aboutUs: 'À propos',
    ourCom: 'Notre communauté',
    signIn: 'Inscription',
    logIn: 'Connexion'
};

const BANNER_PRESENTATION = {
    title: 'Et si vous pouviez réserver n\'importe quel service ?',
    text: 'Stressez moins. En quelques clics, trouver la personne et le service dont vous avez besoin.',
    button: 'Découvrir'
};

const CATEGORY = {
    title: 'Catégories',
    text: 'Des milliers de services à découvrir',
    button: 'Tout découvrir'
};

const BECOME_ALFRED = {
    title: 'Devenir Alfred',
    text: 'Créez votre compte et proposez vos services',
    button: 'En savoir plus'
};

const RESA_SERVICE = {
    title: 'Proposez un service',
    text: 'Créez votre compte et proposez un service',
    button: 'C\'est parti !'
};

const HOW_IT_WORKS = {
    leftText: 'En quelques clics,\n' +
        'réserver le service et la\n' +
        'personne dont vous avez besoin.\n' +
        '#MyAlfred.',
    rightText: 'Vous pouvez consulter des centaines de profils, choisir votre Alfred, réservez et payez en ligne votre service. Notre équipe vous accompagne à chaque étape !'
};

const NEWS_LETTER = {
    title: 'Profitez des bon plans de la communauté avec la Newsletter des Alfred',
    text: 'Inscrivez-vous gratuitement à notre super Newsletter pour recevoir les informations et les bons plans de la communauté.',
    google: 'S\'inscrire avec Google',
    where: 'ou',
    email: 'Email',
    button: 'Je m\'inscris !'
};

const CMP_PRESENTATION = {
    placeholder: 'Ici, parlez-nous de vous, de votre personnalité, de vos passions ou encore de votre parcours. Soyez vous-même et montrez-nous votre personnalité !'
}
const getMangopayMessage = msg_id => {
    if (!msg_id) {
        return null;
    }
    return MANGOPAY_MESSAGES[msg_id] || `Erreur inconnue:${msg_id}`;
};

const SHOP = {
    addService: 'Ajoutez des services',
    createShop: 'Proposez votre premier service'
}

const BOOKING = {
    MSG_EVALUATE: 'Vous avez 15 jours pour évaluer votre client. Une fois que votre client aura rédigé son commentaire, il pourra consulter votre évaluation et vous pourrez consulter la sienne !'
}

const FAQ = {
    become_: {
        heading: 'Devenir Alfred',
        1: {
            title: 'Qui peut devenir Alfred ?',
            text: 'Nous sommes tous des Alfred ! Dès l’âge de 16 ans, vous pouvez devenir Alfred en créant votre propre boutique de service(s) sur My-Alfred.Votre inscription et la mise en ligne de votre boutique sont entièrement gratuites et ne demandent aucun frais au préalable ou abonnement vous engageant sur la durée. Vous pouvez proposer immédiatement vos talents, vos compétences sur My-Alfred en choisissant la liste des services que vous souhaitez proposer. Nous avons répertorié pour vous plus de 2000 prestations classées dans des services et des catégories. Alors, prêt à rejoindre l’aventure ? Je deviens alfred maintenant !'
        },

        2: {
            title: 'Comment créer sa boutique de service ?',
            text: 'My-Alfred vous permet de créer votre propre boutique de service(s) et de définir les services et prestations que vous souhaitez réaliser tout en vous offrant pleine liberté sur vos conditions ! Nos Alfred fixent leur(s) prix ainsi que leur(s) méthode(s) de facturation librement, et peuvent ajuster leur(s) prix à tout moment. Afin de proposer une visibilité et une confiance accrue entre les utilisateurs et les Alfred, la boutique de service(s) offre un niveau de personnalisation élevé permettant à tout à chacun de décrire son expertise, ses diplômes et certifications, des options liées à ses services, le matériel fourni dans le cadre de son service ou encore ses disponibilités. Les Alfred sont également libres de choisir leurs propres conditions de réservation et d’annulation ! ',
            stageTitle: 'Simple et rapide, la création de votre boutique se déroule en 3 étapes et ne vous prendra  quelques minutes :',
            stage1: 'Etape 1 : Sélection des services<br/> A travers cette étape, vous pouvez sélectionner les services que vous souhaitez réaliser. Nous avons classé ces services dans des catégories pour vous permettre de trouver plus rapidement les services concernés. Un service n\'apparaît pas ? Contacter l’équipe My-Alfred à l’adresse <a href={\'mailto:unservicedeplus@my-alfred.io\'}>unservicedeplus@my-alfred.io</a> !',
            stage2: 'Etape 2 : Indiquez vos prix, vos disponibilités et conditions<br/> Pour chaque service sélectionné, vous devez renseigner un prix par prestation, vos disponibilités et vos conditions de réservation pour permettre à vos clients de réserver vos services avec un maximum d’informations.',
            stage3: 'Etape 3 : Indiquez vos prix, vos disponibilités et conditions<br/>\n' +
                '                        Cette dernière étape vous permet d’ajouter une photo de profil, de vérifier votre téléphone\n' +
                '                        portable, votre identité et d’indiquer si vous souhaitez réaliser vos services en tant que\n' +
                '                        particulier ou auto-entrepreneur.',
            stage4: 'C’est fini ! Vous avez maintenant votre propre boutique de services sur My-Alfred. A tout\n' +
                '                        moment, vous pouvez ajouter, modifier, supprimer un ou plusieurs services dans la rubrique ma\n' +
                '                        boutique !\n' +
                '\n' +
                '                        Pensez à maintenir votre calendrier à jour afin d\'apparaître dans les résultats de recherche des\n' +
                '                        utilisateurs :) !',
            stage5: '',
            stage6: ''
        },
        3: {
            title: 'Que dois-je déclarer dans mes revenus ?',
            text: 'My-Alfred est une plateforme appartenant à l’économie collaborative permettant à tout un chacun\n' +
                '                        de\n' +
                '                        consommer et/ou de proposer des services contre une rémunération.\n' +
                '                        L’économie collaborative est tout à fait légale à condition de déclarer ses revenus et d’adopter\n' +
                '                        le statut correspondant en fonction de la nature occasionnelle ou non de vos services.\n' +
                '                        En tant que particulier, vous devez vous devez déclarer le montant de vos prestations dans vos\n' +
                '                        revenus dès lors que vous avez perçu plus de 3 000 € ou effectué plus de 20 transactions au\n' +
                '                        cours\n' +
                '                        de l’année précédente, mais vous n’avez pas de déclaration sociale ou de TVA à réaliser.\n' +
                '                        Si votre activité n’est pas occasionnelle mais régulière, vous devez déclarer vos revenus et\n' +
                '                        payer des cotisations sociales. Dans ce cas, le statut d’auto-entrepreneur est alors\n' +
                '                        parfaitement adapté pour vous.'
        }
    },
    addShop: {
        heading: 'Créer votre boutique de service',
        1: {
            title: 'Comment ajouter un nouveau service dans ma boutique ?',
            text: 'Vous pouvez à tout moment ajouter de nouveaux services dans votre boutique.\n' +
                '                        Pour cela, rendez-vous dans votre boutique et cliquez sur <span style=\{\{color: \'#2FBCD3\'\}\}>ajouter un nouveau service.</span><br/>\n' +
                '                        Vous devez ensuite suivre les différentes étapes d’ajout d’un nouveau service comme lors de\n' +
                '                        la création de votre boutique.',
            stageTitle: '',
            stage1: '',
            stage2: '',
            stage3: '',
            stage4: '',
            stage5: '',
            stage6: '',
        }, 2: {
            title: 'Comment fixer le prix de mes prestations ?',
            text: '  Pour chaque service sélectionné, il vous est proposé une ou plusieurs prestations.\n' +
                '                        Vous devez selectionner les prestations que vous souhaitez effectuer et pour lesquelles un prix\n' +
                '                        doit\n' +
                '                        être renseigné. Le prix de votre prestation doit être indiqué en tenant compte du mode de\n' +
                '                        facturation.\n' +
                '                        Un mode de facturation vous est proposé par défaut mais vous pouvez le modifier si ce dernier ne\n' +
                '                        vous convient pas.  Vous pouvez à tout moment visualiser ou modifier le prix et le mode de facturation de vos\n' +
                '                        services dans\n' +
                '                        votre boutique.',
            stageTitle: 'Pour modifier le prix de vos prestations :',
            stage1: 'Consultez votre Boutique sur my-alfred.io',
            stage2: 'Cliquez sur l’onglet <strong>Mes services</strong>',
            stage3: 'Cliquez sur <strong>Modifier</strong> dans un service',
            stage4: 'Modifier les prix de vos prestations puis cliquez sur <strong>Enregistrer</strong>',
            stage5: '',
            stage6: '',
        }, 3: {
            title: 'A quoi servent les options dans ma boutique de service ?',
            text: ' Pour chaque service, vous avez la possibilité d’ajouter une option de facturation.\n' +
                '                        Cette option vous permet de compléter le prix de votre prestation en ajoutant un supplément de\n' +
                '                        prix que le client pourra sélectionner. Par exemple, vous pouvez ajouter une option\n' +
                '                        “retrait et livraison” et indiquer le prix de cette option. Vous pouvez à tout moment visualiser ou modifier les options de vos services dans votre\n' +
                '                        boutique.',
            stageTitle: 'Pour modifier les options d\'un service :',
            stage1: 'Consultez <strong>votre Boutique</strong> sur my-alfred.io',
            stage2: 'Cliquez sur l’onglet <strong>Mes services</strong>',
            stage3: 'Cliquez sur <strong>Modifier</strong> dans un service',
            stage4: 'Modifier les options de vos prestations puis cliquez sur <strong>Enregistrer</strong>',
            stage5: '',
            stage6: '',
        }, 4: {
            title: 'A quoi correspond le matériel fourni dans ma boutique de service ?',
            text: ' Pour chaque service, vous pouvez sélectionner le matériel et les consommables qui seront\n' +
                '                        utilisés lors\n' +
                '                        de votre prestation. Lorsqu’un client parcourra votre boutique ou selectionnera vos services,\n' +
                '                        il pourra alors connaître les équipements dont vous disposez pour la prestation et les\n' +
                '                        consommables\n' +
                '                        que vous fournissez. Certains services nécessitent du matériel spécifique.\n' +
                '                        Indiquez que vous disposez de ce matériel offre à vos clients un gage de qualité et de\n' +
                '                        professionnalisme au regard des services que vous pouvez réaliser !  Vous pouvez à tout moment visualiser ou modifier le matériel et consommables fournis dans vos\n' +
                '                        services dans votre boutique.',
            stageTitle: 'Pour modifier le matériel fourni dans votre service :',
            stage1: 'Consultez <strong>votre Boutique</strong> sur my-alfred.io',
            stage2: 'Cliquez sur l’onglet <strong>Mes services</strong>',
            stage3: 'Cliquez sur <strong>Modifier</strong> dans un service',
            stage4: 'Sélectionnez le matériel et consommables puis cliquez sur <strong>Enregistrer</strong>',
            stage5: '',
            stage6: '',
        }, 5: {
            title: 'Comment définir un montant minimum pour mon service ?',
            text: ' Le montant minimum de réservation correspond au panier minimum requis pour réserver ce service.\n' +
                '                        Si vous indiquez un montant de 10€, les clients ne pourront pas réserver vos services si la\n' +
                '                        somme des\n' +
                '                        prestations n’atteint pas ce montant. Vous pouvez à tout moment visualiser ou modifier le montant minimum de vos services dans votre\n' +
                '                        boutique.',
            stageTitle: 'Pour modifier le montant minimum d\'un service :',
            stage1: 'Consultez <strong>votre Boutique</strong> sur my-alfred.io',
            stage2: 'Cliquez sur l’onglet <strong>Mes services</strong>',
            stage3: 'Cliquez sur <strong>Modifier</strong> dans un service',
            stage4: 'Modifiez le montant minimum puis cliquez sur <strong>Enregistrer</strong>',
            stage5: '',
            stage6: '',
        }, 6: {
            title: 'Comment définir mon périmètre d\'intervention ?',
            text: 'Votre périmètre d’intervention correspond à la zone dans laquelle vous souhaitez réaliser votre\n' +
                '                        service.\n' +
                '                        Par défaut, nous utilisons la ville de votre profil comme référence.\n' +
                '                        Cette adresse ne vous convient pas ? Vous pouvez changer votre ville de référence à tout moment\n' +
                '                        !\n' +
                '                        Le périmètre que vous indiquez va permettre à la plateforme My-Alfred de proposer votre service\n' +
                '                        si le\n' +
                '                        périmètre d’intervention correspond à l’adresse du client. Si le client se trouve à 5km de votre\n' +
                '                        adresse et que vous avez indiquez un périmètre de 10km votre service sera proposé !  Vous pouvez à tout moment visualiser ou modifier le périmètre d’intervention de vos services\n' +
                '                        dans\n' +
                '                        votre boutique.',
            stageTitle: 'Pour modifier le périmètre d\'intervention d\'un service :',
            stage1: 'Consultez <strong>votre Boutique</strong> sur my-alfred.io',
            stage2: 'Cliquez sur l’onglet <strong>Mes services</strong>',
            stage3: 'Cliquez sur <strong>Modifier</strong> dans un service',
            stage4: 'Modifiez le périmètre d\'intervention puis cliquez sur <strong>Enregistrer</strong>',
            stage5: '',
            stage6: '',
        }, 7: {
            title: 'A quoi correspond le délai de prévenance ?',
            text: 'Le délai de prévenance correspond au délai nécessaire entre la réservation et la réalisation du\n' +
                '                        service.\n' +
                '                        Par exemple, si vous indiquez un délai de 24 heures, un client devra réserver votre service au\n' +
                '                        moins 24\n' +
                '                        heures avant votre intervention.\n' +
                '                        Le délai de prévenance peut se définir en heure, jour ou mois en indiquant le chiffre\n' +
                '                        correspondant\n' +
                '                        avec les boutons + et - dans votre boutique. Vous pouvez à tout moment visualiser ou modifier le délai de prévenance de vos services dans\n' +
                '                        votre boutique.',
            stageTitle: 'Pour modifier le délai de prévenance d\'un service :',
            stage1: 'Consultez <strong>votre Boutique</strong> sur my-alfred.io',
            stage2: 'Cliquez sur l’onglet <strong>Mes services</strong>',
            stage3: 'Cliquez sur <strong>Modifier</strong> dans un service',
            stage4: 'Modifiez le délai de prévenance puis cliquez sur <strong>Enregistrer</strong>',
            stage5: '',
            stage6: '',
        }, 8: {
            title: 'Pourquoi décrire brièvement mon expertise ?',
            text: 'Pour chaque service sélectionné, vous pouvez brièvement décrire votre expertise.\n' +
                '                        N’hésitez pas à mettre en évidence vos compétences et votre expertise pour un service.\n' +
                '                        Les utilisateurs auront accès à ces informations, n’hésitez pas à valoriser vos réalisations\n' +
                '                        et vos atouts pour ce service ! Vous pouvez à tout moment visualiser ou modifier le contenu de votre expertise de vos services\n' +
                '                        dans votre boutique.',
            stageTitle: 'Pour modifier la description de votre expertise d\'un service :',
            stage1: 'Consultez <strong>votre Boutique</strong> sur my-alfred.io',
            stage2: 'Cliquez sur l’onglet <strong>Mes services</strong>',
            stage3: 'Cliquez sur <strong>Modifier</strong> dans un service',
            stage4: 'Modifiez le contenu de votre expertise puis cliquez sur <strong>Enregistrer</strong>',
            stage5: '',
            stage6: '',
        }, 9: {
            title: 'Pourquoi dois-je ajouter mes années d’expérience, mes diplômes et certifications ?',
            text: 'Pour chaque service sélectionné, vous pouvez indiquer une nombre d’année d’expérience pour ce\n' +
                '                        service et télécharger un diplôme et/ou une certification reçu pour ce service. Concernant le\n' +
                '                        diplôme,\n' +
                '                        vous pouvez indiquez le nom de votre diplôme et son année d’obtention. En téléchargeant votre\n' +
                '                        diplôme,\n' +
                '                        votre diplôme aura le statut de diplôme vérifié auprès des utilisateurs mais il ne sera jamais\n' +
                '                        visible\n' +
                '                        par ses derniers! C’est exactement le même principe pour votre certification. Vous pouvez à tout moment visualiser ou modifier le nombre d’années d’expérience et les diplômes\n' +
                '                        et certifications téléchargés de vos services dans votre boutique.',
            stageTitle: 'Pour modifier vos années d’expérience, vos diplômes et certifications d\'un service :',
            stage1: 'Consultez <strong>votre Boutique</strong> sur my-alfred.io',
            stage2: 'Cliquez sur l’onglet <strong>Mes services</strong>',
            stage3: 'Cliquez sur <strong>Modifier</strong> dans un service',
            stage4: 'Modifiez votre nombre d’années d’expérience, supprimer ou ajouter un diplôme ou une\n' +
                '                          certification\n' +
                '                          puis cliquez sur <strong>Enregistrer</strong>',
            stage5: '',
            stage6: '',
        }, 10: {
            title: 'Comment indiquer mes disponibilités dans mon calendrier ?',
            text: 'Il est indispensable d’indiquer vos disponibilités lors de la création de votre boutique afin\n' +
                '                        d\'apparaître dans les résultats de recherche des utilisateurs.\n' +
                '                        Lorsqu’un client recherchera un service sur la plateforme, il indiquera le service recherché, et\n' +
                '                        très souvent indiquera une date et/ou un heure à laquelle il souhaite obtenir ce service.\n' +
                '                        Si vos disponibilités indiquées dans votre calendrier correspondent à la demande du client, vos\n' +
                '                        services\n' +
                '                        seront proposés dans les résultats de la recherche !\n' +
                '                        Afin de renseigner convenablement votre calendrier, My-Alfred vous permet d’indiquer, jour par\n' +
                '                        jour vos\n' +
                '                        périodes de disponibilité. Plusieurs périodes peuvent être indiquées pour un même jour ou pour\n' +
                '                        une\n' +
                '                        période récurrente. Par exemple, vous pouvez être disponible le mercredi de 10h00 à 12h00 puis\n' +
                '                        de 14h00 à 18h00.\n' +
                '                        Vous pouvez ensuite étendre vos heures de disponibilités de vos journées sur une période de\n' +
                '                        dates.\n' +
                '                        Par exemple, les périodes horaires renseignées s’appliquent pour la période du 1er octobre 2019\n' +
                '                        au\n' +
                '                        20 décembre 2019.\n' +
                '                        Si vous proposez plusieurs services, les disponibilités indiquées peuvent être définies par\n' +
                '                        service\n' +
                '                        ou pour l’ensemble de vos services. Vous pouvez à tout moment visualiser ou modifier le calendrier de vos disponibilités\n' +
                '                        de vos service dans votre boutique.',
            stageTitle: 'Pour modifier votre calendrier de disponibilités :',
            stage1: 'Consultez <strong>votre Boutique</strong> sur my-alfred.io',
            stage2: 'Cliquez sur l’onglet <strong>Mon calendrier</strong>',
            stage3: 'Cliquez sur <strong>Ajouter ou modifier dans la page calendrier</strong>',
            stage4: 'Modifiez les jours, heures et périodes de vos disponibilités\n' +
                '                          puis cliquez sur <strong>Enregistrer</strong>',
            stage5: '',
            stage6: '',
        }, 11: {
            title: 'Comment les utilisateurs peuvent réserver ?',
            text: 'Pour l’ensemble de vos services, vous devez préciser la façon dont vous souhaitez que vos\n' +
                '                        clients\n' +
                '                        réservent vos services. Soit vous permettez à vos clients de réserver vos services\n' +
                '                        automatiquement,\n' +
                '                        soit vous souhaitez recevoir une notification pour laquelle vous avez 24H00 pour répondre. Lors\n' +
                '                        d’une\n' +
                '                        réservation automatique, le service est réservé et payé par le client.\n' +
                '                        Si vous avez opté pour une validation de la réservation, le service sera réservé et payé\n' +
                '                        qu’après votre\n' +
                '                        acceptation. Vous pouvez à tout moment visualiser ou modifier la façon dont vous souhaitez que vos clients\n' +
                '                        réservent vos services dans votre boutique.',
            stageTitle: 'Pour modifier la façon dont vos clients peuvent réserver vos services :',
            stage1: 'Consultez <strong>votre Boutique</strong> sur my-alfred.io<',
            stage2: 'Cliquez sur l’onglet <strong>Mes paramètres de réservation</strong>',
            stage3: 'Cliquez sur <strong>Modifier</strong>dans un service',
            stage4: 'Sélectionnez la façon dont vous souhaitez que vos clients réservent vos services\n' +
                '                          puis cliquez sur <strong>Enregistrer</strong>',
            stage5: '',
            stage6: '',
        }, 12: {
            title: 'A quoi correspondent mes conditions de réservation ?',
            text: 'Les conditions de réservation définissent les éléments que vous souhaitez vérifier à propos de\n' +
                '                        vos\n' +
                '                        clients. Vous pouvez exiger différentes options. Ces options sont cumulatives. Conditions My-Alfred<br/>\n' +
                '                        Adresse email et numéro de téléphone confirmés Photo de profil<br/>\n' +
                '                        Ces utilisateurs ont fourni une photo de profile. Pièce d\'identité officielle<br/>\n' +
                '                        Ces utilisateurs ont vérifié leur identité.  Recommandations d\'autres Alfred<br/>\n' +
                '                        Ces utilisateurs ont déjà utilisé des services avec My-Alfred, sont recommandés par d\'autres\n' +
                '                        Alfred et n\'ont pas reçu de commentaires négatifs. Il se peut que vous ayez moins de réservation si vous ajoutez des conditions. Les personnes qui\n' +
                '                        ne répondent pas à vos critères peuvent quand même vous envoyer une demande. Vous pouvez à tout moment visualiser ou modifier les conditions de réservation de vos services\n' +
                '                        dans votre boutique.',
            stageTitle: 'Pour modifier vos conditions de réservation de vos services :',
            stage1: 'Consultez <strong>votre Boutique</strong> sur my-alfred.io',
            stage2: 'Cliquez sur l’onglet <strong>Mes paramètres de réservation</strong>',
            stage3: 'Cliquez sur <strong>Modifier</strong>dans un service',
            stage4: 'Sélectionnez ou désélectionnez les options de vos conditions de réservation puis cliquez sur <strong>Enregistrer</strong>',
            stage5: '',
            stage6: '',
        }, 13: {
            title: 'Comment gérer ma photo de profil ?',
            text: 'La photo de votre profil sera visible des utilisateurs du site et leur permettra de déjà vous\n' +
                '                        connaître\n' +
                '                        ! Téléchargez une photo claire et lumineuse, de bonne qualité. Pour un rendu optimal, la photo\n' +
                '                        doit\n' +
                '                        être cadrée, sans lunette de soleil, en regardant l’objectif, avec seulement vous sur la photo. Vous pouvez à tout moment visualiser, ajouter ou supprimer votre photo dans votre boutique.\n' +
                '                      ',
            stageTitle: 'Pour ajouter ou supprimer votre photo de profil :',
            stage1: 'Consultez <strong>votre Profil</strong> sur my-alfred.io',
            stage2: 'Cliquez sur l’onglet <strong>Ma photo</strong>',
            stage3: 'Cliquez sur <strong>Télécharger une photo depuis votre ordinateur </strong>',
            stage4: 'Cliquez sur <strong>Valider</strong>',
            stage5: '',
            stage6: '',
        }, 14: {
            title: 'Comment définir mes conditions d\'annulations ?',
            text: 'Les conditions d’annulation définissent sous quelle condition vous acceptez l’annulation d’une\n' +
                '                        réservation par un client. Nous avons définis 3 niveaux de conditions d’annulation : <br /> Flexibles<br/>\n' +
                '                        Remboursement intégral lorsque l’annulation d’un client intervient jusqu\'à 1 jour avant la\n' +
                '                        prestation. Modérées<br/>\n' +
                '                        Remboursement intégral lorsque l’annulation d’un client intervient jusqu\'à 5 jours avant la\n' +
                '                        prestation. Strictes<br/>\n' +
                '                        Remboursement intégral lorsque l’annulation d’un client intervient jusqu\'à 10 jours avant la\n' +
                '                        prestation.  Vous pouvez à tout moment visualiser ou modifier vos conditions d’annulation de vos services\n' +
                '                        dans votre boutique.',
            stageTitle: 'Pour modifier vos conditions d’annulation de vos services dans votre boutique :',
            stage1: 'Consultez <strong>votre Boutique</strong> sur my-alfred.io',
            stage2: 'Cliquez sur l’onglet <strong>Mes paramètres de réservation</strong>',
            stage3: 'Sélectionnez le type de condition d’annulation de réservation de vos services puis cliquez\n' +
                '                          sur\n' +
                '                          <strong> Enregistrer</strong>',
            stage4: '',
            stage5: '',
            stage6: '',
        }, 15: {
            title: 'Comment gérer ma photo de couverture ?',
            text: 'Votre photo de couverture est la photo positionnée en en-tête de votre boutique. Elle sera\n' +
                '                        visible\n' +
                '                        des utilisateurs du site.\n' +
                '                        La photo de couverture peut refléter vos goûts, vous permettre de mettre votre travail en avant\n' +
                '                        etc.\n' +
                '                        Par défaut, My-Alfred attribue une photo de couverture à votre boutique. Vous pouvez à tout moment visualiser, ajouter ou supprimer votre photo dans votre boutique.\n' +
                '                      ',
            stageTitle: 'Pour ajouter ou supprimer votre photo de couverture :',
            stage1: 'Consultez <strong>votre Boutique</strong> sur my-alfred.io',
            stage2: 'Cliquez sur le crayon pour modifier, en haut à droite de votre photo de couverture',
            stage3: 'Sélectionnez votre photo de couverture',
            stage4: 'Cliquez sur <strong>Valider</strong>',
            stage5: '',
            stage6: '',
        },
    },
    idAndVerif: {
        heading: 'Identification et vérification',
        1: {
            title: 'Fonctionnement ?',
            text: 'Chez My-Alfred nous souhaitons que les membres puissent proposer et\n' +
                '                                                consommer des services en\n' +
                '                                                toute\n' +
                '                                                sécurité. C’est la raison pour laquelle , nous vous laissons la\n' +
                '                                                possibilité de nous fournir une\n' +
                '                                                pièce\n' +
                '                                                d’identité officielle lorsque vous êtes utilisateur et souhaitez\n' +
                '                                                simplement consommer des\n' +
                '                                                services.\n' +
                '                                                Lorsque vous souhaitez proposer vos services et devenir Alfred, nous\n' +
                '                                                vous demanderons une pièce\n' +
                '                                                d’identité. Certains clients seront sensibles à cette vérification\n' +
                '                                                d’identité et feront plus\n' +
                '                                                facilement le choix de votre boutique. Cependant, votre pièce d’identité\n' +
                '                                                ne sera jamais partagée\n' +
                '                                                et\n' +
                '                                                visible par un autre utilisateur de My-Alfred.',
            stageTitle: '',
            stage1: '',
            stage2: '',
            stage3: '',
            stage4: '',
            stage5: '',
            stage6: '',
        }, 2: {
            title: 'A quel moment dois-je fournir une pièce d\'identité ?',
            text: 'Pour devenir Alfred, vous devez fournir une pièce d’identité en règle\n' +
                '                                                qui peut être soit une\n' +
                '                                                carte\n' +
                '                                                nationale d’identité soit un passeport. Vous pouvez fournir cette pièce\n' +
                '                                                d’identité lors de la\n' +
                '                                                création\n' +
                '                                                de votre boutique ou plus tard dans le menu Votre profil. La\n' +
                '                                                vérification de votre pièce\n' +
                '                                                d’identité\n' +
                '                                                est indispensable pour Devenir Alfred et pour que votre boutique soit\n' +
                '                                                visible des autres autres\n' +
                '                                                membres\n' +
                '                                                My-Alfred. Vous pouvez à tout moment insérer votre pièce d\'identité.',
            stageTitle: 'Vous pouvez à tout moment insérer votre pièce d\'identité',
            stage1: 'Consultez <strong>votre Profil</strong> sur my-alfred.io',
            stage2: 'Cliquez sur l’onglet <strong>Confiance & vérification</strong> de votre compte',
            stage3: 'Sélectionnez le type de pièce Passeport ou Carte nationale d\'identité',
            stage4: 'Cliquez sur Recto pour télécharger votre photo de pièce d’identité.',
            stage5: 'Cliquez sur Verso pour ajouter le verso de votre pièce d’identité.',
            stage6: '',
        }, 3: {
            title: 'Quel type de pièce d\'identité puis-je fournir ?',
            text: ' Vous pouvez ajouter une des pièces d’identité officielle suivante sur la plateforme My-Alfred : <br />' +
                'Passeport <br />' +
                'Carte Nationale d’Identité <br />' +
                'Si vous ajoutez votre carte Nationale d’identité, vous devrez\n' +
                '                                                télécharger 2 photos à savoir,\n' +
                '                                                le recto et le verso de votre document. Si vous ajoutez votre passeport,\n' +
                '                                                1 seule photo à\n' +
                '                                                télécharger\n' +
                '                                                est nécessaire mais assurez vous que que les numéros situés en bas de la\n' +
                '                                                page du passeport où\n' +
                '                                                figure\n' +
                '                                                votre photo soient bien visibles.',
            stageTitle: '',
            stage1: '',
            stage2: '',
            stage3: '',
            stage4: '',
            stage5: '',
            stage6: '',
        }, 4: {
            title: 'Quelles sont les données partagées avec votre pièce d’identité ?',
            text: 'Si vous acceptez de fournir une pièce d\'identité officielle, les\n' +
                '                                                informations suivantes peuvent\n' +
                '                                                être visibles par les autres utilisateurs de la plateforme My-Alfred : <br />' +
                'La confirmation que votre pièce d\'identité a bien été ajoutée <br />' +
                'Votre photo de profil et le prénom et le nom figurant sur votre profil <br />' +
                'La photo de votre carte d’identité ainsi que les informations (à\n' +
                '                                                l’exception de votre nom et\n' +
                '                                                prénom)\n' +
                '                                                ne seront jamais visibles par les autres utilisateurs de la plateforme\n' +
                '                                                My-Alfred.',
            stageTitle: '',
            stage1: '',
            stage2: '',
            stage3: '',
            stage4: '',
            stage5: '',
            stage6: '',
        }, 5: {
            title: ' Comment est stockée ou supprimée la photo de ma pièce d\'identité ?',
            text: 'Le stockage de la photo de votre pièce d\'identité officielle est régie\n' +
                '                                                par notre <Link\n' +
                '                                                href={\'/\'}><a> Politique de\n' +
                '                                                confidentialité.</a></Link>\n' +
                '                                                Il est préférable de ne pas supprimer votre pièce d’identité. Si vous\n' +
                '                                                avez des réservations pour\n' +
                '                                                lesquelles les clients ont exigé une pièce d’identité vérifiée, nous\n' +
                '                                                annulerons toutes les\n' +
                '                                                réservation\n' +
                '                                                concernées à venir.\n' +
                '                                                Cependant, vous pouvez demander la suppression de la photo de votre\n' +
                '                                                pièce d\'identité 90 jours\n' +
                '                                                après la\n' +
                '                                                fin de votre dernière réservation.',
            stageTitle: 'Pour supprimer la photo de votre pièce d\'identité :',
            stage1: 'Consultez <strong>votre Profil</strong> sur my-alfred.io',
            stage2: 'Cliquez sur l’onglet <strong>Confiance & vérification</strong> de\n' +
                '                                                    votre compte',
            stage3: 'Cliquez sur la corbeille à côté de votre pièce d’identité pour la\n' +
                '                                                    supprimer.',
            stage4: '',
            stage5: '',
            stage6: '',
        },
    },
    installments: {
        heading: 'Mes versements',
        1: {
            title: 'Comment toucher mon versement ?',
            text: 'Une fois la réservation confirmée, l’utilisateur à l’origine de la\n' +
                '                                                réservation reçoit un code\n' +
                '                                                unique\n' +
                '                                                et dédié à votre réservation.\n' +
                '                                                Lorsque le service est réalisé, votre client doit vous communiquer ce\n' +
                '                                                code afin que vous\n' +
                '                                                puissiez\n' +
                '                                                toucher votre versement. <br />' +
                'Une fois que vous avez votre code, rendez-vous sur votre fiche\n' +
                '                                                réservation depuis votre\n' +
                '                                                smartphone\n' +
                '                                                ou depuis votre ordinateur et cliquez sur “Indiquer mon code”. Saisissez\n' +
                '                                                les chiffres de votre\n' +
                '                                                code\n' +
                '                                                et validez.\n' +
                '                                                Une fois le code validé, vous recevrez votre versement sur le compte\n' +
                '                                                bancaire renseigné\n' +
                '                                                dans “Préférence de versement” dans un délai de 4 jours maximum.\n' +
                '                                                Si vous n’avez pas renseigné d’IBAN, vous devrez l’ajouter avant votre\n' +
                '                                                première prestation, dans\n' +
                '                                                la rubrique “Préférence de versement” de votre compte.',
            stageTitle: '',
            stage1: '',
            stage2: '',
            stage3: '',
            stage4: '',
            stage5: '',
            stage6: '',
        }, 2: {
            title: 'Pourquoi dois-je communiquer un IBAN ?',
            text: 'Pour devenir Alfred, il est impératif qu’un mode de versement soit\n' +
                '                                                renseigné dans votre compte\n' +
                '                                                utilisateur. En effet, après chaque service réalisé, My-Alfred procède\n' +
                '                                                au versement du montant\n' +
                '                                                indiqué sur la réservation sur votre compte bancaire.',
            stageTitle: 'Pour ajouter ou supprimer votre IBAN :',
            stage1: 'Consultez <strong>votre Compte</strong> sur my-alfred.io',
            stage2: 'Cliquez sur l’onglet <strong>Mes préférences de versement',
            stage3: 'Cliquez sur <strong>Ajouter un RIB</strong>',
            stage4: '',
            stage5: '',
            stage6: '',
        }, 3: {
            title: 'Quels sont les documents à fournir pour les versements ?',
            text: 'Pour que nous puissions effectuer le versement de votre prestations,\n' +
                '                                                vous devez nous fournir les\n' +
                '                                                éléments suivants en fonction de votre statut de particulier ou\n' +
                '                                                d’auto-entrepreneur.\n' +
                '                                                Ces éléments vous sont demandés lors de votre inscription et lors de la\n' +
                '                                                création de votre\n' +
                '                                                boutique.',
            stageTitle: 'Vous êtes un particulier :',
            stage1: 'Votre nom et prénom',
            stage2: 'Votre date de naissance',
            stage3: 'Votre pays de résidence',
            stage4: 'Votre nationalité',
            stage5: 'Votre pièce d\'identité',
            stage6: 'Votre compte bancaire (IBAN)',
        }, 4: {
            title: 'Comment puis-je retrouver mes informations de versements ?',
            text: 'En tant qu’Alfred, vous pouvez suivre l’ensemble de vos versements dans\n' +
                '                                                la rubrique performance\n' +
                '                                                de votre boutique.\n' +
                '                                                A l’aide de votre tableau de bord, suivez l’évolution de vos versements\n' +
                '                                                passés et à venir, et\n' +
                '                                                retrouvez toutes les informations sur vos versements.',
            stageTitle: 'Pour consulter vos informations de versements :',
            stage1: 'Rendez-vous sur my-alfred.io, cliquez sur <strong>Je suis\n' +
                '                                                    Alfred</strong>',
            stage2: 'Cliquez sur l’onglet <strong>Performance</strong>',
            stage3: 'Cliquez sur <strong>revenus</strong>',
            stage4: '',
            stage5: '',
            stage6: '',
        },
    },
    booking: {
        heading: 'Mes réservations',
        1: {
            title: 'Comment modifier une réservation confirmée en tant qu’Alfred ?',
            text: 'En tant qu’Alfred, vous pouvez modifier une réservation à la seule\n' +
                '                                                condition que votre\n' +
                '                                                utilisateur\n' +
                '                                                l’accepte. Si votre utilisateur l’accepte, vous pouvez modifier la date\n' +
                '                                                et l’horaire de votre\n' +
                '                                                service,\n' +
                '                                                son prix, le prix de votre option ou compléter le service par une\n' +
                '                                                prestation présente dans votre\n' +
                '                                                service. <br />' +
                'Une fois la demande de modification envoyée, vous devrez attendre la\n' +
                '                                                validation de votre client\n' +
                '                                                pour qu’elle soit modifiée. Votre fiche de réservation se mettra\n' +
                '                                                automatiquement à jour.',
            stageTitle: 'Pour modifier votre réservation :',
            stage1: 'Rendez-vous sur my-alfred.io, cliquez sur <strong>Je suis\n' +
                '                                                    Alfred</strong>',
            stage2: 'Cliquez sur <strong>Mes réservations</strong>',
            stage3: 'Parcourez votre fiche réservation et cliquez sur modifier en bas de\n' +
                '                                                    votre fiche de\n' +
                '                                                    réservation.',
            stage4: 'Cliquez sur <strong>Modifier la réservation</strong>',
            stage5: 'Indiquez le champs que vous souhaitez modifier\n' +
                '                                                    (prix/prestations/option/date etc.)',
            stage6: 'Cliquez sur <strong>Envoyer une demande de modification',
        }, 2: {
            title: 'Comment annuler une réservation en tant qu’Alfred ?',
            text: 'L’annulation d’une réservation entraîne du stress et est susceptible\n' +
                '                                                d’impacter votre client\n' +
                '                                                utilisateur. En tant qu’Alfred, vous pouvez annuler une réservation mais\n' +
                '                                                vous vous exposez à une\n' +
                '                                                pénalité de la part de votre client utilisateur. Si vous avez activé la\n' +
                '                                                réservation automatique\n' +
                '                                                sans\n' +
                '                                                demande de confirmation, vous pouvez annuler vos réservations sans\n' +
                '                                                pénalités mais un commentaire\n' +
                '                                                mentionnant que vous avez annulé la réservation sera automatiquement\n' +
                '                                                publié sur votre boutique. <br />' +
                'Si vous n’avez pas activé la réservation automatique et décidez\n' +
                '                                                d’annuler une réservation plus\n' +
                '                                                de 7 jours avant la date d’exécution définie, une pénalité forfaitaire\n' +
                '                                                de 10€ vous sera\n' +
                '                                                demandée,\n' +
                '                                                et 20€ si l’annulation intervient 7 jours ou moins avant la date\n' +
                '                                                d’exécution du service définie\n' +
                '                                                dans\n' +
                '                                                la réservation. Par ailleurs, si vous annulez des réservations de trop\n' +
                '                                                nombreuses fois, vous ne\n' +
                '                                                respectez plus les CGU de My-Alfred et votre boutique ne sera plus\n' +
                '                                                visible. <br />' +
                'En cas d’annulation d’une réservation par un Alfred, le client\n' +
                '                                                utilisateur sera remboursé de la\n' +
                '                                                totalité des frais engagés sur la plateforme My-Alfred dans le cadre de\n' +
                '                                                la réservation\n' +
                '                                                concernée.',
            stageTitle: 'Pour annuler votre réservation :',
            stage1: 'Rendez-vous sur my-alfred.io, cliquez sur <strong>Je suis\n' +
                '                                                    Alfred</strong>',
            stage2: 'Cliquez sur <strong>Mes réservations</strong>',
            stage3: 'Parcourez votre fiche réservation et cliquez sur modifier en bas de\n' +
                '                                                    votre fiche de\n' +
                '                                                    réservation',
            stage4: 'Cliquez sur <strong>Annuler ma réservation</strong>',
            stage5: 'Choisissez le motif de l’annulation',
            stage6: 'Rédigez un message à votre client utilisateur lui expliquant que son\n' +
                '                                                    service est annulé',
            stage7: 'Cliquez sur <strong>Enregistrer</strong>',
            commentary: 'A noter qu’en cas d’imprévu, vous avez la possibilité de modifier la\n' +
                '                                                date de la réservation avec\n' +
                '                                                l’accord de votre client utilisateur My-Alfred.'
        }, 3: {
            title: 'Quelles sont les pénalités si j’annule une réservation en tant qu’Alfred ?',
            text: 'En tant qu’Alfred, vous pouvez annuler une réservation mais vous vous\n' +
                '                                                exposez à une pénalité de\n' +
                '                                                la\n' +
                '                                                part de votre client utilisateur. Si vous avez activé la réservation\n' +
                '                                                automatique sans demande de\n' +
                '                                                confirmation, vous pouvez annuler vos réservations sans pénalités mais\n' +
                '                                                un commentaire\n' +
                '                                                mentionnant\n' +
                '                                                que vous avez annulé la réservation sera automatiquement publié sur\n' +
                '                                                votre boutique. <br />' +
                'Si vous n’avez pas activé la réservation automatique et décidez\n' +
                '                                                d’annuler une réservation plus\n' +
                '                                                de\n' +
                '                                                7 jours avant la date d’exécution définie, une pénalité forfaitaire de\n' +
                '                                                10€ vous sera demandée,\n' +
                '                                                et 20€ si l’annulation intervient 7 jours ou moins avant la date\n' +
                '                                                d’exécution du service définie\n' +
                '                                                dans\n' +
                '                                                la réservation. Par ailleurs, si vous annulez des réservations de trop\n' +
                '                                                nombreuses fois, vous ne\n' +
                '                                                respectez plus les CGU de My-Alfred et votre boutique ne sera plus\n' +
                '                                                visible.',
            stageTitle: '',
            stage1: '',
            stage2: '',
            stage3: '',
            stage4: '',
            stage5: '',
            stage6: '',
        }, 4: {
            title: 'Comment rembourser mon utilisateur ?',
            text: 'En cas d’annulation d’une réservation par un Alfred, le client\n' +
                '                                                utilisateur sera remboursé de la\n' +
                '                                                totalité des frais engagés sur la plateforme My-Alfred dans le cadre de\n' +
                '                                                la réservation\n' +
                '                                                concernée.',
            stageTitle: 'Pour annuler votre réservation :',
            stage1: 'Rendez-vous sur my-alfred.io, cliquez sur <strong>Je suis\n' +
                '                                                    Alfred</strong>',
            stage2: 'Cliquez sur <strong>Mes réservations</strong>',
            stage3: 'Parcourez votre fiche réservation et cliquez sur modifier en bas de\n' +
                '                                                    votre fiche de\n' +
                '                                                    réservation',
            stage4: 'Cliquez sur <strong>Annuler ma réservation</strong>',
            stage5: 'Choisissez le motif de l’annulation',
            stage6: 'Rédigez un message à votre client utilisateur lui expliquant que son\n' +
                '                                                    service est annulé',
            stage7: 'Cliquez sur <strong>Enregistrer</strong>',
            commentary: 'A noter qu’en cas d’imprévu, vous avez la possibilité de modifier la\n' +
                '                                                date de la réservation avec\n' +
                '                                                l’accord de votre client utilisateur My-Alfred.'
        }, 5: {
            title: 'Puis-je modifier le prix d’une réservation en attente ou confirmée ?',
            text: 'Chaque réservation peut-être modifiée quelque soit son statut. En\n' +
                '                                                revanche, votre client\n' +
                '                                                utilisateur\n' +
                '                                                doit impérativement accepter cette modification pour que la réservation\n' +
                '                                                retrouve son statut\n' +
                '                                                confirmée. <br />' +
                'Si votre réservation est confirmée mais que vous choisissez de la\n' +
                '                                                modifier, son statut passera\n' +
                '                                                de réservation confirmée à réservation en attente jusqu’à ce que votre\n' +
                '                                                client utilisateur\n' +
                '                                                confirme\n' +
                '                                                les modifications. <br />' +
                'Si votre utilisateur ne valide pas vos modifications dans un délai 48h,\n' +
                '                                                la réservation est\n' +
                '                                                expirée.\n' +
                '                                                Si votre utilisateur refuse vos modifications, la réservation est\n' +
                '                                                annulée et votre client sera\n' +
                '                                                remboursé de l’intégralité du montant engagé.',
            stageTitle: '',
            stage1: '',
            stage2: '',
            stage3: '',
            stage4: '',
            stage5: '',
            stage6: '',
        }, 6: {
            title: 'Puis-je planifier mon service sur plusieurs jours ?',
            text: 'Dans le cadre de services susceptibles de se dérouler sur plusieurs\n' +
                '                                                journées ou plusieurs\n' +
                '                                                créneaux\n' +
                '                                                horaires, nous vous recommandons de vous rapprocher de votre client\n' +
                '                                                utilisateur afin d’établir\n' +
                '                                                ensemble\n' +
                '                                                , un planning d’intervention.\n' +
                '                                                Une fois le planning d’intervention établi, vous pourrez renseigner ce\n' +
                '                                                dernier dans votre fiche\n' +
                '                                                réservation et dans votre calendrier; celui de votre client se mettra\n' +
                '                                                automatiquement à jour\n' +
                '                                                (périodes renseignées indisponibles). <br />' +
                'A noter que la version publique de votre calendrier ne comporte que des\n' +
                '                                                périodes disponibles\n' +
                '                                                ou indisponibles, et non le contenu de vos services. <br />' +
                '',
            stageTitle: '',
            stage1: '',
            stage2: '',
            stage3: '',
            stage4: '',
            stage5: '',
            stage6: '',
        }, 7: {
            title: 'Puis-je échanger avec mon Alfred ou mon client ?',
            text: 'Les utilisateurs sont en mesure de vous contacter afin d’obtenir des\n' +
                '                                                renseignements\n' +
                '                                                complémentaires\n' +
                '                                                sur l’un de vos services. Ils pourront vous contacter mais leurs\n' +
                '                                                coordonnées n\'apparaîtront pas,\n' +
                '                                                et\n' +
                '                                                vous ne pourrez pas leur communiquer votre numéro de téléphone et email\n' +
                '                                                personnel.\n' +
                '                                                Dès lors qu’une demande de réservation est envoyée, vous pourrez\n' +
                '                                                échanger avec votre utilisateur\n' +
                '                                                ou votre alfred depuis la messagerie de My-Alfred.\n' +
                '                                                En revanche, dès lors qu’une réservation est confirmée, vous pourrez\n' +
                '                                                échanger depuis le\n' +
                '                                                plateforme\n' +
                '                                                My-Alfred, et les coordonnées de votre Alfred ou de l’utilisateur seront\n' +
                '                                                échangées pour un\n' +
                '                                                maximum\n' +
                '                                                de fluidité dans la réservation de la prestation. <br />' +
                'Pour retrouver vos messages en tant qu’utilisateur, il vous suffit de\n' +
                '                                                vous rendre dans l’onglet\n' +
                '                                                <strong> Messages</strong>. Pour retrouver vos messages en tant\n' +
                '                                                qu’Alfred, il vous suffit\n' +
                '                                                cliquez sur l’onglet\n' +
                '                                                <strong> Je suis Alfred</strong>, et de vous rendre dans la\n' +
                '                                                rubrique <strong>Messages</strong>.',
            stageTitle: '',
            stage1: '',
            stage2: '',
            stage3: '',
            stage4: '',
            stage5: '',
            stage6: '',
        },
        myAccount: {
            heading: 'Mon compte',
            1: {
                title: 'Comment supprimer sa boutique ?',
                text: 'A tout moment, vous avez la possibilité de supprimer votre boutique de\n' +
                    '                                                services My-Alfred.\n' +
                    '                                                La suppression de votre boutique entraîne l’annulation de l’ensemble des\n' +
                    '                                                réservations acceptées\n' +
                    '                                                à venir, et leur remboursement.',
                stageTitle: 'Pour supprimer votre boutique :',
                stage1: 'Rendez-vous sur my-alfred.io, cliquez sur <strong>Mes\n' +
                    '                                                    paramètres</strong>',
                stage2: 'Cliquez sur <strong>Paramètres</strong>',
                stage3: 'Cliquez sur <strong>Supprimer</strong> dans la rubrique je souhaite\n' +
                    '                                                    supprimer ma boutique de\n' +
                    '                                                    services',
                stage4: '',
                stage5: '',
                stage6: '',
                commentary: 'Saisissez votre mot de passe. Cette étape nous permet de nous assurer\n' +
                    '                                                que vous êtes bien\n' +
                    '                                                à l’initiative de la suppression de votre compte. Attention, cette\n' +
                    '                                                action est irrémédiable.'
            }, 2: {
                title: 'Comment supprimer son compte ?',
                text: 'A tout moment, vous avez la possibilité de supprimer votre compte\n' +
                    '                                                My-Alfred. La suppression de\n' +
                    '                                                votre\n' +
                    '                                                compte est irrémédiable.\n' +
                    '                                                Si vous êtes Alfred, la suppression du compte implique la suppression de\n' +
                    '                                                votre boutique,\n' +
                    '                                                l’annulation\n' +
                    '                                                de l’ensemble des réservations acceptées à venir, et leur remboursement.\n' +
                    '                                                Si vous êtes simple utilisateur, la suppression de votre compte implique\n' +
                    '                                                l’annulation de\n' +
                    '                                                l’ensemble\n' +
                    '                                                des réservations acceptées à venir, moyennant - en fonction des\n' +
                    '                                                conditions d’annulation de(s)\n' +
                    '                                                Alfred\n' +
                    '                                                impacté(s) par cette annulation - des frais d’annulation.',
                stageTitle: 'Pour supprimer votre compte :',
                stage1: 'Rendez-vous sur my-alfred.io, cliquez sur <strong>Mes\n' +
                    '                                                    paramètres</strong>',
                stage2: 'Cliquez sur <strong>Paramètres</strong>',
                stage3: 'Cliquez sur <strong>Désactiver</strong> dans la rubrique je souhaite\n' +
                    '                                                    désactiver mon compte',
                stage4: '',
                stage5: '',
                stage6: '',
                commentary: 'Saisissez votre mot de passe. Cette étape nous permet de nous assurer\n' +
                    '                                                que vous êtes bien à\n' +
                    '                                                l’initiative de la suppression de votre compte.'
            }, 3: {
                title: 'Comment gérer mes notifications ?',
                text: 'Vos notifications peuvent être paramétrées depuis votre compte. Cela\n' +
                    '                                                vous permet de choisir le\n' +
                    '                                                moyen de communication le plus adapté à vos besoins ou à vos habitudes\n' +
                    '                                                (SMS, emails, push, appel\n' +
                    '                                                téléphonique).\n' +
                    '                                                Les notifications sont classées par rubrique et vous pouvez choisir à\n' +
                    '                                                tout moment, de les\n' +
                    '                                                modifier\n' +
                    '                                                ou de les désactiver. <br />' +
                    'Seule la rubrique Assistance du compte doit impérativement avoir l’une\n' +
                    '                                                des options de\n' +
                    '                                                notifications\n' +
                    '                                                activée. En effet, dans le cadre de vos réservations de services, des\n' +
                    '                                                informations légales,\n' +
                    '                                                des questions de sécurité et de confidentialité, et pour répondre à vos\n' +
                    '                                                demandes adressées à\n' +
                    '                                                notre\n' +
                    '                                                assistance utilisateur, nous devons être en mesure de vous envoyer des\n' +
                    '                                                messages. Pour votre\n' +
                    '                                                sécurité,\n' +
                    '                                                vous ne pouvez pas désactiver les notifications par email et nous\n' +
                    '                                                pourrions vous contacter par\n' +
                    '                                                téléphone ou d’autres moyens si besoin.',
                stageTitle: 'Pour modifier le paramétrage de vos notifications, il vous suffit de :',
                stage1: 'Rendez-vous sur my-alfred.io, cliquez sur <strong>Mes\n' +
                    '                                                    paramètres</strong>',
                stage2: 'Cliquez sur la rubrique <strong>Notifications</strong>',
                stage3: 'Cliquez sur <strong>Enregistrer</strong>',
                stage4: '',
                stage5: '',
                stage6: '',
                commentary: 'Saisissez votre mot de passe. Cette étape nous permet de nous assurer\n' +
                    '                                                que vous êtes bien à\n' +
                    '                                                l’initiative de la suppression de votre compte.'
            }, 4: {
                title: 'Comment gérer mes modes de paiement ?',
                text: '',
                stageTitle: '',
                stage1: '',
                stage2: '',
                stage3: '',
                stage4: '',
                stage5: '',
                stage6: '',
            }, 5: {
                title: 'Comment gérer mes modes de versement ?',
                text: '',
                stageTitle: '',
                stage1: '',
                stage2: '',
                stage3: '',
                stage4: '',
                stage5: '',
                stage6: '',
            }, 6: {
                title: 'Comment suivre mes transactions ?',
                text: '',
                stageTitle: '',
                stage1: '',
                stage2: '',
                stage3: '',
                stage4: '',
                stage5: '',
                stage6: '',
            }, 7: {
                title: 'Comment changer mon mot de passe ?',
                text: '',
                stageTitle: '',
                stage1: '',
                stage2: '',
                stage3: '',
                stage4: '',
                stage5: '',
                stage6: '',
            }, 8: {
                title: 'Vous avez oublié votre mot de passe ?',
                text: '',
                stageTitle: '',
                stage1: '',
                stage2: '',
                stage3: '',
                stage4: '',
                stage5: '',
                stage6: '',
            }, 9: {
                title: 'Puis-je connecter My-Alfred à mon compte Gmail ?',
                text: '',
                stageTitle: '',
                stage1: '',
                stage2: '',
                stage3: '',
                stage4: '',
                stage5: '',
                stage6: '',
            }, 10: {
                title: 'Puis-je connecter My-Alfred à mon compte Facebook ?',
                text: '',
                stageTitle: '',
                stage1: '',
                stage2: '',
                stage3: '',
                stage4: '',
                stage5: '',
                stage6: '',
            }, 11: {
                title: 'Comment empêcher l’indexation de mon profil et ma boutique sur les moteurs de recherche ?',
                text: '',
                stageTitle: '',
                stage1: '',
                stage2: '',
                stage3: '',
                stage4: '',
                stage5: '',
                stage6: '',
            }, 12: {
                title: 'Comment gérer mes parrainages ?',
                text: '',
                stageTitle: '',
                stage1: '',
                stage2: '',
                stage3: '',
                stage4: '',
                stage5: '',
                stage6: '',
            }, 13: {
                title: 'A quoi sert le parrainage ?',
                text: '',
                stageTitle: '',
                stage1: '',
                stage2: '',
                stage3: '',
                stage4: '',
                stage5: '',
                stage6: '',
            }
        }
    },
    profile: {
        heading: 'Mon profil',
        1: {
            title: 'Comment modifier mon profil utilisateur ?',
            text: '',
            stageTitle: '',
            stage1: '',
            stage2: '',
            stage3: '',
            stage4: '',
            stage5: '',
            stage6: '',
        }, 2: {
            title: 'A quoi correspondent les adresses de prestations ?',
            text: '',
            stageTitle: '',
            stage1: '',
            stage2: '',
            stage3: '',
            stage4: '',
            stage5: '',
            stage6: '',
        }, 3: {
            title: 'Puis-je avoir plusieurs adresses de prestation ?',
            text: '',
            stageTitle: '',
            stage1: '',
            stage2: '',
            stage3: '',
            stage4: '',
            stage5: '',
            stage6: '',
        }, 4: {
            title: 'Comment gérer ma photo de profil ?',
            text: '',
            stageTitle: '',
            stage1: '',
            stage2: '',
            stage3: '',
            stage4: '',
            stage5: '',
            stage6: '',
        }, 5: {
            title: 'Comment vérifier mon email ?',
            text: '',
            stageTitle: '',
            stage1: '',
            stage2: '',
            stage3: '',
            stage4: '',
            stage5: '',
            stage6: '',
        }, 6: {
            title: 'Comment vérifier mon téléphone ?',
            text: '',
            stageTitle: '',
            stage1: '',
            stage2: '',
            stage3: '',
            stage4: '',
            stage5: '',
            stage6: '',
        }
    }

}

module.exports = {
    CESU_NOTICE, OUTSIDE_PERIMETER, SCHEDULE_TITLE, SCHEDULE_SUBTITLE,
    getMangopayMessage, SHOP_CREATION_SUCCESSFUL, ID_CARD_CONFIRM_DELETION,
    REGISTRATION_PROOF_CONFIRM_DELETION, INFOBAR_MESSAGE, SHOWMORE, SEARCHBAR, BANNER_PRESENTATION,
    CATEGORY, BECOME_ALFRED, RESA_SERVICE, HOW_IT_WORKS, NEWS_LETTER, NAVBAR_MENU,
    SHOP, CMP_PRESENTATION, BOOKING, FAQ
};
