const KycDocumentStatus = require('mangopay2-nodejs-sdk/lib/models/KycDocumentStatus')
const {MANGOPAY_ERRORS}=require('./mangopay_messages')

const CESU_NOTICE = "Quel que soit votre statut, My Alfred est tenu de déclarer aux \
finances publiques vos revenus générés <b>si les deux conditions suivantes sont \
réunies dans l'année civile :</b><ul><li>vos revenus dépassent 3000 euros</li>\
<li>vous avez réalisé vingt prestations ou plus</li></ul>"

const OUTSIDE_PERIMETER = 'Ce service est hors de votre périmètre.'

const SCHEDULE_TITLE = 'Vos disponibilités'

const SCHEDULE_SUBTITLE = 'Votre calendrier vous permet d’ajouter vos disponibilités. Lorsque vous ajoutez ou modifiez vos disponibilités, seules les plages horaires indiquées pourront être réservées. Vous pouvez très facilement ajouter une période de disponibilité en indiquant les dates de début et fin, les jours correspondants et des tranches horaires. Vous pouvez également sélectionner une date ou plusieurs, indiquer si vous êtes disponible et sélectionner les tranches horaires.'


const SHOP_CREATION_SUCCESSFUL = 'Vos services sont maintenant disponibles dans my Alfred'

const REGISTRATION_PROOF_CONFIRM_DELETION = "Supprimer votre document d'immatriculation ?"

const MANGOPAY_MESSAGES = {
  'DOCUMENT_UNREADABLE': "Pièce d'identité illisible",
  'DOCUMENT_NOT_ACCEPTED': "Pièce d'identité invalide : carte d'identité, passeport, permis de conduire ou titre de séjour attendu",
  'DOCUMENT_HAS_EXPIRED': "Pièce d'identité expirée",
  'DOCUMENT_INCOMPLETE': "Pièce d'identité incomplète ou illisible",
  'DOCUMENT_DO_NOT_MATCH_USER_DATA': "Pièce d'identité ne correspond pas à l'identité que vous avez indiquée",
  'DOCUMENT_DO_NOT_MATCH_ACCOUNT_DATA': "Pièce d'identité ne correspond pas à vops coordonnées bancaires",
  'DOCUMENT_FALSIFIED': "Pièce d'identité falsifiée",
  'DOCUMENT_MISSING': "Pièce d'identité vide",
  'UNDERAGE_PERSON': 'Vous devez avoir au minimum 18 ans',
  [ KycDocumentStatus.Created ]: "Pièce d'identité enregistrée, en attente de validation",
  [ KycDocumentStatus.ValidationAsked ]: "Pièce d'identité en cours de validation",
  [ KycDocumentStatus.Validated ]: "Pièce d'identité valide",
  [ KycDocumentStatus.Refused ]: "Pièce d'identité refusée, merci d'en fournir une valide",
}

const INFOBAR = {
  message: 'Vous ne trouvez pas votre service ? L’équipe Alfred se mobilise pour trouver le meilleur Alfred près de chez vous',
}

const INFOBARMOBILE = {
  message: "L'application MyAlfred est disponible au téléchargement sur :",
}

const SHOWMORE = 'En savoir plus'

const SEARCH = {
  alfred_avail: ' Alfred disponible(s)',
  no_one: 'Aucun ',
  sort: 'Trier par',
}

const CARD_SERVICE = {
  card_help_title: "Besoin d'aide ?",
  card_help_chat: 'Utilisez notre chat en direct !',
  dialog_delete_title: 'Supprimer un service',
  dialog_delete_content: 'Voulez-vous vraiment supprimer ce service ?',
  no_description: 'Cet alfred est peut être trop timide pour parler de lui !',
  button_show_profil: 'Voir',
}

const USERSERVICEPREVIEW = {
  snackbar_no_booking: 'Pas de booking trouvé',
  snackbar_error_avc: 'Impossible de réserver cet Alfred pour avocôtés, prestations manquantes: ',
  error_presta: 'Sélectionnez au moins une prestation',
  error_minimum_basket: 'Commande minimum des prestation de {{minimum_basket}}€ requise',
  error_select_date: 'Sélectionnez une date',
  error_select_hour: 'Sélectionnez une heure',
  error_not_available: "{{firstname}} n'est pas disponible à cette date/heure",
  error_delay_prevenance: "Le délai de prévenance n'est pas respecté",
  error_resa_now: 'Réservation impossible avant maintenant',
  error_place: 'Sélectionnez un lieu de prestation',
  error_amount_too_high: 'Le montant dépasse le budget disponible pour votre département',
  error_resa_myself: 'Vous ne pouvez pas vous réserver vous-même',
  error_place_far_away: 'Cet Alfred se trouve trop loin de chez vous pour être réservé!',
  at_home: 'A mon adresse principale',
  at_remote: 'En visio',
  snackbar_error_resa: 'Réservation en cours de traitement',
  button_show_profil: 'Voir le profil',
  topic_description: 'Description',
  topic_description_summary: "Cet utilisateur n'a pas encore de description.",
  topic_list_label: 'Délai de prévenance',
  topic_list_summary: ' a besoin de ',
  topic_list_summary_end: ' pour préparer son service',
  topic_list_condition_label: 'Conditions d’annulation',
  topic_list_condition_summary: ' vous permet d’annuler votre réservation jusqu’à ',
  one_day: ' 1 jour ',
  five_days: ' 5 jours ',
  ten_days: ' 10 jours ',
  before_end_date: ' avant la date prévue',
  minimum_basket: 'Panier minimum',
  minimum_basket_of: 'Le panier minimum de {{firstname}} est de {{minimum_basket}} €',
  topic_title_date: 'Sélectionnez vos dates',
  topic_title_date_summary: 'Choisissez vos dates selon les disponibilités de ',
  topic_title_stuff: 'Matériel',
  topic_title_stuff_summary: 'Le matériel de ',
  topic_place: 'Lieu de la prestation',
  topic_zone_intervention: 'La zone dans laquelle ',
  topic_zone_intervention_end: ' peut intervenir',
  button_show_services: 'Voir les services',
  topic_commentary: 'Commentaires',
  topic_commentary_summary: 'Ici, vous pouvez laisser des commentaires à {{firstname}}!',
}

const DRAWER_BOOKING = {
  eligible: 'Eligible au CESU',
  warning_perimiter: 'Cet Alfred se trouve trop loin de chez vous pour être réservé!',
  warning_budget: 'Le montant dépasse le budget disponible pour votre département',
  warning_self: 'Vous ne pouvez pas vous réserver vous-même',
  hours: 'Heure',
  presta_choice: 'Choix de la presta',
  presta_place: 'Lieu de la prestation',
  presta_option: 'Option(s) de la prestation',
  deplacement_cost: 'Frais de déplacement',
  delivery: 'Retrait & livraison',
  display_details: 'Afficher les détails',
  resa_avc: 'Réservation AvoCotés pour ',
  resa_button: 'Réserver',
  next_step_paiment: 'Choix du paiement à l’étape suivante',
  button_info: 'Demande d’informations',
}

const BOOKING_DETAIL = {
  move_cost: 'Frais de déplacement',
  delivery_cost: 'Frais de livraison/enlèvement',
  service_cost: 'Frais de service',
  total: ' Total',
  will_total: ' Total à percevoir',
  cesu: 'dont CESU',
  company: 'dont participation entreprise',
}

const BUTTON_SWITCH = {
  textfield_label: 'Intitulé',
  textfield_placeholder: 'Saisissez un intitulé',
  helpertext: 'Obligatoire',
  error_label: 'label introuvable',
  price: 'Tarif',
}

