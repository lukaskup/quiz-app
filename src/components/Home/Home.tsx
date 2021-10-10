import React from 'react';
import { HomeContainer } from './Home.styled';
import { QuizList } from '../shared/QuizList';

export const Home = () => {
    return (
        <HomeContainer>
            <QuizList />
        </HomeContainer>
    );
};
