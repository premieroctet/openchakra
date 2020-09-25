const KycDocumentStatus = require('mangopay2-nodejs-sdk/lib/models/KycDocumentStatus');

const CESU_NOTICE = 'Quel que soit votre statut, My Alfred est tenu de déclarer aux \
finances publiques vos revenus générés <b>si les deux conditions suivantes sont \
réunies dans l\'année civile :</b><ul><li>vos revenus dépassent 3000 euros</li>\
<li>vous avez réalisé vingt prestations ou plus</li></ul>';

const OUTSIDE_PERIMETER = 'Ce service est hors de votre périmètre.';

const SCHEDULE_TITLE = 'Précisez vos disponibilités si vous le souhaitez !';

const SCHEDULE_SUBTITLE = 'Si vous modifiez ces disponibilités, seules les plages \
horaires indiquées pourront être réservées. Vous pouvez appliquer une récurrence \
à vos disponibilités afin de gagner du temps ! Par exemple, si vous êtes disponible\
tous les lundis et mardis, vous pouvez cocher la case Récurrence, et cliquer\
sur Lu et Ma afin de répéter votre disponibilité sur une durée que vous \
pouvez définir.';

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

const INFOBAR_MESSAGE = 'Renseignez-vous sur les restrictions COVID 19 avant de réserver.';

const SHOWMORE = 'En savoir plus';

const SEARCHBAR = {
  what: 'Quel service ?',
  where: 'Où ?',
  when: 'Quand ?'
};

const BANNER_PRESENTATION = {
  title: 'Et si vous pouviez réserver n\'importe quel service ?',
  text: 'Avec des milliers de services disponibles, my Alfred va rendre votre vie plus simple.',
  button: 'Découvrir'
};

const OUR_SERVICES = {
  title: 'Stressez moins',
  text: 'Trouver la personne dont vous avez besoin',
  button: 'En savoir plus'
};

const OUR_DESCRIPTION = {
  text: 'On était toujours à travailler dans le train ou au téléphone dans l’avion.\n' +
    '              A l’époque, on aurait voulu un assistant qui s’occupe de tous les petits tracas du quotidien\n' +
    '                qu’on n’avait pas le temps de gérer.',
  from: '- SOLÈNE ET WILFRID - FONDATEUR DE MY ALFRED'
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
  rightText: 'Nous voulons créez une communauté où l’on puisse profiter des' +
    ' qualités de chacun. Que vous cherchiez votre futur naturopathe ou que vous soyez là pour arrondir' +
    ' vos fins de mois, nous avons hâte de vous rencontrer !\n'
};

const NEWS_LETTER = {
  title: 'La Newsletter \n' +
    'des supers Alfred',
  text: 'Inscrivez-vous a notre super Newsletter pour recevoir\n' +
    'les informations et les bons plans de la communauté.',
  google: 'S\'inscrire avec Google',
  where: 'ou',
  email: 'Email',
  button: 'Je m\'inscris !'
};

const getMangopayMessage = msg_id => {
  if (!msg_id) {
    return null;
  }
  return MANGOPAY_MESSAGES[msg_id] || `Erreur inconnue:${msg_id}`;
};

module.exports = {
  CESU_NOTICE, OUTSIDE_PERIMETER, SCHEDULE_TITLE, SCHEDULE_SUBTITLE,
  getMangopayMessage, SHOP_CREATION_SUCCESSFUL, ID_CARD_CONFIRM_DELETION,
  REGISTRATION_PROOF_CONFIRM_DELETION, INFOBAR_MESSAGE, SHOWMORE, SEARCHBAR,BANNER_PRESENTATION,
  OUR_SERVICES,OUR_DESCRIPTION,CATEGORY, BECOME_ALFRED, HOW_IT_WORKS, NEWS_LETTER
};
