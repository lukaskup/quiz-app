import React, { useEffect, useState } from 'react';
import { Quiz } from '../../models/Quiz';
import { useParams } from 'react-router';
import { quizzes, userQuizzes } from '../../dummyData';
import { ButtonLink, ViewContainer, ViewInfo } from '../../App.styled';
import { UserQuizList } from '../UserQuiz';

interface QuizViewUrlParams {
    id: string;
}

export const QuizView = () => {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const { id }: QuizViewUrlParams = useParams();
    useEffect(() => {
        const activeQuiz = quizzes.find((quiz) => quiz._id === id);
        setQuiz(activeQuiz ? activeQuiz : null);
    }, []);

    return (
        <>
            <h1 style={{ display: 'inline-block' }}>Quiz {quiz?._id} view</h1>
            <ButtonLink to={`/quiz/edit/${id}`} style={{ marginTop: '50px', float: 'right' }}>
                Edit
            </ButtonLink>
            <ViewContainer>
                <ViewInfo>
                    <span>Name</span>
                    <span>{quiz?.name}</span>
                </ViewInfo>
                <ViewInfo>
                    <span>Description</span>
                    <span>{quiz?.description}</span>
                </ViewInfo>
                <ViewInfo>
                    <span>Image url</span>
                    <span>{quiz?.image_url ? quiz?.image_url : '-'}</span>
                </ViewInfo>
            </ViewContainer>
            <UserQuizList userQuizzes={userQuizzes} title={<h2>Quiz attempts</h2>} dontShow={['quiz']} />
        </>
    );
};
