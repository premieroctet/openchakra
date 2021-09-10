import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import customfr from '../translations/fr/custom.json'


i18n
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    languages: ['fr'],
    defaultLanguage: 'fr',
    lng: 'fr',
    resources: {
      fr: {
        custom: customfr,
      },
    },
    ns: ['custom'],
    defaultNS: 'custom',
    debug: true,
    react: {
      useSuspense: false,
    },
  })


export default i18n
