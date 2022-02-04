import React, { useState } from 'react';
import { NavigationContainer } from './Navigation.styled';
import { Container } from '../../App.styled';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Logo from '../../assets/imgs/logo.svg';
import HamburgerIcon from '../../assets/icons/HamburgerIcon.svg';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

export const Navigation = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    // eslint-disable-next-line
    const langChange = (e: any) => {
        i18n.changeLanguage(e.target.value);
    };

    const { t } = useTranslation();
    return (
        <NavigationContainer>
            <Container>
                <Link to="/">
                    <ReactSVG src={Logo} className="logo-icon" />
                    <span>Quizyzz</span>
                </Link>
                <div className={'navi-links'}>
                    <Link to={'/quiz'}>{t('navigation.quizzes')}</Link>
                    <Link to={'/user'}>{t('navigation.users')}</Link>
                    <Link to={'/userQuiz'}>{t('navigation.userQuizzes')}</Link>
                    <select name="lang" id="lang" onChange={langChange}>
                        <option value="en">{t('english')}</option>
                        <option value="pl">{t('polish')}</option>
                    </select>
                    <Link to={'/login'} className="login">
                        {t('navigation.login')}
                    </Link>
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
