import React from 'react';
import { QuizListContainer } from './QuizList.styled';
import PlayIcon from '../../../assets/icons/PlayIcon.svg';
import { ReactSVG } from 'react-svg';

const data = [
    { name: 'Lorem ipsum dolor sit amet' },
    { name: 'Lorem ipsum dolor sit amet' },
    { name: 'Lorem ipsum dolor sit amet' },
    { name: 'Lorem ipsum dolor sit amet' },
    { name: 'Lorem ipsum dolor sit amet' },
    { name: 'Lorem ipsum dolor sit amet' },
    { name: 'Lorem ipsum dolor sit amet' },
    { name: 'Jakiś tam quiz' },
];

export const QuizList = () => {
    return (
        <QuizListContainer>
            {data.map((quiz, i) => {
                return (
                    <div key={`${quiz}-${i}`} className={'quiz-element'}>
                        <span>{quiz.name}</span>
                        <ReactSVG src={PlayIcon} className={'play-icon'} />
                    </div>
                );
            })}
        </QuizListContainer>
    );
};
