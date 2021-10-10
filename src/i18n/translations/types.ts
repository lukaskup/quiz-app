import { ResourceLanguage } from 'i18next';

export interface Translations extends ResourceLanguage {
    translation: {
        global: {
            hello: string;
        };
    };
}
