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

const INFOBAR_MESSAGE ={
  message: 'Renseignez-vous sur les restrictions COVID 19 avant de réserver.',
  showMore: 'En savoir plus'
} ;

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
  registerServices : 'Proposer mes services',
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

const HOW_IT_WORKS = {
  leftText : 'En quelques clics,\n' +
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

const SHOP={
  addService: 'Ajoutez des services',
  createShop: 'Proposez votre premier service'
}

const BOOKING={
  MSG_EVALUATE: 'Vous avez 15 jours pour évaluer votre client. Une fois que votre client aura rédigé son commentaire, il pourra consulter votre évaluation et vous pourrez consulter la sienne !'
}

module.exports = {
  CESU_NOTICE, OUTSIDE_PERIMETER, SCHEDULE_TITLE, SCHEDULE_SUBTITLE,
  getMangopayMessage, SHOP_CREATION_SUCCESSFUL, ID_CARD_CONFIRM_DELETION,
  REGISTRATION_PROOF_CONFIRM_DELETION, INFOBAR_MESSAGE, SHOWMORE, SEARCHBAR,BANNER_PRESENTATION,
  CATEGORY, BECOME_ALFRED, HOW_IT_WORKS, NEWS_LETTER, NAVBAR_MENU,
  SHOP, CMP_PRESENTATION, BOOKING
};
