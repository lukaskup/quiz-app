import { Quiz } from './models/Quiz';
import { User } from './models/User';
import { UserQuiz } from './models/UserQuiz';

export const quizzes: Array<Quiz> = [
    { id: 1, name: 'Quiz about stuff 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n' },
    {
        id: 2,
        name: 'Quiz about stuff 2',
        description: 'Donec quis purus vestibulum leo laoreet lacinia vitae molestie nibh.\n',
    },
    { id: 3, name: 'Quiz about stuff 3', description: 'Fusce eget elit non dui aliquam ullamcorper.\n' },
    {
        id: 4,
        name: 'Quiz about stuff 4',
        description: 'Nullam consectetur est sed neque euismod, vel convallis ipsum maximus.\n',
    },
    { id: 5, name: 'Quiz about stuff 5', description: 'Nulla hendrerit odio nec turpis feugiat scelerisque.\n' },
    { id: 6, name: 'Quiz about stuff 6', description: 'Vivamus lobortis ipsum eget ligula lacinia laoreet.\n' },
    { id: 7, name: 'Quiz about stuff 7', description: 'Donec placerat orci quis erat euismod hendrerit.\n' },
    { id: 8, name: 'Quiz about stuff 8', description: 'Morbi ut leo eu lorem faucibus ultrices.\n' },
    { id: 9, name: 'Quiz about stuff 9', description: 'Suspendisse hendrerit sem ut purus auctor ultrices.\n' },
    {
        id: 10,
        name: 'Quiz about stuff 10',
        description: 'Sed aliquet libero et nisi accumsan, ut porttitor diam iaculis.\n',
    },
];

export const users: Array<User> = [
    { id: 10, email: 'ridiculus.mus@sociosquad.edu', firstname: 'Hall', lastname: 'Dixon', password: 'test' },
    { id: 11, email: 'elit.erat@aliquet.edu', firstname: 'Ashton', lastname: 'Dixon', password: 'test' },
    { id: 12, email: 'duis@semper.ca', firstname: 'Fredericka', lastname: 'Dixon', password: 'test' },
    { id: 13, email: 'mi.ac@commodoauctor.co.uk', firstname: 'Hall', lastname: 'Dixon', password: 'test' },
    { id: 14, email: 'fringilla.mi@nec.co.uk', firstname: 'Ashton', lastname: 'Dixon', password: 'test' },
    { id: 15, email: 'ipsum@utquam.net', firstname: 'Fredericka', lastname: 'Dixon', password: 'test' },
    { id: 16, email: 'tellus.phasellus@malesuada.org', firstname: 'Hall', lastname: 'Dixon', password: 'test' },
    { id: 17, email: 'vehicula.et.rutrum@augue.co.uk', firstname: 'Ashton', lastname: 'Dixon', password: 'test' },
    { id: 18, email: 'lorem.eu@mattiscraseget.ca', firstname: 'Fredericka', lastname: 'Dixon', password: 'test' },
    { id: 19, email: 'dignissim.lacus@aclibero.net', firstname: 'Ashton', lastname: 'Dixon', password: 'test' },
];

export const userQuizzes: Array<UserQuiz> = [
    { id: 20, rating: 3, submitted_at: new Date(), score: 8, quiz: quizzes[0], user: users[0] },
    { id: 21, rating: 3, submitted_at: new Date(), score: 8, quiz: quizzes[0], user: users[0] },
    { id: 22, rating: 3, submitted_at: new Date(), score: 8, quiz: quizzes[0], user: users[0] },
    { id: 23, rating: 3, submitted_at: new Date(), score: 8, quiz: quizzes[0], user: users[0] },
    { id: 24, rating: 3, submitted_at: new Date(), score: 8, quiz: quizzes[0], user: users[0] },
    { id: 25, rating: 3, submitted_at: new Date(), score: 8, quiz: quizzes[0], user: users[0] },
    { id: 26, rating: 3, submitted_at: new Date(), score: 8, quiz: quizzes[0], user: users[0] },
    { id: 27, rating: 3, submitted_at: new Date(), score: 8, quiz: quizzes[0], user: users[0] },
    { id: 28, rating: 3, submitted_at: new Date(), score: 8, quiz: quizzes[0], user: users[0] },
    { id: 29, rating: 3, submitted_at: new Date(), score: 8, quiz: quizzes[0], user: users[0] },
    { id: 30, rating: 3, submitted_at: new Date(), score: 8, quiz: quizzes[0], user: users[0] },
];
