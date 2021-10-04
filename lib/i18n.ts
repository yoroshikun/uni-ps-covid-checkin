import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../public/locales/en/common.json';
import fr from '../public/locales/fr/common.json';
import gr from '../public/locales/gr/common.json';
import jp from '../public/locales/jp/common.json';
import zh from '../public/locales/zh/common.json';

const resources = {
  en,
  fr,
  gr,
  jp,
  zh,
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
