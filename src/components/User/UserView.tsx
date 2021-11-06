import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { userQuizzes, users } from '../../dummyData';
import { ButtonLink, ViewContainer, ViewInfo } from '../../App.styled';
import { User } from '../../models/User';
import { UserQuizList } from '../UserQuiz';

interface UserViewUrlParams {
    id: string;
}

export const UserView = () => {
    const [user, setUser] = useState<User | null>(null);
    const { id }: UserViewUrlParams = useParams();
    useEffect(() => {
        const activeUser = users.find((quiz) => quiz.id === parseInt(id));
        setUser(activeUser ? activeUser : null);
    }, []);

    const userTakenQuizzes = userQuizzes.filter((x) => x.user.id === user?.id);

    return (
        <>
            <h1 style={{ display: 'inline-block' }}>User {user?.id} view</h1>
            <ButtonLink to={`/user/edit/${id}`} style={{ marginTop: '50px', float: 'right' }}>
                Edit
            </ButtonLink>
            <ViewContainer>
                <ViewInfo>
                    <title>First name</title>
                    <span>{user?.firstname}</span>
                </ViewInfo>
                <ViewInfo>
                    <title>Last name</title>
                    <span>{user?.lastname}</span>
                </ViewInfo>
                <ViewInfo>
                    <title>Email</title>
                    <span>{user?.email}</span>
                </ViewInfo>
            </ViewContainer>
            <UserQuizList userQuizzes={userTakenQuizzes} title={<h1>Quizes taken by user</h1>} />
        </>
    );
};
