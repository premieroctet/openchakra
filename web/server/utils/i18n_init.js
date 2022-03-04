/** *********************************
TUTO : https://phrase.com/blog/posts/localizing-react-apps-with-i18next/
*/

import {initReactI18next} from 'react-i18next'
import i18n from 'i18next'

import customfr from '../../translations/fr/custom.json'
import feurstfr from '../../translations/fr/feurst.json'
import feursten from '../../translations/en/feurst.json'


i18n
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    languages: ['fr', 'en'],
    defaultLanguage: 'fr',
    fallbackLng: 'fr',
    lng: 'fr',
    resources: {
      fr: {
        custom: customfr,
        feurst: feurstfr,
      },
      en: {
        feurst: feursten,
      },
    },
    ns: ['custom', 'feurst'],
    defaultNS: 'custom',
    // debug: is_development(),
    react: {
      useSuspense: false,
    },
  })


export default i18n