const FAQ_ABOUT = {
  title_birth: 'Fondé en 2019',
  content_birth: 'My Alfred est né de l’envie de nous simplifier la vie. Nous voulions répondre à une uestion simple : Comment gagner du temps ? Aujourd’hui, nous sommes heureux de répondre à une multitude de problématiques. En créant une plateforme d’économie collaborative, nous voulons simplifiez votre quotidien mais nous espérons aussi rapprocher les générations, développer l’entrepreunariat, contribuer au développement des compétences de chacun et créer une communauté où il fait bon vivre.',
  title_we_are: 'Nous sommes My Alfred',
  content_we_are: 'Nous sommes persuadés que l’économie collaborative favorise le développement de nouvelles formes d’emploi pour des entrepreneurs qui ont soif de liberté, de créativité et d’activité multiples. Nous mettons en relation des particuliers, des entrepreneurs pour que chacun puisse proposer ou disposer de tous les services. Nous apportons de la visibilité, de l’équité, de la transparence, un espace communautaire où chacun participe au développement d’une économie responsable. Nous avons à cœur de faire prendre conscience à chacun d’entre nous que seul on sait faire peu de choses, ensemble on peut tout faire.',
  title_is_what: "My Alfred, qu'est-ce que c'est ?",
  content_is_what: 'My Alfred crée des liens entre les personnes en leur donnant la possibilité de réserver des services partout en France. Les Alfred constituent le moteur de la communauté et fournissent à notre communauté des services de qualités, comme s’ils le faisaient pour eux même. Plus de 20 000 prestations sont recensées sur My Alfred, portées par plusieurs milliers d’Alfred compétents, talentueux et bienveillants.',
  title_service: "Qu'est-ce que les services d’Alfred ?",
  content_service: "Si vous disposez d’un talent, d’une passion ou tout simplement de temps, vous pouvez gagner de l'argent en les mettant à la disposition de notre communauté. En quelques minutes, vous proposez vos services, fixez vos conditions et créez votre profil d’Alfred, vous permettant de bénéficier d’une grande visibilité, une interface personnalisée propre à vos services, à votre personnalité.",
  title_mission: 'Notre mission',
  content_mission: 'Notre mission est de créer un lieu de rencontres et d’opportunités, où trouver la bonne personne n’est plus un problème.',
  title_vision: 'Notre vision',
  content_vision: 'Nous aimerions que My Alfred puisse vous accompagner au quotidien. Notre communauté est au coeur de ce que nous faisons et nous souhaitons créez un espace où règne la confiance et la simplicité.',
}

const FAQ_BECOME_ALFRED = {
  one: '1',
  one_title: 'Proposez vos services',
  one_content: "Vous n'avez aucun frais à payer pour proposer vos services. Indiquez simplement vos prestations en vous appuyant sur une liste de plus de 2000 services proposées sur My-Alfred. Un service n'apparaît pas ? Soumettez-le à nos équipes !",
  two: '2',
  two_title: 'Fixez vos conditions',
  two_content: "Indiquez vos disponibilités (jours, heures...) ainsi que vos tarifs et tous les critères pour définir votre prestation. Si vous avez besoin d'aide, nous sommes là pour vous accompagner dans la création de votre boutique de compétences !",
  three: '3',
  three_title: 'Choisissez votre Alfred et réservez !',
  three_content: 'Choisissez le profil et la prestation qui vous intéresse puis sélectionnez vos dates et vos options. Cliquez sur le bouton réservez et suivez la procédure de paiement',
  why_become_alfred: 'Pourquoi devenir Alfred ?',
  why_become_alfred_content: 'My-Alfred vous permet, de manière simple et sécurisée, de mettre vos services à disposition de tout un chacun. Un talent pour la décoration ? Une passion pour la cuisine ? Ou tout simplement du temps : proposez vos services et complétez vos revenus. Vous avez un contrôle total sur vos disponibilités, vos prix et le détail de vos prestations.',
  who_become_alfred: 'Qui peut devenir Alfred ?',
  who_become_alfred_content: "Nous sommes tous des Alfred dès l'âge de {{age}} ans. Chacun d'entre nous doit pouvoir partager ses savoir faire, ses compétences, ses passions... Tantôt consommateur d'Alfred, tantôt Alfred, rejoignez la communauté Alfred en quelques clics !",
  create_shop: 'Créez votre boutique à votre façon',
  propose_service: 'Vous proposez vos services',
  propose_service_content: "A travers la création de votre boutique, vous proposez vos services en décrivant l'ensemble de vos prestations. Vous pouvez à tout moment revenir sur votre boutique, ajouter ou supprimer des services. Les différentes étapes de création de votre boutique sont extrêmement simples. À vous de jouer !",
  availibility: 'Vous affichez vos disponibilités',
  aivailibility_content: 'Vous indiquez vos disponibilités (jours, heures...) ainsi que vos tarifs et tous les critères pour définir votre prestations. Vous pouvez synchroniser votre calendrier My-Alfred avec vos autres calendriers et éviter de manquer un rendez-vous. Tous vos calendriers sont mis à jour automatiquement',
  your_price: 'Vous fixez vos prix',
  your_price_content: "C'est à vous de fixer les prix de vos services : nos outils de tarifications sont là pour vous aider à proposer le meilleur prix. Vous pouvez facilement ajouter des éléments personnalisés, notamment des tarifs de week-end, de nuit, des packages de services...",
  your_rules: 'Vous déterminez vos règles',
  your_rules_content: "Pour que les utilisateurs de My-Alfred puissent facilement comprendre vos services, vous définissez vos règles avant qu'ils puissent réserver. S'ils enfreignent les règles après avoir réservé, vous pourrez annuler leur réservation sans aucune pénalité.",
}

const ADD_SERVICE = {
  one: '1',
  register_title: 'Inscrivez-vous & détaillez vos informations',
  register_phone: 'Commencez par vous inscrire en précisant votre adresse et votre numéro de téléphone',
  two: '2',
  begin_your_research: 'Commencez votre recherche',
  begin_your_research_content: 'Indiquez le type de service que vous recherchez dans de recherche et parcourez les différentes catégorie de service',
  three: '3',
  three_title: 'Choisissez votre Alfred et réservez !',
  three_content: 'Choisissez le profil et la prestation qui vous intéresse puis sélectionnez vos dates et vos options. Cliquez sur le bouton réservez et suivez la procédure de paiement',
}

const FAQ_NEED_MORE = {
  link: 'Et si vous souhaitez en savoir plus',
  you_can: 'Vous pouvez ',
  contact_us: 'nous contacter',
}

const FAQ_OUR_COMMUNITY = {
  title: 'Un monde où il fait bon vivre',
  content: 'Chez My Alfred, notre communauté est au coeur de nos préoccupations. Notre priorité est de créer un espace où il fait bon vivre dans lequel chacun puisse trouver sa place. Ici, le racisme, l’homophobie, le sexisme ou toute autre forme de discrimination n’est pas toléré.<br/> Nous croyons que le silence n’est pas une option et que nous devons faire front. Ensemble, nous pouvons nous éduquer et apprendre. Nous pouvons amplifier les voix de ceux qui subissent ces injustices et provoquer un vrai changement.<br/>My Alfred soutient les femmes, les personnes de couleur et la communauté LGBTQ+.',
}

const LEGAL_NOTICE = {
  mention_legal: 'Mentions légales',
  editor: 'Editeur',
  social: 'Raison sociale : MY-ALFRED',
  rcs: 'RCS : 850 148 867',
  capital: 'Société par Actions Simplifiée au capital social de 40.000€',
  tva: 'N° TVA intracommunautaire : FR5850148867',
  address: 'Adresse du siège social',
  address_begin: '42 Rampe Bouvreuil',
  postal: '76000 Rouen',
  country: 'France',
  ceo: 'Directeur de la publication',
  ceo_sv: 'Solène Vanuxem, Directrice Général',
  host: 'Hébergement',
  aws: 'Amazon Web Services',
  aws_address: 'Adresse : Amazon Web Services EMEA SARL, Succursale Française',
  aws_postal: '31 Place des Corolles, Tour Carpe Diem, 92400 Courbevoie',
  aws_contact: 'Contact : https://aws.amazon.com/fr/contact-us/',
  aws_phone: 'Tél : 01.46.17.10.00',
  email: 'Mail',
  email_hello: 'hello@my-alfred.io',
  phone: 'Téléphone',
  phone_number: '02 35 76 47 52',
}

const CONFIRM_PAYMENT = {
  snackbar_error_payment: 'Paiement en cours de traitement',
}

const ADDRESS_FACTURATION = {
  topic_service: 'Adresse du service',
  address_billing_title: 'ADRESSE & FACTURATION',
  payment_title: 'PAIEMENT',
}

const DRAWER_BOOKING_RECAP = {
  title: 'Récapitulatif',
  moving_cost: 'Frais de déplacement',
  button_pay: 'Payer',
  method_payment: "Choix du mode de paiement l'étape suivante",
}

const PAYMENT_PICS = {
  pics_cb_name: 'cb',
  pics_visa_name: 'visa',
  pics_mastercard_name: 'mastercard',
  pics_american_url: 'amex',
  pics_american_name: 'AmericanExpress',
  pics_msi_url: 'msi',
  pics_maestro_url: 'maestro',
}

const PAYMENT_CHOICE = {
  topic_payment_mode: 'Mode de paiment',
  info_payment: 'En validant votre paiement, vous acceptez nos ',
  cgv: ' CGV ',
  next_part: ' ainsi que notre ',
  policy: ' politique de protection des données personnelles.',
}

