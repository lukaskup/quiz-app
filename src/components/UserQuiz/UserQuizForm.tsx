import React, { useEffect, useState } from 'react';
import { Form, Button } from '../../App.styled';
import { useParams } from 'react-router';
import { userQuizzes } from '../../dummyData';
import { UserQuiz } from '../../models/UserQuiz';

export enum UserQuizFormTypes {
    edit = 'edit',
    add = 'add',
}

interface UserQuizEditUrlParams {
    id: string;
}

interface UserQuizFormProps {
    type: UserQuizFormTypes;
}

export const UserQuizForm = ({ type }: UserQuizFormProps) => {
    const [userQuiz, setUserQuiz] = useState<UserQuiz | null>(null);
    const { id }: UserQuizEditUrlParams = useParams();
    useEffect(() => {
        const activeUserQuiz = userQuizzes.find((userQuiz) => userQuiz.id === parseInt(id));
        setUserQuiz(activeUserQuiz ? activeUserQuiz : null);
    }, []);

    return (
        <>
            <h1>
                {type === UserQuizFormTypes.add ? 'Add' : 'Edit'} user-quiz
                {type === UserQuizFormTypes.edit ? userQuiz?.id : ''}
            </h1>
            <Form>
                <div>
                    <label>Submitted at</label>
                    <input
                        type="date"
                        placeholder={'submitted at'}
                        value={userQuiz ? userQuiz.submitted_at.toString() : ''}
                    />
                </div>
                <div>
                    <label>Rating</label>
                    <input type="number" placeholder={'rating'} value={userQuiz ? userQuiz.rating : ''} />
                </div>
                <div>
                    <label>Score</label>
                    <input type="number" placeholder={'image url'} value={userQuiz ? userQuiz.score : ''} />
                </div>
                <div>
                    <label>User id</label>
                    <input type="number" placeholder={'user id'} value={userQuiz ? userQuiz.user.id : ''} />
                </div>
                <div>
                    <label>Quiz id</label>
                    <input type="number" placeholder={'quiz id'} value={userQuiz ? userQuiz.quiz.id : ''} />
                </div>
                <Button type={'submit'} onClick={(e) => e.preventDefault}>
                    Save
                </Button>
            </Form>
        </>
    );
};