const GENDER_MALE='MALE'
const GENDER_FEMALE='FEMALE'

const GENDER = {
  [GENDER_MALE]: 'Monsieur',
  [GENDER_FEMALE]: 'Madame',
}

const APPOINTMENT_CARDIOLOGIST='CARDIO'
const APPOINTMENT_GENERALIST='GENERAL'
const APPOINTMENT_OTHER='OTHER'

const APPOINTMENT_TYPE={
  [APPOINTMENT_CARDIOLOGIST]: 'Cardiologue',
  [APPOINTMENT_GENERALIST]: 'Généraliste',
  [APPOINTMENT_OTHER]: 'Autre',
}

const REMINDER_BLOOD_PRESSURE='BLOOD_PRESSURE'
const REMINDER_MEDICATION='MEDICATIONS'
const REMINDER_OTHER='OTHER'

const REMINDER_TYPE={
  [REMINDER_BLOOD_PRESSURE]: 'Prise de tension',
  [REMINDER_MEDICATION]: 'Prise de médicaments',
  [REMINDER_OTHER]: 'Autre',
}

const SMOKER_CURRENT='SMOKER_CURRENT'
const SMOKER_STOPPED='SMOKER_STOPPED'
const SMOKER_NEVER='SMOKER_NEVER'

const SMOKER_TYPE={
  [SMOKER_CURRENT]: 'Je fume',
  [SMOKER_STOPPED]: 'J\'ai arrêté de fumer',
  [SMOKER_NEVER]: 'Je n\'ai jamais fumé',
}

const WITHINGS_MEASURE_DIA=9
const WITHINGS_MEASURE_SYS=10
const WITHINGS_MEASURE_BPM=11

const MEASURE_MANUAL='MANUAL'
const MEASURE_AUTO='AUTO'

const MEASURE_SOURCE={
  [MEASURE_MANUAL]: 'Manuelle',
  [MEASURE_AUTO]: 'Automatique',
}

// Delay for appointment notification
const APPOINTMENT_NOTIF_DELAY=15

const WITHINGS_DEFAULT_WEIGHT=70
const WITHINGS_DEFAULT_HEIGHT=170

const APPOINTMENT_STATUS_ALL=null
const APPOINTMENT_STATUS_PAST='PAST'
const APPOINTMENT_STATUS_TO_COME='TO_COME'

const APPOINTMENT_STATUS={
  [APPOINTMENT_STATUS_ALL]: 'Tous',
  [APPOINTMENT_STATUS_PAST]: 'Passé',
  [APPOINTMENT_STATUS_TO_COME]: 'À venir',
}

const [SYS_MIN, SYS_MAX]=[60, 230]
const [DIA_MIN, DIA_MAX]=[40, 160]
const [HEARTBEAT_MIN, HEARTBEAT_MAX]=[40, 180]

const TIPS=[
  "Limiter la consommation de sel (diminution du sodium) tout en privilégiant les légumes et les graines (riches en potassium) peut aider à réduire la tension artérielle (équilibre sodium potassium)",
  "En moyenne, diminuer sa consommation de sel de 1g par jour permet d'agir à la baisse sur la tension systolique (1g de sel = 5 olives, 1 tranche de saumon fumé, 1 tranche de jambon, 1 portion de fromage, 1 pain au chocolat...)",
  "Pratiquer une activité physique, marche rapide, vélo, natation, de manière régulière aide à baisser la tension systolique (à partir de 20 min tous les 3 jours)",
  "Une consommation excessive d'alcool peut dégrader l'effet des médicaments contre l'hypertension",
  "L'auto mesure de la pression artérielle à domicile permet d'éviter le phénomène d’hypertension \"blouse blanche\" (pression artérielle supérieure liée au stress de l'environnement médical)",
  "Une baisse de poids même limitée à 5 kg permet d'obtenir une baisse significative de la pression artérielle",
  "Le tabac augmente le risque de maladie cardiovasculaire chez les personnes ayant de l'hypertension",
]

module.exports={
  GENDER, GENDER_MALE, GENDER_FEMALE,
  APPOINTMENT_TYPE, APPOINTMENT_OTHER,
  REMINDER_TYPE, REMINDER_OTHER, REMINDER_MEDICATION,
  SMOKER_TYPE,
  WITHINGS_MEASURE_DIA, WITHINGS_MEASURE_SYS, WITHINGS_MEASURE_BPM,
  MEASURE_SOURCE, MEASURE_AUTO, MEASURE_MANUAL,
  APPOINTMENT_NOTIF_DELAY,
  WITHINGS_DEFAULT_HEIGHT, WITHINGS_DEFAULT_WEIGHT,
  APPOINTMENT_CARDIOLOGIST,
  APPOINTMENT_STATUS, APPOINTMENT_STATUS_PAST, APPOINTMENT_STATUS_TO_COME,
  SYS_MIN, SYS_MAX, DIA_MIN, DIA_MAX, HEARTBEAT_MIN, HEARTBEAT_MAX,
  TIPS,
}
