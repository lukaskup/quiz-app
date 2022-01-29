import React, { useEffect, useState } from 'react';
import { Form, Button, InfoBadge } from '../../App.styled';
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

    const handleSubmit = () => {
        if (user) {
            if (type === UserFormTypes.edit && user._id) {
                api.updateUser(user).then(() => {
                    setRedirect(true);
                });
            } else if (user.firstname) {
                api.addUser(user)
                    .then(() => {
                        setRedirect(true);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        }
    };

    const { isRequired, minMax, checkEmail, errors, setErrors } = useFormValidation(handleSubmit);

    const messages = {
        firstnameRequired: 'please provide correct first name',
        firstnameMinMax: 'firstname should have length between 3 and 20',
        lastnameRequired: 'please provide correct lastname',
        emailRequired: 'please provide correct email',
        passwordRequired: 'please provide correct password',
        passwordMinMax: 'password should have length between 8 and 60',
    };

    const validate = (user: User) => {
        const errors: string[] = [];
        //firstname
        if (!isRequired(user.firstname)) {
            errors.push(messages.firstnameRequired);
        }
        if (!minMax(user.firstname, 3, 20)) {
            errors.push(messages.firstnameMinMax);
        }

        //lastname
        if (!isRequired(user.lastname)) {
            errors.push(messages.lastnameRequired);
        }

        //email
        if (!isRequired(user.email)) {
            errors.push(messages.emailRequired);
        }
        if (!checkEmail(user.email)) {
            errors.push(messages.emailRequired);
        }

        //password
        if (!isRequired(user.password)) {
            errors.push(messages.passwordRequired);
        }
        if (!minMax(user.password, 8, 60)) {
            errors.push(messages.passwordMinMax);
        }

        setErrors(errors);
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
                {errors.length > 0 && <InfoBadge className="error">{errors[errors.length - 1]}</InfoBadge>}
                <Button
                    type={'submit'}
                    onClick={(e) => {
                        e.preventDefault();
                        setErrors([...errors]);
                        if (user) {
                            validate(user);
                        }
                    }}
                >
                    Save
                </Button>
            </Form>
        </>
    );
};
