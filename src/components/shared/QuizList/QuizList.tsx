import React from 'react';
import { QuizListContainer } from './QuizList.styled';

const data = [
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
];

export const QuizList = () => {
    return (
        <QuizListContainer>
            {data.map((quiz, i) => {
                return (
                    <div key={`${quiz}-${i}`} className={'quiz-element'}>
                        <span>{quiz.name}</span>
                    </div>
                );
            })}
        </QuizListContainer>
    );
};
