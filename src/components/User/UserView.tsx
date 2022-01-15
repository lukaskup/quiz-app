import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ButtonLink, ViewContainer, ViewInfo } from '../../App.styled';
import { User } from '../../models/User';
import { UserQuizList } from '../UserQuiz';
import { api } from '../../api';
import { UserQuiz } from '../../models/UserQuiz';

interface UserViewUrlParams {
    id: string;
}

export const UserView = () => {
    const [user, setUser] = useState<User | null>(null);
    const [userQuizes, setUserQuizes] = useState<UserQuiz[]>([]);
    const { id }: UserViewUrlParams = useParams();

    useEffect(() => {
        api.getUser(id).then((data) => {
            setUser(data['user']);
            setUserQuizes(data['quizes']);
        });
    }, []);

    return (
        <>
            <h1 style={{ display: 'inline-block' }}>User {user?._id} view</h1>
            <ButtonLink to={`/user/edit/${id}`} style={{ marginTop: '50px', float: 'right' }}>
                Edit
            </ButtonLink>
            <ViewContainer>
                <ViewInfo>
                    <span>First name</span>
                    <span>{user?.firstname}</span>
                </ViewInfo>
                <ViewInfo>
                    <span>Last name</span>
                    <span>{user?.lastname}</span>
                </ViewInfo>
                <ViewInfo>
                    <span>Email</span>
                    <span>{user?.email}</span>
                </ViewInfo>
            </ViewContainer>
            <UserQuizList userQuizzes={userQuizes} title={<h2>Quizes taken by user</h2>} dontShow={['user']} />
        </>
    );
};
