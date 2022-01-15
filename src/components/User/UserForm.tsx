import React, { useEffect, useState } from 'react';
import { Form, Button } from '../../App.styled';
import { Redirect, useParams } from 'react-router';
import { User } from '../../models/User';
import { api } from '../../api';
import { useFormValidation } from '../../hooks/useFormValidation';

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
    const [user, setUser] = useState<User | null>({
        _id: '',
        email: '',
        firstname: '',
        lastname: '',
        password: '',
    });
    const [redirect, setRedirect] = useState<boolean>(false);
    const { id }: UserEditUrlParams = useParams();
    useEffect(() => {
        if (id) {
            api.getUser(id).then((data) => {
                if (data['user']) {
                    setUser(data['user']);
                }
            });
        }
    }, []);
    const { isRequired, errors } = useFormValidation();

    const validate = (user: User) => {
        isRequired(user.firstname, 'You must provide firstname');
    };

    const handleSubmit = () => {
        if (user) {
            validate(user);
            if (errors.length > 0) return;
            if (type === UserFormTypes.edit) {
                api.updateUser(user).then(() => {
                    setRedirect(true);
                });
            } else {
                api.addUser(user).then(() => {
                    setRedirect(true);
                });
            }
        }
    };

    if (redirect) {
        return <Redirect to="/user" />;
    }

    return (
        <>
            <h1>
                {type === UserFormTypes.add ? 'Add' : 'Edit'} user {type === UserFormTypes.edit ? user?._id : ''}
            </h1>
            <Form>
                <div>
                    <label>First name</label>
                    <input
                        type="text"
                        placeholder={'first name'}
                        value={user ? user.firstname : ''}
                        onChange={(e) => {
                            if (user) {
                                setUser({ ...user, firstname: e.target.value });
                            }
                        }}
                    />
                </div>
                <div>
                    <label>Last name</label>
                    <input
                        type="text"
                        placeholder={'last name'}
                        value={user ? user.lastname : ''}
                        onChange={(e) => {
                            if (user) {
                                setUser({ ...user, lastname: e.target.value });
                            }
                        }}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder={'email'}
                        value={user ? user.email : ''}
                        onChange={(e) => {
                            if (user) {
                                setUser({ ...user, email: e.target.value });
                            }
                        }}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="text"
                        placeholder={'password'}
                        value={user ? user.password : ''}
                        onChange={(e) => {
                            if (user) {
                                setUser({ ...user, password: e.target.value });
                            }
                        }}
                    />
                </div>
                {errors &&
                    errors.map((error) => (
                        <div className="error" key={error}>
                            {error}
                        </div>
                    ))}
                <Button
                    type={'submit'}
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    Save
                </Button>
            </Form>
        </>
    );
};
