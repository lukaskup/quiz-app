import React from 'react';
import { NavigationContainer } from './Navigation.styled';
import { Container } from '../../App.styled';
import Link from 'react-router';

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Container>
                <Link to="/">
                    <title>Quizyzz</title>
                </Link>
            </Container>
        </NavigationContainer>
    );
};
