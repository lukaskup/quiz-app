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
        const activeUserQuiz = userQuizzes.find((userQuiz) => userQuiz._id === id);
        setUserQuiz(activeUserQuiz ? activeUserQuiz : null);
    }, []);

    return (
        <>
            <h1 style={{ display: 'inline-block' }}>UserQuiz {userQuiz?._id} view</h1>
            <ButtonLink to={`/quiz/edit/${id}`} style={{ marginTop: '50px', float: 'right' }}>
                Edit
            </ButtonLink>
            <ViewContainer>
                <ViewInfo>
                    <span>Submitted at</span>
                    <span>{userQuiz?.submitted_at.toLocaleDateString()}</span>
                </ViewInfo>
                <ViewInfo>
                    <span>Rating</span>
                    <span>{userQuiz?.rating ? userQuiz?.rating : '-'}</span>
                </ViewInfo>
                <ViewInfo>
                    <span>Score</span>
                    <span>{userQuiz?.score}</span>
                </ViewInfo>
                <ViewInfo>
                    <span>User</span>
                    <span>
                        <Link
                            to={`/quiz/view/${userQuiz?.user._id}`}
                        >{`${userQuiz?.user.firstname} ${userQuiz?.user.lastname}`}</Link>
                    </span>
                </ViewInfo>
                <ViewInfo>
                    <span>Quiz</span>
                    <span>
                        <Link to={`/quiz/view/${userQuiz?.quiz._id}`}>{userQuiz?.quiz.name}</Link>
                    </span>
                </ViewInfo>
            </ViewContainer>
        </>
    );
};
