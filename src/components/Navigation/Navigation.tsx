import React, { useState } from 'react';
import { NavigationContainer } from './Navigation.styled';
import { Container } from '../../App.styled';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Logo from '../../assets/imgs/logo.svg';
import HamburgerIcon from '../../assets/icons/HamburgerIcon.svg';

export const Navigation = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    return (
        <NavigationContainer>
            <Container>
                <Link to="/">
                    <ReactSVG src={Logo} className="logo-icon" />
                    <span>Quizyzz</span>
                </Link>
                <div className={'navi-links'}>
                    <Link to={'/quiz'}>quizzes</Link>
                    <Link to={'/user'}>users</Link>
                    <Link to={'/userQuiz'}>userQuizzes</Link>
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
                    <Link to={'/quiz'}>quizzes</Link>
                    <Link to={'/user'}>users</Link>
                    <Link to={'/userQuiz'}>userQuizzes</Link>
                </div>
            </Container>
        </NavigationContainer>
    );
};