const PAYMENT_MODE = {
  title: 'Paiement sécurisé',
  link_paid_another_card: 'Payer avec une autre carte',
  topic_postal_service: 'Adresse du service',
}

const ADDRESS_SERVICE = {
  remote: 'En visio',
}

const PROFILE = {
  id_card: "Carte d'identité ",
  checked: 'vérifié',
  no_checked: 'non-vérifié',
}

const SEARCHBAR = {
  what: 'Quel service ?',
  where: 'Où ?',
  when: 'Quand ?',
  labelWhere: "L'adresse",
  labelWhat: 'Le service',
  what_placeholder: 'Ménage, jardinage, ...',
  labelWhen: 'Les dates',
  labelStatus: 'Statut',
  labelDate: 'Date(s)',
  labelLocation: 'Lieu(x)',
  labelPerimeter: 'Périmètre',
  labelCategory: 'Catégorie(s)',
  labelService: 'Service(s)',
  searching: 'Recherche en cours',
  no_results: "Nous n'avons pas trouvé de résultat pour votre recherche",
  professional: 'Pro',
  particular: 'Particulier',
  start_date: 'Début',
  end_date: 'Fin',
  at_home: 'Chez moi',
  alfred_home: "Chez l'Alfred",
  remote: 'En visio',
  looking_for_service: 'Quel service recherchez-vous ?',
  dates: 'Dates',
  main_adress: 'Adresse principale',
  find_everywhere: 'Partout, Rechercher des Alfred partout',
  add_adresses: 'Ajouter une adresse',
  next_button: 'Suivant',
  find_button: 'Rechercher',
  label_mobile_home: 'Accueil',
  label_explore: 'Explorer',
  label_resa: 'Réservations',
  label_message: 'Messages',
  label_profil: 'Profil',
  label_log: 'Connexion',
  label_signin: 'Inscription',
  label_presta: 'Prestataire',
  begin_search: 'Commencez votre recherche',
  what_service: 'Quel service recherchez-vous ?',
  where_place: 'Où',
  filter: 'Filtres',
  display: 'Afficher les résultats',
  hello: 'Bonjour',
  my_profil: 'Mon profil',
  my_settings: 'Mes paramètres',
  my_services: 'Mes services',
  create_shop: 'Proposer mes services',
  my_messages: 'Mes messages',
  my_resa: 'Mes réservations',
  dashboard_alfred: 'Dashboard My Alfred',
  dashboard: 'Dashboard',
  log_out: 'Déconnexion',
  service_company: 'Services aux entreprises',
  service_collab: 'Services aux collaboratuers',
  price: 'Tarifs',
  crea_service: 'Je propose mes services',
  log_in: 'Connexion',
  sign_in: 'Inscription',
}

const NAVBAR_MENU = {
  ourServices: 'Nos services',
  myServices: 'Mes services',
  registerServices: 'Proposer mes services',
  ourTeam: 'Notre équipe',
  contactUs: 'Nous contacter',
  businessSide: 'Espace Entreprise',
  classicSide: 'Retour sur myalfred.io',
  aboutUs: 'À propos',
  ourCom: 'Notre communauté',
  signIn: 'Inscription',
  logIn: 'Connexion',
}

const BANNER_PRESENTATION = {
  title: 'La réservation en ligne',
  subTitle: 'De vos services du quotidien',
  text: 'Artisans, indépendants, entrepreneurs, étudiants... en quelques clics trouvez la personne et le service dont vous avez besoin.',
  button: 'Découvrir',
}

const BANNER_B2B_PRESENTATION = {
  title: 'Des milliers de talents',
  subTitle: 'Au service de votre entreprise',
  text: 'Trouvez le prestataire idéal pour répondre aux besoins ponctuels de votre entreprise & de vos collaborateurs. Des milliers de profils vérifiés et qualifiés au service de vos projets, votre stratégie, vos collaborateurs et vos locaux ! Un service simple et sécurisant !',
  button: 'Découvrir',
}

const CATEGORY = {
  title: 'Catégories',
  text: 'Des milliers de services à découvrir',
  button: 'Tout découvrir',
}

const BECOME_ALFRED = {
  title: 'Devenir Alfred',
  text: 'Créez votre compte et proposez vos services',
  button: 'En savoir plus',
}

const RESA_SERVICE = {
  title: 'Proposez un service',
  text: 'Créez votre compte et proposez un service',
  button: "C'est parti !",
}

const HOW_IT_WORKS = {
  leftText: 'En quelques clics, réservez le service et la personne dont vous avez besoin.#MyAlfred.',
  rightText: 'Vous pouvez consulter des centaines de profils, choisir votre Alfred, réserver et payer en ligne votre service. Notre équipe vous accompagne à chaque étape !',
}

const TRUST_SECURITY = {
  first_item: {
    title: 'Réservation en instantané',
    text: 'Avec un délai de prévenance bien sûr',
  },
  second_item: {
    title: 'Paiement 100% sécurisé',
    text: 'Par la Nasa et le Pentagone',
  },
  third_item: {
    title: 'Notre équipe',
    text: 'Toujours à votre écoute',
  },
  payment: 'Paiement',
  security: '100% sécurisé',
}

const LAYOUT_ACCOUNT = {
  my_informations: 'Mes Informations',
  payment_method: 'Modes de paiement',
  my_sites: 'Mes sites',
  my_adresses: 'Mes adresses',
  verification: 'Vérification',
  security: 'Sécurité',
  notification: 'Notifications',
  my_settings: 'Mes paramètres',
}

const LAYOUT_EVALUATE = {
  title: 'Evaluation & commentaires',
}

const LAYOUT_MESSAGES = {
  title: 'Mes Messages',
  messages_alfred: 'Mes messages Alfred',
  messages_user: 'Mes messages d\'utilisateur',
}

const LAYOUT_PROFIL = {
  about: 'À propos',
  services: 'Services',
  review: 'Mes avis',
  schedule: 'Mon calendrier',
  stats: 'Mes statistiques',
  name: 'Je m\'appelle ',
}

const LAYOUT_RESA = {
  title: 'Mes Reservations',
  messages_alfred: 'Mes messages Alfred',
  messages_user: 'Mes messages d\'utilisateur',
}

const LOGIN = {
  title: 'Connexion',
  input_label: 'Email',
  input_password: 'Mot de passe',
  input_role: 'Rôle',
  button: 'Connexion',
  forgotten_password: 'Mot de passe oublié ?',
  register_yet: 'Pas encore inscrit ? Inscrivez-vous !',
}

const CARD_ADD_SERVICE ={
  add: 'Ajouter un service',
}

const COMPANY_DASHBOARD = {
  conciergerie: 'Conciergerie',
  microservice: 'Microservice',
}

const ACCOUNT_COMPANY = {
  account: 'Mon Compte',
  about_company: 'A propos de mon entreprise',
  siret: 'siret',
  postal: 'adresse',
  invoice_postal: 'Adresse de facturation',
  activity: "Secteur d'activité",
  size: "Taille de l'entreprise",
  tva: 'tva',
}

const EDIT_PICTURE = {
  snackbar_update_photo: 'Photo modifiée avec succès',
  button_update: 'Modifier',
}

const INDEX_DASHBOARD = {
  snackbar_update_admin: 'Représentant légal mis à jour',
  title: 'Tableau de bord',
  title_admin: 'Représentant légal (doit être un administrateur)',
  birthdate: 'Date de naissance',
  birthdate_helper: "La date de naissance de l'administrateur est requise",
}

const SERVICES_COMPANY = {
  snackbar_remove_service: 'Service retiré',
  dialog_config_content_title: 'Prise en charge',
  input_month_year: 'Mois/An',
  month: 'Mois',
  year: 'An',
  classification_title: 'Classification',
  classification: 'la classification ',
  this_classification: ' cette classification',
  department_title: 'Département',
  department: 'le département ',
  this_department: 'ce département',
  select_service: 'Sélectionnez les services autorisés pour {{entity}}',
  services_title: 'Services',
  take_care_level: 'Niveau de prise en charge',
  dialog_remove_text: 'Voulez vous supprimer {{service}} de {{group}} ?',
  title: 'Mes services',
  services_available_for: 'Services disponibles pour {{entity_type}} <strong>{{entity_name}}</strong>',
  no_budget: 'Pas de budget défini',
}


