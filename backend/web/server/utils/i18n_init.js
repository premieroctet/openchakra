/** *********************************
TUTO : https://phrase.com/blog/posts/localizing-react-apps-with-i18next/
*/

import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { getDataModel } from "../../config/config";

const namespaces = [`${getDataModel()}_custom`, `${getDataModel()}`, "common"];

i18n
  .use(detector)
  .use(initReactI18next) // bind react-i18next to the instance
  .use(HttpApi)
  .init({
    languages: ["fr", "en"],
    fallbackLng: "fr",
    ns: namespaces,
    defaultNS: namespaces[0],
    fallbackNS: namespaces.slice(1),
    react: {
      useSuspense: false
    }
  });

export default i18n;
