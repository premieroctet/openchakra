const CESU_NOTICE="Quel que soit votre statut, My Alfred est tenu de déclarer aux \
finances publiques vos revenus générés <b>si les deux conditions suivantes sont \
réunies dans l'année civile :</b><ul><li>vos revenus dépassent 3000 euros</li>\
<li>vous avez réalisé vingt prestations ou plus</li></ul>"

const OUTSIDE_PERIMETER="Ce service est hors de votre périmètre."

const SCHEDULE_TITLE='Précisez vos disponibilités si vous le souhaitez !'

const SCHEDULE_SUBTITLE='Si vous modifiez ces disponibilités, seules les plages \
horaires indiquées pourront être réservées. Vous pouvez appliquer une récurrence \
à vos disponibilités afin de gagner du temps ! Par exemple, si vous êtes disponible\
tous les lundis et mardis, vous pouvez cocher la case Récurrence, et cliquer\
sur Lu et Ma afin de répéter votre disponibilité sur une durée que vous \
pouvez définir.'

const MANGOPAY_MESSAGES= {
  'DOCUMENT_UNREADABLE'                 : "Pièce d'identité illisible",
  'DOCUMENT_NOT_ACCEPTED'               : "Pièce d'identité invalide : carte d'identité, passeport, permis de conduire ou titre de séjour attendu",
  'DOCUMENT_HAS_EXPIRED'                : "Ce document n'est plus valide",
  'DOCUMENT_INCOMPLETE'                 : "Document incomplet (ex:il manque le verso de la carte d'identité)",
  'DOCUMENT_DO_NOT_MATCH_USER_DATA'     : "Ce document ne correspond pas à l'identité que vous avez indiquée",
  'DOCUMENT_DO_NOT_MATCH_ACCOUNT_DATA'  : "Les identités de ce document et de votre compte bancaire ne correspondent pas",
  'DOCUMENT_FALSIFIED'                  : "Ce document n'est pas un original",
  'DOCUMENT_MISSING'                    : "Ce document est vide",
  'UNDERAGE PERSON'                     : "Vous devez avoir au minimum 18 ans",
}
const getMangopayMessage = msg_id => {
  if (!msg_id) {
    return null
  }
  return MANGOPAY_MESSAGES[msg_id] || `Erreur inconnue:${msg_id}`
}

module.exports={ CESU_NOTICE, OUTSIDE_PERIMETER, SCHEDULE_TITLE, SCHEDULE_SUBTITLE, getMangopayMessage};
