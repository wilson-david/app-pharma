import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './en.json';
import es from './es.json';

// Ajuste para guardar la preferencia de idioma en AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Función para obtener el idioma guardado o el idioma del dispositivo
const getLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem('language');
    return savedLanguage || Localization.locale.split('-')[0];
};

// Función para establecer el idioma guardado o el idioma del dispositivo
const setLanguage = async () => {
    const language = await getLanguage().split('-')[0]; // Solo tomar la parte principal del idioma
    await i18n.changeLanguage(language);
    await AsyncStorage.setItem('language', language);
};

i18n
    .use(initReactI18next)
    .init({
    compatibilityJSON: 'v3',
    lng: 'es',
    fallbackLng: 'en', // Idioma de respaldo en caso de que no se encuentre el idioma preferido
    resources: {
        en: { translation: en },
        es: { translation: es },
    },
    interpolation: {
        escapeValue: false,
    },
});

setLanguage(); // Establece el idioma al iniciar la aplicación

export default i18n;
