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
  "Devenir Alfred": [
    {
      title: 'Qui peut devenir Alfred ?',
      contents: '<p>Nous sommes tous des Alfred ! Dès l’âge de 16 ans, vous pouvez\
      devenir Alfred en créant votre propre boutique de service(s) sur My-Alfred.\
      Votre inscription et la mise en ligne de votre boutique sont entièrement\
      gratuites et ne demandent aucun frais au préalable ou abonnement vous engageant\
      sur la durée.Vous pouvez proposer immédiatement vos talents, vos compétences\
      sur My-Alfred en choisissant laliste des services que vous souhaitez proposer.\
      Nous avons répertorié pour vous plus de 2000 prestationsclassées dans des\
      services et des catégories.Alors, prêt à rejoindre l’aventure ? Je deviens\
      alfred maintenant !</p>'
    },
    {
      title: 'Comment créer sa boutique de service ?',
      contents: '<p>My-Alfred vous permet de créer votre propre boutique de service(s) et dedéfinir les services etprestations que vous souhaitez réaliser tout en vous offrant pleineliberté sur vos conditions !Nos Alfred fixent leur(s) prix ainsi que leur(s) méthode(s) defacturation librement, et peuventajuster leur(s) prix à tout moment. Afin de proposer une visibilité etune confiance accrue entre les utilisateurs et les Alfred, la boutique de service(s) offre unniveau depersonnalisation élevé permettant à tout à chacun de décrire sonexpertise, ses diplômes etcertifications, des options liées à ses services, le matériel fournidans le cadre de sonservice ou encore ses disponibilités.Les Alfred sont également libres de choisir leurs propres conditions deréservation etd’annulation !</p><p>Prêt à vous lancer ?Pour démarrer la création de votre boutique, l’inscription estobligatoire. Une fois identifé(e)sur My-Alfred, il suffit de cliquer sur le bouton “Devenir Alfred’’.</p><p>Simple et rapide, la création de votre boutique se déroule en 3 étapeset ne vous prendraquelques minutes :</p><p>Etape 1 : Sélection des services<br/>A travers cette étape, vous pouvez sélectionner les services que voussouhaitez réaliser. Nousavons classé ces services dans des catégories pour vous permettre detrouver plus rapidement lesservices concernés. Un service n\'apparaît pas ?Contacter l’équipe My-Alfred à l’adresse <a href={\'mailto:unservicedeplus@my-alfred.io\'}>unservicedeplus@my-alfred.io</a> !</p><p>Etape 2 : Indiquez vos prix, vos disponibilités et conditions<br/>Pour chaque service sélectionné, vous devez renseigner un prix parprestation, vosdisponibilités et vos conditions de réservation pour permettre à vos clients de réserver vosservices avec un maximum d’informations.</p><p>Etape 3 : Indiquez vos prix, vos disponibilités et conditions<br/>Cette dernière étape vous permet d’ajouter une photo de profil, devérifier votre téléphoneportable, votre identité et d’indiquer si vous souhaitez réaliser vosservices en tant queparticulier ou auto-entrepreneur.</p><p>C’est fini ! Vous avez maintenant votre propre boutique de services surMy-Alfred. A toutmoment, vous pouvez ajouter, modifier, supprimer un ou plusieursservices dans la rubrique maboutique !Pensez à maintenir votre calendrier à jour afin d\'apparaître dans lesrésultats de recherche desutilisateurs :) !</p>'
    },
    {
      title: 'Que dois-je déclarer dans mes revenus ?',
      contents: '<p>My-Alfred est une plateforme appartenant à l’économie collaborative permettant à tout un chacun de consommer et/ou de proposer des services contre une rémunération. L’économie collaborative est tout à fait légale à condition de déclarerses revenus et d’adopter le statut correspondant en fonction de la nature occasionnelle ou non devos services.En tant que particulier, vous devez vous devez déclarer le montant devos prestations dans vosrevenus dès lors que vous avez perçu plus de 3 000 € ou effectué plus de 20 transactions au cours de l’année précédente, mais vous n’avez pas de déclaration sociale ou deTVA à réaliser.Si votre activité n’est pas occasionnelle mais régulière, vous devezdéclarer vos revenus etpayer des cotisations sociales. Dans ce cas, le statutd’auto-entrepreneur est alors parfaitement adapté pour vous.</p>'
    },
  ],
  'Créer votre boutique de service': [
    {
      title: 'Comment ajouter un nouveau service dans ma boutique ?',
      contents: '<p>Vous pouvez à tout moment ajouter de nouveaux services dans votreboutique.Pour cela, rendez-vous dans votre boutique et cliquez sur <span style=\{\{color: \'#2FBCD3\'\}\}>ajouter un nouveau service.</span><br/>Vous devez ensuite suivre les différentes étapes d’ajout d’un nouveauservice comme lors dela création de votre boutique.</p>'
    }, {
      title: 'Comment fixer le prix de mes prestations ?',
      contents: '<p>Pour chaque service sélectionné, il vous est proposé une ou plusieursprestations.Vous devez selectionner les prestations que vous souhaitez effectuer etpour lesquelles un prixdoitêtre renseigné. Le prix de votre prestation doit être indiqué en tenantcompte du mode defacturation.Un mode de facturation vous est proposé par défaut mais vous pouvez lemodifier si ce dernier nevous convient pas.</p><p>Vous pouvez à tout moment visualiser ou modifier le prix et le mode defacturation de vosservices dansvotre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier le prix de vos prestations :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez votre Boutique sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes services</strong></li><li>Cliquez sur <strong>Modifier</strong> dans un service</li><li>Modifier les prix de vos prestations puis cliquezsur <strong>Enregistrer</strong></li></ol>'
    }, {
      title: 'A quoi servent les options dans ma boutique de service ?',
      contents: '<p>Pour chaque service, vous avez la possibilité d’ajouter une option defacturation.Cette option vous permet de compléter le prix de votre prestation enajoutant un supplément deprix que le client pourra sélectionner. Par exemple, vous pouvez ajouterune option“retrait et livraison” et indiquer le prix de cette option.</p><p>Vous pouvez à tout moment visualiser ou modifier les options de vosservices dans votreboutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier les options d\'un service :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes services</strong></li><li>Cliquez sur <strong>Modifier</strong> dans un service</li><li>Modifier les options de vos prestations puis cliquezsur <strong>Enregistrer</strong></li></ol>'
    }, {
      title: 'A quoi correspond le matériel fourni dans ma boutique de service ?',
      contents: '<p>Pour chaque service, vous pouvez sélectionner le matériel et lesconsommables qui serontutilisés lorsde votre prestation. Lorsqu’un client parcourra votre boutique ouselectionnera vos services,il pourra alors connaître les équipements dont vous disposez pour laprestation et lesconsommablesque vous fournissez. Certains services nécessitent du matérielspécifique.Indiquez que vous disposez de ce matériel offre à vos clients un gage dequalité et deprofessionnalisme au regard des services que vous pouvez réaliser !</p><p>Vous pouvez à tout moment visualiser ou modifier le matériel etconsommables fournis dans vosservices dans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier le matériel fourni dans votre service :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes services</strong></li><li>Cliquez sur <strong>Modifier</strong> dans un service</li><li>Sélectionnez le matériel et consommables puis cliquezsur <strong>Enregistrer</strong></li></ol>'
    }, {
      title: 'Comment définir un montant minimum pour mon service ?',
      contents: '<p>Le montant minimum de réservation correspond au panier minimum requispour réserver ce service.Si vous indiquez un montant de 10€, les clients ne pourront pas réservervos services si lasomme desprestations n’atteint pas ce montant.</p><p>Vous pouvez à tout moment visualiser ou modifier le montant minimum devos services dans votreboutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier le montant minimum d\'un service :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes services</strong></li><li>Cliquez sur <strong>Modifier</strong> dans un service</li><li>Modifiez le montant minimum puis cliquezsur <strong>Enregistrer</strong></li></ol>'
    }, {
      title: 'Comment définir mon périmètre d\'intervention ?',
      contents: '<p>Votre périmètre d’intervention correspond à la zone dans laquelle voussouhaitez réaliser votreservice.Par défaut, nous utilisons la ville de votre profil comme référence.Cette adresse ne vous convient pas ? Vous pouvez changer votre ville deréférence à tout moment!Le périmètre que vous indiquez va permettre à la plateforme My-Alfred deproposer votre servicesi lepérimètre d’intervention correspond à l’adresse du client. Si le clientse trouve à 5km de votre adresse et que vous avez indiquez un périmètre de 10km votre service sera proposé !</p><p>Vous pouvez à tout moment visualiser ou modifier le périmètred’intervention de vos servicesdansvotre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier le périmètre d\'intervention d\'un service :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes services</strong></li><li>Cliquez sur <strong>Modifier</strong> dans un service</li><li>Modifiez le périmètre d\'intervention puis cliquezsur <strong>Enregistrer</strong></li></ol>'
    }, {
      title: 'A quoi correspond le délai de prévenance ?',
      contents: '<p>Le délai de prévenance correspond au délai nécessaire entre laréservation et la réalisation duservice.Par exemple, si vous indiquez un délai de 24 heures, un client devraréserver votre service aumoins 24heures avant votre intervention.Le délai de prévenance peut se définir en heure, jour ou mois enindiquant le chiffre correspondant avec les boutons + et - dans votre boutique.</p><p>Vous pouvez à tout moment visualiser ou modifier le délai de prévenancede vos services dansvotre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier le délai de prévenance d\'un service :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes services</strong></li><li>Cliquez sur <strong>Modifier</strong> dans un service</li><li>Modifiez le délai de prévenance puis cliquezsur <strong>Enregistrer</strong></li></ol>'
    }, {
      title: 'Pourquoi décrire brièvement mon expertise ?',
      contents: '<p>Pour chaque service sélectionné, vous pouvez brièvement décrire votreexpertise.N’hésitez pas à mettre en évidence vos compétences et votre expertisepour un service.Les utilisateurs auront accès à ces informations, n’hésitez pas àvaloriser vos réalisationset vos atouts pour ce service !</p><p>Vous pouvez à tout moment visualiser ou modifier le contenu de votreexpertise de vos servicesdans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier la description de votre expertise d\'un service :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes services</strong></li><li>Cliquez sur <strong>Modifier</strong> dans un service</li><li>Modifiez le contenu de votre expertise puis cliquezsur <strong>Enregistrer</strong></li></ol>'
    }, {
      title: 'Pourquoi dois-je ajouter mes années d’expérience, mes diplômes et certifications ?',
      contents: '<p>Pour chaque service sélectionné, vous pouvez indiquer une nombre d’annéed’expérience pour ce service et télécharger un diplôme et/ou une certification reçu pour ce service. Concernant lediplôme,vous pouvez indiquez le nom de votre diplôme et son année d’obtention.En téléchargeant votrediplôme,votre diplôme aura le statut de diplôme vérifié auprès des utilisateursmais il ne sera jamaisvisiblepar ses derniers! C’est exactement le même principe pour votrecertification.</p><p>Vous pouvez à tout moment visualiser ou modifier le nombre d’annéesd’expérience et les diplômeset certifications téléchargés de vos services dans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier vos années d’expérience, vos diplômes et certifications d\'un service :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes services</strong></li><li>Cliquez sur <strong>Modifier</strong> dans un service</li><li>Modifiez votre nombre d’années d’expérience, supprimer ou ajouter undiplôme ou unecertificationpuis cliquez sur <strong>Enregistrer</strong></li></ol>'
    }, {
      title: 'Comment indiquer mes disponibilités dans mon calendrier ?',
      contents: '<p>Il est indispensable d’indiquer vos disponibilités lors de la créationde votre boutique afind\'apparaître dans les résultats de recherche des utilisateurs.Lorsqu’un client recherchera un service sur la plateforme, il indiquerale service recherché, ettrès souvent indiquera une date et/ou un heure à laquelle il souhaiteobtenir ce service.Si vos disponibilités indiquées dans votre calendrier correspondent à lademande du client, vosservicesseront proposés dans les résultats de la recherche !Afin de renseigner convenablement votre calendrier, My-Alfred vous permet d’indiquer, jour parjour vospériodes de disponibilité. Plusieurs périodes peuvent être indiquéespour un même jour ou pourunepériode récurrente. Par exemple, vous pouvez être disponible le mercredi de 10h à 12h puis de 14h à 18h.Vous pouvez ensuite étendre vos heures de disponibilités de vos journéessur une période dedates.Par exemple, les périodes horaires renseignées s’appliquent pour lapériode du 1er octobre 2019 au 20 décembre 2019.Si vous proposez plusieurs services, les disponibilités indiquéespeuvent être définies parserviceou pour l’ensemble de vos services.</p><p>Vous pouvez à tout moment visualiser ou modifier le calendrier de vosdisponibilitésde vos service dans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier votre calendrier de disponibilités :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mon calendrier</strong></li><li>Cliquez sur <strong>Ajouter ou modifier dans la pagecalendrier</strong></li><li>Modifiez les jours, heures et périodes de vos disponibilitéspuis cliquez sur <strong>Enregistrer</strong></li></ol>'
    }, {
      title: 'Comment les utilisateurs peuvent réserver ?',
      contents: '<p>Pour l’ensemble de vos services, vous devez préciser la façon dont voussouhaitez que vos clients réservent vos services. Soit vous permettez à vos clients de réservervos servicesautomatiquement,soit vous souhaitez recevoir une notification pour laquelle vous avez 24h pour répondre. Lorsd’uneréservation automatique, le service est réservé et payé par le client.Si vous avez opté pour une validation de la réservation, le service seraréservé et payéqu’après votre acceptation.</p><p>Vous pouvez à tout moment visualiser ou modifier la façon dont voussouhaitez que vos clients réservent vos services dans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier la façon dont vos clients peuvent réserver vos services :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes paramètres de réservation</strong></li><li>Cliquez sur <strong>Modifier</strong>dans un service</li><li>Sélectionnez la façon dont vous souhaitez que vos clients réserventvos servicespuis cliquez sur <strong>Enregistrer</strong></li></ol>'
    }, {
      title: 'A quoi correspondent mes conditions de réservation ?',
      contents: '<p>Les conditions de réservation définissent les éléments que voussouhaitez vérifier à propos de vos clients. Vous pouvez exiger différentes options. Ces options sontcumulatives.</p><p>Conditions My-Alfred<br/>Adresse email et numéro de téléphone confirmés</p><p>Photo de profil<br/>Ces utilisateurs ont fourni une photo de profile.</p><p>Pièce d\'identité officielle<br/>Ces utilisateurs ont vérifié leur identité.</p><p>Recommandations d\'autres Alfred<br/>Ces utilisateurs ont déjà utilisé des services avec My-Alfred, sontrecommandés par d\'autresAlfred et n\'ont pas reçu de commentaires négatifs.</p><p>Il se peut que vous ayez moins de réservation si vous ajoutez desconditions. Les personnes quine répondent pas à vos critères peuvent quand même vous envoyer unedemande.</p><p>Vous pouvez à tout moment visualiser ou modifier les conditions deréservation de vos servicesdans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier vos conditions de réservation de vos services :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes paramètres de réservation</strong></li><li>Cliquez sur <strong>Modifier</strong>dans un service</li><li>Sélectionnez ou désélectionnez les options de vos conditions deréservationpuis cliquez sur <strong>Enregistrer</strong></li></ol>'
    }, {
      title: 'Comment gérer ma photo de profil ?',
      contents: '<p>La photo de votre profil sera visible des utilisateurs du site et leurpermettra de déjà vousconnaître! Téléchargez une photo claire et lumineuse, de bonne qualité. Pour unrendu optimal, la photodoitêtre cadrée, sans lunette de soleil, en regardant l’objectif, avec seulement vous sur la photo.</p><p>Vous pouvez à tout moment visualiser, ajouter ou supprimer votre photodans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour ajouter ou supprimer votre photo de profil :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Profil</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Ma photo</strong></li><li>Cliquez sur <strong>Télécharger une photo depuis votreordinateur </strong></li><li>Cliquez sur <strong>Valider</strong></li></ol>'
    }, {
      title: 'Comment définir mes conditions d\'annulations ?',
      contents: '<p>Les conditions d’annulation définissent sous quelle condition vousacceptez l’annulation d’uneréservation par un client. Nous avons définis 3 niveaux de conditions d’annulation :</p><p>Flexibles<br/>Remboursement intégral lorsque l’annulation d’un client intervientjusqu\'à 1 jour avant laprestation.</p><p>Modérées<br/>Remboursement intégral lorsque l’annulation d’un client intervientjusqu\'à 5 jours avant laprestation.</p><p>Strictes<br/>Remboursement intégral lorsque l’annulation d’un client intervientjusqu\'à 10 jours avant laprestation.</p><p>Vous pouvez à tout moment visualiser ou modifier vos conditions d’annulation de vos servicesdans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier vos conditions d’annulation de vos services dans votreboutique :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes paramètres de réservation</strong></li><li>Sélectionnez le type de condition d’annulation de réservation de vosservices puis cliquezsur<strong> Enregistrer</strong></li></ol>'
    }, {
      title: 'Comment gérer ma photo de couverture ?',
      contents: '<p>Votre photo de couverture est la photo positionnée en en-tête de votre boutique. Elle seravisibledes utilisateurs du site.La photo de couverture peut refléter vos goûts, vous permettre de mettrevotre travail en avant etc.Par défaut, My-Alfred attribue une photo de couverture à votre boutique.</p><p>Vous pouvez à tout moment visualiser, ajouter ou supprimer votre photodans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour ajouter ou supprimer votre photo de couverture :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur le crayon pour modifier, en haut à droite de votre photode couverture</li><li>Sélectionnez votre photo de couverture</li><li>Cliquez sur <strong>Valider</strong></li></ol>'
    },
  ],
  "Identification et vérification": [
    {
      title: 'Fonctionnement ?',
      contents: '<p>Chez My-Alfred nous souhaitons que les membres puissent proposer etconsommer des services entoutesécurité. C’est la raison pour laquelle , nous vous laissons lapossibilité de nous fournir unepièced’identité officielle lorsque vous êtes utilisateur et souhaitezsimplement consommer desservices.Lorsque vous souhaitez proposer vos services et devenir Alfred, nousvous demanderons une pièced’identité. Certains clients seront sensibles à cette vérificationd’identité et feront plus facilement le choix de votre boutique. Cependant, votre pièce d’identiténe sera jamais partagéeetvisible par un autre utilisateur de My-Alfred.</p>'
    }, {
      title: 'A quel moment dois-je fournir une pièce d\'identité ?',
      contents: '<p>Pour devenir Alfred, vous devez fournir une pièce d’identité en règle qui peut être soit unecartenationale d’identité soit un passeport. Vous pouvez fournir cette pièced’identité lors de lacréationde votre boutique ou plus tard dans le menu Votre profil. Lavérification de votre pièced’identitéest indispensable pour Devenir Alfred et pour que votre boutique soitvisible des autres autresmembresMy-Alfred.</p><p>Vous pouvez à tout moment insérer votre pièce d\'identité .</p><p style=\{\{width: \'100%\'\}\}>c</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Profil</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Confiance & vérification</strong> devotre compte</li><li>Sélectionnez le type de pièce Passeport ou Carte nationaled’identité</li><li>Cliquez sur Recto pour télécharger votre photo de pièce d’identité</li><li>Cliquez sur Verso pour ajouter le verso de votre pièce d’identité.</li></ol>'
    }, {
      title: 'Quel type de pièce d\'identité puis-je fournir ?',
      contents: '<p style=\{\{width: \'100%\'\}\}>Vous pouvez ajouter une des pièces d’identité officielle suivante sur laplateforme My-Alfred :</p><br/><ul style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Passeport</li><li>Carte Nationale d’Identité</li></ul><p>Si vous ajoutez votre carte Nationale d’identité, vous devreztélécharger 2 photos à savoir,le recto et le verso de votre document. Si vous ajoutez votre passeport,1 seule photo àtéléchargerest nécessaire mais assurez vous que que les numéros situés en bas de lapage du passeport oùfigurevotre photo soient bien visibles.</p>'
    }, {
      title: 'Quelles sont les données partagées avec votre pièce d’identité ?',
      contents: '<p style=\{\{width: \'100%\'\}\}>Si vous acceptez de fournir une pièce d\'identité officielle, lesinformations suivantes peuventêtre visibles par les autres utilisateurs de la plateforme My-Alfred :</p><br/><ul style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>La confirmation que votre pièce d\'identité a bien été ajoutée</li><li>Votre photo de profil et le prénom et le nom figurant sur votreprofil</li></ul><p>La photo de votre carte d’identité ainsi que les informations (à l\’exception de votre nom etprénom)ne seront jamais visibles par les autres utilisateurs de la plateformeMy-Alfred.</p>'
    }, {
      title: 'Comment est stockée ou supprimée la photo de ma pièce d\'identité ?',
      contents: '<p>Le stockage de la photo de votre pièce d\'identité officielle est régiepar notre <Linkhref={\'/\'}><a> Politique deconfidentialité.</a></Link>Il est préférable de ne pas supprimer votre pièce d’identité. Si vousavez des réservations pourlesquelles les clients ont exigé une pièce d’identité vérifiée, nousannulerons toutes lesréservationconcernées à venir.Cependant, vous pouvez demander la suppression de la photo de votrepièce d\'identité 90 joursaprès lafin de votre dernière réservation.</p><p style=\{\{width: \'100%\'\}\}>Pour supprimer la photo de votre pièce d\'identité :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Profil</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Confiance & vérification</strong> devotre compte</li><li>Cliquez sur la corbeille à côté de votre pièce d’identité pour lasupprimer</li></ol>'
    }],
  "Mes versements": [
    {
      title: 'Comment toucher mon versement ?',
      contents: '<p>Une fois la réservation confirmée, l’utilisateur à l’origine de laréservation reçoit un codeuniqueet dédié à votre réservation.Lorsque le service est réalisé, votre client doit vous communiquer ce code afin que vous puissiez toucher votre versement.</p><p>Une fois que vous avez votre code, rendez-vous sur votre fiche réservation depuis votresmartphoneou depuis votre ordinateur et cliquez sur “Indiquer mon code”. Saisissezles chiffres de votrecodeet validez.Une fois le code validé, vous recevrez votre versement sur le comptebancaire renseignédans “Préférence de versement” dans un délai de 4 jours maximum.Si vous n’avez pas renseigné d’IBAN, vous devrez l’ajouter avant votrepremière prestation, dansla rubrique “Préférence de versement” de votre compte.</p>'
    }, {
      title: 'Pourquoi dois-je communiquer un IBAN ?',
      contents: '<p>Pour devenir Alfred, il est impératif qu’un mode de versement soitrenseigné dans votre compteutilisateur. En effet, après chaque service réalisé, My-Alfred procèdeau versement du montantindiqué sur la réservation sur votre compte bancaire.</p><p style=\{\{width: \'100%\'\}\}>Pour ajouter ou supprimer votre IBAN :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Compte</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes préférences de versement</strong></li><li>Cliquez sur <strong>Ajouter un RIB</strong></li></ol>'
    }, {
      title: 'Quels sont les documents à fournir pour les versements ?',
      contents: '<p>Pour que nous puissions effectuer le versement de votre prestations,vous devez nous fournir leséléments suivants en fonction de votre statut de particulier oud’auto-entrepreneur.Ces éléments vous sont demandés lors de votre inscription et lors de lacréation de votreboutique.</p><p style=\{\{width: \'100%\'\}\}>Vous êtes un particulier :</p><br/><ul style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Votre nom et prénom</li><li>Votre date de naissance</li><li>Votre pays de résidence</li><li>Votre nationalité</li><li>Votre pièce d\'identité</li><li>Votre compte bancaire (IBAN)</li></ul><p style=\{\{width: \'100%\'\}\}>Vous êtes un auto-entrepreneur, en complément des éléments ci-dessus,les élémentssuivants vous sont également demandés :</p><ul style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Votre email</li><li>Nom de votre entreprise</li></ul>'
    }, {
      title: 'Comment puis-je retrouver mes informations de versements ?',
      contents: '<p>En tant qu’Alfred, vous pouvez suivre l’ensemble de vos versements dansla rubrique performancede votre boutique.A l’aide de votre tableau de bord, suivez l’évolution de vos versementspassés et à venir, etretrouvez toutes les informations sur vos versements.</p><p style=\{\{width: \'100%\'\}\}>Pour consulter vos informations de versements :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Je suisAlfred</strong></li><li>Cliquez sur l’onglet <strong>Performance</strong></li><li>Cliquez sur <strong>revenus</strong></li></ol>'
    }
  ],
  "Mes réservations": [
    {
      title: 'Comment modifier une réservation confirmée en tant qu’Alfred ?',
      contents: '<p>En tant qu’Alfred, vous pouvez modifier une réservation à la seulecondition que votre utilisateurl’accepte. Si votre utilisateur l’accepte, vous pouvez modifier la dateet l’horaire de votreservice,son prix, le prix de votre option ou compléter le service par uneprestation présente dans votreservice.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier votre réservation :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Je suisAlfred</strong></li><li>Cliquez sur <strong>Mes réservations</strong></li><li>Parcourez votre fiche réservation et cliquez sur modifier en bas devotre fiche deréservation</li><li>Cliquez sur <strong>Modifier la réservation</strong></li><li>Indiquez le champs que vous souhaitez modifier(prix/prestations/option/date etc.)</li><li>Cliquez sur <strong>Envoyer une demande de modification</strong></li></ol><p>Une fois la demande de modification envoyée, vous devrez attendre lavalidation de votre clientpour qu’elle soit modifiée. Votre fiche de réservation se mettraautomatiquement à jour.</p>'
    }, {
      title: 'Comment annuler une réservation en tant qu’Alfred ?',
      contents: '<p>L’annulation d’une réservation entraîne du stress et est susceptibled’impacter votre clientutilisateur. En tant qu’Alfred, vous pouvez annuler une réservation maisvous vous exposez à unepénalité de la part de votre client utilisateur. Si vous avez activé laréservation automatique sans demande de confirmation, vous pouvez annuler vos réservations sanspénalités mais un commentairementionnant que vous avez annulé la réservation sera automatiquement publié sur votre boutique.</p><p>Si vous n’avez pas activé la réservation automatique et décidez d’annuler une réservation plusde 7 jours avant la date d’exécution définie, une pénalité forfaitairede 10€ vous serademandée,et 20€ si l’annulation intervient 7 jours ou moins avant la dated’exécution du service définiedansla réservation. Par ailleurs, si vous annulez des réservations de tropnombreuses fois, vous nerespectez plus les CGU de My-Alfred et votre boutique ne sera plusvisible.</p><p>En cas d’annulation d’une réservation par un Alfred, le clientutilisateur sera remboursé de latotalité des frais engagés sur la plateforme My-Alfred dans le cadre dela réservationconcernée.</p><p style=\{\{width: \'100%\'\}\}>Pour annuler votre réservation :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Je suisAlfred</strong></li><li>Cliquez sur <strong>Mes réservations</strong></li><li>Parcourez votre fiche réservation et cliquez sur modifier en bas devotre fiche deréservation</li><li>Cliquez sur <strong>Annuler ma réservation</strong></li><li>Choisissez le motif de l’annulation</li><li>Rédigez un message à votre client utilisateur lui expliquant que sonservice est annulé</li><li>Cliquez sur <strong>Enregistrer</strong></li></ol><p>A noter qu’en cas d’imprévu, vous avez la possibilité de modifier ladate de la réservation avec l’accord de votre client utilisateur My-Alfred.</p>'
    }, {
      title: 'Quelles sont les pénalités si j’annule une réservation en tant qu’Alfred ?',
      contents: '<p>En tant qu’Alfred, vous pouvez annuler une réservation mais vous vousexposez à une pénalité delapart de votre client utilisateur. Si vous avez activé la réservationautomatique sans demande deconfirmation, vous pouvez annuler vos réservations sans pénalités maisun commentairementionnantque vous avez annulé la réservation sera automatiquement publié survotre boutique.</p><p>Si vous n’avez pas activé la réservation automatique et décidez d’annuler une réservation plusde7 jours avant la date d’exécution définie, une pénalité forfaitaire de 10€ vous sera demandée,et 20€ si l’annulation intervient 7 jours ou moins avant la dated’exécution du service définiedansla réservation. Par ailleurs, si vous annulez des réservations de tropnombreuses fois, vous nerespectez plus les CGU de My-Alfred et votre boutique ne sera plusvisible.</p>'
    }, {
      title: 'Comment rembourser mon utilisateur ?',
      contents: '<p>En cas d’annulation d’une réservation par un Alfred, le clientutilisateur sera remboursé de latotalité des frais engagés sur la plateforme My-Alfred dans le cadre dela réservationconcernée.</p><p style=\{\{width: \'100%\'\}\}>Pour annuler votre réservation :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Je suisAlfred</strong></li><li>Cliquez sur <strong>Mes réservations</strong></li><li>Parcourez votre fiche réservation et cliquez sur modifier en bas devotre fiche deréservation</li><li>Cliquez sur <strong>Annuler ma réservation</strong></li><li>Choisissez le motif de l’annulation</li><li>Rédigez un message à votre client utilisateur lui expliquant que sonservice est annulé</li><li>Cliquez sur <strong>Enregistrer</strong></li></ol><p>A noter qu’en cas d’imprévu, vous avez la possibilité de modifier ladate de la réservation avec l’accord de votre client utilisateur My-Alfred.</p>'
    }, {
      title: 'Puis-je modifier le prix d’une réservation en attente ou confirmée ?',
      contents: '<p>Chaque réservation peut-être modifiée quelque soit son statut. En revanche, votre clientutilisateurdoit impérativement accepter cette modification pour que la réservationretrouve son statutconfirmée.</p><p>Si votre réservation est confirmée mais que vous choisissez de lamodifier, son statut passerade réservation confirmée à réservation en attente jusqu’à ce que votreclient utilisateurconfirmeles modifications.</p><p>Si votre utilisateur ne valide pas vos modifications dans un délai 48h,la réservation estexpirée.Si votre utilisateur refuse vos modifications, la réservation estannulée et votre client seraremboursé de l’intégralité du montant engagé.</p>'
    }, {
      title: 'Puis-je planifier mon service sur plusieurs jours ?',
      contents: '<p>Dans le cadre de services susceptibles de se dérouler sur plusieursjournées ou plusieurscréneauxhoraires, nous vous recommandons de vous rapprocher de votre clientutilisateur afin d’établirensemble, un planning d’intervention.Une fois le planning d’intervention établi, vous pourrez renseigner cedernier dans votre ficheréservation et dans votre calendrier; celui de votre client se mettraautomatiquement à jour(périodes renseignées indisponibles).</p><p>A noter que la version publique de votre calendrier ne comporte que despériodes disponiblesou indisponibles, et non le contenu de vos services.</p>'
    }, {
      title: 'Puis-je échanger avec mon Alfred ou mon client ?',
      contents: '<p>Les utilisateurs sont en mesure de vous contacter afin d’obtenir desrenseignementscomplémentairessur l’un de vos services. Ils pourront vous contacter mais leurscoordonnées n\'apparaîtront pas,etvous ne pourrez pas leur communiquer votre numéro de téléphone et emailpersonnel.Dès lors qu’une demande de réservation est envoyée, vous pourrezéchanger avec votre utilisateurou votre alfred depuis la messagerie de My-Alfred.En revanche, dès lors qu’une réservation est confirmée, vous pourrezéchanger depuis leplateformeMy-Alfred, et les coordonnées de votre Alfred ou de l’utilisateur serontéchangées pour unmaximumde fluidité dans la réservation de la prestation.</p><p>Pour retrouver vos messages en tant qu’utilisateur, il vous suffit devous rendre dans l’onglet<strong> Messages</strong>. Pour retrouver vos messages en tantqu’Alfred, il vous suffitcliquez sur l’onglet<strong> Je suis Alfred</strong>, et de vous rendre dans larubrique <strong>Messages</strong>.</p>'
    }
  ],
  "Mon compte": [
    {
      title: 'Comment supprimer sa boutique ?',
      contents: '<p>A tout moment, vous avez la possibilité de supprimer votre boutique deservices My-Alfred.La suppression de votre boutique entraîne l’annulation de l’ensemble desréservations acceptées à venir, et leur remboursement.</p><p style=\{\{width: \'100%\'\}\}>Pour supprimer votre boutique :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mesparamètres</strong></li><li>Cliquez sur <strong>Paramètres</strong></li><li>Cliquez sur <strong>Supprimer</strong> dans la rubrique je souhaitesupprimer ma boutique deservices</li></ol><p>Saisissez votre mot de passe. Cette étape nous permet de nous assurerque vous êtes bienà l’initiative de la suppression de votre compte. Attention, cetteaction est irrémédiable.</p>'
    }, {
      title: 'Comment supprimer son compte ?',
      contents: ' <p>A tout moment, vous avez la possibilité de supprimer votre compteMy-Alfred. La suppression devotrecompte est irrémédiable.Si vous êtes Alfred, la suppression du compte implique la suppression devotre boutique,l’annulationde l’ensemble des réservations acceptées à venir, et leur remboursement.Si vous êtes simple utilisateur, la suppression de votre compte impliquel’annulation del’ensembledes réservations acceptées à venir, moyennant - en fonction desconditions d’annulation de(s) Alfred impacté(s) par cette annulation - des frais d’annulation.</p><p style=\{\{width: \'100%\'\}\}>Pour supprimer votre compte :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mesparamètres</strong></li><li>Cliquez sur <strong>Paramètres</strong></li><li>Cliquez sur <strong>Désactiver</strong> dans la rubrique je souhaitedésactiver mon compte</li></ol><p>Saisissez votre mot de passe. Cette étape nous permet de nous assurerque vous êtes bien àl’initiative de la suppression de votre compte.</p>'
    }, {
      title: 'Comment gérer mes notifications ?',
      contents: ' <p>Vos notifications peuvent être paramétrées depuis votre compte. Cela vous permet de choisir lemoyen de communication le plus adapté à vos besoins ou à vos habitudes(SMS, emails, push, appel téléphonique).Les notifications sont classées par rubrique et vous pouvez choisir àtout moment, de lesmodifierou de les désactiver.</p><p>Seule la rubrique Assistance du compte doit impérativement avoir l’unedes options denotificationsactivée. En effet, dans le cadre de vos réservations de services, desinformations légales,des questions de sécurité et de confidentialité, et pour répondre à vosdemandes adressées ànotreassistance utilisateur, nous devons être en mesure de vous envoyer desmessages. Pour votresécurité,vous ne pouvez pas désactiver les notifications par email et nouspourrions vous contacter partéléphone ou d’autres moyens si besoin.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier le paramétrage de vos notifications, il vous suffit de :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mesparamètres</strong></li><li>Cliquez sur la rubrique <strong>Notifications</strong></li><li>Cliquez sur <strong>Enregistrer</strong></li></ol><p>Saisissez votre mot de passe. Cette étape nous permet de nous assurerque vous êtes bien àl’initiative de la suppression de votre compte.</p>'
    }, {
      title: 'Comment gérer mes modes de paiement ?',
      contents: '  <p>Depuis votre compte, vous pouvez gérer l’ensemble de vos modes depaiement.</p><p style=\{\{width: \'100%\'\}\}>Les différents moyens de paiements de My-Alfred sont les suivants :</p><br/><ul style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Carte de paiement</li><li>Crédit (remboursement crédité sur votre compte)</li><li>Coupons (programme fidélité, parrainage, code promotionnel etc.)</li></ul><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mesparamètres</strong></li><li>Cliquez sur la rubrique <strong>Mes moyens de paiement</strong></li></ol>'
    }, {
      title: 'Comment gérer mes modes de versement ?',
      contents: '<p>Après chaque prestation réalisée par un Alfred, un versement du montantindiqué sur la fichede réservation lui sera adressé sur le mode de versement renseigné dansson compte utilisateur.A tout moment, vous pouvez ajouter ou supprimer un mode de versement.</p><p style=\{\{width: \'100%\'\}\}>Pour ajouter ou modifier votre préférence de versement :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mesparamètres</strong></li><li>Cliquez sur <strong>Préférences de versement</strong></li><li>Cliquez sur <strong>Ajouter un RIB</strong></li><li>Renseignez votre IBAN</li></ol><p>Vous pourrez ensuite modifier ou supprimer votre RIB.</p>'
    }, {
      title: 'Comment suivre mes transactions ?',
      contents: '<p>En tant qu’utilisateur de My-ALfred, vous pouvez suivre l’ensemble devos transactions depuis la rubrique “Historique de transactions” de votre compte. Lestransactions concernentles paiements et les versements.Vous pourrez ainsi retrouver vos transactions à venir et vostransactions passées.</p><p>En tant qu’Alfred, vous avez aussi la possibilité de suivre vostransactions dans la rubriqueperformance de votre boutique. Vous trouverez un tableau de bord completvous permettant desuivrel’évolution des transactions, de suivre vos versements, et d’estimervotre volume de transactionà venir.</p>'
    }, {
      title: 'Comment changer mon mot de passe ?',
      contents: '<p>A tout moment, vous pouvez changer votre mot de passe sur My-Alfred.Pour des raisons desécurité,nous vous conseillons de changer votre mot de passe 3 fois par an.</p><p style=\{\{width: \'100%\'\}\}>Pour changer votre mot de passe :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mesparamètres</strong></li><li>Cliquez sur <strong>Sécurité</strong></li></ol><p>Saisissez votre mot de passe actuel, puis saisissez le nouveau mot depasse, puis répétez le motde passe.Si les mots de passe correspondent, vous pourrez enregistrer et votremot de passe sera mis àjour.Attention, le mot de passe doit contenir 8 caractères au minimum, etdemeure strictementconfidentiel,vous ne devez en aucun cas le partager, le divulguer pour quelque raisonque ce soit.</p>'
    }, {
      title: 'Vous avez oublié votre mot de passe ?',
      contents: ' <p>Si vous avez oublié votre mot de passe lorsque vous souhaitez vousconnecter, cliquezsur “J’ai oublié mon mot de passe” sur la page de connexion de My Alfred. Un lien derécupérationde votre compte vous sera envoyé par email afin que vous puissiez créerun nouveau mot de passeetretrouver votre compte.Si vous ne recevez pas d’e-mail, pensez à jeter un coup d’oeil dans voscourriers indésirables;) !</p>'
    }, {
      title: 'Puis-je connecter My-Alfred à mon compte Gmail ?',
      contents: '<p>Lors de l’inscription, vous pouvez choisir de vous connecter au traversde Gmail afin de gagnerdu temps sur votre inscription et synchroniser vos contacts surMy-Alfred. A tout moment,vous pouvez supprimer la connexion entre My-Alfred et votre Gmail.</p><p style=\{\{width: \'100%\'\}\}>Pour cela:</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mesparamètres</strong></li><li>Cliquez sur <strong>Applications connectées</strong></li><li>Cliquez sur <strong>Supprimer</strong> dans l’encart del’application Gmail</li></ol><p style=\{\{width: \'100%\'\}\}>Si vous souhaitez connecter votre Gmail à My-Alfred après votre inscription :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mesparamètres</strong></li><li>Cliquez sur <strong>Applications connectées</strong></li><li>Cliquez sur <strong>Connecter</strong> dans l’encart del’application Gmail</li><li>Acceptez la connexion My-Alfred sur votre Gmail</li></ol><p>A noter que les applications connectées sont soumises à nos conditionsgénérales d’utilisation.</p>'
    }, {
      title: 'Puis-je connecter My-Alfred à mon compte Facebook ?',
      contents: '<p>Lors de l’inscription, vous pouvez choisir de vous connecter au traversde Facebook afin degagnerdu temps sur votre inscription et synchroniser vos contacts surMy-Alfred. A tout moment,vous pouvez supprimer la connexion entre My-Alfred et votre Facebook.</p><p style=\{\{width: \'100%\'\}\}>Pour cela:</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mesparamètres</strong></li><li>Cliquez sur <strong>Applications connectées</strong></li><li>Cliquez sur <strong>Supprimer</strong> dans l’encart del’application Facebook</li></ol><p style=\{\{width: \'100%\'\}\}>Si vous souhaitez connecter votre Facebook à My-Alfred après votre inscription :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mesparamètres</strong></li><li>Cliquez sur <strong>Applications connectées</strong></li><li>Cliquez sur <strong>Connecter</strong> dans l’encart del’application Facebook</li><li>Acceptez la connexion My-Alfred sur votre Facebook</li></ol><p>A noter que les applications connectées sont soumises à nos conditionsgénérales d’utilisation.</p>'
    }, {
      title: 'Comment empêcher l’indexation de mon profil et ma boutique sur les moteurs de recherche ?',
      contents: '<p>A tout moment et conformément à notre politique de confidentialité, vous pouvez choisird’empêcherl’indexation de votre profil, de votre boutique et de vos services parles moteurs de recherche.</p><p style=\{\{width: \'100%\'\}\}>Pour empêcher l’indexation de votre profil et de votre boutique par lesmoteurs de recherche :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mesparamètres</strong></li><li>Cliquez sur <strong>Paramètres</strong></li><li>Désactiver la ligne ‘’J\'accepte que mon profil et ma boutique soientindexés par les moteursde recherche”</li></ol>'
    }, {
      title: 'Comment gérer mes parrainages ?',
      contents: ''
    }, {
      title: 'A quoi sert le parrainage ?',
      contents: ' <p>Le parrainage vous permet de gagner des crédits sur la plateformeMy-Alfred en contribuantà l’évolution de la communauté My-Alfred. En invitant vos amis, votre famille, vos proches,à devenir Alfred ou à utiliser My-Alfred, vous gagnerez 20% du montantde sa premièreréservation,crédité dans votre compte, rubrique “Mode de paiement”.</p>'
    }
  ],
  "Mon profil": [
    {
      title: 'Comment modifier mon profil utilisateur ?',
      contents: '<p>Vous pouvez à tout moment modifier votre profil et mettre à jour vosinformations personnellesenvous rendant dans la rubrique Mon profil.Votre profil contient des informations obligatoires comme votre nom,prénom, votre date denaissanceainsi que votre email.Vous pouvez choisir d’indiquer des informations complémentaires pour vosutilisateurs, comme leslangues que vous parlez, votre emploi, vos diplômes...Ces informationsseront visibles par lesautresutilisateurs sur votre profil.</p><p style=\{\{width: \'100%\'\}\}>Pour accéder à votre profil :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Monprofil</strong></li><li>Cliquez sur <strong>Modifier le profil</strong></li></ol>'
    }, {
      title: 'A quoi correspondent les adresses de prestations ?',
      contents: '<p style=\{\{width: \'100%\'\}\}>Lorsque vous souhaitez réserver un service, notre plateforme vous propose des Alfred en fonctionde leur périmètre d’intervention. Dans ce cadre, nous utiliseronsl’adresse de prestation quevousaurez indiquée pour la prestation de service commandée. Vous pouvez àtout moment ajouter oumodifiervos adresses de prestations.</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Monprofil</strong></li><li>Cliquez sur <strong>Mes adresses de prestations</strong></li></ol>'
    }, {
      title: 'Puis-je avoir plusieurs adresses de prestation ?',
      contents: '<p>Vous pouvez choisir de renseigner plusieurs adresses de prestations dansle cadre de vosréservations sur My-Alfred. Dans votre profil, rubrique “Mes adresses deprestations”, vous pouvez ajouter, supprimer, modifier vos adresses de prestations. La première adresse saisiesera,par défaut, votre adresse principale, ce qui signifie qu’elle seral’adresse sélectionnée pardéfautpour vos réservations. A tout moment vous pouvez changer d’adresse pardéfaut en modifiant votre adresse principale.</p><p>Soyez rassuré(s) ! Vos adresses ne seront pas visibles des autresutilisateurs, seuls lesAlfred qui auront reçu une réservation et l’auront confirmé, disposerontde votre adresse deprestation pour le service concerné.</p>'
    }, {
      title: 'Comment gérer ma photo de profil ?',
      contents: '<p>La photo de votre profil sera visible des utilisateurs du site et leurpermettra de déjà vousconnaître ! Pour ajouter, modifier ou supprimer une photo de profil,rendez-vous dans larubrique“Photo” de votre profil. Si vous souhaitez supprimer votre photo deprofil, cliquez sur lacorbeilleen haut à droit de votre photo. Si vous souhaitez ajouter ou supprimerune photo, cliquezsur “Télécharger une photo depuis votre ordinateur”.</p><p>Conseil : Téléchargez une photo claire et lumineuse, de bonne qualité.Pour un rendu optimal,la photo doit être cadrée, sans lunette de soleil, en regardantl’objectif, avec seulement voussur la photo.</p>'
    }, {
      title: 'Comment vérifier mon email ?',
      contents: '<p>Lors de votre inscription, nous vous demanderons de renseigner votre adresse email.Un profil dont l’email est vérifié donne plus confiance aux autresutilisateurs de laplateforme.Pour confirmer votre adresse email, vous devez simplement cliquer sur‘’je confirme mon email’’dansl’email reçu lors de votre inscription. Si vous n’avez pas reçu d’email,nous vous invitons àvérifier votre email ou à consulter vos spams. A tout moment, vous avez la possibilité de modifier votre email et/ou de demander un nouvelle confirmation de votre email.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier votre adresse email :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Monprofil</strong></li><li>Cliquez sur <strong>Confiance et vérification</strong></li><li>Modifiez votre email</li><li>Cliquez sur Enregistrer</li></ol><p style=\{\{width: \'100%\'\}\}>Pour demander une nouvelle vérification de votre adresse email :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Monprofil</strong></li><li>Cliquez sur <strong>Confiance et vérification</strong></li><li>Cliquez sur Envoyer email de vérification</li><li>Vérifiez ensuite votre boîte d’emails et cliquez sur ‘’je confirmemon email’’ dans l’emailque vous avez reçu.</li></ol>'
    }, {
      title: 'Comment vérifier mon téléphone ?',
      contents: '<p>Lors de votre inscription, vous êtes invité(s) à renseigner et àvérifier votre numéro detéléphoneportable. L’ajout d’un téléphone vérifié permet aux autres utilisateursde la plateforme dedisposerd’un moyen de vous contacter lors d’une réservation. Une vérification dunuméro de téléphoneportable est demandée aux Alfreds lors de la création de leur boutiquede services et aux utilisateurs lors de la réservation d’un service auprès d’un Alfred. Vous pouvez àtout moment modifier oudemanderune nouvelle vérification de votre téléphone portable.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier votre téléphone portable :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Monprofil</strong></li><li>Cliquez sur <strong>Confiance et vérification</strong></li><li>Modifiez votre téléphone portable</li><li>Cliquez sur Enregistrer</li></ol><p style=\{\{width: \'100%\'\}\}>Pour demander une nouvelle vérification de votre téléphone portable :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Monprofil</strong></li><li>Cliquez sur <strong>Confiance et vérification</strong></li><li>Cliquez sur Envoyer SMS de vérification</li><li>Saisir le code à 4 chiffres reçu par SMS sur votre téléphone</li></ol>'
    }
  ],

}

module.exports = {
    CESU_NOTICE, OUTSIDE_PERIMETER, SCHEDULE_TITLE, SCHEDULE_SUBTITLE,
    getMangopayMessage, SHOP_CREATION_SUCCESSFUL, ID_CARD_CONFIRM_DELETION,
    REGISTRATION_PROOF_CONFIRM_DELETION, INFOBAR_MESSAGE, SHOWMORE, SEARCHBAR, BANNER_PRESENTATION,
    CATEGORY, BECOME_ALFRED, RESA_SERVICE, HOW_IT_WORKS, NEWS_LETTER, NAVBAR_MENU,
    SHOP, CMP_PRESENTATION, BOOKING, FAQ
};
