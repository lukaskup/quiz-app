import React, { useEffect, useState } from 'react';
import { Quiz } from '../../models/Quiz';
import { useParams } from 'react-router';
import { quizzes } from '../../dummyData';
import { ButtonLink, ViewContainer, ViewInfo } from '../../App.styled';

interface QuizViewUrlParams {
    id: string;
}

export const QuizView = () => {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const { id }: QuizViewUrlParams = useParams();
    useEffect(() => {
        const activeQuiz = quizzes.find((quiz) => quiz.id === parseInt(id));
        setQuiz(activeQuiz ? activeQuiz : null);
    }, []);

    return (
        <>
            <h1 style={{ display: 'inline-block' }}>Quiz {quiz?.id} view</h1>
            <ButtonLink to={`/quiz/edit/${id}`} style={{ marginTop: '50px', float: 'right' }}>
                Edit
            </ButtonLink>
            <ViewContainer>
                <ViewInfo>
                    <title>Name</title>
                    <span>{quiz?.name}</span>
                </ViewInfo>
                <ViewInfo>
                    <title>Description</title>
                    <span>{quiz?.description}</span>
                </ViewInfo>
                <ViewInfo>
                    <title>Image url</title>
                    <span>{quiz?.image_url ? quiz?.image_url : '-'}</span>
                </ViewInfo>
            </ViewContainer>
        </>
    );
};
