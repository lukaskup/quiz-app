import React, { useEffect, useState } from 'react';
import { Form, Button, InfoBadge } from '../../App.styled';
import { Redirect, useParams } from 'react-router';
import { User } from '../../models/User';
import { api } from '../../api';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useTranslation } from 'react-i18next';

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
    const isClientValidation = Boolean(process.env.REACT_APP_CLIENT_VALIDATION);
    const { id }: UserEditUrlParams = useParams();
    const { t } = useTranslation();
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
                api.updateUser(user)
                    .then(() => {
                        setRedirect(true);
                    })
                    .catch((e) => {
                        setErrors(e.response.data.map((error: string) => t(error)));
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
        firstnameRequired: t('validationMessages.firstnameRequired'),
        firstnameMinMax: t('validationMessages.firstnameMinMax'),
        lastnameRequired: t('validationMessages.lastnameRequired'),
        emailRequired: t('validationMessages.emailRequired'),
        passwordRequired: t('validationMessages.passwordRequired'),
        passwordMinMax: t('validationMessages.passwordMinMax'),
    };

    const validate = (user: User) => {
        const errors: string[] = [];
        if (isClientValidation) {
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
        }

        setErrors(errors);
    };

    if (redirect) {
        return <Redirect to={`/user${type === UserFormTypes.edit ? '?success=edit' : '?success=add'}`} />;
    }

    return (
        <>
            <h1>
                {type === UserFormTypes.add ? t('buttons.add') : t('buttons.edit')} {t('form.user')}{' '}
                {type === UserFormTypes.edit ? user?._id : ''}
            </h1>
            <Form>
                <div>
                    <label>{t('userTable.firstName')}</label>
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
                    <label>{t('userTable.lastName')}</label>
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
                    <label>{t('userTable.email')}</label>
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
                    <label>{t('userTable.password')}</label>
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
