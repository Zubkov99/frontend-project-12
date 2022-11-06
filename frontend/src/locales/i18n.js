import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './resources';

const activeLanguage = localStorage.getItem('lang');

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: JSON.parse(activeLanguage) || 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
