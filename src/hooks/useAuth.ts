import { User } from '../models/User';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import i18n from '../i18n';

export const useAuth = () => {
    const cookies = new Cookies();

    const performLogin = (user: User) => {
        cookies.set('user', JSON.stringify(user));
        location.href = `/quiz?lang=${i18n.language}`;
    };

    const performLogout = () => {
        cookies.remove('user');
        location.href = `/quiz?lang=${i18n.language}`;
    };

    const getUser = () => {
        return cookies.get('user');
    };

    return { performLogin, performLogout, getUser };
};
