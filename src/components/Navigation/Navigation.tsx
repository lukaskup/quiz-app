import React from 'react';
import { NavigationContainer } from './Navigation.styled';
import { Container } from '../../App.styled';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Logo from '../../assets/imgs/logo.svg';

export const Navigation = () => {
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
            </Container>
        </NavigationContainer>
    );
};
