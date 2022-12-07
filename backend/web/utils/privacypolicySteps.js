import React from 'react'
import Preamble from '../components/PrivacyPolicy/Preamble/Preamble'
import Definitions from '../components/PrivacyPolicy/Definitions/Definitions'
import Cookie from '../components/PrivacyPolicy/Cookie/Cookie'
import Payment from '../components/PrivacyPolicy/Payment/Payment'
import Data from '../components/PrivacyPolicy/Data/Data'
import Communication from '../components/PrivacyPolicy/Communication/Communication'
import Right from '../components/PrivacyPolicy/Right/Right'
import Security from '../components/PrivacyPolicy/Security/Security'
import Update from '../components/PrivacyPolicy/Update/Update'
import Policy from '../components/PrivacyPolicy/Policy/Policy'

const PREAMBLE ={
  menu: 'Préambule',
  component: () => <Preamble/>,
}

const DEFINITION = {
  menu: 'Définitions',
  component: () => <Definitions/>,
}

const COOKIE = {
  menu: 'Les données & informations collectées',
  component: () => <Cookie/>,
}

const PAYMENT = {
  menu: 'Paiements & versements',
  component: () => <Payment/>,
}

const DATA = {
  menu: 'Utilisation des données',
  component: () => <Data/>,
}

const COMMUNICATION = {
  menu: 'Communication',
  component: () => <Communication/>,
}

const RIGHT = {
  menu: 'Droits relatifs aux données à caractère personnel',
  component: () => <Right/>,
}

const SECURITY = {
  menu: 'Sécurité',
  component: () => <Security/>,
}

const UPDATE = {
  menu: 'Modifications',
  component: () => <Update/>,
}

const POLICY = {
  menu: 'Politique de gestion des cookies',
  component: () => <Policy/>,
}


const STEPS = [PREAMBLE, DEFINITION, COOKIE, PAYMENT, DATA, COMMUNICATION, RIGHT, SECURITY, UPDATE, POLICY]


module.exports = STEPS
