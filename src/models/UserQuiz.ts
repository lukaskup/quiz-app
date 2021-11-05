import { User } from './User';
import { Quiz } from './Quiz';

export interface UserQuiz {
    id: number;
    submitted_at: Date;
    rating?: number;
    score: number;
    user: User;
    quiz: Quiz;
}
