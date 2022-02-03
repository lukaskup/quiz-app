import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ButtonLink, ViewContainer, ViewInfo } from '../../App.styled';
import { User } from '../../models/User';
import { UserQuizList } from '../UserQuiz';
import { api } from '../../api';
import { UserQuiz } from '../../models/UserQuiz';
import { useTranslation } from 'react-i18next';

interface UserViewUrlParams {
    id: string;
}

export const UserView = () => {
    const [user, setUser] = useState<User | null>(null);
    const [userQuizes, setUserQuizes] = useState<UserQuiz[] | null>([]);
    const { id }: UserViewUrlParams = useParams();
    const { t } = useTranslation();

    useEffect(() => {
        api.getUser(id).then((data) => {
            setUser(data['user']);
            setUserQuizes(data['userQuizes']);
        });
    }, []);

    return (
        <>
            <h1 style={{ display: 'inline-block' }}>
                {t('form.user')} {user?._id} {t('buttons.view')}
            </h1>
            <ButtonLink to={`/user/edit/${id}`} style={{ marginTop: '50px', float: 'right' }}>
                {t('buttons.edit')}
            </ButtonLink>
            <ViewContainer>
                <ViewInfo>
                    <span>{t('userTable.firstName')}</span>
                    <span>{user?.firstname}</span>
                </ViewInfo>
                <ViewInfo>
                    <span>{t('userTable.lastName')}</span>
                    <span>{user?.lastname}</span>
                </ViewInfo>
                <ViewInfo>
                    <span>{t('userTable.email')}</span>
                    <span>{user?.email}</span>
                </ViewInfo>
            </ViewContainer>
            <UserQuizList
                userQuizzes={userQuizes !== null ? userQuizes : []}
                title={<h2>{t('quizView.quizAttempts')}</h2>}
                dontShow={['user']}
            />
        </>
    );
};