const ABOUT = {
  address_placeholder: 'Entrez votre adresse',
  b2b_title_topic: 'Modifiez les informations de votre entreprises',
  title_topic: 'Modifiez vos informations',
  b2b_titlesummary_topic: 'Ici, vous pouvez modifier les informations de votre entreprise',
  titlesummary_topic: 'Ici, vous pouvez modifier vos informations',
  website: 'Site Web',
  label_address: "Lieu d'habitation",
  textfield_website: 'Site Web',
  spoken_languages: 'Langues parlées',
  textfield_languages: 'Sélectionnez vos langues',
  option_message: "Plus d'options disponibles",
  b2b_activity: 'Secteur d’activité',
  b2b_activity_label: 'Secteur d’activité',
  button_update: 'Modifier',
  alfred_certifed: 'à un profil vérifié',
  snackbar_profil_update: 'Profil modifié avec succès',
}

const LAYOUT_ABOUT = {
  my_name_is: "Je m'appelle {{firstname}}",
  text: 'et j’ai hâte de vous rencontrer !',
  item_about: 'À propos',
  item_service: 'Services',
  item_review: 'Avis',
  item_my_services: 'Mes services',
  item_my_reviews: 'Mes avis',
  item_my_schedule: 'Mon calendrier',
  item_my_stat: 'Mes statistiques',
}


const EDIT_PROFIL = {
  email_send: 'Mail envoyé',
  error_email: 'email non envoyé',
  sms_send: 'Le SMS a été envoyé',
  sms_error: "Impossible d'envoyer le SMS",
  validate_phone: 'Votre numéro de téléphone est validé',
  incorrect_code: 'Le code est incorrect',
  error_verif_code: 'Erreur à la vérification du code',
  dialog_title_phone: 'Confirmation du numéro de téléphone',
  dialog_text_phone: 'Saisissez le code reçu par SMS',
  dialog_textfield_placeholder: '0000',
  dialog_button_confirm_later: 'Confirmer plus tard',
  title: 'Modifier votre profil',
  textfield_firstname: 'Prénom',
  textfield_about_me: 'À propos de moi',
  char_max: '{{maxchars}} caractères max',
  personnal_info: 'Informations personnelles',
  gender: 'Sexe',
  textfield_email_label: 'Adresse email',
  user_email_check: 'Votre email est vérifié',
  user_newemail_check: 'Enregistrer votre nouvel email',
  check_your_email: 'Vérifier votre email',
  textfield_phone: 'Téléphone',
  user_phone_check: 'Votre téléphone est vérifié',
  user_newphone_check: 'Enregistrer votre nouveau téléphone',
  check_your_phone: 'Vérifiez votre téléphone',
  user_info_options: 'Informations facultatives',
  textfield_user_diploma: 'Diplômes',
  textfield_user_school: 'Ecoles',
  textfield_user_job: 'Emploi',
  snackbar_profil_update: 'Profil modifié avec succès',
  snackbar_send_email: 'Mail envoyé',
  snackbar_error_email: 'Mail non envoyé ',
  information: 'Mes informations',
  company_profil: 'Votre profil entreprise',
  textfield_company: 'Nom de l’entreprise',
  invoice_company: 'Adresse de facturation',
  siret_placeholder: 'Siret',
  company_tva: 'N° TVA',
  company_assujeti: 'Assujetti à la TVA',
  size_company: 'Taille de l’entreprise',
  activity_sector: 'Secteur d’activité',
  about_company: 'A propos',
  save_button: 'Enregistrer',
  about_you: 'À propos de vous ',
  admin: ' - vous êtes le représentant légal',
  name_company: 'Nom',
  firstname_company: 'Prénom',
  email_company: 'Email',
  email_checked: 'Votre email est vérifié',
  new_email: 'Enregistrer votre nouvel email',
  check_new_email: 'Vérifier votre email',
  fonction_company: 'Fonction',
  birthdate_admin: 'Date de naissance',
}

const PAYMENT_METHOD = {
  title: 'Modes de paiement',
  subtitle: "N'hésitez pas à enregistrer un mode de paiement pour aller plus vite lors de vos réservations.",
}

const REGISTER = {
  snackbar_already_logged: 'Vous êtes déjà inscrit',
  snackbar_sms_send: 'Le SMS a été envoyé',
  snackbar_sms_error: "Impossible d'envoyer le SMS",
  snackbar_phone_valid: 'Votre numéro de téléphone est validé',
  snackbar_error_code_phone: 'Le code est incorrect',
  snackbar_error_check_phone: 'Erreur à la vérification du code',
  snackbar_phone_add: 'Téléphone ajouté',
  dialog_phone_title: 'Confirmation du numéro de téléphone',
  dialog_phone_content: 'Saisissez le code reçu par SMS',
  dialog_cgu_close: 'Fermer',
  dialog_phone_confirm_later: 'Confirmer plus tard',
  textfield_email_error: 'Veuillez entrer une adresse email valide.',
  textfield_code: 'Code',
  title: 'Inscription',
  next_button: 'Suivant',
  previous_button: 'Précédent',
  link_already_account: 'Vous avez déjà un compte My Alfred ?',
  finish_button: 'Terminer',
}

const REGISTER_FIRST_PAGE = {
  textfield_email_title: 'Email',
  textfield_email_placeholder: 'Email',
  textfield_firstname: 'Prénom',
  textfield_firstname_placeholder: 'Prénom',
  textfield_create_password: 'Créer un mot de passe',
  textfield_create_password_placeholder: 'Créer un mot de passe',
  textfield_confirm_password: 'Confirmer mot de passe',
  textfield_confirm_password_placeholder: 'Confirmer mot de passe',
}

const REGISTER_SECOND_PAGE = {
  dialog_cgu_close: 'Fermer',
  address_title: 'Adresse postale',
  address_subtitle: 'Votre adresse ne sera pas visible, mais nous l’utiliserons pour vous proposer ou proposer vos services aux utilisateurs ou Alfred proches de chez vous.',
  algolia_placeholder: 'Recherchez votre adresse',
  birthdate_title: 'Date de naissance',
  minimum_age_start: 'Pour vous inscrire, vous devez être âgé d’au moins ',
  minimum_age_end: ' ans. Les autres utilisateurs ne verront pas votre date de naissance.',
  textfield_day: 'Jour',
  textfield_day_placeholder: 'Jour',
  textfield_month: 'Mois',
  textfield_month_placeholder: 'Mois',
  textfield_year: 'Année',
  textfield_year_placeholder: 'Année',
  textfield_phone: 'Numéro de téléphone',
  textfield_phone_placeholder: 'Numéro de téléphone',
  phone_title: 'Téléphone',
  phone_subtitle: "L'ajout de votre numéro de téléphone permet aux membres My-Alfred de disposer d'un moyen pour vous contacter.",
  button_cgu: 'J’accepte les conditions générales d’utilisation de My-Alfred.',
}

const REGISTER_THIRD_PAGE = {
  title: 'Inscription terminée',
  subtitle: 'Inscription réussie ! Vous pouvez maintenant proposer ou rechercher vos services sur My Alfred',
  button_explore: 'Commencez à explorer',
  button_shop: 'Proposer mes services',
  link_help: "Besoin d'aide pour proposer vos services ? Prenez rendez-vous avec l'équipe My Alfred ici !",
}

const HANDLE_CB = {
  cb_saves_title: 'Cartes enregistrées',
  cb_subtitle_paid: 'Payez encore plus rapidement sans communiquer vos informations financières.',
  cb_title_dialog_delete: 'Voulez-vous vraiment supprimer votre carte bancaire ?',
  cb_content_dialog_delete: "Si vous supprimez votre carte bancaire vous ne pourrez plus l'utiliser par la suite avec ce compte.",
  cb_title_dialog_add: 'Enregistrer une carte',
  cb_subtitle_dialog_add: 'Ajouter une carte en toute sécurité',
  cb_dialog_nb_add: 'Numéro de carte',
  cb_dialog_placeholdercb_add: 'Votre carte de crédit',
  cb_dialog_expdate_add: "Date d'expiration",
  cb_dialog_placeholderexpdate_add: 'MM/YY',
  cb_dialog_cvv_add: 'CVV',
  cb_dialog_savecb_add: 'Enregistrer la carte',
  cb_dialog_crypdata_add: 'Toutes les données de paiement sur My Alfred sont cryptées.',
  cb_dialog_mongo_add: 'Elles sont gérées par mangopay notre partenaire de confiance.',
  snackbar_add: 'Carte ajoutée !',
  snackbar_delete: 'Carte supprimé !',
}

const PAYMENT_CARD = {
  no_cb_saved: 'Aucun mode de paiement enregistré',
}

