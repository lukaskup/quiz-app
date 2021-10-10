import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, pl } from './translations';
import 'moment/locale/de';

i18n.on('languageChanged', (locale) => {
    console.log(locale);
});

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    supportedLngs: ['pl', 'en'],
    load: 'languageOnly',
    nonExplicitSupportedLngs: true,
    debug: true,
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: en,
        pl: pl,
    },
});

export default i18n;
