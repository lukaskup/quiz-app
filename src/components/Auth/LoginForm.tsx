import React, { useState } from 'react';
import { Form, Button, InfoBadge } from '../../App.styled';
import { api } from '../../api';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { User } from '../../models/User';

export const LoginForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);
    const { performLogin } = useAuth();
    const { t } = useTranslation();

    const handleSubmit = () => {
        api.login({
            email: email,
            password: password,
        })
            .then((response) => {
                performLogin(response.data as User);
            })
            .catch((e) => {
                setErrors(e.response.data.map((error: string) => t(error)));
            });
    };

    return (
        <>
            <h1>{t('navigation.login')}</h1>
            <Form>
                <div>
                    <label>{t('userTable.email')}</label>
                    <input
                        type="text"
                        placeholder={t('userTable.email')}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <label>{t('userTable.password')}</label>
                    <input
                        type="password"
                        placeholder={t('userTable.password')}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                {errors.length > 0 && <InfoBadge className="error">{errors[errors.length - 1]}</InfoBadge>}
                <Button
                    type={'submit'}
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    {t('auth.login')}
                </Button>
            </Form>
        </>
    );
};