const HANDLE_RIB = {
  snackbar_rib_add: 'RIB ajouté',
  snackbar_error_rib_add: "Erreur à l'ajout du RIB",
  snackbar_rib_delete: 'Compte bancaire supprimé',
  snackbar_rib_error_delete: 'Un erreur est survenue',
  dialog_add_rib_title: 'Ajouter un RIB',
  dialog_add_rib_subitle: 'Ajouter un RIB en toute sécurité',
  dialog_add_rib_iban: 'IBAN',
  dialog_add_rib_bic: 'Code SWIFT / BIC',
  dialog_add_rib_button_save: 'Enregistrer le RIB',
  dialog_add_rib_data: 'Toutes les données de paiement sur My Alfred sont chiffrées.',
  dialog_add_rib_mongo: 'Elles sont gérées par mangopay notre partenaire de confiance.',
  dialog_delete_rib_title: 'Voulez-vous vraiment supprimer votre RIB ?',
  dialog_delete_rib_content: "Si vous supprimez votre RIB vous ne pourrez plus l'utiliser par la suite avec ce compte.",
  title: 'RIB enregistrés',
  b2b_subtitle: 'Renseignez un rib pour permettre à vos collaborateurs le paiement par prélèvement bancaire.',
  subtitle: 'Choisissez le versement directement sur votre compte bancaire.',
  no_rib: 'Aucun RIB enregistré',
  info_data: 'Toutes les données de paiement sur My Alfred sont chiffrées.',
  mango_info: 'Elles sont gérées par mangopay notre partenaire de confiance.',
}

const MY_ADDRESSES = {
  title: 'Mes adresses',
  title_b2b: 'Mes sites',
  subtitle: 'Ici, vous pouvez gérer vos adresses',
  b2b_subtitle: 'Ici, vous pouvez gérer les sites de',
}

const HANDLE_ADDRESSES = {
  snackbar_addresses_update: 'Adresse principale modifiée',
  snackbar_addresses_add: 'Adresse ajoutée',
  snackbar_addresses_update_success: 'Adresse modifiée avec succès',
  snackbar_addresses_delete: 'Adresse supprimée',
  dialog_delete_title: 'Supprimer cette adresse ?',
  dialog_delete_content: 'Voulez-vous vraiment supprimer cette adresse ?',
  title_b2b: 'Mon siège social',
  title: 'Mon adresse principale',
  placeholder_algo: 'Modifiez votre adresse',
  book_title_b2b: 'Autres sites',
  book_title: "Mon carnet d'adresses",
  b2b_title_add_sites: 'Ajoutez vos sites et gagnez du temps',
  title_add_sites: 'Ajoutez plusieurs adresses et gagnez du temps.',
  textfield_name_placeholder_add_sites: 'Ecrire ici',
  textfield_name_add_sites: "Nom de l'adresse",
  textfield_name_site: 'Nom du site',
  textfield_name_addresses: "Intitulé de l'adresse",
  algo_find_your_addresses: 'Recherchez votre adresse',
  button_add_new_adresses: 'Ajouter',
}

const TRUST_VERIFICATION = {
  snackbar_id_add: "Pièce d'identité ajoutée",
  snackbar_card_add: "Carte d'identité ajoutée",
  snackbar_status_update: 'Statut modifié',
  snackbar_doc_add: "Document d'immatriculation ajouté",
  snackbar_id_delete: "Pièce d'identité supprimée",
  snackbar_doc_delete: "Document d'immatriculation supprimé",
  dialog_delete_title: 'Confirmation',
  title: 'Vérification',
  subtitle: 'Vérifiez votre email, votre numéro de téléphone et votre identité.',
  identity_title: "Pièce d'identité",
  identity_add_title: "Ajoutez ou modifiez vos documents d'identité.",
  document_type: 'Type de document',
  passport: 'Passeport',
  id_card: "Carte d'identité",
  download_recto: 'Télécharger recto',
  download_verso: 'Télécharger verso',
  save_verso: 'Enregistrer verso',
  your_status: 'Votre statut',
  particular: 'Je suis un particulier',
  declare_cesu: 'Je veux être déclaré(e) en CESU',
  accept_cesu: "J'accepte d'être déclaré en CESU",
  no_cesu: "Je n'accepte pas d'être déclaré(e) en CESU",
  professional: 'Je suis un professionnel',
  eligible_credit: 'Je suis éligible au Crédit Impôt Service',
  document_title: "Document d'immatriculation",
  insert_document: "Insérez ici le document d'immatriculation de votre entreprise (extrait de K-Bis, document d'immatriculation de micro-entreprise).",
  pdf_info: 'Vous pouvez télécharger ce document en version PDF&nbsp;',
  insee_link: "sur le site de l'INSEE",
  download_document_imma: "Télécharger document d'immatriculation",
  id_card_confirm_deletion: "Supprimer votre pièce d'identité ?",
}

const SECURITY = {
  snackbar_account_update: 'Compte mis à jour',
  snackbar_account_desactivate: 'Compte désactivé',
  snackbar_mdp_update: 'Mot de passe modifié',
  dialog_delete_account_title: 'Désactiver votre compte ?',
  dialog_delete_account_content: 'Attention, cette action est irréversible. Si vous souhaitez ne plus être référencé par les moteurs de recherche, vous pouvez désactiver l’indexation par les moteurs de recherche.',
  dialog_delete_account_confirm: 'Désactiver',
  dialog_delete_shop_title: 'Supprimer votre boutique ?',
  dialog_delete_shop_content: 'Attention, cette action est irréversible. Si vous souhaitez garder votre boutique sans que les utilisateurs puissent réserver vos services, vous pouvez supprimer vos disponibilités sur votre calendrier.',
  title: 'Sécurité',
  subtitle: 'Modifiez votre mot de passe et gérez votre compte.',
  password: 'Mot de passe',
  update_password: 'Modifiez votre mot de passe.',
  placeholder_password_error: 'Mot de passe erroné',
  placeholder_password_actual: 'Mot de passe actuel',
  placeholder_newpassword: 'Nouveau mot de passe',
  placeholder_repeat_password: 'Répéter le mot de passe',
  my_account: 'Mon compte',
  handle_my_account: 'Gérez votre compte.',
  index_my_account: 'Je souhaite que mon compte apparaisse dans les résultats des moteurs de recherche',
  delete_my_account: 'Je souhaite supprimer ma boutique de services.',
  desactivate_my_account: 'Je souhaite désactiver mon compte.',
  caution_desactivate_my_account: 'Attention, cette action est irréversible !',
  button_desactivate_my_account: 'Désactiver',
}

const NOTIFICATIONS = {
  snackbar_account_update: 'Compte mis à jour',
  my_notif: 'Mes notifications',
  subtitle: 'Choisissez les notifications que vous souhaitez recevoir',
  messages_title: 'Messages',
  receive_messages: 'Recevez des messages de la part des Alfred et des utilisateurs y compris les demandes de réservations.',
  push_notif: 'Notification push',
  sms_notif: 'SMS',
  rappel_notif: 'Rappel',
  rappel_notif_tarif: 'Recevez des rappels de réservation, des demandes d’évaluation, des informations sur les tarifs et d’autres rappels relatifs à vos activités sur My-Alfred.',
  promo_title: 'Promotions & Astuces',
  coupon_title: 'Recevez des coupons, des informations promotionnelles, des enquêtes, et des informations de la part de My-Alfred et de ses partenaires.',
  phone: 'Appel téléphonique',
  commu_title: 'Politique & communauté',
  presta_service: 'Recevez des nouvelles sur les réglementations liées aux prestations de services',
  assistance_account: 'Assistance du compte',
  security_conf: 'Vos réservations, des informations légales, des questions de sécurité et de confidentialité. Pour votre sécurité, vous ne pouvez pas désactiver les notifications par email.',

}

const NEWSLETTER = {
  title: 'Profitez des bons plans de la communauté avec la Newsletter des Alfred',
  text: 'Inscrivez-vous gratuitement à notre super Newsletter pour recevoir les informations et les bons plans de la communauté.',
  google: "S'inscrire avec Google",
  where: 'ou',
  button: "Je m'inscris !",
}

const CMP_PRESENTATION = {
  placeholder: 'Ici, parlez-nous de vous, de votre personnalité, de vos passions ou encore de votre parcours. Soyez vous-même et montrez-nous votre personnalité !',
  snackbar_update_profil: 'Profil modifié avec succès',
  edit_dialog_title: 'Modifiez votre description',
  edit_dialog_subtitle: 'Ajoutez ou modifiez votre "À propos" ',
  update_button: 'Modifier',
  member: 'membre depuis ',
}

const SHOW_CERTIFICATION = {
  title: 'Certifications',
  certif_obtain: 'Certification obtenue en ',
  year_obtain: 'Date d\'obtention non renseigné - ',
  document_join: 'Certification jointe',
  no_document: 'Certification non jointe',
}

const SHOW_DIPLOMA = {
  title: 'Diplômes',
  diploma_year: 'Diplôme obtenu en : ',
  no_diploma_year: 'Date d\'obtention non renseigné',
  document_join: 'Diplôme joint',
  no_document: 'Diplôme non joint',
}

