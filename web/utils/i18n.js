const KycDocumentStatus = require('mangopay2-nodejs-sdk/lib/models/KycDocumentStatus')
const {ACCOUNT_MIN_AGE} = require('./consts')
const {MANGOPAY_ERRORS}=require('./mangopay_messages')

const CESU_NOTICE = "Quel que soit votre statut, My Alfred est tenu de déclarer aux \
finances publiques vos revenus générés <b>si les deux conditions suivantes sont \
réunies dans l'année civile :</b><ul><li>vos revenus dépassent 3000 euros</li>\
<li>vous avez réalisé vingt prestations ou plus</li></ul>"

const OUTSIDE_PERIMETER = 'Ce service est hors de votre périmètre.'

const SCHEDULE_TITLE = 'Vos disponibilités'

const SCHEDULE_SUBTITLE = 'Votre calendrier vous permet d’ajouter vos disponibilités. Lorsque vous ajoutez ou modifiez vos disponibilités, seules les plages horaires indiquées pourront être réservées. Vous pouvez très facilement ajouter une période de disponibilité en indiquant les dates de début et fin, les jours correspondants et des tranches horaires. Vous pouvez également sélectionner une date ou plusieurs, indiquer si vous êtes disponible et sélectionner les tranches horaires.'


const SHOP_CREATION_SUCCESSFUL = 'Vos services sont maintenant disponibles dans my Alfred'

const ID_CARD_CONFIRM_DELETION = "Supprimer votre pièce d'identité ?"
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

const INFOBAR_MESSAGE = {
  message: 'Vous ne trouvez pas votre service ? L’équipe Alfred se mobilise pour trouver le meilleur Alfred près de chez vous',
}

const INFOBARMOBILE_MESSAGE = {
  message: "L'application MyAlfred est disponible au téléchargement sur :",
}

const SHOWMORE = 'En savoir plus'

const SEARCHBAR = {
  what: 'Quel service ?',
  where: 'Où ?',
  when: 'Quand ?',
  labelWhere: "L'adresse",
  labelWhat: 'Le service',
  labelWhen: 'Les dates',
  labelStatus: 'Statut',
  labelDate: 'Date(s)',
  labelLocation: 'Lieu(x)',
  labelPerimeter: 'Périmètre',
  labelCategory: 'Catégorie(s)',
  labelService: 'Service(s)',
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
}

const LOGIN = {
  title: 'Connexion',
  input_label: 'Email',
  input_password: 'Mot de passe',
  input_role: 'Rôle',
  button: 'Connexion',
  FORGOTTEN_PASSWORD: 'Mot de passe oublié ?',
  REGISTER_YET: 'Pas encore inscrit ? Inscrivez-vous !',
}

const ABOUT = {
  address_placeholder: 'Entrez votre adresse',
  b2b_title_topic: 'Modifiez les informations de votre entreprises',
  title_topic: 'Modifiez vos informations',
  b2b_titlesummary_topic: 'Ici, vous pouvez modifier les informations de votre entreprise',
  titlesummary_topic: 'Ici, vous pouvez modifier vos informations',
  website: 'Site Web',
  label_address: 'Lieu d\'habitation',
  textfield_website: 'Site Web',
  size_company: 'Taille de l\'entreprise',
  label_size_company: 'Taille de l’entreprise',
  textfield_size_company: 'Taille de l’entreprise',
  spoken_languages: 'Langues parlées',
  textfield_languages: 'Sélectionnez vos langues',
  option_message: 'Plus d\'options disponibles',
  b2b_activity: 'Secteur d’activité',
  b2b_activity_label: 'Secteur d’activité',
  button_update: 'Modifier',
  alfred_certifed: 'à un profil vérifié',
}

