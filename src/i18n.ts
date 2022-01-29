import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            english: 'english',
            polish: 'polish',
            quizList: 'Quizzes list',
            buttons: {
                view: 'view',
                edit: 'edit',
                add: 'add',
                save: 'save',
            },
            deleteModal: {
                title: 'Are you sure to delete this record?',
                yes: 'Yes, delete!',
                no: 'Nope!',
            },
            navigation: {
                quizzes: 'quizzes',
                users: 'users',
                userQuizzes: 'userQuizzes',
            },
            form: {
                actions: 'actions',
                id: 'id',
            },
            quizTable: {
                name: 'name',
                description: 'description',
                imageUrl: 'image url',
            },
            quizView: {
                quiz: 'quiz',
                quizAttempts: 'Quizy attempts',
            },
            userQuizesTable: {
                submittedAt: 'submitted at',
                rating: 'rating',
                score: 'score',
                user: 'user',
                quiz: 'quiz',
            },
        },
    },
    pl: {
        translation: {
            english: 'angielski',
            polish: 'polski',
            navigation: {
                quizzes: 'quizy',
                users: 'użytkownicy',
                userQuizzes: 'użytkownikQuiz',
            },
            form: {
                actions: 'akcje',
                id: 'id',
            },
            buttons: {
                view: 'wyświetl',
                edit: 'edytuj',
                add: 'dodaj',
                save: 'zapisz',
            },
            deleteModal: {
                title: 'Czy na penwo chcesz skasować ten rekord?',
                yes: 'Tak, usuń!',
                no: 'Nie!',
            },
            quizList: 'lista quizów',
            quizTable: {
                name: 'nazwa',
                description: 'opis',
                imageUrl: 'zdjęcie url',
            },
            quizView: {
                quiz: 'quiz',
                quizAttempts: 'Próby quizu',
            },
            userQuizesTable: {
                submittedAt: 'data',
                rating: 'ocena',
                score: 'wynik',
                user: 'użytkownik',
                quiz: 'quiz',
            },
        },
    },
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
