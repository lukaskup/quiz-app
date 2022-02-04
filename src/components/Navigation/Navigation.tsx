import React, { useEffect, useState } from 'react';
import { NavigationContainer } from './Navigation.styled';
import { Container } from '../../App.styled';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Logo from '../../assets/imgs/logo.svg';
import HamburgerIcon from '../../assets/icons/HamburgerIcon.svg';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { useAuth } from '../../hooks/useAuth';

export const Navigation = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    // eslint-disable-next-line
    const langChange = (e: any) => {
        i18n.changeLanguage(e.target.value);
    };
    const { t } = useTranslation();
    const { getUser, performLogout } = useAuth();
    const authUser = getUser();
    return (
        <NavigationContainer>
            <Container>
                <Link to="/">
                    <ReactSVG src={Logo} className="logo-icon" />
                    <span>Quizyzz</span>
                </Link>
                <div className={'navi-links'}>
                    <Link to={'/quiz'}>{t('navigation.quizzes')}</Link>
                    {authUser && authUser.role === 'admin' && <Link to={'/user'}>{t('navigation.users')}</Link>}
                    {authUser && <Link to={'/userQuiz'}>{t('navigation.userQuizzes')}</Link>}
                    <select name="lang" id="lang" onChange={langChange}>
                        <option value="en" selected={i18n.language === 'en'}>
                            {t('english')}
                        </option>
                        <option value="pl" selected={i18n.language === 'pl'}>
                            {t('polish')}
                        </option>
                    </select>
                    {authUser ? (
                        <div className="userProfile">
                            <div className="avatar">{authUser?.firstname.substring(0, 1).toUpperCase()}</div>
                            <div className="logout" onClick={performLogout}>
                                {t('navigation.logout')}
                            </div>
                        </div>
                    ) : (
                        <Link to={'/login'} className="login">
                            {t('navigation.login')}
                        </Link>
                    )}
                </div>
                <div className={'mobile-menu'}>
                    <ReactSVG
                        src={HamburgerIcon}
                        onClick={() => {
                            setIsMobileMenuOpen(!isMobileMenuOpen);
                        }}
                    />
                </div>
                <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
                    <Link to={'/quiz'}>{t('navigation.quizzes')}</Link>
                    <Link to={'/user'}>{t('navigation.users')}</Link>
                    <Link to={'/userQuiz'}>{t('navigation.userQuizzes')}</Link>
                    <select name="lang" id="lang" value={i18n.language}>
                        <option value="en">{t('english')}</option>
                        <option value="pl">{t('polish')}</option>
                    </select>
                </div>
            </Container>
        </NavigationContainer>
    );
};
