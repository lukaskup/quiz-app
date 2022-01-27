import { User } from './User';
import { Quiz } from './Quiz';

export interface UserQuiz {
    _id: string;
    submitted_at: Date;
    rating?: number;
    score: number;
    user: User | null;
    quiz: Quiz | null;
}

export interface UserQuizDTO {
    _id?: string;
    submitted_at: Date;
    rating?: number;
    score: number;
    user: string | undefined;
    quiz: string | undefined;
}
