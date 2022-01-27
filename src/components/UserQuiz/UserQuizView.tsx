import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ButtonLink, ViewContainer, ViewInfo } from '../../App.styled';
import { UserQuiz } from '../../models/UserQuiz';
import { Link } from 'react-router-dom';
import { api } from '../../api';

interface QuizViewUrlParams {
    id: string;
}

export const UserQuizView = () => {
    const [userQuiz, setUserQuiz] = useState<UserQuiz | null>(null);
    const { id }: QuizViewUrlParams = useParams();

    useEffect(() => {
        api.getUserQuiz(id).then((data) => {
            setUserQuiz(data['userQuiz']);
        });
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
                    <span>{userQuiz ? new Date(userQuiz.submitted_at).toLocaleDateString() : '-'}</span>
                </ViewInfo>
                <ViewInfo>
                    <span>Rating</span>
                    <span>{userQuiz?.rating ? userQuiz?.rating : '-'}</span>
                </ViewInfo>
                <ViewInfo>
                    <span>Score</span>
                    <span>{userQuiz?.score}</span>
                </ViewInfo>
                {userQuiz?.user && (
                    <ViewInfo>
                        <span>User</span>
                        <span>
                            <Link
                                to={`/quiz/view/${userQuiz?.user._id}`}
                            >{`${userQuiz?.user.firstname} ${userQuiz?.user.lastname}`}</Link>
                        </span>
                    </ViewInfo>
                )}
                {userQuiz?.quiz && (
                    <ViewInfo>
                        <span>Quiz</span>
                        <span>
                            <Link to={`/quiz/view/${userQuiz?.quiz._id}`}>{userQuiz?.quiz.name}</Link>
                        </span>
                    </ViewInfo>
                )}
            </ViewContainer>
        </>
    );
};
