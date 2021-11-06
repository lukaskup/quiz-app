import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { userQuizzes } from '../../dummyData';
import { ButtonLink, ViewContainer, ViewInfo } from '../../App.styled';
import { UserQuiz } from '../../models/UserQuiz';
import { Link } from 'react-router-dom';

interface QuizViewUrlParams {
    id: string;
}

export const UserQuizView = () => {
    const [userQuiz, setUserQuiz] = useState<UserQuiz | null>(null);
    const { id }: QuizViewUrlParams = useParams();
    useEffect(() => {
        const activeUserQuiz = userQuizzes.find((userQuiz) => userQuiz.id === parseInt(id));
        setUserQuiz(activeUserQuiz ? activeUserQuiz : null);
    }, []);

    return (
        <>
            <h1 style={{ display: 'inline-block' }}>UserQuiz {userQuiz?.id} view</h1>
            <ButtonLink to={`/quiz/edit/${id}`} style={{ marginTop: '50px', float: 'right' }}>
                Edit
            </ButtonLink>
            <ViewContainer>
                <ViewInfo>
                    <title>Submitted at</title>
                    <span>{userQuiz?.submitted_at.toLocaleDateString()}</span>
                </ViewInfo>
                <ViewInfo>
                    <title>Rating</title>
                    <span>{userQuiz?.rating ? userQuiz?.rating : '-'}</span>
                </ViewInfo>
                <ViewInfo>
                    <title>Score</title>
                    <span>{userQuiz?.score}</span>
                </ViewInfo>
                <ViewInfo>
                    <title>User</title>
                    <span>
                        <Link to={`/quiz/view/${userQuiz?.user.id}`}>{userQuiz?.user.id}</Link>
                    </span>
                </ViewInfo>
                <ViewInfo>
                    <title>Quiz</title>
                    <span>
                        <Link to={`/quiz/view/${userQuiz?.quiz.id}`}>{userQuiz?.quiz.id}</Link>
                    </span>
                </ViewInfo>
            </ViewContainer>
        </>
    );
};