const SHOW_EXPERIENCE = {
  title: 'Expérience',
  description: 'Description: ',
  no_description: 'Description: non renseignée',
  exp_year: 'Expérience :',
  no_exp_year: 'Expérience: non renseignée',
}

const getMangopayMessage = msg_id => {
  if (!msg_id) {
    return null
  }
  return MANGOPAY_MESSAGES[ msg_id ] || MANGOPAY_ERRORS[ parseInt(msg_id) ] || `Erreur inconnue:${msg_id}`
}

const OUR_ALFRED ={
  title: 'Nos Alfred',
  text: 'Découvrez les profils de nos Alfred',
  button: '',
}

const PROFIL = {
  place: 'Habite à',
  languages: 'Langues',
  verification: 'Vérification',
  noaddresses: "Pas d'adresse",
  website: 'Site web',
  activity: 'Secteur d’activité',
  nothing: 'Non renseigné',
  confirmed: 'Profil confirmé',
  unconfirmed: 'Profil non confirmé',
  about: 'À propos de {{firstname}}',
}

const SHOP = {
  addService: 'Ajoutez des services',
  createShop: 'Proposez votre premier service',
  bienvenue: {
    title: 'Bienvenue {{firstname}}',
    step1_main_title: 'Etape 1',
    step1_subtitle: 'Choisissez votre premier super talent ! ',
    step1_text: 'Sélectionnez le premier service que vous souhaitez proposer ! Et comme un talent en appelle un autre, vous pourrez ajouter autant de services que vous voulez.',
    step2_main_title: 'Etape 2',
    step2_subtitle: 'Vous êtes chez vous ! Fixez vos règles et vos conditions…',
    step2_text: 'Indiquez vos disponibilités, paramètres de réservation et vos conditions d’annulation.',
    step3_main_title: 'Etape 3',
    step3_subtitle: 'Présentez-vous !',
    step3_text: 'Renseignez votre profil Alfred, partagez vos réalisations, et décrivez-vous !',
  },
  creation: {
    title: 'À propos de vous',
    subtitle: 'Choisissez votre statut. Les particuliers peuvent proposer leurs services aux particuliers, mais seuls les professionnels peuvent proposer leurs services aux clients particuliers et entreprises.',
    is_particular: 'Je suis un particulier',
    is_particular_description: 'En tant que particulier, vous pouvez rendre des services occasionnels sur My-Alfred. Si votre activité devient régulière, un statut professionnel (micro-entrepreneur,...) s’impose. Il est également requis pour certains secteurs d’activité réglementés.',
    is_particular_want_cesu: 'Je veux être déclaré(e) en CESU',
    is_particular_accept_cesu: "J'accepte d'être déclaré en CESU",
    is_particular_decline_cesu: "Je n'accepte pas d'être déclaré(e) en CESU",
    is_professional: "Je suis un professionnel/J'ai un numéro de SIRET",
    is_professional_description: 'Un statut professionnel avec un numéro de SIRET est nécessaire pour les métiers réglementés et permet une activité régulière sur My-Alfred. Seuls les professionnels peuvent proposer leurs services aux entreprises qui ont besoin d’une facture. Un statut professionnel est requis dès lors que votre activité devient régulière.',
    is_professional_cis: 'Mon enterprise est éligible au Crédit Impôt Service',
    is_professional_certif: 'Je certifie sur l’honneur qu’il s’agit bien de mon entreprise.',
    is_professional_vat_subject: 'Mon entreprise est assujettie à la TVA',
    is_profesionnal_propose_missions: 'Je souhaite proposer ce service : ',
    textfield_ntva: 'N° TVA',
    textfield_particular: 'Aux particuliers',
    textfield_company: 'Aux entreprises',
    textfield_company_and_particular: 'Aux particuliers et aux entreprises',
    insee_info_begin: 'En raison de l\'arrêt des serveurs de l\'INSEE ce ',
    insee_info_end: ' nous ne pouvons renseigner automatiquement vos informations à partir de votre numéro Siret\ <br/>Merci de saisir tous les champs manuellement',
    siret: 'Siret/Siren',
    name: 'Nom',
  },
  service: {
    title: 'Votre service',
    // subtitle: 'Sélectionnez votre service. Si vous souhaitez en proposer plusieurs, vous pourrez en ajouter autant que vous le souhaitez par la suite.',
    subtitle: 'Sélectionnez votre service, vous pouvez saisir des mots-clés pour faciliter la recherche. Si vous souhaitez en proposer plusieurs, vous pourrez en ajouter autant que vous le souhaitez par la suite.',
    subtitle_update: 'Vous allez modifier le service indiqué ci-dessous',
    content_particular: 'Liste des services aux particuliers',
    explanation: 'Vous pouvez saisir un mot clé pour filtrer votre service ou sélectionner votre service dans la liste',
    content_professional: 'Liste des services aux entreprises',
    content_particular_professional: 'Liste des services aux particuliers & aux entreprises',
    placeholder: 'Recherche par mot-clés',
    section_particular: 'Services au particuliers',
    section_company: 'Services au professionnels',
  },
  parameter: {
    title: 'Paramétrez vos prestations',
    subtitle: 'Indiquez vos tarifs et votre méthode de facturation. Si vous êtes assujetti à la TVA, merci d’indiquer vos tarifs hors taxes. Vous ne trouvez pas une prestation ? Créez une prestation personnalisée qui vous sera propre ! ',
    presta_perso: 'Ajouter une prestation personnalisée',
    titleIsPro: 'Services proposés aux entreprises partenaires de My Alfred',
    descriptionIsPro: 'My Alfred travaille en étroite collaboration avec de nombreuses entreprises partenaires en recherche d’entrepreneurs qualifiés pour l’installation, la livraison, le montage ou encore des services de conciergerie. Si vous souhaitez proposer vos services aux entreprises partenaires de My Alfred, il vous suffit de compléter les prestations ci-dessous. Ces prestations ne seront pas visibles de la plateforme grand public, et seront réservées aux entreprises partenaires. Un de nos experts prendra contact avec vous dans les plus brefs délais pour plus d’information. ',
  },
  settingService: {
    main_title: 'Paramétrage',
    subtitle: 'Indiquez votre périmètre d’intervention ainsi que les options qui s’offrent à votre client quant à votre service.',
    title_perimeter: 'Quel est votre périmètre d’intervention ?',
    unity_perimeter: 'Km',
    title_place_service: 'Où acceptez-vous de réaliser votre prestation ?',
    service_at_userHome: "A l'adresse de mon client",
    service_at_myHome: 'A mon adresse',
    service_withVisio: 'En visioconférence(la visioconférence ne tient pas compte de votre rayon d’intervention)',
    service_outside: 'En extérieur',
    apply_moving_price: 'Appliquer un forfait déplacement de',
    propose_delivery: 'Proposer un forfait retrait & livraison de',
    section_option_title: 'Options',
  },
  preferences: {
    title: 'Préférences',
    subtitle: 'Indiquez vos préférences de réservation. Ces préférences s’appliqueront lorsqu’un client souhaite vous réserver.',
    title_delay_prevenance: 'De quel délai souhaitez-vous disposer entre la réservation et la réalisation du services ?',
    example_delay: 'Par exemple, si vous indiquez un délai de 24 heures, un client devra réserver votre service au moins 24 heures avant votre intervention.',
    units_dalay_prevenance: 'Heures/jours/semaines',
    label_delay_prevenance: 'Délai',
    hours: 'heure(s)',
    days: 'jour(s)',
    weeks: 'semaine(s)',
    title_minimum_basket: 'Quel est le montant minimal pour réserver votre service ?',
    subtitle_minimum_basket: ' Le montant minimum de réservation correspond au panier minimum requis pour réserver ce service. Si vous indiquez un montant de 10€, les clients ne pourront pas réserver vos services si la somme des prestations n’atteint pas ce montant',
    textfield_minimum_basket: 'Panier minimum',
    title_equipments: 'Les équipements que vous fournissez pour ce service:',
  },
  assets: {
    title: 'Vos atouts',
    subtitle: 'Mettez en évidence vos compétences et votre expertise dans ce service. Vous pouvez également donner des précisions sur vos prestations. Précisez tout ce qui peut aider votre client à réserver correctement votre service !',
    expertise_title: 'Votre expertise',
    expertise_label: 'Votre expertise',
    experience_title: 'Votre expérience',
    experience_label: 'Experience',
    experience_label_description: 'Décrivez votre expérience',
    obtain_competence: 'Compétences',
    diploma_title: 'Votre diplôme',
    diploma_subtitle: 'En téléchargeant votre diplôme, celui-ci aura le statut de diplôme vérifié auprès des utilisateurs mais il ne sera jamais visible par ces derniers.',
    year_obtain: 'Année',
    button_joinDiploma: 'Joindre un diplôme',
    certification_title: 'Votre certification',
    certification_subtitle: 'En téléchargeant votre certification, celle-ci aura le statut de certification vérifiée auprès des utilisateurs mais elle ne sera jamais visible par ces derniers.',
    certification_name: 'Titre',
    button_joinCertification: 'Joindre une certification',
  },
  bookingCondition: {
    title: 'Vos conditions',
    subtitle: 'Fixez vos conditions et la façon dont vous acceptez qu’un client réserve vos services.',
    title_firstSection: 'Comment les clients peuvent vous réserver ?',
    booking_request: 'Tous les utilisateurs doivent envoyer une demande de réservation que vous devez valider dans les 24H.',
    booking_auto: 'Les utilisateurs peuvent réserver mes services directement sans demande de réservation.',
    title_secondSection: 'Quelles sont les conditions pour réserver vos services ?',
    conditions_bacsic: 'Respecter les conditions My-Alfred (profil vérifié)',
    conditions_picture: 'Avoir une photo de profil',
    conditions_idCard: 'Avoir déposé une pièce d’identité officielle',
    conditions_recommend: 'Etre recommandé par d’autres Alfred',
    title_thirdSection: 'Quelles sont vos conditions d’annulation ?',
    condition_flexible: "Flexibles: Remboursement intégral jusqu'à 1 jour avant la prestation",
    condition_moderate: "Modérées: Remboursement intégral jusqu'à 5 jours avant la prestation",
    condition_strict: "Strictes: Remboursement intégral jusqu'à 10 jours avant la prestation",
  },
}

