import React, { useState } from 'react';
import { Form, Button } from '../../App.styled';
import { api } from '../../api';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

export const RegisterForm = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const history = useHistory();
    const { t } = useTranslation();

    const handleSubmit = () => {
        api.register({
            login: login,
            password: password,
        })
            .then(() => {
                history.replace({ pathname: 'login' });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <>
            <h1>{t('auth.register')}</h1>
            <Form>
                <div>
                    <label>{t('auth.login')}</label>
                    <input
                        type="text"
                        placeholder={t('loginForm.login')}
                        value={login}
                        onChange={(e) => {
                            setLogin(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <label>{t('auth.password')}</label>
                    <input
                        type="password"
                        placeholder={t('auth.password')}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                {/* {errors.length > 0 && <InfoBadge className="error">{errors[errors.length - 1]}</InfoBadge>} */}
                <Button
                    type={'submit'}
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    {t('auth.register')}
                </Button>
            </Form>
        </>
    );
};