const LAYOUT_ABOUT = {
  my_name_is: "Je m\'appelle {{firstname}}",
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
  sms_error: 'Impossible d\'envoyer le SMS',
  validate_phone: 'Votre numéro de téléphone est validé',
  incorrect_code: 'Le code est incorrect',
  error_verif_code: 'Erreur à la vérification du code',
  dialog_title_phone: 'Confirmation du numéro de téléphone',
  dialog_text_phone: 'Saisissez le code reçu par SMS',
  dialog_textfield_placeholder: '0000',
  dialog_button_confirm_later: 'Confirmer plus tard',
  dialog_button_confirm: 'Confirmer',
  title: 'Modifier votre profil',
  textfield_firstname: 'Prénom',
  textfield_name: 'Nom',
  textfield_about_me: 'A propos de moi',
  char_max: '{{maxchars}} caractères max',
  personnal_info: 'Informations personnelles',
  gender: 'Sexe',
  textfield_email_placeholder: 'Email',
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
  save_button: 'Enregistrer',
}

const PAYMENT_METHOD = {
  title: 'Modes de paiement',
  subtitle: 'N\'hésitez pas à enregistrer un mode de paiement pour aller plus vite lors de vos réservations.',
}

const REGISTER = {
  snackbar_already_logged: 'Vous êtes déjà inscrit',
  snackbar_sms_send: 'Le SMS a été envoyé',
  snackbar_sms_error: 'Impossible d\'envoyer le SMS',
  snackbar_phone_valid: 'Votre numéro de téléphone est validé',
  snackbar_error_code_phone: 'Le code est incorrect',
  snackbar_error_check_phone: 'Erreur à la vérification du code',
  snackbar_phone_add: 'Téléphone ajouté',
  dialog_phone_title: 'Confirmation du numéro de téléphone',
  dialog_phone_content: 'Saisissez le code reçu par SMS',
  dialog_cgu_close: 'Fermer',
  dialog_phone_confirm_later: 'Confirmer plus tard',
  dialog_phone_confirm: 'Confirmer',
  textfield_email_error: 'Veuillez entrer une adresse email valide.',
  textfield_code: 'Code',
  title: 'Inscription',
  next_button: 'Suivant',
  previous_button: 'Précédent',
  link_already_account: 'Vous avez déjà un compte My Alfred ?',
  finish_button: 'Terminer',
}

const REGISTER_FIRST_PAGE = {
  textfield_email: 'Email',
  textfield_email_placeholder: 'Email',
  textfield_firstname: 'Prénom',
  textfield_firstname_placeholder: 'Prénom',
  textfield_name: 'Nom',
  textfield_name_placeholder: 'Nom',
  textfield_create_password: 'Créer un mot de passe',
  textfield_create_password_placeholder: 'Créer un mot de passe',
  textfield_confirm_password: 'Confirmer mot de passe',
  textfield_confirm_password_placeholder: 'Confirmer mot de passe',

}

const HANDLE_CB = {
  cb_saves_title: 'Cartes enregistrées',
  cb_subtitle_paid: 'Payez encore plus rapidement sans communiquer vos informations financières.',
  cb_title_dialog_delete: 'Voulez-vous vraiment supprimer votre carte bancaire ?',
  cb_content_dialog_delete: 'Si vous supprimez votre carte bancaire vous ne pourrez plus l\'utiliser par la suite avec ce compte.',
  cb_cancel_dialog_delete: 'Annuler',
  cb_delete_dialog_delete: 'Supprimer',
  cb_title_dialog_add: 'Enregistrer une carte',
  cb_subtitle_dialog_add: 'Ajouter une carte en toute sécurité',
  cb_dialog_nb_add: 'Numéro de carte',
  cb_dialog_placeholdercb_add: 'Votre carte de crédit',
  cb_dialog_expdate_add: 'Date d\'expiration',
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
  snackbar_error_rib_add: 'Erreur à l\'ajout du RIB',
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
  dialog_delete_rib_content: 'Si vous supprimez votre RIB vous ne pourrez plus l\'utiliser par la suite avec ce compte.',
  dialog_delete_rib_cancel: 'Annuler',
  dialog_delete_rib_button: 'Supprimer',
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
  dialog_delete_cancel: 'Annuler',
  dialog_delete_button: 'Supprimer',
  title_b2b: 'Mon siège social',
  title: 'Mon adresse principale',
  placeholder_algo: 'Modifiez votre adresse',
  submit_button: 'Valider',
  book_title_b2b: 'Autres sites',
  book_title: 'Mon carnet d\'adresses',
  b2b_title_add_sites: 'Ajoutez vos sites et gagnez du temps',
  title_add_sites: 'Ajoutez plusieurs adresses et gagnez du temps.',
  textfield_name_placeholder_add_sites: 'Ecrire ici',
  textfield_name_add_sites: 'Nom de l\'adresse',
  submit_secondary_button: 'Enregistrer',
  textfield_name_site: 'Nom du site',
  textfield_name_addresses: 'Intitulé de l\'adresse',
  algo_find_your_addresses: 'Recherchez votre adresse',
  button_add_new_adresses: 'Ajouter',
}