const SKILL = {
  topic_title: 'Compliments',
}

const TRAVEL_TAX = {
  no_moving_tax: 'Pas de frais de déplacement',
  kilometer: '€/km à partir du kilomètre',
}

const FOOTER = {
  about_us: 'À propos de nous',
  cgu: 'Informations légales',
  about: 'À propos',
  myalfred: 'My Alfred',
  presse: 'Presse',
  blog: 'Blog',
  cgv: 'CGU/CGV',
  faq: 'FAQ',
  info: 'Informations légales',
  particular: 'Espace particulier',
  team: 'Notre équipe',
  contact_us: 'Nous contacter',
  professional: 'Espace entreprise',
  company: 'Entreprises',
  community: 'Communauté',
  our_community: 'Notre communauté',
  price: 'Offre et tarifs',
  service_company: 'Services aux entreprises',
  service_collab: 'Services aux collaborateurs',
  alfred: 'Alfred',
  become_alfred: 'Devenir Alfred',
  crea_shop: 'Je propose mes services',
  charte: 'Charte',
  help: 'Assistance',
  resa_service: 'Réserver un service',
  tawlk_human: 'Parler à un humain',
  mobile: 'Mobiles',
  security: '© 2021 My Alfred,Inc.',
  cgu_bis: 'Conditions générales d\'utilisation',
}

const HEADER = {
  title_our_values: 'Nos valeurs',
  content_our_values: 'd\'entreprise mais surtout d\'humain',
  title_our_community: 'Notre Communauté',
  content_our_community: 'Qui nous fait vivre',
  title_team: 'Notre Équipe',
  content_title_team: 'Qui nous fait vivre',
  title_resa: 'Réserver un service',
  content_resa: 'Les bases',
  title_faq: 'FAQ',
  content_faq: 'Pour trouver vos réponses',
  title_become: 'Devenir un Alfred',
  content_become: 'Les bases',
  contact_title: 'Contact',
  contact_content: 'Posez-nous toutes vos questions',
  button_back_home: 'Retour sur My Alfred',
  placeholder_search: 'Chercher dans la FAQ',
}

const ADD_SERVICES = {
  title: 'Mes services',
  add_service: 'Développez votre boutique et ajoutez de nouveaux services !',
}

const SERVICES = {
  particular_service: 'Services aux particuliers',
  pro_service: 'Services aux professionnels',
}

const ASK_QUESTION = {
  title: 'Vous souhaitez poser une question à {{firstname}} ?',
  info: 'Rendez-vous sur la page du service qui vous intéresse, cliquez sur « demande d’informations » en dessous du bouton réserver. Vous pourrez alors poser toutes vos questions à {{firstname}} !',
}

const SUMMARY_COMMENTARY = {
  global_grade: 'NOTE GENERALE',
  commentary: 'COMMENTAIRES',
  compliments: 'COMPLIMENTS',
  button_hide_commentary: 'Cacher les commentaires',
  button_show_commentary: 'Voir les commentaires',
}

const STATISTICS = {
  title_topic_incomes: 'Mes revenus',
  subtitle_topic_incomes: "Ici, vous pouvez suivre l'évolution de vos revenus et vos statistiques prévisionnelles",
  year: 'Année',
  month: 'Mois',
  incomes_get: 'Revenus perçus',
  incomes_will: 'Revenus à venir',
  incomes_previ: 'Revenus prévisionnels ',
  my_stat_title: 'Mes statistiques',
  my_stat_subtitle: 'Retrouvez vos nombres de vues, de commentaires ou encore de prestations réalisées',
  incomes_total: 'Revenu total',
  services_done: 'Prestations réalisées',
  view_profil: 'Vues du profil',
  commentary: 'Commentaires',
}

const MESSAGES = {
  last_message: 'Dernier message ',
  no_message: 'Aucun message',
  dialog_title_content: 'Saisissez votre message',
  no_conversation: "Vous n'avez aucune conversation",
  one_conversation: 'Vous avez une conversation',
  you_got: 'Vous avez',
  conversation: ' conversations',
  my_messages: 'Mes messages',
  label: 'Saisissez votre message',

}

const MESSAGE_DETAIL = {
  browser_compatibility: 'Votre navigateur ne supporte pas les notifications',
  notif: 'Vous recevrez des notifications pour cette conversation',
  new_messages: 'Nouveaux Messages',
}

const TEAM = {
  snackbar_add_member: 'Membre ajouté au groupe',
  snackbar_remove_admin: '{{firstname}} a été supprimé des administrateurs',
  snackbar_remove_manager: 'Manager supprimé',
  snackbar_create_groupe: 'Groupe ',
  snackbar_create_name_groupe: 'créé',
  snackbar_update_groupe: 'modifé',
  snackbar_delete: ' supprimé',
  dialog_add_manager: 'Ajouter un Manager',
  dialog_add_employe: 'Ajouter un Employé',
  existing_account: 'Comptes existants',
  user_title: 'Utilisateurs',
  rib: 'RIB',
  choose_department: 'Choisir le département',
  departement: 'Département',
  departements: 'Departements',
  create_new_account: 'Créer un nouveau compte',
  firstname: 'Prénom',
  dialog_remove_title: 'Supprimer',
  dialog_remove_question: 'Voulez vous supprimer ',
  dialog_group_add: 'Ajouter un département',
  dialog_group_add_b2b: 'Ajouter une classification',
  dialog_groupe_title: 'Configuration département',
  dialog_groupe_title_b2b: 'Configuration classification',
  dialog_groupe_name: 'Nom',
  dialog_groupe_plafond: 'Plafond',
  title: 'Administrateurs',
  no_admin: 'Aucun administrateur n\'est défini',
  micro_mode: 'Départements',
  no_micro_mode: 'Classification',
  no_budget: 'Pas de budget défini',
  available: ' disponibles',
  no_department: 'Aucun département n\'est défini',
  manager: 'Managers',
  collaborateur: 'Collaborateurs',
  filter: 'Trier par',
}

const DRAWER_EDITING_SCHEDULE = {
  title: 'Modifier vos disponibilités',
  avilable_question: 'Êtes-vous disponible ?',
  day_off: 'Indisponible pour la journée',
  hours_available: 'Disponible sur ces horaires : ',
  working_hours: 'Vos horaires travaillés',
  save_button: 'Enregistrer',
}

const DRAWER_SETTING_SCHEDULE = {
  title: 'Paramétrez vos disponibilités',
  period: 'Période :',
  begin_date: 'Date de début',
  end_date: 'Date de fin',
  day_work: 'Jours travaillés :',
  hour_work: 'Horaires travaillés :',
  save_button: 'Enregistrer',
  delete_button: 'Supprimer',
  add_period: 'Ajouter une période',
}

const DRAWER_SCHEDULE = {
  button_update: 'Modifier vos disponibilités',
  setting_update: 'Paramétrez vos disponibilités',
}

