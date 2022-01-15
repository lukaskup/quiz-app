import React, { useEffect, useState } from 'react';
import { Form, Button } from '../../App.styled';
import { useParams } from 'react-router';
import { userQuizzes, users, quizzes } from '../../dummyData';
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
        const activeUserQuiz = userQuizzes.find((userQuiz) => userQuiz._id === id);
        setUserQuiz(activeUserQuiz ? activeUserQuiz : null);
    }, []);

    return (
        <>
            <h1>
                {type === UserQuizFormTypes.add ? 'Add' : 'Edit'} user-quiz
                {type === UserQuizFormTypes.edit ? userQuiz?._id : ''}
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
                    <input type="number" placeholder={'score'} value={userQuiz ? userQuiz.score : ''} />
                </div>
                <div>
                    <label>User</label>
                    <select title="user option">
                        <option value="">Select your option</option>
                        {users.map((user) => (
                            <option
                                key={`user-${user._id}`}
                                value={user._id}
                                selected={type === UserQuizFormTypes.edit && user._id === userQuiz?.user._id}
                            >
                                {`${user.firstname} ${user.lastname}`}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Quiz</label>
                    <select title="quiz option">
                        <option value="">Select your option</option>
                        {quizzes.map((quiz) => (
                            <option
                                key={`quiz-${quiz._id}`}
                                value={quiz._id}
                                selected={type === UserQuizFormTypes.edit && quiz._id === userQuiz?.quiz._id}
                            >
                                {`${quiz.name}`}
                            </option>
                        ))}
                        x
                    </select>
                </div>
                <Button type={'submit'} onClick={(e) => e.preventDefault}>
                    Save
                </Button>
            </Form>
        </>
    );
};
