// Dans le cas de champs non renseignés, bien passer "null" et non chaîne vide.

const Shop = {
  booking_request: false,     // true/false
  my_alfred_conditions: null, // BASIC/PICTURE/ID_CARD/RECOMMEND
  welcome_message: '',
  cancel_mode: '',         // FLEXIBLE/MODERATE/STRICT
  is_particular: true,        // true/false : particulier.pro
  company: {name: null, creation_date: null, siret: null, naf_ape: null, status: null}, //
  service: 'service_id',
  prestations: [{prestation_id: 'id_prestation', price: 0, billing_id: 'id_billing'}],
  equipments: [{equipement_id: 'quip_id'}], // Ids des équipements
  location: {alfred: false, client: false, visio: false}, // Lieu(x) de prestation
  travel_tax: 0, // Frais de déplacement
  pick_tax: 0, // Frais de livraison/enlèvmeent
  minimum_basket: 0,
  deadline_value: 0, // Valeur de prévenance
  deadline_unit: 'jours', // Unité de prévenance (h:heures, j:jours, s:semaines)
  description: '', // Description de l'expertise
  experience_years: 0,
  diploma: [{name: '', year: '', picture: ''}],
  certification: [{name: '', year: '', picture: ''}],
  address: {address: '', city: '', zip: '', country: ''}, // Adresse différente ; null si non spécifiée
  perimeter: 0,
};