const EMPLOYEE_DIALOG = {
  title: 'Import de collaborateurs',
  subtitle: 'Importez la liste des collaborateurs à partir d\'un fichier csv séparé par des points-virgules.<br/>Les colonnes nom, prénom et email sont requises.',
  button: 'Importer',
}

const INFORMATION = {
  button: 'Ok',
  title_error: 'Oups !',
  title: 'Information',
}

const MESSAGE_SUMMARY = {
  no_message: 'Aucun message',
}

const AVOCOTES = {
  title: "Besoin d'un coup de pouce pour installer votre pack AvoCotés protection ?",
  subtitle: "Confiez l'installation de votre Pack SECURITE AvoCotés Protection à un entrepeneur local & qualifé",
  titleSection: "À propos de l'installateur",
  description: "Alfred on-demand est partenaire d'AvoCotés pour toutes les demandes d'installation de matériel de télésurveillance. Nos entrepreneurs sont des indépendants locaux, qualifiés et vérifiés par nos équipes. Chaque entrepreneur est formé à l'installation du matériel AvoCotés par nos soins.",
  descriptionSecond: "Notre équipe vous contacte par téléphone afin de fixer avec vous un créneau qui s'intégre à vos impératifs. Pour toute question relative à votre installation, n'hésitez pas à nous contacter au 06 87 37 73 63.",
  titleEquipment: 'Matériel apporté et fourni par votre installateur :',
  titleCordonnates: 'Vos coordonnées :',
  titleDetails: 'Détaillez votre commande :',
  totalText: 'Coût total de mon installation :',
  paidButton: 'Payer',
  helperText: "* les télecommandes ne nécessitent pas d'installation",
  askQuestion: 'Une question sur votre installation ?',
  contactUs: 'Contactez nous',
  // phone: '02 35 00 00 00',
  phoneNumber: '06 87 37 73 63',
  phoneText: 'Appel gratuit depuis la<br/>France metropolitaine',
  ourCompanyTitleFirst: 'Pourquoi faire confiance à Alfred pour',
  ourCompanyTitleSecond: "l'installation de mon pack AvosCotés protection ?",
  ourCompanyDescriptionFirst: "Grâce à notre communauté d'entrepreneurs indépendants, quel que soit votre besoin en matière de services, Alfred on-demand y répond et vous accompagne dans votre démarche.",
  ourCompanyDescriptionSecond: "Nous sélectionnons pour vous les meilleurs talents en parfaite adéquation avec vos besoins, en essayant de nous adpater aux mieux à vos contraintes d'agenda. Nos installateurs sont vérifiés et formés aux solutions AvoCotés pour vous prêter main-forte dans le cadre de votre installation.",
  address: '5 rue jacques Monod',
  postal: '76130 mont saint aignan',
  phoneContact: 'tel.: 06 87 37 73 63',
  mail: 'Mail: avocotes@alfred-ondemand.fr',
}

const BOOKING = {
  MSG_EVALUATE: 'Vous avez 15 jours pour évaluer votre client. Une fois que votre client aura rédigé son commentaire, il pourra consulter votre évaluation et vous pourrez consulter la sienne !',
  payment_no_finish: 'Paiement non réalisé',
  payment_title: 'Paiement',
  payment_if_accept: 'Paiement si acceptation',
  potential_incomes: 'Revenus potentiels',
  avocotes_resa: 'Réservation AvoCotés pour le compte de ',
  disabled_user_access: "Vous n'avez pas l'autorisation d'accéder à cette page",
  pre_approved: 'Pré-approuvée',
  invit_checking: 'Invitation à réserver',
  commentary: 'Commentaires',
  already_evaluate: 'Vous avez déjà évalué votre client.',
  already_evaluate_alfred: 'Vous avez déjà évalué votre Alfred.',
  button_evaluate_client: 'Evaluer mon client',
  info_commentary: 'Vous avez 15 jours pour évaluer votre Alfred. Une fois que votre Alfred aura rédigé son commentaire, il pourra consulter votre évaluation et vous pourrez consulter la sienne !',
  evaluate_alfred_button: 'Evaluer mon Alfred',
  id_checked: "Pièce d'identité vérifiée",
  member_since: 'Membre depuis ',
  button_send_message: 'Envoyer un message',
  button_call: 'Appeler',
  phone_number: 'Numéro de téléphone :',
  about_resa: 'À propos de votre réservation',
  visio: 'en visio',
  created_date: 'créée le ',
  end_date: 'Date de fin: ',
  info_end_resa: 'Votre réservation doit être confirmée avant le ',
  a: ' à ',
  button_cancel: 'Refuser',
  pre_approved_button: 'Pré-approuver',
  paid_button: 'Payer ma réservation',
  stuff: 'Matériel fourni',
  no_stuff: 'Aucun matériel fourni',
  cancel_resa: 'Annuler la réservation',
  warning_behavior: 'Signaler l’utilisateur',
  reclamation: 'Réclamation',
  versement: 'Versement',
  search_presta: "Nous allons maintenant chercher pour vous l'Alfred qui répondra à votre service.Vous serez informé sous peu de la date de prestation.",
}

const COMMON = {
  btn_validate: 'Valider',
  btn_modify: 'Modifier',
  btn_confirm: 'Confirmer',
  btn_cancel: 'Annuler',
  btn_delete: 'Supprimer',
  btn_save: 'Enregistrer',
  lbl_email: 'Email',
  lbl_name: 'Nom',
}

module.exports = {
  CESU_NOTICE,
  OUTSIDE_PERIMETER,
  SCHEDULE_TITLE,
  SCHEDULE_SUBTITLE,
  getMangopayMessage,
  SHOP_CREATION_SUCCESSFUL,
  REGISTRATION_PROOF_CONFIRM_DELETION,
  INFOBAR,
  SHOWMORE,
  SEARCHBAR,
  BANNER_PRESENTATION,
  BANNER_B2B_PRESENTATION,
  CATEGORY,
  BECOME_ALFRED,
  RESA_SERVICE,
  HOW_IT_WORKS,
  NEWSLETTER,
  NAVBAR_MENU,
  SHOP,
  CMP_PRESENTATION,
  BOOKING,
  INFOBARMOBILE,
  AVOCOTES,
  PROFIL,
  OUR_ALFRED,
  TRUST_SECURITY,
  LOGIN,
  ABOUT,
  LAYOUT_ABOUT,
  EDIT_PROFIL,
  PAYMENT_METHOD,
  HANDLE_CB,
  HANDLE_RIB,
  PAYMENT_CARD,
  MY_ADDRESSES,
  HANDLE_ADDRESSES,
  TRUST_VERIFICATION,
  SECURITY,
  NOTIFICATIONS,
  ADD_SERVICES,
  SERVICES,
  ASK_QUESTION,
  SUMMARY_COMMENTARY,
  STATISTICS,
  MESSAGES,
  MESSAGE_DETAIL,
  MESSAGE_SUMMARY,
  REGISTER,
  REGISTER_FIRST_PAGE,
  REGISTER_SECOND_PAGE,
  REGISTER_THIRD_PAGE,
  SEARCH,
  CARD_SERVICE,
  USERSERVICEPREVIEW,
  DRAWER_BOOKING,
  BOOKING_DETAIL,
  BUTTON_SWITCH,
  FAQ_ABOUT,
  FAQ_BECOME_ALFRED,
  ADD_SERVICE,
  FAQ_NEED_MORE,
  FAQ_OUR_COMMUNITY,
  LEGAL_NOTICE,
  CONFIRM_PAYMENT,
  ADDRESS_FACTURATION,
  ADDRESS_SERVICE,
  PROFILE,
  DRAWER_BOOKING_RECAP,
  PAYMENT_PICS,
  PAYMENT_CHOICE,
  PAYMENT_MODE,
  COMPANY_DASHBOARD,
  CARD_ADD_SERVICE,
  ACCOUNT_COMPANY,
  EDIT_PICTURE,
  INDEX_DASHBOARD,
  SERVICES_COMPANY,
  TEAM,
  COMMON,
  DRAWER_EDITING_SCHEDULE,
  DRAWER_SETTING_SCHEDULE,
  DRAWER_SCHEDULE,
  EMPLOYEE_DIALOG,
  INFORMATION,
  SHOW_CERTIFICATION,
  SHOW_DIPLOMA,
  SHOW_EXPERIENCE,
  SKILL,
  TRAVEL_TAX,
  FOOTER,
  HEADER,
  LAYOUT_ACCOUNT,
  LAYOUT_MESSAGES,
  LAYOUT_EVALUATE,
  LAYOUT_PROFIL,
  LAYOUT_RESA,
}
