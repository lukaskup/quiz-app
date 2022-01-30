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
            auth: {
                register: 'register',
                login: 'login',
                username: 'username',
                password: 'password',
            },
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
                deleteQuiz: 'Delete Quiz',
                deleteUser: 'Delete User',
                deleteUserQuiz: 'Delete UserQuiz',
            },
            navigation: {
                quizzes: 'quizzes',
                users: 'users',
                userQuizzes: 'userQuizzes',
            },
            form: {
                actions: 'actions',
                id: 'id',
                user: 'user',
                quiz: 'quiz',
                userQuiz: 'userQuiz',
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
            userTable: {
                firstName: 'first name',
                lastName: 'last name',
                email: 'email',
            },
            userQuizesTable: {
                submittedAt: 'submitted at',
                rating: 'rating',
                score: 'score',
                user: 'user',
                quiz: 'quiz',
            },
            infoBadge: {
                add: 'Successfully added record to database! :)',
                edit: 'Successfully updated record in database! :)',
                delete: 'Successfully deleted record from database! :)',
            },
            validationMessages: {
                //user
                firstnameRequired: 'please provide correct first name',
                firstnameMinMax: 'firstname should have length between 3 and 20',
                lastnameRequired: 'please provide correct lastname',
                emailRequired: 'please provide correct email',
                passwordRequired: 'please provide correct password',
                passwordMinMax: 'password should have length between 8 and 60',
                //quiz
                nameRequired: 'please provide correct name',
                nameMinMax: 'name should have length between 3 and 20',
                descriptionRequired: 'please provide correct description',
                //userQuiz
                submittedAtRequired: 'please provide submitted at',
                userRequired: 'pleasae select user',
                quizRequired: 'please select quiz',
                scoreRequired: 'score should be between 1 and 10',
                ratingRequired: 'rating should be between 1 and 10',
            },
        },
    },
    pl: {
        translation: {
            english: 'angielski',
            polish: 'polski',
            auth: {
                register: 'zarajestruj się',
                login: 'zaloguj się',
                username: 'nazwa użytkownika',
                password: 'hasło',
            },
            navigation: {
                quizzes: 'quizy',
                users: 'użytkownicy',
                userQuizzes: 'użytkownikQuiz',
            },
            form: {
                actions: 'akcje',
                id: 'id',
                user: 'użytkownika',
                quiz: 'quiz',
                userQuiz: 'użyutkownikQuiz',
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
                deleteQuiz: 'Usuń quiz',
                deleteUser: 'Usuń użytkownika',
                deleteUserQuiz: 'Usuń użytkownikQuiz',
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
            userTable: {
                firstName: 'imię',
                lastName: 'nazwisko',
                email: 'email',
            },
            userQuizesTable: {
                submittedAt: 'data',
                rating: 'ocena',
                score: 'wynik',
                user: 'użytkownik',
                quiz: 'quiz',
            },
            infoBadge: {
                add: 'Pomyślnie dodano rekord do bazy danych',
                edit: 'Pomyślnie zedytowano rekord w bazie danych',
                delete: 'Pomyślnie usunięto rekord z bazy danych',
            },
            validationMessages: {
                //user
                firstnameRequired: 'podaj poprawnę imię',
                firstnameMinMax: 'imię powinno mieć od 3 do 20 znaków',
                lastnameRequired: 'podaj poprawne nazwisko',
                emailRequired: 'podaj poprawny email',
                passwordRequired: 'podaj poprawne hasło',
                passwordMinMax: 'hasło powinno mieć od 8 do 60 znaków',
                //quiz
                nameRequired: 'podaj poprawną nazwę',
                nameMinMax: 'nazwa powinna mieć od 3 do 20 znaków',
                descriptionRequired: 'podaj poprawny opis',
                //userQuiz
                submittedAtRequired: 'podaj poprawną datę',
                userRequired: 'proszę wybierz użytkownika',
                quizRequired: 'proszę wybierz quiz',
                scoreRequired: 'wynik powinien być większy lub równy 1 i mniejszy lub równy 10',
                ratingRequired: 'ocena powininna być większa lub równa 1 i mniejszy lub równy 10',
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
