import React, { useEffect, useState } from 'react';
import { Form, Button } from '../../App.styled';
import { useParams } from 'react-router';
import { users } from '../../dummyData';
import { User } from '../../models/User';

export enum UserFormTypes {
    edit = 'edit',
    add = 'add',
}

interface UserEditUrlParams {
    id: string;
}

interface UserFormProps {
    type: UserFormTypes;
}

export const UserForm = ({ type }: UserFormProps) => {
    const [user, setUser] = useState<User | null>(null);
    const { id }: UserEditUrlParams = useParams();
    useEffect(() => {
        const activeUser = users.find((quiz) => quiz.id === parseInt(id));
        setUser(activeUser ? activeUser : null);
    }, []);

    return (
        <>
            <h1>
                {type === UserFormTypes.add ? 'Add' : 'Edit'} user {type === UserFormTypes.edit ? user?.id : ''}
            </h1>
            <Form>
                <div>
                    <label>First name</label>
                    <input type="text" placeholder={'first name'} value={user ? user.firstname : ''} />
                </div>
                <div>
                    <label>Last name</label>
                    <input type="text" placeholder={'last name'} value={user ? user.lastname : ''} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" placeholder={'email'} value={user ? user.email : ''} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="text" placeholder={'password'} value={user ? user.password : ''} />
                </div>
                <Button type={'submit'} onClick={(e) => e.preventDefault}>
                    Save
                </Button>
            </Form>
        </>
    );
};