const TRUST_VERIFICATION = {
  snackbar_id_add: 'Pièce d\'identité ajoutée',
  snackbar_card_add: 'Carte d\'identité ajoutée',
  snackbar_status_update: 'Statut modifié',
  snackbar_doc_add: 'Document d\'immatriculation ajouté',
  snackbar_id_delete: 'Pièce d\'identité supprimée',
  snackbar_doc_delete: 'Document d\immatriculation supprimé',
  dialog_delete_title: 'Confirmation',
  dialog_delete_cancel: 'Annuler',
  dialog_delete_confirm: 'Supprimer',
  title: 'Vérification',
  subtitle: 'Vérifiez votre email, votre numéro de téléphone et votre identité.',
  identity_title: 'Pièce d\'identité',
  identity_add_title: 'Ajoutez ou modifiez vos documents d\'identité.',
  document_type: 'Type de document',
  passport: 'Passeport',
  id_card: 'Carte d\'identité',
  download_recto: 'Télécharger recto',
  download_verso: 'Télécharger verso',
  save_verso: 'Enregistrer verso',
  save_button: 'Enregistrer',
  your_status: 'Votre statut',
  particular: 'Je suis un particulier',
  declare_cesu: 'Je veux être déclaré(e) en CESU',
  declare_ces: 'J\'accepte d\'être déclaré en CES',
  no_cesu: 'Je n\'accepte pas d\'être déclaré(e) en CESU',
  professional: 'Je suis un professionnel',
  eligible_credit: 'Je suis éligible au Crédit Impôt Service',
  document_title: 'Document d\'immatriculation',
  insert_document: 'Insérez ici le document d\'immatriculation de votre entreprise (extrait de K-Bis, document d\'immatriculation de micro-entreprise).',
  pdf_info: 'Vous pouvez télécharger ce document en version PDF&nbsp;',
  insee_link: 'sur le site de l\'INSEE',
  download_document_imma: 'Télécharger document d\'immatriculation',
  save_document_imma: 'Enregistrer',
}

