import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { users } from '../../dummyData';
import { ButtonLink, ViewContainer, ViewInfo } from '../../App.styled';
import { User } from '../../models/User';

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
        </>
    );
};
