import React, { useEffect, useState } from 'react';
import { Quiz } from '../../models/Quiz';
import { useParams } from 'react-router';
import { ButtonLink, ViewContainer, ViewInfo } from '../../App.styled';
import { UserQuizList } from '../UserQuiz';
import { UserQuiz } from '../../models/UserQuiz';
import { api } from '../../api';
import { useTranslation } from 'react-i18next';
interface QuizViewUrlParams {
    id: string;
}

export const QuizView = () => {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [userQuizes, setUserQuizes] = useState<UserQuiz[] | null>([]);
    const { id }: QuizViewUrlParams = useParams();
    const { t } = useTranslation();

    useEffect(() => {
        api.getQuiz(id).then((data) => {
            setQuiz(data['quiz']);
            setUserQuizes(data['userQuizes'].length === 0 ? null : data['userQuizes']);
        });
    }, []);
    return (
        <>
            <h1 style={{ display: 'inline-block' }}>
                {t('quizView.quiz')} {quiz?._id}
            </h1>
            <ButtonLink to={`/quiz/edit/${id}`} style={{ marginTop: '50px', float: 'right' }}>
                {t('buttons.edit')}
            </ButtonLink>
            <ViewContainer>
                <ViewInfo>
                    <span>{t('quizTable.name')}</span>
                    <span>{quiz?.name}</span>
                </ViewInfo>
                <ViewInfo>
                    <span>{t('quizTable.description')}</span>
                    <span>{quiz?.description}</span>
                </ViewInfo>
                <ViewInfo>
                    <span>{t('quizTable.imageUrl')}</span>
                    <span>{quiz?.image_url ? quiz?.image_url : '-'}</span>
                </ViewInfo>
            </ViewContainer>
            <UserQuizList
                userQuizzes={userQuizes !== null ? userQuizes : []}
                title={<h2>{t('quizView.quizAttempts')}</h2>}
                dontShow={['quiz']}
            />
        </>
    );
};
