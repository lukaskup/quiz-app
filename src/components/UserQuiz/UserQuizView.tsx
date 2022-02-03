import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ButtonLink, ViewContainer, ViewInfo } from '../../App.styled';
import { UserQuiz } from '../../models/UserQuiz';
import { Link } from 'react-router-dom';
import { api } from '../../api';
import { useTranslation } from 'react-i18next';

interface QuizViewUrlParams {
    id: string;
}

export const UserQuizView = () => {
    const [userQuiz, setUserQuiz] = useState<UserQuiz | null>(null);
    const { id }: QuizViewUrlParams = useParams();
    const { t } = useTranslation();

    useEffect(() => {
        api.getUserQuiz(id).then((data) => {
            setUserQuiz(data['userQuiz']);
        });
    }, []);

    return (
        <>
            <h1 style={{ display: 'inline-block' }}>
                {t('form.userQuiz')} {userQuiz?._id}
            </h1>
            <ButtonLink to={`/userQuiz/edit/${id}`} style={{ marginTop: '50px', float: 'right' }}>
                {t('buttons.edit')}
            </ButtonLink>
            <ViewContainer>
                <ViewInfo>
                    <span>{t('userQuizesTable.submittedAt')}</span>
                    <span>{userQuiz ? new Date(userQuiz.submitted_at).toLocaleDateString() : '-'}</span>
                </ViewInfo>
                <ViewInfo>
                    <span>{t('userQuizesTable.submittedAt')}</span>
                    <span>{userQuiz?.rating ? userQuiz?.rating : '-'}</span>
                </ViewInfo>
                <ViewInfo>
                    <span>{t('userQuizesTable.submittedAt')}</span>
                    <span>{userQuiz?.score}</span>
                </ViewInfo>
                {userQuiz?.user && (
                    <ViewInfo>
                        <span>{t('userQuizesTable.user')}</span>
                        <span>
                            <Link
                                to={`/user/view/${userQuiz?.user._id}`}
                            >{`${userQuiz?.user.firstname} ${userQuiz?.user.lastname}`}</Link>
                        </span>
                    </ViewInfo>
                )}
                {userQuiz?.quiz && (
                    <ViewInfo>
                        <span>{t('userQuizesTable.quiz')}</span>
                        <span>
                            <Link to={`/quiz/view/${userQuiz?.quiz._id}`}>{userQuiz?.quiz.name}</Link>
                        </span>
                    </ViewInfo>
                )}
            </ViewContainer>
        </>
    );
};
