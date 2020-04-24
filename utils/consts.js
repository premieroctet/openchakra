const ALL_SERVICES=['Tous les services', null];


const ALF_CONDS= { // my alfred condiitons
  BASIC:     "0",
  PICTURE:   "1",
  ID_CARD:   "2",
  RECOMMEND: "3",
}

const CANCEL_MODE= {
  FLEXIBLE: "0",
  MODERATE: "1",
  STRICT:   "2"
}

const CUSTOM_PRESTATIONS_FLTR="Prestations personnalisées";

const generate_id= () => { return new Date().getTime() };

const COMM_ALFRED=0.0;
const COMM_CLIENT=0.18;

const SMS_VERIF_DEBUG=true;

module.exports={ALL_SERVICES, ALF_CONDS, CANCEL_MODE, CUSTOM_PRESTATIONS_FLTR, generate_id, COMM_ALFRED, COMM_CLIENT, SMS_VERIF_DEBUG};