const SECURITY = {
  snackbar_account_update: 'Compte mis à jour',
  snackbar_account_desactivate: 'Compte désactivé',
  snackbar_mdp_update: 'Mot de passe modifié',
  dialog_delete_account_title: 'Désactiver votre compte ?',
  dialog_delete_account_content: 'Attention, cette action est irréversible. Si vous souhaitez ne plus être référencé par les moteurs de recherche, vous pouvez désactiver l’indexation par les moteurs de recherche.',
  dialog_delete_account_cancel: 'Annuler',
  dialog_delete_account_confirm: 'Désactiver',
  dialog_delete_shop_title: 'Supprimer votre boutique ?',
  dialog_delete_shop_content: 'Attention, cette action est irréversible. Si vous souhaitez garder votre boutique sans que les utilisateurs puissent réserver vos services, vous pouvez supprimer vos disponibilités sur votre calendrier.',
  dialog_delete_shop_cancel: 'Annuler',
  dialog_delete_shop_confirm: 'Supprimer',
  title: 'Sécurité',
  subtitle: 'Modifiez votre mot de passe et gérez votre compte.',
  password: 'Mot de passe',
  update_password: 'Modifiez votre mot de passe.',
  placeholder_password_error: 'Mot de passe erroné',
  placeholder_password_actual: 'Mot de passe actuel',
  placeholder_newpassword: 'Nouveau mot de passe',
  placeholder_repeat_password: 'Répéter le mot de passe',
  validate_button_password: 'Valider',
  my_account: 'Mon compte',
  handle_my_account: 'Gérez votre compte.',
  index_my_account: 'Je souhaite que mon compte apparaisse dans les résultats des moteurs de recherche',
  delete_my_account: 'Je souhaite supprimer ma boutique de services.',
  delete_my_account_button: 'Supprimer',
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
  email: 'Email',
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

const NEWS_LETTER = {
  title: 'Profitez des bon plans de la communauté avec la Newsletter des Alfred',
  text: 'Inscrivez-vous gratuitement à notre super Newsletter pour recevoir les informations et les bons plans de la communauté.',
  google: 'S\'inscrire avec Google',
  where: 'ou',
  email: 'Email',
  button: 'Je m\'inscris !',
}

const CMP_PRESENTATION = {
  placeholder: 'Ici, parlez-nous de vous, de votre personnalité, de vos passions ou encore de votre parcours. Soyez vous-même et montrez-nous votre personnalité !',
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
  noaddresses: 'Pas d\'adresse',
  website: 'Site web',
  companysize: 'Taille de l’entreprise',
  activity: 'Secteur d’activité',
  nothing: 'Non renseigné',
  confirmed: 'Profil confirmé',
  unconfirmed: 'Profil non confirmé',
}

const SHOP = {
  addService: 'Ajoutez des services',
  createShop: 'Proposez votre premier service',
  bienvenue: {
    titre: 'Bienvenue {{firstname}}',
    subtitle: 'Nous allons vous aider à créer votre service et devenir Alfred en quelques minutes !',
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
    title: 'A propos de vous',
    subtitle: 'Choisissez votre statut. Les particuliers peuvent proposer leurs services aux particuliers, mais seuls les professionnels peuvent proposer leurs services aux clients particuliers et entreprises.',
    is_particular: 'Je suis un particulier',
    is_particular_description: 'En tant que particulier, vous pouvez rendre des services occasionnels sur My-Alfred. Si votre activité devient régulière, un statut professionnel (micro-entrepreneur,...) s’impose. Il est également requis pour certains secteurs d’activité réglementés.',
    is_particular_want_cesu: 'Je veux être déclaré(e) en CESU',
    is_particular_accept_cesu: 'J\'accepte d\'être déclaré en CESU',
    is_particular_decline_cesu: 'Je n\'accepte pas d\'être déclaré(e) en CESU',
    is_professional: 'Je suis un professionnel/J\'ai un numéro de SIRET',
    is_professional_description: 'Un statut professionnel avec un numéro de SIRET est nécessaire pour les métiers réglementés et permet une activité régulière sur My-Alfred. Seuls les professionnels peuvent proposer leurs services aux entreprises qui ont besoin d’une facture. Un statut professionnel est requis dès lors que votre activité devient régulière.',
    is_professional_cis: 'Mon enterprise est éligible au Crédit Impôt Service',
    is_professional_certif: 'Je certifie sur l’honneur qu’il s’agit bien de mon entreprise.',
    is_professional_vat_subject: 'Mon entreprise est assujettie à la TVA',
    is_profesionnal_propose_missions: 'Je souhaite proposer ce service : ',
    textfield_ntva: 'N° TVA',
    textfield_particular: 'Aux particuliers',
    textfield_company: 'Aux entreprises',
    textfield_company_and_particular: 'Aux particuliers et aux entreprises',
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
    service_at_userHome: 'A l\' adresse de mon client',
    service_at_myHome: 'A mon adresse',
    service_withVisio: 'En visioconférence(la visioconférence ne tient pas compte de votre rayon d’intervention)',
    service_outside: 'En extérieur',
    apply_moving_price: 'Appliquer un forfait déplacement de',
    propose_delivery: 'Proposer un forfait retrait & livraison de',
    section_option_title: 'Options',
  },
  preference: {
    title: 'Préférences',
    subtitle: 'Indiquez vos préférences de réservation. Ces préférences s’appliqueront lorsqu’un client souhaite vous réserver.',
    title_delay_prevenance: 'De quel délai souhaitez-vous disposer entre la réservation et la réalisation du services ?',
    exemple_delay: 'Par exemple, si vous indiquez un délai de 24 heures, un client devra réserver votre service au moins 24 heures avant votre intervention.',
    units_dalay_prevenance: 'Heures/jours/semaines',
    label_delay_prevenance: '',
    hours: 'heure(s)',
    days: 'jour(s)',
    weeks: 'semaine(s)',
    title_minimum_basket: 'Quel est le montant minimal pour réserver votre service ?',
    subtitle_minimum_basket: ' Le montant minimum de réservation correspond au panier minimum requis pour réserver ce service. Si vous indiquez un montant de 10€, les clients ne pourront pas réserver vos services si la somme des prestations n’atteint pas ce montant',
    textfield_minimum_basket: 'Panier minimum',
    unit_minimum_basket: '€',
    title_equipments: 'Les équipements que vous fournissez pour ce service:',
  },
  assets: {
    title: 'Vos atouts',
    subtitle: 'Mettez en évidence vos compétences et votre expertise dans ce service. Vous pouvez également donner des précisions sur vos prestations. Précisez tout ce qui peut aider votre client à réserver correctement votre service !',
    expertise_title: 'Votre expertise',
    expertise_label: 'Votre expertise',
    experience_title: 'Votre expérience',
    experience_label: 'Experience',
    experience_label_description: 'Décrivrez votre expérience',
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
    condition_flexible: 'Flexibles: Remboursement intégral jusqu\'à 1 jour avant la prestation',
    condition_moderate: 'Modérées: Remboursement intégral jusqu\'à 5 jours avant la prestation',
    condition_strict: 'Strictes: Remboursement intégral jusqu’à 10 jours avant la prestation',
  },
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
  title: 'Vous souhaitez poser une question à ',
  question: ' ?',
  info: 'Rendez-vous sur la page du service qui vous intéresse, cliquez sur « demande d’informations » en dessous du bouton réserver. Vous pourrez alors poser toutes vos questions à  ',
  exclamation: ' !',
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
  my_stat: 'Mes statistiques',
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

const MESSAGE_SUMMARY = {
  no_message: 'Aucun message',
}

const AVOCOTES = {
  title: "Besoin d'un coup de pouce pour installer votre pack AvoCotés protection ?",
  subtitle: "Confiez l'installation de votre Pack SECURITE AvoCotés Protection à un entrepeneur local & qualifé",
  titleSection: "A propos de l'installateur",
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
  phone: '06 87 37 73 63',
  phoneTextFirst: 'Appel gratuit depuis la',
  phoneTextSecond: 'France metropolitaine',
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
  payment: 'Paiement',
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
  about: 'A propos de ',
  id_checked: "Pièce d'identité vérifiée",
  member_since: 'Membre depuis ',
  button_send_message: 'Envoyer un message',
  button_call: 'Appeler',
  phone_number: 'Numéro de téléphone :',
  about_resa: 'A propos de votre réservation',
  visio: 'en visio',
  created_date: 'créée le ',
  end_date: 'Date de fin: ',
  info_end_resa: 'Votre réservation doit être confirmée avant le ',
  a: ' à ',
  button_confirm: 'Confirmer',
  button_cancel: 'Refuser',
  pre_approved_button: 'Pré-approuver',
  paid_button: 'Payer ma réservation',
  stuff: 'Matériel fourni',
  no_stuff: 'Aucun équipement fourni',
  cancel_resa: 'Annuler la réservation',
  warning_behavior: 'Signaler l’utilisateur',
  reclamation: 'Réclamation',
  versement: 'Versement',
}

module.exports = {
  CESU_NOTICE,
  OUTSIDE_PERIMETER,
  SCHEDULE_TITLE,
  SCHEDULE_SUBTITLE,
  getMangopayMessage,
  SHOP_CREATION_SUCCESSFUL,
  ID_CARD_CONFIRM_DELETION,
  REGISTRATION_PROOF_CONFIRM_DELETION,
  INFOBAR_MESSAGE,
  SHOWMORE,
  SEARCHBAR,
  BANNER_PRESENTATION,
  BANNER_B2B_PRESENTATION,
  CATEGORY,
  BECOME_ALFRED,
  RESA_SERVICE,
  HOW_IT_WORKS,
  NEWS_LETTER,
  NAVBAR_MENU,
  SHOP,
  CMP_PRESENTATION,
  BOOKING,
  INFOBARMOBILE_MESSAGE,
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
}
